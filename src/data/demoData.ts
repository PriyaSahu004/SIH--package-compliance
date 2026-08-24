import { InspectionRecord, ProductCategory } from '../types/inspection';

// Helper to create SVG data URIs for realistic package labels
export function generateJuiceLabelSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" style="background:#fef7ea; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <!-- Background Card & Borders -->
    <rect width="600" height="800" fill="#fff9ef"/>
    <rect x="20" y="20" width="560" height="760" rx="16" fill="#ffffff" stroke="#e08e2e" stroke-width="4"/>
    
    <!-- Top Branding Banner -->
    <path d="M 20 20 L 580 20 L 580 130 Q 300 170 20 130 Z" fill="#d9531e"/>
    <text x="300" y="70" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">FRESHFARM</text>
    <text x="300" y="105" font-size="16" font-weight="600" fill="#ffe0b2" text-anchor="middle">100% REAL FRUIT BLEND</text>

    <!-- Product Commodity Name -->
    <rect x="50" y="155" width="500" height="55" rx="8" fill="#fdf0dd" stroke="#f5c07b" stroke-dasharray="3 3"/>
    <text x="300" y="190" font-size="22" font-weight="800" fill="#a0320a" text-anchor="middle">MIXED FRUIT JUICE</text>
    <text x="300" y="205" font-size="11" font-weight="600" fill="#78350f" text-anchor="middle">(RECONSTITUTED FRUIT BEVERAGE)</text>

    <!-- Visual Fruit Badge & Veg Symbol -->
    <g transform="translate(60, 225)">
      <rect x="0" y="0" width="40" height="40" fill="#ffffff" stroke="#15803d" stroke-width="2.5"/>
      <circle cx="20" cy="20" r="10" fill="#15803d"/>
      <text x="50" y="25" font-size="12" font-weight="bold" fill="#15803d">100% VEGETARIAN</text>
    </g>

    <!-- Net Quantity Callout -->
    <rect x="420" y="225" width="120" height="45" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="480" y="245" font-size="11" font-weight="bold" fill="#92400e" text-anchor="middle">NET QUANTITY</text>
    <text x="480" y="263" font-size="18" font-weight="900" fill="#78350f" text-anchor="middle">1 L</text>

    <!-- Central Decorative Box -->
    <rect x="50" y="285" width="500" height="150" rx="10" fill="#fffbeb" stroke="#fcd34d"/>
    <text x="300" y="320" font-size="14" font-weight="bold" fill="#b45309" text-anchor="middle">RICH IN VITAMIN C • NO ADDED PRESERVATIVES</text>
    
    <!-- Mandatory Declaration Details Box -->
    <rect x="50" y="445" width="500" height="235" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="70" y="470" font-size="12" font-weight="bold" fill="#0f172a">PACKAGING &amp; STATUTORY DECLARATIONS:</text>

    <!-- Manufacturer Details -->
    <text x="70" y="495" font-size="11" font-weight="bold" fill="#334155">Manufactured &amp; Packed by:</text>
    <text x="70" y="512" font-size="11" fill="#1e293b">FreshFarm Foods Ltd., Food Park, Mysuru, Karnataka - 570010</text>
    
    <!-- Country of Origin -->
    <text x="70" y="535" font-size="11" font-weight="bold" fill="#334155">Country of Origin: <tspan font-weight="normal" fill="#1e293b">India</tspan></text>
    <text x="320" y="535" font-size="11" font-weight="bold" fill="#334155">Batch / Lot No: <tspan font-weight="normal" fill="#1e293b">FF1L-0826</tspan></text>

    <!-- Dates -->
    <text x="70" y="560" font-size="11" font-weight="bold" fill="#334155">Date of Packing: <tspan font-weight="normal" fill="#1e293b">08/2026</tspan></text>
    <text x="320" y="560" font-size="11" font-weight="bold" fill="#334155">Best Before: <tspan font-weight="normal" fill="#1e293b">6 Months from Manufacture</tspan></text>

    <!-- FSSAI License -->
    <text x="70" y="585" font-size="11" font-weight="bold" fill="#0284c7">fssai <tspan font-weight="bold" fill="#334155">Lic. No.:</tspan> <tspan font-weight="normal" fill="#1e293b">10013061000112</tspan></text>
    
    <!-- Consumer Care -->
    <text x="70" y="610" font-size="10.5" font-weight="bold" fill="#334155">Consumer Care Executive:</text>
    <text x="70" y="626" font-size="10.5" fill="#1e293b">support@freshfarm.in | Toll Free: 1800-121-3344</text>
    <text x="70" y="642" font-size="10" fill="#64748b">Address: Same as manufacturer postal address above</text>

    <!-- MRP & Barcode Footer -->
    <rect x="50" y="690" width="300" height="75" rx="8" fill="#1e293b"/>
    <text x="70" y="715" font-size="11" font-weight="600" fill="#94a3b8">MAX. RETAIL PRICE (MRP):</text>
    <text x="70" y="742" font-size="24" font-weight="900" fill="#38bdf8">Rs. 130.00</text>
    <text x="200" y="742" font-size="10" fill="#cbd5e1">(Incl. of all taxes)</text>

    <!-- Barcode Simulation -->
    <g transform="translate(380, 690)">
      <rect x="0" y="0" width="170" height="75" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
      <rect x="15" y="10" width="4" height="40" fill="#000"/>
      <rect x="23" y="10" width="2" height="40" fill="#000"/>
      <rect x="28" y="10" width="6" height="40" fill="#000"/>
      <rect x="38" y="10" width="2" height="40" fill="#000"/>
      <rect x="44" y="10" width="5" height="40" fill="#000"/>
      <rect x="53" y="10" width="2" height="40" fill="#000"/>
      <rect x="59" y="10" width="4" height="40" fill="#000"/>
      <rect x="67" y="10" width="3" height="40" fill="#000"/>
      <rect x="74" y="10" width="6" height="40" fill="#000"/>
      <rect x="84" y="10" width="2" height="40" fill="#000"/>
      <rect x="90" y="10" width="5" height="40" fill="#000"/>
      <rect x="99" y="10" width="3" height="40" fill="#000"/>
      <rect x="106" y="10" width="4" height="40" fill="#000"/>
      <rect x="114" y="10" width="2" height="40" fill="#000"/>
      <rect x="120" y="10" width="6" height="40" fill="#000"/>
      <rect x="130" y="10" width="3" height="40" fill="#000"/>
      <rect x="137" y="10" width="4" height="40" fill="#000"/>
      <rect x="145" y="10" width="2" height="40" fill="#000"/>
      <text x="85" y="63" font-size="10" font-family="monospace" fill="#000000" text-anchor="middle">8 901234 567890</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateBiscuitsLabelSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" style="background:#3b1e08; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <rect width="600" height="800" fill="#2d1504"/>
    <rect x="20" y="20" width="560" height="760" rx="14" fill="#451a03" stroke="#d97706" stroke-width="3"/>
    
    <text x="300" y="80" font-size="36" font-weight="900" fill="#fef3c7" text-anchor="middle">NUTRIBAKE</text>
    <text x="300" y="115" font-size="20" font-weight="700" fill="#fbbf24" text-anchor="middle">CHOCO-CHIP CRUNCH BISCUITS</text>
    
    <!-- Net Quantity & Veg -->
    <rect x="50" y="145" width="500" height="60" rx="8" fill="#78350f"/>
    <g transform="translate(70, 155)">
      <rect x="0" y="0" width="36" height="36" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <circle cx="18" cy="18" r="8" fill="#15803d"/>
    </g>
    <text x="130" y="180" font-size="15" font-weight="bold" fill="#ffffff">NET WT: 200 g</text>
    <text x="420" y="180" font-size="15" font-weight="bold" fill="#fef08a">MRP: ₹45.00</text>

    <!-- Declaration panel -->
    <rect x="50" y="225" width="500" height="420" rx="8" fill="#fffbeb"/>
    <text x="70" y="260" font-size="14" font-weight="bold" fill="#451a03">DECLARATIONS UNDER PACKAGED COMMODITIES RULES:</text>
    
    <text x="70" y="295" font-size="12" font-weight="bold" fill="#78350f">Product:</text>
    <text x="70" y="315" font-size="12" fill="#1f2937">NutriBake Choco-Chip Crunch Biscuits (Bakery Product)</text>

    <text x="70" y="345" font-size="12" font-weight="bold" fill="#78350f">Manufactured by:</text>
    <text x="70" y="365" font-size="12" fill="#1f2937">NutriBake Confectioneries Pvt Ltd, MIDC Area, Pune, Maharashtra - 411019</text>

    <text x="70" y="395" font-size="12" font-weight="bold" fill="#78350f">Country of Origin: <tspan font-weight="normal" fill="#1f2937">India</tspan></text>
    <text x="320" y="395" font-size="12" font-weight="bold" fill="#78350f">Batch: <tspan font-weight="normal" fill="#1f2937">NB-CH200-991</tspan></text>

    <text x="70" y="425" font-size="12" font-weight="bold" fill="#78350f">Mfg Date: <tspan font-weight="normal" fill="#1f2937">12/07/2026</tspan></text>
    <text x="320" y="425" font-size="12" font-weight="bold" fill="#78350f">Best Before: <tspan font-weight="normal" fill="#1f2937">9 Months from Pkg</tspan></text>

    <text x="70" y="455" font-size="12" font-weight="bold" fill="#0369a1">fssai Lic No: <tspan font-weight="normal" fill="#1f2937">11518019000456</tspan></text>

    <!-- Missing Unit Sale Price, blurry consumer care email -->
    <text x="70" y="485" font-size="12" font-weight="bold" fill="#78350f">Consumer Care:</text>
    <text x="70" y="505" font-size="12" fill="#1f2937">care[at]nutribake (Incomplete Domain) | Tel: 020-25667890</text>
    <text x="70" y="535" font-size="11" fill="#dc2626">* Note: Unit Sale Price (₹/g) not specified on principal panel.</text>

    <!-- Footer -->
    <rect x="50" y="665" width="500" height="90" rx="8" fill="#1f2937"/>
    <text x="300" y="715" font-size="14" font-weight="bold" fill="#fbbf24" text-anchor="middle">KEEP IN COOL AND DRY PLACE AWAY FROM DIRECT SUNLIGHT</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateRiceLabelSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800" style="background:#f0fdf4; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <rect width="600" height="800" fill="#f0fdf4"/>
    <rect x="20" y="20" width="560" height="760" rx="14" fill="#ffffff" stroke="#16a34a" stroke-width="4"/>
    
    <rect x="20" y="20" width="560" height="110" fill="#166534" rx="14 14 0 0"/>
    <text x="300" y="75" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle">GOLDEN HARVEST</text>
    <text x="300" y="105" font-size="16" font-weight="bold" fill="#86efac" text-anchor="middle">PREMIUM AGED SONA MASOORI RICE</text>

    <rect x="50" y="150" width="500" height="70" rx="8" fill="#dcfce7" stroke="#22c55e"/>
    <text x="150" y="190" font-size="22" font-weight="bold" fill="#14532d">NET WT: 5 kg</text>
    <text x="380" y="190" font-size="22" font-weight="bold" fill="#14532d">MRP: ₹340.00</text>

    <!-- Declarations Panel with Deficiencies -->
    <rect x="50" y="240" width="500" height="380" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="70" y="275" font-size="14" font-weight="bold" fill="#0f172a">PACKAGED COMMODITY DECLARATIONS:</text>

    <text x="70" y="310" font-size="12" font-weight="bold" fill="#334155">Packer Details:</text>
    <text x="70" y="330" font-size="12" fill="#1e293b">Golden Agri Mills, Plot 44, Guntur, AP</text>

    <!-- Missing Country of origin -->
    <text x="70" y="365" font-size="12" font-weight="bold" fill="#dc2626">[MISSING DECLARATION: Country of Origin not printed]</text>

    <text x="70" y="395" font-size="12" font-weight="bold" fill="#334155">Date of Packing: <tspan font-weight="normal" fill="#1e293b">06/2026</tspan></text>
    <text x="320" y="395" font-size="12" font-weight="bold" fill="#334155">Batch: <tspan font-weight="normal" fill="#1e293b">GH-SM-5K-0626</tspan></text>

    <text x="70" y="425" font-size="12" font-weight="bold" fill="#0284c7">fssai Lic. No: <tspan font-weight="normal" fill="#1e293b">10119022000889</tspan></text>

    <!-- Missing Customer care telephone number -->
    <text x="70" y="455" font-size="12" font-weight="bold" fill="#dc2626">Customer Care: <tspan font-weight="normal" fill="#1e293b">contact@goldenagri.com (Helpline number omitted)</tspan></text>

    <rect x="50" y="640" width="500" height="110" rx="8" fill="#fef2f2" stroke="#f87171" stroke-dasharray="4 4"/>
    <text x="300" y="680" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">COMPLIANCE NOTICE</text>
    <text x="300" y="710" font-size="11" fill="#7f1d1d" text-anchor="middle">Rule 6(1)(n) of Legal Metrology Rules requires mandatory declaration of Country of Origin.</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Reference inspection record INSP-2026-1012 (FreshFarm Mixed Fruit Juice 1 L)
export const REFERENCE_INSPECTION: InspectionRecord = {
  id: 'INSP-2026-1012',
  productName: 'FreshFarm Mixed Fruit Juice 1 L',
  brandName: 'FreshFarm',
  category: 'Packaged Food & Beverages',
  imageUrl: generateJuiceLabelSvg(),
  createdAt: '2026-08-23T12:23:00.000Z',
  completedAt: '2026-08-23T12:25:24.000Z',
  ocrConfidence: 95,
  overallConfidence: 93,
  aiAssessedStatus: 'POTENTIALLY_COMPLIANT',
  finalStatus: 'POTENTIALLY_COMPLIANT',
  isFinalized: true,
  processingTimeSeconds: 2.4,
  qualityMetrics: {
    resolutionScore: 94,
    resolutionStatus: 'Good',
    blurScore: 92,
    blurStatus: 'Sharp',
    lightingScore: 90,
    lightingStatus: 'Optimal',
    perspectiveScore: 88,
    perspectiveStatus: 'Aligned',
    textVisibilityScore: 95,
    textVisibilityStatus: 'Good',
    overallStatus: 'Suitable for OCR'
  },
  extractedFields: [
    {
      id: 'productName',
      name: 'Product / Commodity Name',
      category: 'identity',
      extractedValue: 'FRESHFARM MIXED FRUIT JUICE',
      correctedValue: null,
      confidence: 95,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 8, y: 19, width: 84, height: 7, label: 'Product Name' },
      mandatoryRuleId: 'R-LM-007'
    },
    {
      id: 'manufacturer',
      name: 'Manufacturer / Packer Details',
      category: 'manufacturer',
      extractedValue: 'FreshFarm Foods Ltd., Food Park, Mysuru, Karnataka - 570010',
      correctedValue: null,
      confidence: 91,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 11, y: 61, width: 78, height: 6, label: 'Packer / Manufacturer' },
      mandatoryRuleId: 'R-LM-003'
    },
    {
      id: 'netQuantity',
      name: 'Net Quantity',
      category: 'quantity',
      extractedValue: '1 L',
      correctedValue: null,
      confidence: 95,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 70, y: 28, width: 20, height: 6, label: 'Net Quantity' },
      mandatoryRuleId: 'R-LM-002'
    },
    {
      id: 'mrp',
      name: 'Maximum Retail Price (MRP)',
      category: 'pricing',
      extractedValue: 'Rs. 130.00',
      correctedValue: null,
      confidence: 96,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 8, y: 86, width: 50, height: 9.5, label: 'MRP (Incl. taxes)' },
      mandatoryRuleId: 'R-LM-001'
    },
    {
      id: 'dateOfPacking',
      name: 'Date of Manufacture / Packing',
      category: 'dates',
      extractedValue: '08/2026',
      correctedValue: null,
      confidence: 93,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 11, y: 70, width: 38, height: 3.5, label: 'Date of Packing' },
      mandatoryRuleId: 'R-LM-005'
    },
    {
      id: 'bestBefore',
      name: 'Best Before / Expiry',
      category: 'dates',
      extractedValue: '6 Months from Manufacture',
      correctedValue: null,
      confidence: 92,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 53, y: 70, width: 38, height: 3.5, label: 'Best Before' },
      mandatoryRuleId: 'R-FD-002'
    },
    {
      id: 'countryOfOrigin',
      name: 'Country of Origin',
      category: 'origin',
      extractedValue: 'India',
      correctedValue: null,
      confidence: 95,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 11, y: 66.5, width: 38, height: 3.5, label: 'Country of Origin' },
      mandatoryRuleId: 'R-LM-004'
    },
    {
      id: 'consumerCare',
      name: 'Consumer Care Details',
      category: 'consumer',
      extractedValue: 'support@freshfarm.in | 1800-121-3344',
      correctedValue: null,
      confidence: 90,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 11, y: 76, width: 78, height: 5, label: 'Consumer Redressal' },
      mandatoryRuleId: 'R-LM-006'
    },
    {
      id: 'fssaiLicense',
      name: 'FSSAI License Number',
      category: 'compliance',
      extractedValue: '10013061000112',
      correctedValue: null,
      confidence: 94,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 11, y: 73, width: 78, height: 3, label: 'FSSAI Lic No' },
      mandatoryRuleId: 'R-FD-001'
    },
    {
      id: 'batchNumber',
      name: 'Batch / Lot Number',
      category: 'identity',
      extractedValue: 'FF1L-0826',
      correctedValue: null,
      confidence: 92,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 53, y: 66.5, width: 38, height: 3.5, label: 'Batch No' },
      mandatoryRuleId: 'R-LM-008'
    },
    {
      id: 'unitSalePrice',
      name: 'Unit Sale Price',
      category: 'pricing',
      extractedValue: 'Not detected',
      correctedValue: '₹0.13 / ml',
      confidence: 45,
      isVerified: false,
      isRejected: false,
      mandatoryRuleId: 'R-LM-009',
      fieldNotes: 'Calculated baseline unit price Rs. 0.13 per ml from MRP and 1000ml Net Volume.'
    },
    {
      id: 'vegNonVeg',
      name: 'Veg / Non-Veg Symbol',
      category: 'compliance',
      extractedValue: 'Green circular emblem detected (Low feature confidence)',
      correctedValue: 'Vegetarian (Green Circle)',
      confidence: 68,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 28, width: 25, height: 5.5, label: 'Veg Symbol' },
      mandatoryRuleId: 'R-FD-003'
    }
  ],
  ruleResults: [
    {
      ruleId: 'R-LM-001',
      ruleName: 'MRP Declaration',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: 'Rs. 130.00 (Incl. of all taxes)',
      explanation: 'Maximum Retail Price is prominently printed with mandatory inclusive of taxes declaration.'
    },
    {
      ruleId: 'R-LM-002',
      ruleName: 'Net Quantity Declaration',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '1 L',
      explanation: 'Net quantity declared in standard metric volume (1 Litre) adhering to font height norms.'
    },
    {
      ruleId: 'R-LM-003',
      ruleName: 'Manufacturer / Packer Name & Address',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: 'FreshFarm Foods Ltd., Food Park, Mysuru, Karnataka - 570010',
      explanation: 'Complete legal entity name and postal address with PIN code verified.'
    },
    {
      ruleId: 'R-LM-004',
      ruleName: 'Country of Origin',
      severity: 'major',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: 'India',
      explanation: 'Country of Origin explicitly stated on statutory display panel.'
    },
    {
      ruleId: 'R-LM-005',
      ruleName: 'Date of Manufacture / Packing',
      severity: 'major',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '08/2026',
      explanation: 'Month and year of pre-packing declared in compliant MM/YYYY format.'
    },
    {
      ruleId: 'R-LM-006',
      ruleName: 'Consumer Care Details',
      severity: 'major',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: 'support@freshfarm.in | 1800-121-3344',
      explanation: 'Helpline telephone number and support email address both provided.'
    },
    {
      ruleId: 'R-LM-007',
      ruleName: 'Common / Generic Name of Commodity',
      severity: 'major',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: 'MIXED FRUIT JUICE',
      explanation: 'Generic trade name of commodity clearly identified on principal display panel.'
    },
    {
      ruleId: 'R-LM-008',
      ruleName: 'Batch / Lot Number',
      severity: 'minor',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: 'FF1L-0826',
      explanation: 'Batch identification code present.'
    },
    {
      ruleId: 'R-LM-009',
      ruleName: 'Unit Sale Price',
      severity: 'minor',
      status: 'NEEDS_REVIEW',
      evidenceFound: 'None detected on front panel',
      explanation: 'Unit Sale Price was not automatically detected. Visual verification required.'
    },
    {
      ruleId: 'R-FD-001',
      ruleName: 'FSSAI License Number',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '10013061000112',
      explanation: '14-digit FSSAI license number is present and checksum validated.'
    },
    {
      ruleId: 'R-FD-002',
      ruleName: 'Best Before / Expiry Declaration',
      severity: 'major',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '6 Months from Manufacture',
      explanation: 'Best before duration clearly declared.'
    },
    {
      ruleId: 'R-FD-003',
      ruleName: 'Veg / Non-Veg Symbol',
      severity: 'major',
      status: 'NEEDS_REVIEW',
      evidenceFound: 'Graphic emblem detected',
      explanation: 'Veg / Non-Veg symbol was not automatically detected with high certainty. Visual verification required.'
    }
  ],
  inspectorDecision: {
    finalStatus: 'POTENTIALLY_COMPLIANT',
    decisionDate: '2026-08-23T12:25:00.000Z',
    inspectorName: 'Anita Verma',
    inspectorId: 'LM-INSP-KA-884',
    inspectorDesignation: 'Senior Legal Metrology Inspector',
    zonalOffice: 'Zonal Directorate of Legal Metrology, Mysuru Zone, Karnataka',
    remarks: 'Visual verification confirmed Veg green logo on top left panel and verified packaging declarations match batch register FF1L-0826.',
    controllingAuthorityName: 'Dr. Ramesh Sundaram, IAS',
    controllingAuthorityDesignation: 'Controller of Legal Metrology, State of Karnataka'
  }
};

// Second Demo Scenario: NutriBake Biscuits (NEEDS REVIEW)
export const BISCUITS_INSPECTION: InspectionRecord = {
  id: 'INSP-2026-1015',
  productName: 'NutriBake Choco-Chip Crunch Biscuits 200 g',
  brandName: 'NutriBake',
  category: 'Packaged Food & Beverages',
  imageUrl: generateBiscuitsLabelSvg(),
  createdAt: '2026-08-24T09:15:00.000Z',
  completedAt: '2026-08-24T09:17:10.000Z',
  ocrConfidence: 88,
  overallConfidence: 84,
  aiAssessedStatus: 'NEEDS_REVIEW',
  finalStatus: 'NEEDS_REVIEW',
  isFinalized: true,
  processingTimeSeconds: 2.1,
  qualityMetrics: {
    resolutionScore: 88,
    resolutionStatus: 'Good',
    blurScore: 84,
    blurStatus: 'Sharp',
    lightingScore: 82,
    lightingStatus: 'Acceptable',
    perspectiveScore: 85,
    perspectiveStatus: 'Aligned',
    textVisibilityScore: 87,
    textVisibilityStatus: 'Good',
    overallStatus: 'Suitable for OCR'
  },
  extractedFields: [
    {
      id: 'productName',
      name: 'Product / Commodity Name',
      category: 'identity',
      extractedValue: 'NutriBake Choco-Chip Crunch Biscuits',
      correctedValue: null,
      confidence: 94,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 10, width: 80, height: 6, label: 'Product Name' },
      mandatoryRuleId: 'R-LM-007'
    },
    {
      id: 'manufacturer',
      name: 'Manufacturer / Packer Details',
      category: 'manufacturer',
      extractedValue: 'NutriBake Confectioneries Pvt Ltd, MIDC Area, Pune, Maharashtra - 411019',
      correctedValue: null,
      confidence: 91,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 44, width: 80, height: 5, label: 'Manufacturer' },
      mandatoryRuleId: 'R-LM-003'
    },
    {
      id: 'netQuantity',
      name: 'Net Quantity',
      category: 'quantity',
      extractedValue: '200 g',
      correctedValue: null,
      confidence: 92,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 20, y: 20, width: 25, height: 5, label: 'Net Weight' },
      mandatoryRuleId: 'R-LM-002'
    },
    {
      id: 'mrp',
      name: 'Maximum Retail Price (MRP)',
      category: 'pricing',
      extractedValue: '₹45.00',
      correctedValue: null,
      confidence: 93,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 68, y: 20, width: 25, height: 5, label: 'MRP' },
      mandatoryRuleId: 'R-LM-001'
    },
    {
      id: 'dateOfPacking',
      name: 'Date of Manufacture / Packing',
      category: 'dates',
      extractedValue: '12/07/2026',
      correctedValue: null,
      confidence: 90,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 52, width: 38, height: 4, label: 'Mfg Date' },
      mandatoryRuleId: 'R-LM-005'
    },
    {
      id: 'bestBefore',
      name: 'Best Before / Expiry',
      category: 'dates',
      extractedValue: '9 Months from Pkg',
      correctedValue: null,
      confidence: 89,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 52, y: 52, width: 38, height: 4, label: 'Best Before' },
      mandatoryRuleId: 'R-FD-002'
    },
    {
      id: 'countryOfOrigin',
      name: 'Country of Origin',
      category: 'origin',
      extractedValue: 'India',
      correctedValue: null,
      confidence: 93,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 48, width: 38, height: 4, label: 'Country' },
      mandatoryRuleId: 'R-LM-004'
    },
    {
      id: 'consumerCare',
      name: 'Consumer Care Details',
      category: 'consumer',
      extractedValue: 'care[at]nutribake | Tel: 020-25667890',
      correctedValue: 'care@nutribake.in | Tel: 020-25667890',
      confidence: 65,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 60, width: 80, height: 5, label: 'Consumer Care' },
      mandatoryRuleId: 'R-LM-006',
      fieldNotes: 'Inspector verified valid email format from registered product dossier.'
    },
    {
      id: 'fssaiLicense',
      name: 'FSSAI License Number',
      category: 'compliance',
      extractedValue: '11518019000456',
      correctedValue: null,
      confidence: 93,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 56, width: 80, height: 4, label: 'FSSAI Lic' },
      mandatoryRuleId: 'R-FD-001'
    },
    {
      id: 'unitSalePrice',
      name: 'Unit Sale Price',
      category: 'pricing',
      extractedValue: 'Not declared on package',
      correctedValue: '₹0.225 / g',
      confidence: 30,
      isVerified: false,
      isRejected: false,
      mandatoryRuleId: 'R-LM-009'
    }
  ],
  ruleResults: [
    {
      ruleId: 'R-LM-001',
      ruleName: 'MRP Declaration',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '₹45.00',
      explanation: 'MRP is clearly declared.'
    },
    {
      ruleId: 'R-LM-002',
      ruleName: 'Net Quantity Declaration',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '200 g',
      explanation: 'Net quantity conforms to standard grammage.'
    },
    {
      ruleId: 'R-LM-003',
      ruleName: 'Manufacturer / Packer Name & Address',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: 'NutriBake Confectioneries Pvt Ltd, Pune - 411019',
      explanation: 'Packer details verified.'
    },
    {
      ruleId: 'R-LM-006',
      ruleName: 'Consumer Care Details',
      severity: 'major',
      status: 'NEEDS_REVIEW',
      evidenceFound: 'care[at]nutribake (Incomplete Domain)',
      explanation: 'Email address text contains optical irregularity and lacks top-level domain extension.'
    },
    {
      ruleId: 'R-LM-009',
      ruleName: 'Unit Sale Price',
      severity: 'minor',
      status: 'NEEDS_REVIEW',
      evidenceFound: 'Missing Unit Sale Price',
      explanation: 'Under LM Rule 6(11), packages > 100g require Unit Sale Price declaration (₹/g).'
    },
    {
      ruleId: 'R-FD-001',
      ruleName: 'FSSAI License Number',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '11518019000456',
      explanation: 'FSSAI license number is active and valid.'
    }
  ],
  inspectorDecision: {
    finalStatus: 'NEEDS_REVIEW',
    decisionDate: '2026-08-24T09:17:00.000Z',
    inspectorName: 'Rajiv Malhotra',
    inspectorId: 'LM-INSP-MH-412',
    inspectorDesignation: 'Legal Metrology Officer',
    zonalOffice: 'Pune Zonal Office, Maharashtra',
    remarks: 'Notice issued to manufacturer regarding absence of explicit Unit Sale Price stamp on 200g commercial batch packaging.'
  }
};

// Third Demo Scenario: Golden Harvest Rice (POTENTIAL NON-COMPLIANCE)
export const RICE_INSPECTION: InspectionRecord = {
  id: 'INSP-2026-1018',
  productName: 'Golden Harvest Sona Masoori Rice 5 kg',
  brandName: 'Golden Harvest',
  category: 'Packaged Food & Beverages',
  imageUrl: generateRiceLabelSvg(),
  createdAt: '2026-08-24T10:40:00.000Z',
  completedAt: '2026-08-24T10:42:15.000Z',
  ocrConfidence: 82,
  overallConfidence: 74,
  aiAssessedStatus: 'POTENTIAL_NON_COMPLIANCE',
  finalStatus: 'POTENTIAL_NON_COMPLIANCE',
  isFinalized: true,
  processingTimeSeconds: 2.3,
  qualityMetrics: {
    resolutionScore: 84,
    resolutionStatus: 'Good',
    blurScore: 80,
    blurStatus: 'Sharp',
    lightingScore: 78,
    lightingStatus: 'Acceptable',
    perspectiveScore: 81,
    perspectiveStatus: 'Aligned',
    textVisibilityScore: 83,
    textVisibilityStatus: 'Good',
    overallStatus: 'Suitable for OCR'
  },
  extractedFields: [
    {
      id: 'productName',
      name: 'Product / Commodity Name',
      category: 'identity',
      extractedValue: 'PREMIUM AGED SONA MASOORI RICE',
      correctedValue: null,
      confidence: 92,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 10, width: 80, height: 5, label: 'Product Name' },
      mandatoryRuleId: 'R-LM-007'
    },
    {
      id: 'manufacturer',
      name: 'Manufacturer / Packer Details',
      category: 'manufacturer',
      extractedValue: 'Golden Agri Mills, Plot 44, Guntur, AP',
      correctedValue: null,
      confidence: 88,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 10, y: 39, width: 80, height: 4, label: 'Packer Details' },
      mandatoryRuleId: 'R-LM-003'
    },
    {
      id: 'netQuantity',
      name: 'Net Quantity',
      category: 'quantity',
      extractedValue: '5 kg',
      correctedValue: null,
      confidence: 94,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 15, y: 22, width: 30, height: 5, label: 'Net Weight' },
      mandatoryRuleId: 'R-LM-002'
    },
    {
      id: 'mrp',
      name: 'Maximum Retail Price (MRP)',
      category: 'pricing',
      extractedValue: '₹340.00',
      correctedValue: null,
      confidence: 93,
      isVerified: true,
      isRejected: false,
      boundingBox: { x: 55, y: 22, width: 30, height: 5, label: 'MRP' },
      mandatoryRuleId: 'R-LM-001'
    },
    {
      id: 'countryOfOrigin',
      name: 'Country of Origin',
      category: 'origin',
      extractedValue: '[MISSING / NOT PRINTED]',
      correctedValue: null,
      confidence: 0,
      isVerified: false,
      isRejected: true,
      mandatoryRuleId: 'R-LM-004',
      fieldNotes: 'Mandatory Country of Origin text is absent from package.'
    },
    {
      id: 'consumerCare',
      name: 'Consumer Care Details',
      category: 'consumer',
      extractedValue: 'contact@goldenagri.com (Helpline number omitted)',
      correctedValue: null,
      confidence: 50,
      isVerified: false,
      isRejected: false,
      boundingBox: { x: 10, y: 55, width: 80, height: 4, label: 'Consumer Email Only' },
      mandatoryRuleId: 'R-LM-006',
      fieldNotes: 'Violates Rule 6(1)(n) requiring direct phone/helpline contact.'
    }
  ],
  ruleResults: [
    {
      ruleId: 'R-LM-004',
      ruleName: 'Country of Origin',
      severity: 'critical',
      status: 'POTENTIAL_NON_COMPLIANCE',
      evidenceFound: 'Not detected anywhere on label',
      explanation: 'Country of Origin is a mandatory statutory declaration under Legal Metrology Rule 6(1)(n) and is completely missing.'
    },
    {
      ruleId: 'R-LM-006',
      ruleName: 'Consumer Care Details',
      severity: 'major',
      status: 'POTENTIAL_NON_COMPLIANCE',
      evidenceFound: 'Email only, no telephone number',
      explanation: 'Statutory mandate requires both telephone number / helpline and contact address.'
    },
    {
      ruleId: 'R-LM-001',
      ruleName: 'MRP Declaration',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '₹340.00',
      explanation: 'MRP stated on front panel.'
    },
    {
      ruleId: 'R-LM-002',
      ruleName: 'Net Quantity Declaration',
      severity: 'critical',
      status: 'POTENTIALLY_COMPLIANT',
      evidenceFound: '5 kg',
      explanation: 'Net quantity declared in kilograms.'
    }
  ],
  inspectorDecision: {
    finalStatus: 'POTENTIAL_NON_COMPLIANCE',
    decisionDate: '2026-08-24T10:42:00.000Z',
    inspectorName: 'Sunita Patil',
    inspectorId: 'LM-INSP-AP-108',
    inspectorDesignation: 'Assistant Controller of Legal Metrology',
    zonalOffice: 'Guntur Division, Andhra Pradesh',
    remarks: 'Inspection flagged critical statutory omission of Country of Origin declaration. Compoundable show-cause summons drafted.'
  }
};

// Historical seed list for analytics and history table
export const SEED_INSPECTIONS: InspectionRecord[] = [
  REFERENCE_INSPECTION,
  BISCUITS_INSPECTION,
  RICE_INSPECTION,
  {
    id: 'INSP-2026-1011',
    productName: 'Arogya Whole Wheat Atta 10 kg',
    brandName: 'Arogya',
    category: 'Packaged Food & Beverages',
    imageUrl: generateRiceLabelSvg(),
    createdAt: '2026-08-23T10:11:00.000Z',
    completedAt: '2026-08-23T10:13:30.000Z',
    ocrConfidence: 94,
    overallConfidence: 92,
    aiAssessedStatus: 'POTENTIALLY_COMPLIANT',
    finalStatus: 'POTENTIALLY_COMPLIANT',
    isFinalized: true,
    processingTimeSeconds: 2.2,
    qualityMetrics: {
      resolutionScore: 92,
      resolutionStatus: 'Good',
      blurScore: 90,
      blurStatus: 'Sharp',
      lightingScore: 88,
      lightingStatus: 'Optimal',
      perspectiveScore: 90,
      perspectiveStatus: 'Aligned',
      textVisibilityScore: 92,
      textVisibilityStatus: 'Good',
      overallStatus: 'Suitable for OCR'
    },
    extractedFields: REFERENCE_INSPECTION.extractedFields,
    ruleResults: REFERENCE_INSPECTION.ruleResults,
    inspectorDecision: {
      finalStatus: 'POTENTIALLY_COMPLIANT',
      decisionDate: '2026-08-23T10:13:00.000Z',
      inspectorName: 'Anita Verma',
      inspectorId: 'LM-INSP-KA-884',
      inspectorDesignation: 'Senior Legal Metrology Inspector',
      zonalOffice: 'Mysuru Zone, Karnataka',
      remarks: 'All mandatory declarations under Legal Metrology Rules, 2011 verified.'
    }
  },
  {
    id: 'INSP-2026-1010',
    productName: 'Neem & Turmeric Herbal Face Wash 150 ml',
    brandName: 'VedaHerb',
    category: 'Cosmetics & Personal Care',
    imageUrl: generateJuiceLabelSvg(),
    createdAt: '2026-08-23T08:45:00.000Z',
    completedAt: '2026-08-23T08:47:15.000Z',
    ocrConfidence: 91,
    overallConfidence: 89,
    aiAssessedStatus: 'POTENTIALLY_COMPLIANT',
    finalStatus: 'POTENTIALLY_COMPLIANT',
    isFinalized: true,
    processingTimeSeconds: 2.5,
    qualityMetrics: {
      resolutionScore: 90,
      resolutionStatus: 'Good',
      blurScore: 89,
      blurStatus: 'Sharp',
      lightingScore: 86,
      lightingStatus: 'Optimal',
      perspectiveScore: 87,
      perspectiveStatus: 'Aligned',
      textVisibilityScore: 90,
      textVisibilityStatus: 'Good',
      overallStatus: 'Suitable for OCR'
    },
    extractedFields: REFERENCE_INSPECTION.extractedFields,
    ruleResults: REFERENCE_INSPECTION.ruleResults,
    inspectorDecision: {
      finalStatus: 'POTENTIALLY_COMPLIANT',
      decisionDate: '2026-08-23T08:47:00.000Z',
      inspectorName: 'K. S. Narayanan',
      inspectorId: 'LM-INSP-TN-229',
      inspectorDesignation: 'Senior Inspector',
      zonalOffice: 'Chennai North, Tamil Nadu',
      remarks: 'Cosmetic Rules 2020 and Legal Metrology declarations satisfied.'
    }
  },
  {
    id: 'INSP-2026-1009',
    productName: 'UltraClean Floor Disinfectant Liquid 1 L',
    brandName: 'UltraClean',
    category: 'Household & Cleaning',
    imageUrl: generateJuiceLabelSvg(),
    createdAt: '2026-08-22T16:20:00.000Z',
    completedAt: '2026-08-22T16:22:45.000Z',
    ocrConfidence: 86,
    overallConfidence: 82,
    aiAssessedStatus: 'NEEDS_REVIEW',
    finalStatus: 'NEEDS_REVIEW',
    isFinalized: true,
    processingTimeSeconds: 2.7,
    qualityMetrics: {
      resolutionScore: 85,
      resolutionStatus: 'Good',
      blurScore: 82,
      blurStatus: 'Sharp',
      lightingScore: 80,
      lightingStatus: 'Acceptable',
      perspectiveScore: 83,
      perspectiveStatus: 'Aligned',
      textVisibilityScore: 85,
      textVisibilityStatus: 'Good',
      overallStatus: 'Suitable for OCR'
    },
    extractedFields: REFERENCE_INSPECTION.extractedFields,
    ruleResults: REFERENCE_INSPECTION.ruleResults,
    inspectorDecision: {
      finalStatus: 'NEEDS_REVIEW',
      decisionDate: '2026-08-22T16:22:00.000Z',
      inspectorName: 'Anita Verma',
      inspectorId: 'LM-INSP-KA-884',
      inspectorDesignation: 'Senior Legal Metrology Inspector',
      zonalOffice: 'Mysuru Zone, Karnataka',
      remarks: 'Manufacturing date printed with slight distortion on bottle curvature.'
    }
  },
  {
    id: 'INSP-2026-1008',
    productName: 'ShineStar LED Bulb 9W (Pack of 2)',
    brandName: 'ShineStar',
    category: 'Electronics & Appliances',
    imageUrl: generateBiscuitsLabelSvg(),
    createdAt: '2026-08-22T14:10:00.000Z',
    completedAt: '2026-08-22T14:12:30.000Z',
    ocrConfidence: 96,
    overallConfidence: 95,
    aiAssessedStatus: 'POTENTIALLY_COMPLIANT',
    finalStatus: 'POTENTIALLY_COMPLIANT',
    isFinalized: true,
    processingTimeSeconds: 1.9,
    qualityMetrics: {
      resolutionScore: 96,
      resolutionStatus: 'Good',
      blurScore: 95,
      blurStatus: 'Sharp',
      lightingScore: 94,
      lightingStatus: 'Optimal',
      perspectiveScore: 95,
      perspectiveStatus: 'Aligned',
      textVisibilityScore: 96,
      textVisibilityStatus: 'Good',
      overallStatus: 'Suitable for OCR'
    },
    extractedFields: REFERENCE_INSPECTION.extractedFields,
    ruleResults: REFERENCE_INSPECTION.ruleResults,
    inspectorDecision: {
      finalStatus: 'POTENTIALLY_COMPLIANT',
      decisionDate: '2026-08-22T14:12:00.000Z',
      inspectorName: 'Deepak Sharma',
      inspectorId: 'LM-INSP-DL-054',
      inspectorDesignation: 'Inspector of Legal Metrology',
      zonalOffice: 'Delhi Central, New Delhi',
      remarks: 'Package contains dual-count statement and BEE star rating.'
    }
  }
];

export const DEMO_PRESETS = [
  {
    title: 'Demo 1: FreshFarm Mixed Fruit Juice 1 L',
    scenarioId: 'demo-juice',
    expectedOutcome: 'POTENTIALLY COMPLIANT',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    description: 'Reference inspection (INSP-2026-1012). High OCR accuracy; R-LM-009 & R-FD-003 flagged for visual review.',
    record: REFERENCE_INSPECTION
  },
  {
    title: 'Demo 2: NutriBake Choco-Chip Biscuits 200 g',
    scenarioId: 'demo-biscuits',
    expectedOutcome: 'NEEDS REVIEW',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-300',
    description: 'Missing Unit Sale Price declaration on principal panel; optical noise in consumer care email.',
    record: BISCUITS_INSPECTION
  },
  {
    title: 'Demo 3: Golden Harvest Sona Masoori Rice 5 kg',
    scenarioId: 'demo-rice',
    expectedOutcome: 'POTENTIAL NON-COMPLIANCE',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-300',
    description: 'Statutory omission: Missing mandatory Country of Origin and contact telephone helpline.',
    record: RICE_INSPECTION
  }
];
