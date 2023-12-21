[CmdletBinding()]
param (
    # Define the path where the zip files are located
    $zipFolderPath=".\"
)

# Get all zip files starting with "invoices" and created on the current date
$zipFiles = Get-ChildItem -Path $zipFolderPath -Filter "invoices*.zip" | Where-Object { $_.CreationTime.Date -eq (Get-Date).Date }

foreach ($zipFile in $zipFiles) {

    # Extract the contents of the zip file
    Expand-Archive -Path $zipFile.FullName -DestinationPath $zipFolderPath -Force

    # Delete the original zip file
    Remove-Item -Path $zipFile.FullName -Force

    # Delete all files in the extraction folder
    Get-ChildItem -Path $zipFolderPath -File | Where-Object {
        $_.CreationTime.Date -eq (Get-Date).Date -and
        $_.Name -match 'invoice'-and
        $_.Length -lt 50KB
    } | Remove-Item -Force 

}
# List files and count for the current date
$files = Get-ChildItem -Path $zipFolderPath -File | Where-Object {
    $_.CreationTime.Date -eq (Get-Date).Date -and
    $_.Name -match 'invoice'
}

$fileCount = $files.Count

# Open a random file from the list
if ($fileCount -gt 0) {
    $randomFile = $files
    Write-Output "Number of invoices for the current date : $fileCount"
    Invoke-Item $randomFile.FullName
} else {
    Write-Output "No zip files found for the current date."
}