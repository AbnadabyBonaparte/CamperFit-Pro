# 🔐 Setup Supabase - CamperFit Pro

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (se necessário)
3. Clique em "New Project"
4. Preencha:
   - **Name**: camperfit-pro
   - **Database Password**: (guarde esta senha!)
   - **Region**: South America (São Paulo) - recomendado para Brasil
5. Aguarde a criação do projeto (~2 minutos)

## 2. Obter Credenciais

1. No dashboard do Supabase, vá em **Settings** > **API**
2. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (chave pública)

## 3. Configurar Variáveis de Ambiente

Adicione ao arquivo `client/.env`:

```env
VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
VITE_SUPABASE_ANON_KEY="sua-chave-anon-aqui"
```

## 4. Configurar Autenticação

### Email/Password (já habilitado por padrão)

1. Vá em **Authentication** > **Providers**
2. Verifique que **Email** está habilitado
3. Configure conforme necessário:
   - Enable email confirmations: Opcional para MVP
   - Minimum password length: 6 (padrão)

### Google OAuth (opcional mas recomendado)

1. Vá em **Authentication** > **Providers**
2. Clique em **Google**
3. Habilite o provider
4. Adicione:
   - **Client ID**: (obtenha em [Google Cloud Console](https://console.cloud.google.com))
   - **Client Secret**: (obtenha no mesmo lugar)
5. Configure Redirect URL:
   - Adicione: `https://seu-projeto.supabase.co/auth/v1/callback`
   - E: `http://localhost:5173` (para desenvolvimento)

### Google Cloud Console Setup

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto (ou use existente)
3. Vá em **APIs & Services** > **Credentials**
4. Clique em **Create Credentials** > **OAuth client ID**
5. Tipo: **Web application**
6. Authorized redirect URIs:
   - `https://seu-projeto.supabase.co/auth/v1/callback`
   - `http://localhost:5173` (dev)
7. Copie **Client ID** e **Client Secret** para Supabase

## 5. Configurar Database Schema (Opcional)

Supabase usa PostgreSQL. Se você quiser usar Supabase como banco principal (ao invés de MySQL):

1. Vá em **SQL Editor**
2. Execute migrations do Drizzle adaptadas para PostgreSQL
3. Ou use o schema do Supabase diretamente

**Nota:** Para MVP, você pode manter MySQL e usar Supabase apenas para auth.

## 6. Testar Autenticação

1. Inicie o client: `cd client && npm run dev`
2. Acesse `http://localhost:5173/login`
3. Tente criar uma conta
4. Verifique no Supabase Dashboard > Authentication > Users

## 7. Configurar RLS (Row Level Security) - Futuro

Para produção, configure RLS no Supabase para proteger dados dos usuários.

---

**Status:** ✅ Setup básico completo!

