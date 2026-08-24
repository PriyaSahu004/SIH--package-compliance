import { ComplianceRule, InspectionRecord, InspectorDecision } from '../types/inspection';
import { SEED_INSPECTIONS } from '../data/demoData';
import { DEFAULT_COMPLIANCE_RULES } from '../data/defaultRules';

const STORAGE_KEYS = {
  INSPECTIONS: 'nirikshak_inspections_v1',
  RULES: 'nirikshak_rules_v1',
  INSPECTOR: 'nirikshak_active_inspector_v1'
};

export const DEFAULT_INSPECTOR: InspectorDecision = {
  finalStatus: 'POTENTIALLY_COMPLIANT',
  decisionDate: new Date().toISOString(),
  inspectorName: 'Anita Verma',
  inspectorId: 'LM-INSP-KA-884',
  inspectorDesignation: 'Senior Legal Metrology Inspector',
  zonalOffice: 'Zonal Directorate of Legal Metrology, Mysuru Zone, Karnataka',
  remarks: '',
  controllingAuthorityName: 'Dr. Ramesh Sundaram, IAS',
  controllingAuthorityDesignation: 'Controller of Legal Metrology, State of Karnataka'
};

export class StorageService {
  public static getInspections(): InspectionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSPECTIONS);
      if (!data) {
        this.saveInspections(SEED_INSPECTIONS);
        return SEED_INSPECTIONS;
      }
      return JSON.parse(data);
    } catch {
      return SEED_INSPECTIONS;
    }
  }

  public static saveInspections(inspections: InspectionRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(inspections));
    } catch (err) {
      console.error('Failed to save inspections to local storage', err);
    }
  }

  public static getInspectionById(id: string): InspectionRecord | undefined {
    const list = this.getInspections();
    return list.find((i) => i.id === id);
  }

  public static upsertInspection(inspection: InspectionRecord): void {
    const list = this.getInspections();
    const index = list.findIndex((i) => i.id === inspection.id);
    if (index >= 0) {
      list[index] = inspection;
    } else {
      list.unshift(inspection);
    }
    this.saveInspections(list);
  }

  public static deleteInspection(id: string): void {
    const list = this.getInspections().filter((i) => i.id !== id);
    this.saveInspections(list);
  }

  public static getRules(): ComplianceRule[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RULES);
      if (!data) {
        this.saveRules(DEFAULT_COMPLIANCE_RULES);
        return DEFAULT_COMPLIANCE_RULES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_COMPLIANCE_RULES;
    }
  }

  public static saveRules(rules: ComplianceRule[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(rules));
    } catch (err) {
      console.error('Failed to save rules to local storage', err);
    }
  }

  public static resetRulesToDefault(): ComplianceRule[] {
    this.saveRules(DEFAULT_COMPLIANCE_RULES);
    return DEFAULT_COMPLIANCE_RULES;
  }

  public static getActiveInspector(): InspectorDecision {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSPECTOR);
      if (!data) {
        this.saveActiveInspector(DEFAULT_INSPECTOR);
        return DEFAULT_INSPECTOR;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_INSPECTOR;
    }
  }

  public static saveActiveInspector(inspector: InspectorDecision): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INSPECTOR, JSON.stringify(inspector));
    } catch (err) {
      console.error('Failed to save active inspector', err);
    }
  }

  public static resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.INSPECTIONS);
    localStorage.removeItem(STORAGE_KEYS.RULES);
    localStorage.removeItem(STORAGE_KEYS.INSPECTOR);
  }
}
