# 📦 Instalação e Execução - CamperFit Pro

## Pré-requisitos

- Node.js 22+ instalado
- MySQL 8.0+ ou TiDB rodando
- AWS S3 configurado (ou compatível) - Opcional para desenvolvimento

## Passo 1: Instalar Dependências

```bash
# Na raiz do projeto
npm install

# No servidor
cd server
npm install

# No cliente
cd ../client
npm install
```

## Passo 2: Configurar Banco de Dados

1. Crie um banco de dados MySQL:
```sql
CREATE DATABASE camperfit;
```

2. Configure as variáveis de ambiente do servidor:
```bash
cd server
cp .env.example .env
```

3. Edite `server/.env` com suas credenciais:
```env
DATABASE_URL="mysql://user:password@localhost:3306/camperfit"
JWT_SECRET="seu-secret-key-com-pelo-menos-32-caracteres"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"

# S3 (opcional para desenvolvimento)
S3_BUCKET="camperfit-pro"
S3_REGION="us-east-1"
AWS_ACCESS_KEY_ID="sua-key"
AWS_SECRET_ACCESS_KEY="seu-secret"
```

4. Gerar e aplicar migrações:
```bash
cd server
npm run db:generate
npm run db:migrate
```

## Passo 3: Configurar Cliente

1. Configure as variáveis de ambiente do cliente:
```bash
cd client
cp .env.example .env
```

2. Edite `client/.env`:
```env
VITE_API_URL="http://localhost:3001"
VITE_TRPC_URL="http://localhost:3001/api/trpc"
```

## Passo 4: Executar

### Opção 1: Executar tudo junto (raiz)
```bash
# Na raiz do projeto
npm run dev
```

### Opção 2: Executar separadamente

**Terminal 1 - Servidor:**
```bash
cd server
npm run dev
```

**Terminal 2 - Cliente:**
```bash
cd client
npm run dev
```

## Acessar

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **tRPC Endpoint:** http://localhost:3001/api/trpc
- **Health Check:** http://localhost:3001/health

## Troubleshooting

### Erro de conexão com banco
- Verifique se o MySQL está rodando
- Verifique as credenciais no `.env`
- Verifique se o banco `camperfit` foi criado

### Erro de porta em uso
- Mude a porta no `server/.env` (PORT)
- Mude a porta no `client/vite.config.ts`

### Erro de módulo não encontrado
- Execute `npm install` novamente
- Limpe node_modules e reinstale: `rm -rf node_modules package-lock.json && npm install`

### Erro de TypeScript
- Verifique se os tipos estão corretos
- Execute `npm run typecheck` para ver erros

## Próximos Passos

1. ✅ Instalar dependências
2. ✅ Configurar banco de dados
3. ✅ Rodar migrações
4. ✅ Iniciar servidor
5. ✅ Iniciar cliente
6. 🚀 Começar a desenvolver!

