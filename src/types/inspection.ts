export type ComplianceStatus =
  | 'POTENTIALLY_COMPLIANT'
  | 'NEEDS_REVIEW'
  | 'POTENTIAL_NON_COMPLIANCE'
  | 'NOT_APPLICABLE'
  | 'VERIFIED';

export type RuleSeverity = 'critical' | 'major' | 'minor';

export type ProductCategory =
  | 'Packaged Food & Beverages'
  | 'Cosmetics & Personal Care'
  | 'Household & Cleaning'
  | 'Pharmaceuticals & OTC'
  | 'Electronics & Appliances'
  | 'General Commodities';

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  label?: string;
}

export interface ExtractedField {
  id: string;
  name: string; // e.g. "Product / Commodity Name"
  category: 'identity' | 'quantity' | 'pricing' | 'dates' | 'origin' | 'manufacturer' | 'compliance' | 'consumer';
  extractedValue: string;
  correctedValue: string | null;
  confidence: number; // 0-100
  isVerified: boolean;
  isRejected: boolean;
  boundingBox?: BoundingBox;
  fieldNotes?: string;
  mandatoryRuleId?: string;
}

export interface ComplianceRule {
  id: string; // e.g. "R-LM-001"
  name: string; // e.g. "MRP Declaration"
  standard: 'Legal Metrology (Packaged Commodities) Rules, 2011' | 'FSSAI Packaging Regulations' | 'BIS Standards';
  category: 'Legal Metrology' | 'Food Safety' | 'Consumer Protection';
  severity: RuleSeverity;
  description: string;
  targetFieldId?: string;
  applicableCategories?: ProductCategory[];
  isEnabled: boolean;
  isConditional: boolean;
  conditionDescription?: string;
  defaultExplanation: string;
}

export interface RuleEvaluationResult {
  ruleId: string;
  ruleName: string;
  severity: RuleSeverity;
  status: ComplianceStatus;
  explanation: string;
  evidenceFound: string;
  isHumanOverridden?: boolean;
}

export interface ImageQualityMetrics {
  resolutionScore: number; // 0-100
  resolutionStatus: 'Good' | 'Acceptable' | 'Low';
  blurScore: number; // 0-100 (higher = sharper)
  blurStatus: 'Sharp' | 'Low' | 'Moderate' | 'High Blur';
  lightingScore: number; // 0-100
  lightingStatus: 'Optimal' | 'Acceptable' | 'Uneven' | 'Poor';
  perspectiveScore: number; // 0-100
  perspectiveStatus: 'Aligned' | 'Moderate Skew' | 'Heavy Skew';
  textVisibilityScore: number; // 0-100
  textVisibilityStatus: 'Good' | 'Fair' | 'Poor';
  overallStatus: 'Suitable for OCR' | 'Acceptable with caution' | 'Poor - Retake recommended';
}

export interface InspectorDecision {
  finalStatus: ComplianceStatus;
  decisionDate: string;
  inspectorName: string;
  inspectorId: string;
  inspectorDesignation: string;
  zonalOffice: string;
  remarks: string;
  controllingAuthorityName?: string;
  controllingAuthorityDesignation?: string;
}

export interface ProcessingPipelineStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  durationMs?: number;
}

export interface InspectionRecord {
  id: string; // e.g. "INSP-2026-1012"
  productName: string;
  brandName?: string;
  category: ProductCategory;
  imageUrl: string;
  createdAt: string;
  completedAt?: string;
  ocrConfidence: number; // 0-100
  overallConfidence: number; // 0-100
  aiAssessedStatus: ComplianceStatus;
  finalStatus: ComplianceStatus;
  isFinalized: boolean;
  processingTimeSeconds: number;
  qualityMetrics: ImageQualityMetrics;
  extractedFields: ExtractedField[];
  ruleResults: RuleEvaluationResult[];
  inspectorDecision: InspectorDecision;
}

export interface DashboardStats {
  inspectionsToday: number;
  potentiallyCompliantCount: number;
  needsReviewCount: number;
  potentialNonComplianceCount: number;
  averageOcrConfidence: number;
  averageProcessingTimeSec: number;
  totalInspectionsCount: number;
}
