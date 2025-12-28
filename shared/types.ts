// Types compartilhados entre client e server

export type VehicleType = 'sprinter' | 'kombi' | 'furgao' | 'trailer' | 'custom';
export type ProjectStatus = 'draft' | 'in_progress' | 'completed' | 'archived';
export type ComponentCategory = 'furniture' | 'utility' | 'structural' | 'electrical' | 'gas';
export type UserRole = 'user' | 'admin' | 'professional' | 'enterprise';
export type UserPlan = 'starter' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';
export type CalculationType = 'centerOfGravity' | 'electrical' | 'gas' | 'deflection' | 'compliance';
export type CalculationStatus = 'valid' | 'warning' | 'critical';
export type ExportFormat = 'pdf' | 'png' | 'dxf' | 'json';

// Project Dimensions
export interface ProjectDimensions {
  length: number; // mm
  width: number; // mm
  height: number; // mm
  wheelbase: number; // mm
  maxGVWR: number; // kg
}

// Component Position & Rotation
export interface ComponentPosition {
  x: number; // mm
  y: number; // mm
  z: number; // mm
}

export interface ComponentRotation {
  x: number; // degrees
  y: number; // degrees
  z: number; // degrees
}

// Component Dimensions
export interface ComponentDimensions {
  length: number; // mm
  width: number; // mm
  height: number; // mm
}

// CG Result
export interface CGResult {
  cgX: number; // mm
  cgY: number; // mm
  cgZ: number; // mm
  totalWeight: number; // kg
  status: 'safe' | 'warning' | 'critical';
  weightDistributionFront: number; // %
  weightDistributionRear: number; // %
  tippingRisk: 'low' | 'normal' | 'high';
  issues: string[];
}

// Electrical Result
export interface ElectricalResult {
  totalLoad: number; // W
  totalCurrent: number; // A
  autonomyHours: number;
  autonomyDays: number;
  cableSection: number; // mm²
  voltageDrop: number; // %
  voltageDripStatus: 'ok' | 'warning';
  issues: string[];
}

// Gas Result
export interface GasResult {
  totalConsumption: number; // kg/day
  autonomy: number; // days
  safetyIssues: string[];
}

// Compliance Result
export interface ComplianceResult {
  contran: {
    status: 'compliant' | 'warning' | 'non_compliant';
    issues: string[];
  };
  nbr5410: {
    status: 'compliant' | 'warning' | 'non_compliant';
    issues: string[];
  };
  nbr15264: {
    status: 'compliant' | 'warning' | 'non_compliant';
    issues: string[];
  };
}

