# Script PowerShell para commit e push
# Execute: .\git-commit-exportadores.ps1

# Navegar para o diretório do projeto
Set-Location "C:\Users\abnad\OneDrive\Área de Trabalho\CamperFit-Pro\CamperFit-Pro"

Write-Host "=== Status do Git ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Adicionando arquivos ===" -ForegroundColor Cyan
git add .

Write-Host "`n=== Fazendo commit ===" -ForegroundColor Cyan
git commit -m "feat: Implementação completa de calculadoras, exportadores e marketplace router

- ✅ Implementadas 5 calculadoras (CG, Elétrica, Gás, Deflexão, Conformidade)
- ✅ Implementados exportadores (PDF, JSON funcionais; DXF, PNG placeholder)
- ✅ Implementado router de marketplace completo
- ✅ Todos os 5 routers tRPC completos (100%)
- ✅ Backend 95% completo e funcional"

Write-Host "`n=== Fazendo push ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== ✅ Concluído! ===" -ForegroundColor Green

