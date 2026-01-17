# Script to update all tRPC imports to oRPC imports

$files = @(
  "features\boarders\ui\edit-boarder-dialog.tsx",
  "features\boarders\ui\delete-boarder-dialog.tsx",
  "features\boarders\ui\assign-room-dialog.tsx",
  "features\boarders\ui\add-boarder-dialog.tsx",
  "features\payments\ui\payment-table.tsx",
  "features\payments\ui\payment-summary-card.tsx",
  "features\payments\ui\payment-list.tsx",
  "features\payments\ui\payment-history-chart.tsx",
  "features\payments\ui\mark-paid-dialog.tsx",
  "features\payments\ui\add-payment-dialog.tsx",
  "features\dashboard\ui\upcoming-payments.tsx",
  "features\dashboard\ui\stats-cards.tsx",
  "features\dashboard\ui\revenue-chart.tsx",
  "features\dashboard\ui\recent-activity.tsx",
  "features\dashboard\ui\occupancy-overview.tsx",
  "features\dashboard\ui\occupancy-chart.tsx",
  "features\rooms\ui\room-occupancy-chart.tsx",
  "features\auth\ui\register-form.tsx",
  "app\(dashboard)\landlord\utilities\page.tsx",
  "app\(dashboard)\landlord\rooms\[id]\page.tsx",
  "app\(dashboard)\landlord\rooms\page.tsx",
  "app\(dashboard)\landlord\payments\page.tsx",
  "app\(dashboard)\landlord\boarders\[id]\page.tsx",
  "app\(dashboard)\landlord\boarders\page.tsx",
  "app\(dashboard)\boarder\profile\page.tsx",
  "app\(dashboard)\boarder\page.tsx"
)

$baseDir = "C:\Users\Qwenzy\Desktop\BoardingHouseSystem\apps\web\src\"

foreach ($file in $files) {
  $filePath = Join-Path $baseDir $file
  if (Test-Path $filePath) {
    $content = Get-Content $filePath -Raw
    $content = $content -replace 'from ["'']@/lib/trpc-react["'']', 'from "@/lib/orpc-client"'
    $content = $content -replace '\bapi\.', 'orpc.'
    $content = $content -replace 'const utils = api\.useUtils\(\)', 'const queryClient = useQueryClient()'
    $content = $content -replace 'utils\.', 'queryClient.'
    $content = $content -replace 'invalidate\(\)', 'invalidateQueries\(\{ queryKey: \[[^"\]+\] \}\)'
    $content = $content -replace 'import \{ useQueryClient \} from "@tanstack/react-query"', ''
    $content = $content -replace 'import \{ orpc \} from "@/lib/orpc-client"', 'import { orpc } from "@/lib/orpc-client"`r`nimport { useQueryClient } from "@tanstack/react-query"'
    
    # Add useQueryClient import if it's not already present and uses invalidate
    if ($content -match 'invalidateQueries' -and $content -notmatch 'useQueryClient') {
      $content = $content -replace '(import \{ orpc \} from "@/lib/orpc-client")', '$1`r`nimport { useQueryClient } from "@tanstack/react-query"'
    }
    
    Set-Content $filePath $content -NoNewline
    Write-Host "Updated: $file"
  } else {
    Write-Host "File not found: $filePath"
  }
}

Write-Host "Done!"