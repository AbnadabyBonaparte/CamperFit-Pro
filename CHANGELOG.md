# Changelog - CamperFit Pro

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.0] - 2025-12-28

### ✨ Adicionado

#### Estrutura Base
- Estrutura de diretórios completa (client/, server/, shared/, drizzle/, storage/)
- Configuração TypeScript para todo o projeto
- Configuração Vite para o frontend
- Configuração Drizzle ORM para o banco de dados

#### Backend (Server)
- Servidor Express configurado
- tRPC 11.x configurado com type-safety
- Autenticação JWT implementada
- Context do tRPC com suporte a usuários autenticados
- Gerenciamento de cookies para autenticação
- Helpers de banco de dados (db.ts)
- Helpers de storage S3 (storage.ts)
- Variáveis de ambiente configuradas (env.ts)

#### Routers tRPC
- **projects router**: CRUD completo de projetos
  - list: Listar projetos do usuário
  - get: Obter projeto específico
  - create: Criar novo projeto
  - update: Atualizar projeto
  - delete: Deletar projeto
  - duplicate: Duplicar projeto

- **components router**: Gerenciamento de componentes
  - list: Listar biblioteca de componentes
  - get: Obter componente específico
  - addToProject: Adicionar componente ao projeto
  - updateInProject: Atualizar componente no projeto
  - removeFromProject: Remover componente do projeto
  - listByProject: Listar componentes do projeto

#### Banco de Dados
- Schema completo com Drizzle ORM:
  - users: Tabela de usuários
  - projects: Tabela de projetos
  - project_components: Componentes dos projetos
  - component_library: Biblioteca de componentes
  - calculations: Cálculos realizados
  - exports: Exportações realizadas

#### Frontend (Client)
- React 19 configurado
- Vite como build tool
- TanStack Query para data fetching
- tRPC client configurado
- React Router para navegação
- Páginas base criadas:
  - Dashboard
  - Editor
  - Reports
  - Marketplace
  - NotFound (404)

#### Shared (Código Compartilhado)
- Types TypeScript compartilhados (types.ts)
- Constantes compartilhadas (const.ts)
- Validadores Zod (validators.ts)

#### Documentação
- README.md completo com instruções
- PROGRESSO_IMPLEMENTACAO.md com status do projeto
- INSTALACAO_E_EXECUCAO.md com guia de instalação
- COMANDOS_GIT.md com comandos git
- Script PowerShell para git (git-commands.ps1)

### 📦 Arquivos de Configuração
- package.json (raiz, client, server)
- tsconfig.json (raiz, client, server)
- vite.config.ts
- drizzle.config.ts
- .gitignore
- .env.example (client e server)

### 🔧 Tecnologias Utilizadas
- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Vite
- **Backend**: Node.js 22, Express 4, tRPC 11
- **Database**: MySQL 8.0+ / TiDB, Drizzle ORM
- **State Management**: Zustand (preparado), TanStack Query
- **3D Graphics**: Three.js (preparado)
- **Storage**: AWS S3
- **Auth**: JWT

### 📊 Estatísticas
- **Arquivos criados**: 41
- **Linhas de código**: 3028+
- **Progresso geral**: ~40%

### 🎯 Próximas Implementações Planejadas
- Routers tRPC: calculations, export, marketplace
- Calculadoras: CG, elétrica, gás, deflexão, compliance
- Exportadores: PDF, DXF, PNG, JSON
- Componentes React: Canvas 3D, PropertyPanel, Calculators
- Autenticação completa (login/registro)
- Stores Zustand
- Hooks TanStack Query

---

## Formato

Este changelog segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

