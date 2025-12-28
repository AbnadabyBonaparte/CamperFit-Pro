# 🔧 Comandos Git - Execute no PowerShell

## 1. Verificar Status

```powershell
git status
```

## 2. Adicionar Todos os Arquivos

```powershell
git add .
```

## 3. Fazer Commit

```powershell
git commit -m "feat: Estrutura base completa do CamperFit Pro

- ✅ Estrutura de diretórios completa (client/, server/, shared/, drizzle/)
- ✅ Schemas do banco de dados (Drizzle ORM)
- ✅ Setup tRPC completo (servidor Express + tRPC)
- ✅ Routers tRPC (projects, components)
- ✅ Frontend React 19 + Vite configurado
- ✅ Páginas básicas (Dashboard, Editor, Reports, Marketplace)
- ✅ Autenticação JWT configurada
- ✅ Configurações TypeScript, package.json, README
- ✅ Documentação completa"
```

## 4. Verificar Branch Atual

```powershell
git branch
```

## 5. Se não tiver branch main, criar:

```powershell
git branch -M main
```

## 6. Verificar Remote (se já existir)

```powershell
git remote -v
```

## 7. Se NÃO tiver remote, adicione seu repositório:

```powershell
# Substitua SEU_USUARIO e SEU_REPO pelos seus dados
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
```

## 8. Push para o Repositório

```powershell
# Primeira vez (se for o primeiro push)
git push -u origin main

# Ou se já tiver feito push antes
git push
```

---

## 📋 Comandos Completos em Sequência

Execute estes comandos na ordem:

```powershell
# 1. Status
git status

# 2. Adicionar arquivos
git add .

# 3. Commit
git commit -m "feat: Estrutura base completa do CamperFit Pro - Backend tRPC + Frontend React configurados"

# 4. Verificar branch
git branch

# 5. Se necessário, criar/renomear branch para main
git branch -M main

# 6. Verificar remote
git remote -v

# 7. Se não tiver remote, adicionar (AJUSTE A URL)
git remote add origin https://github.com/SEU_USUARIO/camperfit-pro.git

# 8. Push
git push -u origin main
```

---

## ⚠️ IMPORTANTE

1. **Substitua `SEU_USUARIO` e `SEU_REPO`** pela URL do seu repositório
2. Se já tiver um remote configurado, pule o passo 7
3. Se der erro de autenticação, você precisará configurar suas credenciais do GitHub/GitLab

---

## 🔑 Se Precisar de Autenticação

### GitHub (Token Personal Access Token):

```powershell
# Configure o remote com token
git remote set-url origin https://SEU_TOKEN@github.com/SEU_USUARIO/camperfit-pro.git
```

### Ou use SSH:

```powershell
git remote set-url origin git@github.com:SEU_USUARIO/camperfit-pro.git
```

