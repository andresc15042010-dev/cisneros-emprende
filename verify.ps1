 = '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' 
 = @{ Authorization = 'Bearer ' + ; 'User-Agent' = 'Antigravity' } 
try {  = Invoke-RestMethod -Uri 'https://api.github.com/user' -Headers ; Write-Host 'USER:' .login } catch { Write-Host 'ERR:' .Exception.Message }
