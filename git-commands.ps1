# Script PowerShell para Commit e Push do CamperFit Pro
# Execute: .\git-commands.ps1

Write-Host "🚀 Iniciando processo de commit e push..." -ForegroundColor Cyan

# 1. Status
Write-Host "`n📊 Verificando status..." -ForegroundColor Yellow
git status --short

# 2. Adicionar arquivos
Write-Host "`n➕ Adicionando arquivos..." -ForegroundColor Yellow
git add .

# 3. Commit
Write-Host "`n💾 Fazendo commit..." -ForegroundColor Yellow
git commit -m "feat: Estrutura base completa do CamperFit Pro

- Estrutura de diretórios completa (client/, server/, shared/, drizzle/)
- Schemas do banco de dados (Drizzle ORM)
- Setup tRPC completo (servidor Express + tRPC)
- Routers tRPC (projects, components)
- Frontend React 19 + Vite configurado
- Páginas básicas (Dashboard, Editor, Reports, Marketplace)
- Autenticação JWT configurada
- Configurações TypeScript, package.json, README
- Documentação completa"

# 4. Verificar branch
Write-Host "`n🌿 Verificando branch..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "Branch atual: $currentBranch" -ForegroundColor Green

# 5. Criar/renomear para main se necessário
if ($currentBranch -ne "main") {
    Write-Host "`n🔄 Renomeando branch para main..." -ForegroundColor Yellow
    git branch -M main
}

# 6. Verificar remote
Write-Host "`n🔗 Verificando remote..." -ForegroundColor Yellow
$remotes = git remote -v
if ($remotes) {
    Write-Host "Remote configurado:" -ForegroundColor Green
    Write-Host $remotes
} else {
    Write-Host "⚠️  Nenhum remote configurado!" -ForegroundColor Red
    Write-Host "Execute manualmente: git remote add origin https://github.com/SEU_USUARIO/camperfit-pro.git" -ForegroundColor Yellow
    exit
}

# 7. Push
Write-Host "`n⬆️  Fazendo push..." -ForegroundColor Yellow
$pushResult = git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Push realizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Erro no push:" -ForegroundColor Red
    Write-Host $pushResult
    Write-Host "`n💡 Verifique se o remote está configurado corretamente e se você tem permissão." -ForegroundColor Yellow
}

Write-Host "`n✨ Concluído!" -ForegroundColor Cyan

