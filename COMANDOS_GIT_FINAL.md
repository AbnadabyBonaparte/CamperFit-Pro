# 📝 Comandos Git - CamperFit Pro

## Execute estes comandos no PowerShell:

```powershell
# 1. Navegar para o diretório do projeto
cd "C:\Users\abnad\OneDrive\Área de Trabalho\CamperFit-Pro\CamperFit-Pro"

# 2. Verificar status (o que foi modificado)
git status

# 3. Adicionar TODOS os arquivos do projeto
git add .

# 4. Verificar o que será commitado
git status

# 5. Fazer commit
git commit -m "feat: Implementação completa de calculadoras, exportadores e marketplace router

- ✅ Implementadas 5 calculadoras (CG, Elétrica, Gás, Deflexão, Conformidade)
- ✅ Implementados exportadores (PDF, JSON funcionais; DXF, PNG placeholder)
- ✅ Implementado router de marketplace completo
- ✅ Todos os 5 routers tRPC completos (100%)
- ✅ Backend 95% completo e funcional
- ✅ Documentação atualizada"

# 6. Push para o repositório
git push origin main
```

## 📋 Arquivos que serão commitados:

### Novos arquivos:
- `server/calculators/*.ts` (5 calculadoras)
- `server/exporters/*.ts` (4 exportadores)
- `server/routers/calculations.ts`
- `server/routers/export.ts`
- `server/routers/marketplace.ts`
- Documentação atualizada

### Arquivos modificados:
- `server/routers/_app.ts` (integração dos novos routers)
- `server/package.json` (dependências)
- `shared/types.ts` (tipos adicionados)
- Vários arquivos de documentação

---

**Execute os comandos na ordem acima!** ✅
