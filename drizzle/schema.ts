import { mysqlTable, int, varchar, text, timestamp, float, json, boolean, mysqlEnum, index } from 'drizzle-orm/mysql-core';

// Tabela: users
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  openId: varchar('openId', { length: 64 }).notNull().unique(),
  name: text('name'),
  email: varchar('email', { length: 320 }),
  loginMethod: varchar('loginMethod', { length: 64 }),
  role: mysqlEnum('role', ['user', 'admin', 'professional', 'enterprise']).default('user'),
  plan: mysqlEnum('plan', ['starter', 'pro', 'enterprise']).default('starter'),
  subscriptionStatus: mysqlEnum('subscriptionStatus', ['active', 'paused', 'cancelled']).default('active'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
  lastSignedIn: timestamp('lastSignedIn').defaultNow(),
}, (table) => ({
  openIdIdx: index('openId_idx').on(table.openId),
}));

// Tabela: projects
export const projects = mysqlTable('projects', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: int('userId').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  vehicleType: mysqlEnum('vehicleType', ['sprinter', 'kombi', 'furgao', 'trailer', 'custom']).default('custom'),
  
  // Dimensões do veículo
  length: float('length'), // mm
  width: float('width'), // mm
  height: float('height'), // mm
  wheelbase: float('wheelbase'), // mm
  maxGVWR: float('maxGVWR'), // kg
  
  // Dados calculados
  totalWeight: float('totalWeight'), // kg
  cgX: float('cgX'), // mm
  cgY: float('cgY'), // mm
  cgZ: float('cgZ'), // mm
  cgHeight: float('cgHeight'), // mm
  weightDistributionFront: float('weightDistributionFront'), // %
  weightDistributionRear: float('weightDistributionRear'), // %
  deflection: float('deflection'), // mm
  fuelConsumption: float('fuelConsumption'), // km/l
  
  // Status
  status: mysqlEnum('status', ['draft', 'in_progress', 'completed', 'archived']).default('draft'),
  version: int('version').default(1),
  
  // Timestamps
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
}, (table) => ({
  userIdStatusIdx: index('userId_status_idx').on(table.userId, table.status),
  createdAtIdx: index('createdAt_idx').on(table.createdAt),
}));

// Tabela: component_library
export const componentLibrary = mysqlTable('component_library', {
  id: varchar('id', { length: 36 }).primaryKey(),
  category: mysqlEnum('category', ['furniture', 'utility', 'structural', 'electrical', 'gas']).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  
  // Dimensões padrão
  length: float('length'), // mm
  width: float('width'), // mm
  height: float('height'), // mm
  weight: float('weight'), // kg
  material: varchar('material', { length: 255 }),
  
  // Preço
  price: float('price'), // R$
  supplier: varchar('supplier', { length: 255 }),
  
  // Imagem
  imageUrl: varchar('imageUrl', { length: 512 }),
  
  // Propriedades específicas
  electricalPower: float('electricalPower'), // W
  electricalVoltage: int('electricalVoltage'), // V
  gasConsumption: float('gasConsumption'), // kg/day
  waterCapacity: float('waterCapacity'), // liters
  
  // Metadata
  isActive: boolean('isActive').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
}, (table) => ({
  categoryActiveIdx: index('category_active_idx').on(table.category, table.isActive),
}));

// Tabela: project_components
export const projectComponents = mysqlTable('project_components', {
  id: varchar('id', { length: 36 }).primaryKey(),
  projectId: varchar('projectId', { length: 36 }).notNull(),
  componentLibraryId: varchar('componentLibraryId', { length: 36 }),
  
  // Posição e orientação
  posX: float('posX'), // mm
  posY: float('posY'), // mm
  posZ: float('posZ'), // mm
  rotationX: float('rotationX'), // degrees
  rotationY: float('rotationY'), // degrees
  rotationZ: float('rotationZ'), // degrees
  
  // Dimensões
  length: float('length'), // mm
  width: float('width'), // mm
  height: float('height'), // mm
  
  // Propriedades
  weight: float('weight'), // kg
  material: varchar('material', { length: 255 }),
  color: varchar('color', { length: 7 }), // hex color
  
  // Dados específicos
  electricalPower: float('electricalPower'), // W
  electricalVoltage: int('electricalVoltage'), // V
  gasConsumption: float('gasConsumption'), // kg/day
  waterCapacity: float('waterCapacity'), // liters
  
  // Metadata
  customProperties: json('customProperties'),
  notes: text('notes'),
  
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
}, (table) => ({
  projectIdIdx: index('projectId_idx').on(table.projectId),
}));

// Tabela: calculations
export const calculations = mysqlTable('calculations', {
  id: varchar('id', { length: 36 }).primaryKey(),
  projectId: varchar('projectId', { length: 36 }).notNull(),
  type: mysqlEnum('type', ['centerOfGravity', 'electrical', 'gas', 'deflection', 'compliance']).notNull(),
  
  // Resultado (JSON)
  result: json('result').notNull(),
  
  // Status
  status: mysqlEnum('status', ['valid', 'warning', 'critical']).default('valid'),
  issues: json('issues'), // Array de problemas
  
  // Timestamps
  createdAt: timestamp('createdAt').defaultNow(),
}, (table) => ({
  projectIdTypeIdx: index('projectId_type_idx').on(table.projectId, table.type),
  createdAtIdx: index('createdAt_idx').on(table.createdAt),
}));

// Tabela: exports
export const exports = mysqlTable('exports', {
  id: varchar('id', { length: 36 }).primaryKey(),
  projectId: varchar('projectId', { length: 36 }).notNull(),
  userId: int('userId').notNull(),
  
  // Tipo de exportação
  format: mysqlEnum('format', ['pdf', 'png', 'dxf', 'json']).notNull(),
  
  // Arquivo
  fileKey: varchar('fileKey', { length: 512 }), // S3 key
  fileUrl: varchar('fileUrl', { length: 512 }), // S3 URL
  fileSize: int('fileSize'), // bytes
  
  // Metadata
  createdAt: timestamp('createdAt').defaultNow(),
}, (table) => ({
  projectIdFormatIdx: index('projectId_format_idx').on(table.projectId, table.format),
  createdAtIdx: index('createdAt_idx').on(table.createdAt),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ComponentLibrary = typeof componentLibrary.$inferSelect;
export type NewComponentLibrary = typeof componentLibrary.$inferInsert;
export type ProjectComponent = typeof projectComponents.$inferSelect;
export type NewProjectComponent = typeof projectComponents.$inferInsert;
export type Calculation = typeof calculations.$inferSelect;
export type NewCalculation = typeof calculations.$inferInsert;
export type Export = typeof exports.$inferSelect;
export type NewExport = typeof exports.$inferInsert;

