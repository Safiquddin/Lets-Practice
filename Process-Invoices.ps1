[CmdletBinding()] # For to Call .\Process-Invoices.ps1 -path ".\Downloads"
param (
    #[Parameter(Mandatory=$true)]
    $path = ".\", $expath
)
# Call command pi to handle invoices from zip files in the specified location
function pi {
    [CmdletBinding()]
    param ( $path = ".\", $expath ) # Default path for processing invoices 
    # create a extracting invoices path if not provided
    $extractpath = if ($expath) { $expath } else { Join-Path -Path $path -ChildPath ("invoices_" + (Get-Date).ToString("dd-MM")) }
    # Create the extraction directory if it doesn't exist
    if (-not (Test-Path -Path $extractPath)) {
        New-Item -ItemType Directory -Path $extractPath | Out-Null
    }
    # Retrieve zip files created today from the specified path
    $zipFiles = Get-ChildItem -Path $path -Filter "invoices*.zip" | Where-Object { $_.CreationTime.Date -eq (Get-Date).Date }
    # remove each zip file after extract
    foreach ($zipFile in $zipFiles) {
        Expand-Archive -Path $zipFile.FullName -DestinationPath $extractPath -Force
        Remove-Item -Path $zipFile.FullName -Force
    }

    # Delete invoices in the extraction path less than 50KB
    Get-ChildItem -Path $extractPath -File -Filter '*.pdf'| Where-Object {
        $_.CreationTime.Date -eq (Get-Date).Date -and
        $_.Name -match 'invoice' -and
        $_.Length -lt 50KB
    } | Remove-Item -Force 
    # Copy PDF invoice files to the extracted path
    Get-ChildItem -Path $path -File -Filter '*.pdf' | Where-Object {
        $_.CreationTime.Date -eq (Get-Date).Date -or 
        $_.Name -match 'invoice'
    } | ForEach-Object { Move-Item -Path $_.FullName -Destination $extractPath -Force }
    # List and count invoice files for the current date
    $files = Get-ChildItem -Path $extractPath -File | Where-Object {
        $_.Name -match 'invoice' -or
        $_.CreationTime.Date -eq (Get-Date).Date
    }
    # Open invoices to calculate prices
    if ($files.Count -gt 0) {
        #$randomFile = $files | Get-Random
        Write-Output "Number of invoices for the current date: $($files.Count)"
        Invoke-Item $files.FullName
    } else {
        Write-Output "No invoices found for the current date."
    }
}
# Call the function with the specified path
pi -path $path
