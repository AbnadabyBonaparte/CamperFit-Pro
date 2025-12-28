import { z } from 'zod';

// User validators
export const userSchema = z.object({
  id: z.number().int(),
  openId: z.string().max(64),
  name: z.string().nullable(),
  email: z.string().email().max(320).nullable(),
  loginMethod: z.string().max(64).nullable(),
  role: z.enum(['user', 'admin', 'professional', 'enterprise']),
  plan: z.enum(['starter', 'pro', 'enterprise']),
  subscriptionStatus: z.enum(['active', 'paused', 'cancelled']),
});

// Project validators
export const projectDimensionsSchema = z.object({
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  wheelbase: z.number().positive(),
  maxGVWR: z.number().positive(),
});

export const createProjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  vehicleType: z.enum(['sprinter', 'kombi', 'furgao', 'trailer', 'custom']),
  dimensions: projectDimensionsSchema,
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'in_progress', 'completed', 'archived']).optional(),
});

// Component validators
export const componentPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

export const componentRotationSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

export const addComponentToProjectSchema = z.object({
  projectId: z.string().uuid(),
  componentLibraryId: z.string().uuid(),
  position: componentPositionSchema,
});

export const updateComponentInProjectSchema = z.object({
  projectId: z.string().uuid(),
  componentId: z.string().uuid(),
  data: z.object({
    position: componentPositionSchema.optional(),
    rotation: componentRotationSchema.optional(),
    weight: z.number().positive().optional(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  }),
});

