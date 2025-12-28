# 📝 Comandos Git - Adicionar Arquivos Faltantes

Os arquivos foram criados mas não estavam sendo rastreados pelo git. Execute estes comandos:

```powershell
# Adicionar calculadoras
git add server/calculators/

# Adicionar exportadores
git add server/exporters/

# Adicionar novos routers
git add server/routers/calculations.ts
git add server/routers/export.ts
git add server/routers/marketplace.ts
git add server/routers/_app.ts

# Adicionar arquivos modificados
git add server/package.json
git add shared/types.ts

# Verificar o que será commitado
git status

# Fazer commit
git commit -m "feat: Adicionar calculadoras, exportadores e routers implementados

- ✅ 5 calculadoras (CG, Elétrica, Gás, Deflexão, Conformidade)
- ✅ 4 exportadores (PDF, JSON, DXF, PNG)
- ✅ 3 routers novos (calculations, export, marketplace)
- ✅ Integração completa no app router
- ✅ Dependências e types atualizados"

# Push
git push origin main
```

Ou simplesmente:

```powershell
git add server/
git add shared/
git status
git commit -m "feat: Implementação completa do backend - calculadoras, exportadores e routers"
git push origin main
```

