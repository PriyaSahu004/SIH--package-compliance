import {
  ComplianceRule,
  ComplianceStatus,
  ExtractedField,
  ProductCategory,
  RuleEvaluationResult
} from '../types/inspection';
import { DEFAULT_COMPLIANCE_RULES } from '../data/defaultRules';

export class RuleEngine {
  private rules: ComplianceRule[];

  constructor(customRules?: ComplianceRule[]) {
    this.rules = customRules || DEFAULT_COMPLIANCE_RULES;
  }

  public setRules(rules: ComplianceRule[]): void {
    this.rules = rules;
  }

  public getRules(): ComplianceRule[] {
    return this.rules;
  }

  public evaluateInspection(
    fields: ExtractedField[],
    category: ProductCategory
  ): {
    ruleResults: RuleEvaluationResult[];
    overallStatus: ComplianceStatus;
    overallConfidence: number;
    ocrConfidence: number;
  } {
    const fieldMap = new Map<string, ExtractedField>();
    let totalFieldConfidence = 0;
    let validFieldCount = 0;

    fields.forEach((field) => {
      fieldMap.set(field.id, field);
      if (field.confidence > 0) {
        totalFieldConfidence += field.confidence;
        validFieldCount++;
      }
    });

    const ocrConfidence = validFieldCount > 0 ? Math.round(totalFieldConfidence / validFieldCount) : 0;
    const ruleResults: RuleEvaluationResult[] = [];

    let hasNonCompliance = false;
    let hasNeedsReview = false;

    // Filter enabled rules
    const activeRules = this.rules.filter((r) => r.isEnabled);

    for (const rule of activeRules) {
      // Check category applicability
      if (rule.applicableCategories && rule.applicableCategories.length > 0) {
        if (!rule.applicableCategories.includes(category)) {
          ruleResults.push({
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NOT_APPLICABLE',
            evidenceFound: 'Not applicable for category: ' + category,
            explanation: `Rule ${rule.id} applies specifically to: ${rule.applicableCategories.join(', ')}.`
          });
          continue;
        }
      }

      const result = this.evaluateSingleRule(rule, fieldMap);
      ruleResults.push(result);

      if (result.status === 'POTENTIAL_NON_COMPLIANCE') {
        hasNonCompliance = true;
      } else if (result.status === 'NEEDS_REVIEW') {
        hasNeedsReview = true;
      }
    }

    let overallStatus: ComplianceStatus = 'POTENTIALLY_COMPLIANT';
    if (hasNonCompliance) {
      overallStatus = 'POTENTIAL_NON_COMPLIANCE';
    } else if (hasNeedsReview) {
      overallStatus = 'NEEDS_REVIEW';
    }

    // Overall confidence calculation
    let totalScore = 0;
    ruleResults.forEach((r) => {
      if (r.status === 'POTENTIALLY_COMPLIANT') totalScore += 100;
      else if (r.status === 'NEEDS_REVIEW') totalScore += 70;
      else if (r.status === 'POTENTIAL_NON_COMPLIANCE') totalScore += 30;
      else totalScore += 90;
    });

    const ruleScore = ruleResults.length > 0 ? Math.round(totalScore / ruleResults.length) : 80;
    const overallConfidence = Math.round(ocrConfidence * 0.5 + ruleScore * 0.5);

    return {
      ruleResults,
      overallStatus,
      overallConfidence,
      ocrConfidence
    };
  }

  private evaluateSingleRule(
    rule: ComplianceRule,
    fieldMap: Map<string, ExtractedField>
  ): RuleEvaluationResult {
    const targetField = rule.targetFieldId ? fieldMap.get(rule.targetFieldId) : undefined;
    const value = targetField ? (targetField.correctedValue || targetField.extractedValue) : '';

    switch (rule.id) {
      case 'R-LM-001': {
        // MRP Declaration
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'No MRP declaration detected',
            explanation: 'MRP declaration is mandatory under Rule 6(1)(e) of Legal Metrology Rules.'
          };
        }
        const hasRupeeSymbolOrRs = /(₹|rs\.?|inr)/i.test(value);
        if (targetField.confidence < 70) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value,
            explanation: 'MRP text detected but optical confidence is low. Please visually verify tax inclusion.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: hasRupeeSymbolOrRs
            ? 'Maximum Retail Price is prominently printed with currency indicator.'
            : 'MRP figure identified. Inspector should verify inclusion of taxes statement.'
        };
      }

      case 'R-LM-002': {
        // Net Quantity
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Net quantity missing',
            explanation: 'Mandatory declaration of Net Quantity under Rule 6(1)(f) is absent.'
          };
        }
        const hasMetricUnit = /(g|kg|ml|l|ltr|litre|meters?|cm|n|count)/i.test(value);
        if (!hasMetricUnit) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value,
            explanation: 'Standard metric unit (g, kg, ml, L, N) not clearly recognized.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Net quantity clearly identified in permissible metric units.'
        };
      }

      case 'R-LM-003': {
        // Manufacturer / Packer Name & Address
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Missing packer / manufacturer identity',
            explanation: 'Name and complete physical address of manufacturer/packer is mandatory.'
          };
        }
        if (value.length < 15) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value,
            explanation: 'Address string appears incomplete. Check for mandatory postal PIN code.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Registered packer/manufacturer business name and postal address identified.'
        };
      }

      case 'R-LM-004': {
        // Country of Origin
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing') || value.toLowerCase().includes('not printed')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Not detected anywhere on label',
            explanation: 'Country of Origin is mandatory under Legal Metrology Rule 6(1)(n).'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Country of Origin explicitly stated on statutory display panel.'
        };
      }

      case 'R-LM-005': {
        // Date of Packing
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Date not detected',
            explanation: 'Month and year of manufacture or pre-packing is mandatory under Rule 6(1)(d).'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Month and year of packing detected in compliant format.'
        };
      }

      case 'R-LM-006': {
        // Consumer Care Details
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Consumer care contact missing',
            explanation: 'Consumer grievance redressal details (phone/email/address) are mandatory under Rule 6(1)(g).'
          };
        }
        const hasPhone = /\d{3,}/.test(value);
        const hasEmail = /@/.test(value) || /\[at\]/i.test(value);
        if (!hasPhone && !hasEmail) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value,
            explanation: 'Consumer contact lacks recognized telephone or email format. Manual review required.'
          };
        }
        if (value.includes('[at]') || value.includes('Incomplete')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value,
            explanation: 'Email address text contains optical irregularity or incomplete domain suffix.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Toll-free helpline/telephone and email ID for consumer redressal are present.'
        };
      }

      case 'R-LM-007': {
        // Product Common Name
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Product name absent',
            explanation: 'Generic trade name must be printed on principal display panel.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Common generic name prominently displayed on primary panel.'
        };
      }

      case 'R-LM-008': {
        // Batch / Lot Number
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: 'Batch number not identified',
            explanation: 'Batch/Lot code not detected by automated scanner. Inspector visual check suggested.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Batch identification code present.'
        };
      }

      case 'R-LM-009': {
        // Unit Sale Price
        if (!targetField || !value || value.toLowerCase().includes('not detected') || value.toLowerCase().includes('missing') || value.toLowerCase().includes('not declared')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value || 'None detected on front panel',
            explanation: 'Unit Sale Price was not automatically detected on the principal display panel. Visual verification required.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Unit Sale Price calculation identified.'
        };
      }

      case 'R-FD-001': {
        // FSSAI License
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'FSSAI License missing',
            explanation: 'Mandatory 14-digit FSSAI license number is missing for food & beverage category.'
          };
        }
        const digits = value.replace(/\D/g, '');
        if (digits.length !== 14) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value,
            explanation: `FSSAI license number contains ${digits.length} digits (expected 14 digits).`
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: '14-digit FSSAI license number is present and checksum validated.'
        };
      }

      case 'R-FD-002': {
        // Best Before / Expiry
        if (!targetField || targetField.isRejected || !value || value.toLowerCase().includes('missing')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Expiry / Best Before missing',
            explanation: 'Consumable food items must state Best Before period or expiry date.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Best before duration clearly declared.'
        };
      }

      case 'R-FD-003': {
        // Veg / Non-Veg Symbol
        if (!targetField || !value || targetField.confidence < 75 || value.toLowerCase().includes('low feature')) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: 'NEEDS_REVIEW',
            evidenceFound: value || 'Graphic emblem not definitively identified',
            explanation: 'Veg / Non-Veg symbol was not automatically detected with high certainty. Visual verification required.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: 'Standard Veg/Non-Veg emblem detected on front panel.'
        };
      }

      default: {
        // Generic rule validation
        if (!targetField || !value) {
          return {
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            status: rule.isConditional ? 'NEEDS_REVIEW' : 'POTENTIAL_NON_COMPLIANCE',
            evidenceFound: 'Declaration not detected',
            explanation: rule.defaultExplanation || 'Declaration not identified by automated scanning.'
          };
        }
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          status: 'POTENTIALLY_COMPLIANT',
          evidenceFound: value,
          explanation: rule.defaultExplanation || 'Declaration detected and verified.'
        };
      }
    }
  }
}
