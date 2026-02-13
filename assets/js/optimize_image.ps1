
$imagePath = "c:\Users\LENOVO\Music\OneDrive\Pictures\profile\assets\images\technologybuilding.jpeg"
$outputPath = "c:\Users\LENOVO\Music\OneDrive\Pictures\profile\assets\images\technologybuilding_optimized.jpeg"

Add-Type -AssemblyName System.Drawing

try {
    $img = [System.Drawing.Image]::FromFile($imagePath)
    
    # Calculate new dimensions (max 800px)
    $maxSize = 800
    $newWidth = $img.Width
    $newHeight = $img.Height
    
    if ($img.Width -gt $maxSize -or $img.Height -gt $maxSize) {
        $ratio = $img.Width / $img.Height
        if ($ratio -gt 1) {
            $newWidth = $maxSize
            $newHeight = [int]($maxSize / $ratio)
        } else {
            $newHeight = $maxSize
            $newWidth = [int]($maxSize * $ratio)
        }
    }
    
    $newImg = new-object System.Drawing.Bitmap $newWidth, $newHeight
    $graph = [System.Drawing.Graphics]::FromImage($newImg)
    $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
    
    # Encoder params for quality
    $myEncoder = [System.Drawing.Imaging.Encoder]::Quality
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($myEncoder, 60) # Quality 60
    
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    
    $newImg.Save($outputPath, $jpegCodec, $encoderParams)
    
    $img.Dispose()
    $newImg.Dispose()
    $graph.Dispose()
    
    $originalSize = (Get-Item $imagePath).Length
    $newSize = (Get-Item $outputPath).Length
    
    Write-Host "Original size: $originalSize bytes"
    Write-Host "New size: $newSize bytes"
    
    Move-Item -Path $outputPath -Destination $imagePath -Force
    Write-Host "Image optimized and replaced."
} catch {
    Write-Host "Error: $_"
}
