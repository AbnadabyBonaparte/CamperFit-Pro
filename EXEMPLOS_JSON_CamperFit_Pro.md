# CamperFit Pro — Exemplos Práticos JSON e Casos de Uso

**Versão:** 1.0 | **Data:** 28 de Dezembro de 2025

---

## 1. EXEMPLO 1: Projeto Completo (Sprinter Van)

### 1.1 JSON Completo do Projeto

```json
{
  "project": {
    "id": "proj-001-sprinter-van",
    "userId": 42,
    "name": "Sprinter Van Completa - Viagem Brasil",
    "description": "Motorhome em Sprinter 313 com cama casal, cozinha e banheiro",
    "vehicleType": "sprinter",
    "dimensions": {
      "length": 5700,
      "width": 2550,
      "height": 2800,
      "wheelbase": 3665,
      "maxGVWR": 3500
    },
    "totalWeight": 2850,
    "cgX": 2100,
    "cgY": 1275,
    "cgZ": 1200,
    "cgHeight": 1200,
    "weightDistributionFront": 45,
    "weightDistributionRear": 55,
    "deflection": 3.2,
    "fuelConsumption": 7.5,
    "status": "completed",
    "version": 5,
    "createdAt": "2025-12-01T10:00:00Z",
    "updatedAt": "2025-12-28T14:30:00Z"
  },
  "components": [
    {
      "id": "comp-001",
      "projectId": "proj-001-sprinter-van",
      "componentLibraryId": "lib-bed-queen",
      "name": "Cama Casal (Queen)",
      "posX": 1500,
      "posY": 1200,
      "posZ": 600,
      "rotationX": 0,
      "rotationY": 0,
      "rotationZ": 0,
      "length": 1600,
      "width": 1400,
      "height": 400,
      "weight": 80,
      "material": "MDF + Espuma",
      "color": "#8B7355",
      "customProperties": {
        "storage_under": true,
        "storage_capacity_liters": 200
      }
    },
    {
      "id": "comp-002",
      "projectId": "proj-001-sprinter-van",
      "componentLibraryId": "lib-kitchen-compact",
      "name": "Cozinha Compacta",
      "posX": 3500,
      "posY": 800,
      "posZ": 900,
      "rotationX": 0,
      "rotationY": 0,
      "rotationZ": 0,
      "length": 1200,
      "width": 600,
      "height": 800,
      "weight": 120,
      "material": "Inox + MDF",
      "color": "#C0C0C0",
      "customProperties": {
        "stove_burners": 2,
        "sink_capacity_liters": 15,
        "fridge_capacity_liters": 60
      }
    },
    {
      "id": "comp-003",
      "projectId": "proj-001-sprinter-van",
      "componentLibraryId": "lib-bathroom-compact",
      "name": "Banheiro Compacto",
      "posX": 4800,
      "posY": 1200,
      "posZ": 900,
      "rotationX": 0,
      "rotationY": 0,
      "rotationZ": 0,
      "length": 800,
      "width": 700,
      "height": 2200,
      "weight": 150,
      "material": "Fibra + Inox",
      "color": "#FFFFFF",
      "customProperties": {
        "toilet_type": "cassette",
        "shower_type": "wet_room",
        "water_heater_liters": 20
      }
    },
    {
      "id": "comp-004",
      "projectId": "proj-001-sprinter-van",
      "componentLibraryId": "lib-battery-lifepo4",
      "name": "Bateria LiFePO4 200Ah",
      "posX": 500,
      "posY": 200,
      "posZ": 300,
      "rotationX": 0,
      "rotationY": 0,
      "rotationZ": 0,
      "length": 650,
      "width": 200,
      "height": 250,
      "weight": 65,
      "material": "Plástico + Lítio",
      "color": "#333333",
      "electricalVoltage": 12,
      "electricalPower": 2400,
      "customProperties": {
        "capacity_ah": 200,
        "chemistry": "LiFePO4",
        "bms": true
      }
    },
    {
      "id": "comp-005",
      "projectId": "proj-001-sprinter-van",
      "componentLibraryId": "lib-solar-panel-400w",
      "name": "Painel Solar 400W",
      "posX": 2500,
      "posY": 1200,
      "posZ": 2700,
      "rotationX": 20,
      "rotationY": 0,
      "rotationZ": 0,
      "length": 2200,
      "width": 1100,
      "height": 40,
      "weight": 25,
      "material": "Vidro + Alumínio",
      "color": "#1a1a1a",
      "electricalPower": 400,
      "electricalVoltage": 48,
      "customProperties": {
        "efficiency_percent": 22,
        "temp_coefficient": -0.35
      }
    },
    {
      "id": "comp-006",
      "projectId": "proj-001-sprinter-van",
      "componentLibraryId": "lib-water-tank-100l",
      "name": "Tanque de Água 100L",
      "posX": 1000,
      "posY": 2300,
      "posZ": 500,
      "rotationX": 0,
      "rotationY": 0,
      "rotationZ": 0,
      "length": 600,
      "width": 400,
      "height": 500,
      "weight": 100,
      "material": "Plástico HDPE",
      "color": "#4A90E2",
      "customProperties": {
        "capacity_liters": 100,
        "material_type": "HDPE",
        "potable": true
      }
    },
    {
      "id": "comp-007",
      "projectId": "proj-001-sprinter-van",
      "componentLibraryId": "lib-gas-cylinder-p20",
      "name": "Cilindro GLP P-20",
      "posX": 500,
      "posY": 2400,
      "posZ": 300,
      "rotationX": 0,
      "rotationY": 0,
      "rotationZ": 0,
      "length": 300,
      "width": 300,
      "height": 600,
      "weight": 40,
      "material": "Aço",
      "color": "#FF6B6B",
      "customProperties": {
        "type": "P-20",
        "capacity_kg": 20,
        "pressure_bar": 8.5
      }
    }
  ],
  "calculations": {
    "centerOfGravity": {
      "cgX": 2100,
      "cgY": 1275,
      "cgZ": 1200,
      "totalWeight": 2850,
      "status": "safe",
      "weightDistributionFront": 45,
      "weightDistributionRear": 55,
      "tippingRisk": "normal",
      "issues": []
    },
    "electrical": {
      "totalLoad": 3200,
      "totalCurrent": 266.67,
      "autonomyHours": 9.6,
      "autonomyDays": 0.4,
      "cableSection": 25,
      "voltageDrop": 1.8,
      "voltageDripStatus": "ok",
      "issues": []
    },
    "gas": {
      "totalConsumption": 2.5,
      "autonomy": 8,
      "safetyIssues": []
    },
    "compliance": {
      "contran": {
        "status": "compliant",
        "issues": []
      },
      "nbr5410": {
        "status": "compliant",
        "issues": []
      },
      "nbr15264": {
        "status": "compliant",
        "issues": []
      }
    }
  }
}
```

---

## 2. EXEMPLO 2: Projeto Simples (DIY Iniciante)

### 2.1 JSON Mínimo para Importação

```json
{
  "project": {
    "name": "Meu Primeiro Camper",
    "vehicleType": "custom",
    "dimensions": {
      "length": 4000,
      "width": 2200,
      "height": 2400,
      "wheelbase": 2500,
      "maxGVWR": 2000
    }
  },
  "components": [
    {
      "componentLibraryId": "lib-bed-single",
      "posX": 1000,
      "posY": 1000,
      "posZ": 400,
      "weight": 50
    },
    {
      "componentLibraryId": "lib-battery-12v-100ah",
      "posX": 500,
      "posY": 200,
      "posZ": 300,
      "weight": 30
    }
  ]
}
```

---

## 3. EXEMPLO 3: Componente Customizado

### 3.1 JSON de Componente Personalizado

```json
{
  "component": {
    "id": "comp-custom-001",
    "projectId": "proj-001-sprinter-van",
    "name": "Armário Customizado (Marcenaria Local)",
    "posX": 2000,
    "posY": 500,
    "posZ": 800,
    "rotationX": 0,
    "rotationY": 0,
    "rotationZ": 0,
    "length": 1000,
    "width": 400,
    "height": 1200,
    "weight": 60,
    "material": "Compensado Naval",
    "color": "#D2B48C",
    "customProperties": {
      "compartments": 4,
      "shelves": 3,
      "doors": 2,
      "hinges_type": "soft_close",
      "supplier": "Marcenaria Local - São Paulo",
      "unit_price_brl": 1200,
      "notes": "Fabricado sob medida, entrega em 15 dias"
    }
  }
}
```

---

## 4. EXEMPLO 4: Cálculos de Centro de Gravidade

### 4.1 Resultado de Cálculo de CG

```json
{
  "calculation": {
    "projectId": "proj-001-sprinter-van",
    "type": "centerOfGravity",
    "timestamp": "2025-12-28T14:30:00Z",
    "result": {
      "cgX": 2100,
      "cgY": 1275,
      "cgZ": 1200,
      "totalWeight": 2850,
      "status": "safe",
      "safeZone": {
        "min": 733,
        "max": 1466,
        "actual": 2100,
        "percentageOfWheelbase": 57.3
      },
      "weightDistribution": {
        "front": {
          "weight_kg": 1282.5,
          "percentage": 45
        },
        "rear": {
          "weight_kg": 1567.5,
          "percentage": 55
        }
      },
      "cgHeight": 1200,
      "maxSafeHeight": 1275,
      "tippingRisk": "normal",
      "recommendations": [
        "Distribuição traseira um pouco alta. Considere adicionar peso na frente se possível.",
        "CG height está dentro do normal. Risco de tombamento baixo."
      ],
      "issues": []
    }
  }
}
```

---

## 5. EXEMPLO 5: Cálculos Elétricos

### 5.1 Resultado de Cálculo Elétrico

```json
{
  "calculation": {
    "projectId": "proj-001-sprinter-van",
    "type": "electrical",
    "timestamp": "2025-12-28T14:30:00Z",
    "result": {
      "system": {
        "voltage": 12,
        "type": "DC"
      },
      "batteries": {
        "total_capacity_ah": 200,
        "total_capacity_kwh": 2.4,
        "chemistry": "LiFePO4",
        "quantity": 1
      },
      "solar": {
        "total_power_w": 400,
        "daily_generation_kwh": 1.6,
        "efficiency_percent": 22
      },
      "loads": [
        {
          "name": "Luzes LED (4x 10W)",
          "power_w": 40,
          "daily_usage_h": 8,
          "daily_consumption_kwh": 0.32
        },
        {
          "name": "Geladeira 12V",
          "power_w": 60,
          "daily_usage_h": 24,
          "daily_consumption_kwh": 1.44
        },
        {
          "name": "Ventilador",
          "power_w": 50,
          "daily_usage_h": 4,
          "daily_consumption_kwh": 0.2
        },
        {
          "name": "Carregador de Celular",
          "power_w": 30,
          "daily_usage_h": 2,
          "daily_consumption_kwh": 0.06
        }
      ],
      "total_load_w": 180,
      "total_daily_consumption_kwh": 2.02,
      "autonomy": {
        "hours": 13.3,
        "days": 0.55,
        "without_solar": "1 dia com carga completa"
      },
      "cables": [
        {
          "from": "Bateria",
          "to": "Barramento Positivo",
          "section_mm2": 25,
          "length_m": 1,
          "voltage_drop_v": 0.18,
          "voltage_drop_percent": 1.5
        },
        {
          "from": "Painel Solar",
          "to": "Controlador MPPT",
          "section_mm2": 10,
          "length_m": 5,
          "voltage_drop_v": 0.42,
          "voltage_drop_percent": 0.9
        }
      ],
      "breakers": [
        {
          "name": "Proteção Bateria",
          "amperage_a": 200,
          "type": "DC Breaker"
        },
        {
          "name": "Proteção Cargas",
          "amperage_a": 100,
          "type": "DC Breaker"
        }
      ],
      "recommendations": [
        "Autonomia de 13 horas é adequada para uso diário com recargas solares.",
        "Considere adicionar mais 200W de painel solar para melhor autonomia em dias nublados.",
        "Queda de tensão está dentro do normal (<3%)."
      ],
      "issues": []
    }
  }
}
```

---

## 6. EXEMPLO 6: Cálculos de Gás

### 6.1 Resultado de Cálculo de Gás

```json
{
  "calculation": {
    "projectId": "proj-001-sprinter-van",
    "type": "gas",
    "timestamp": "2025-12-28T14:30:00Z",
    "result": {
      "cylinders": [
        {
          "type": "P-20",
          "capacity_kg": 20,
          "quantity": 1,
          "pressure_bar": 8.5,
          "location": "Compartimento traseiro isolado"
        }
      ],
      "total_capacity_kg": 20,
      "appliances": [
        {
          "name": "Fogão (2 queimadores)",
          "consumption_kg_per_day": 0.5,
          "usage_hours_per_day": 2
        },
        {
          "name": "Aquecedor de Água",
          "consumption_kg_per_day": 0.8,
          "usage_hours_per_day": 1
        },
        {
          "name": "Aquecedor Ambiente",
          "consumption_kg_per_day": 1.2,
          "usage_hours_per_day": 4,
          "season": "winter"
        }
      ],
      "total_daily_consumption_kg": 2.5,
      "autonomy_days": 8,
      "safety": {
        "ventilation": {
          "required_m3_per_hour": 15,
          "openings": 2,
          "location": "Superior e inferior do compartimento"
        },
        "regulator": {
          "type": "Regulador de Pressão",
          "pressure_output_bar": 2.8,
          "safety_valve": true
        },
        "tubing": {
          "material": "Cobre sem costura",
          "diameter_mm": 8,
          "length_m": 8,
          "compliance": "NBR 15264"
        }
      },
      "compliance_checks": [
        {
          "requirement": "Cilindro em compartimento isolado",
          "status": "compliant"
        },
        {
          "requirement": "Ventilação permanente (2 aberturas)",
          "status": "compliant"
        },
        {
          "requirement": "Tubulação de cobre sem costura",
          "status": "compliant"
        },
        {
          "requirement": "Válvula de segurança",
          "status": "compliant"
        }
      ],
      "recommendations": [
        "Autonomia de 8 dias é boa para viagens curtas.",
        "Considere adicionar cilindro P-30 para viagens longas (autonomia 12 dias).",
        "Teste vazamentos mensalmente com água e sabão."
      ],
      "issues": []
    }
  }
}
```

---

## 7. EXEMPLO 7: Validação de Conformidade

### 7.1 Resultado de Conformidade

```json
{
  "calculation": {
    "projectId": "proj-001-sprinter-van",
    "type": "compliance",
    "timestamp": "2025-12-28T14:30:00Z",
    "result": {
      "contran_993_23": {
        "status": "compliant",
        "checks": [
          {
            "requirement": "Identificação VIN em componentes críticos",
            "status": "compliant",
            "notes": "VIN gravado no chassi e motor"
          },
          {
            "requirement": "Sistema de freios funcional",
            "status": "compliant",
            "notes": "Freios ABS original do fabricante"
          },
          {
            "requirement": "Suspensão adequada para carga",
            "status": "compliant",
            "notes": "Suspensão reforçada para 3500kg GVWR"
          }
        ]
      },
      "nbr_5410": {
        "status": "compliant",
        "checks": [
          {
            "requirement": "Dimensionamento de cabos",
            "status": "compliant",
            "details": "Seção 25mm² adequada para 266A"
          },
          {
            "requirement": "Queda de tensão máxima 3%",
            "status": "compliant",
            "actual_drop_percent": 1.8
          },
          {
            "requirement": "Proteção contra sobrecorrente",
            "status": "compliant",
            "details": "Disjuntores 200A e 100A instalados"
          },
          {
            "requirement": "Aterramento obrigatório",
            "status": "compliant",
            "details": "Barra de terra conectada ao chassi"
          }
        ]
      },
      "nbr_15264": {
        "status": "compliant",
        "checks": [
          {
            "requirement": "Cilindro em compartimento isolado",
            "status": "compliant"
          },
          {
            "requirement": "Ventilação permanente",
            "status": "compliant",
            "details": "2 aberturas (superior e inferior)"
          },
          {
            "requirement": "Tubulação de cobre",
            "status": "compliant"
          },
          {
            "requirement": "Válvula de segurança",
            "status": "compliant"
          }
        ]
      },
      "inmetro": {
        "status": "compliant",
        "notes": "Certificações de equipamentos críticos verificadas"
      },
      "overall_status": "READY_FOR_HOMOLOGATION",
      "next_steps": [
        "Agendar inspeção com órgão competente (INMETRO/CONTRAN)",
        "Preparar documentação técnica (cópias de cálculos, certificados)",
        "Realizar testes de vazamento de gás",
        "Obter laudo de conformidade"
      ]
    }
  }
}
```

---

## 8. EXEMPLO 8: Importação em Lote

### 8.1 JSON para Importação de Múltiplos Projetos

```json
{
  "import_batch": {
    "version": "1.0",
    "timestamp": "2025-12-28T14:30:00Z",
    "projects": [
      {
        "name": "Projeto 1: Sprinter Simples",
        "vehicleType": "sprinter",
        "dimensions": {
          "length": 5700,
          "width": 2550,
          "height": 2800,
          "wheelbase": 3665,
          "maxGVWR": 3500
        },
        "components": [
          {
            "componentLibraryId": "lib-bed-queen",
            "posX": 1500,
            "posY": 1200,
            "posZ": 600,
            "weight": 80
          }
        ]
      },
      {
        "name": "Projeto 2: Kombi Completa",
        "vehicleType": "kombi",
        "dimensions": {
          "length": 4800,
          "width": 2100,
          "height": 2500,
          "wheelbase": 2800,
          "maxGVWR": 2500
        },
        "components": [
          {
            "componentLibraryId": "lib-bed-single",
            "posX": 1000,
            "posY": 1000,
            "posZ": 400,
            "weight": 50
          }
        ]
      }
    ]
  }
}
```

---

## 9. CASOS DE USO REAIS

### 9.1 Caso de Uso 1: DIY Builder Validando Projeto

**Cenário:** João está construindo um camper em uma Sprinter e quer validar se seu layout está seguro.

**Fluxo:**
1. João cria novo projeto "Minha Sprinter"
2. Insere dimensões do veículo (5700 x 2550 x 2800mm)
3. Arrasta componentes: cama (80kg), cozinha (120kg), banheiro (150kg), bateria (65kg)
4. Sistema calcula automaticamente CG = (2100, 1275, 1200)
5. Sistema valida: "✓ Centro de gravidade seguro"
6. João exporta PDF com relatório completo
7. João compartilha link com amigos para feedback

**Resultado:** João tem confiança de que seu projeto é seguro antes de começar a construir.

---

### 9.2 Caso de Uso 2: Profissional Preparando Documentação para Homologação

**Cenário:** Maria é fabricante de motorhomes e precisa de documentação técnica para homologação CONTRAN.

**Fluxo:**
1. Maria cria projeto "Modelo XYZ - Lote 2025"
2. Insere todos os componentes com especificações técnicas
3. Sistema calcula CG, elétrica, gás e gera checklist de conformidade
4. Maria valida cada item do checklist
5. Sistema gera PDF com:
   - Desenhos técnicos
   - Cálculos de engenharia
   - Diagrama elétrico unifilar
   - Esquema de gás
   - Checklist de conformidade
6. Maria envia documentação para órgão competente

**Resultado:** Maria economiza 40 horas de trabalho manual e tem documentação profissional.

---

### 9.3 Caso de Uso 3: Otimização de Materiais com Nesting

**Cenário:** Pedro está cortando peças de compensado naval para seu camper e quer economizar material.

**Fluxo:**
1. Pedro carrega seu projeto no CamperFit Pro
2. Seleciona "Exportar DXF com Otimização"
3. Insere dimensões da chapa (2440 x 1220mm)
4. Sistema calcula layout otimizado de corte
5. Sistema mostra: "Economia: 28% de material (R$ 450)"
6. Pedro exporta arquivo DXF para CNC ou imprime guia de corte manual

**Resultado:** Pedro economiza R$ 450 em materiais e 3 horas de planejamento.

---

### 9.4 Caso de Uso 4: Marketplace de Componentes

**Cenário:** Ana está procurando uma geladeira 12V para seu camper.

**Fluxo:**
1. Ana abre marketplace do CamperFit Pro
2. Filtra: "Geladeira 12V, até 60L, preço máximo R$ 2000"
3. Sistema mostra 12 opções de fornecedores
4. Ana clica em "Adicionar ao Projeto"
5. Sistema atualiza automaticamente cálculos de autonomia
6. Ana vê que autonomia reduz de 13h para 9h
7. Ana decide adicionar mais painel solar
8. Ana finaliza compra direto pelo marketplace

**Resultado:** Ana encontra componente ideal e vê impacto em tempo real no projeto.

---

## 10. TEMPLATE DE IMPORTAÇÃO

### 10.1 Estrutura Mínima para Importação

```json
{
  "project": {
    "name": "string (obrigatório)",
    "vehicleType": "sprinter|kombi|furgao|trailer|custom (obrigatório)",
    "dimensions": {
      "length": "number (mm, obrigatório)",
      "width": "number (mm, obrigatório)",
      "height": "number (mm, obrigatório)",
      "wheelbase": "number (mm, obrigatório)",
      "maxGVWR": "number (kg, obrigatório)"
    },
    "description": "string (opcional)"
  },
  "components": [
    {
      "componentLibraryId": "string (obrigatório)",
      "posX": "number (mm, obrigatório)",
      "posY": "number (mm, obrigatório)",
      "posZ": "number (mm, obrigatório)",
      "weight": "number (kg, obrigatório)",
      "rotationX": "number (degrees, opcional)",
      "rotationY": "number (degrees, opcional)",
      "rotationZ": "number (degrees, opcional)",
      "color": "string (hex, opcional)"
    }
  ]
}
```

---

**Documento Finalizado:** 28 de Dezembro de 2025
**Próximo Passo:** Desenvolvimento de wireframes e protótipo navegável
