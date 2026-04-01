@echo off
echo Deleting redundant " - Copy" files and folders...

pushd "c:\Users\LENOVO\Music\OneDrive\Pictures\profile\assets"

:: Delete CSS copies
del /q "css\animate - Copy.css"
del /q "css\bootsnav - Copy.css"
del /q "css\bootstrap.min - Copy.css"
del /q "css\flaticon - Copy.css"
del /q "css\font-awesome.min - Copy.css"
del /q "css\owl.carousel.min - Copy.css"
del /q "css\owl.theme.default.min - Copy.css"
del /q "css\responsive - Copy.css"
del /q "css\style - Copy.css"

:: Delete JS copies
del /q "js\bootsnav - Copy.js"
del /q "js\bootstrap.min - Copy.js"
del /q "js\custom - Copy.js"
del /q "js\jquery - Copy.js"
del /q "js\jquery.appear - Copy.js"
del /q "js\jquery.sticky - Copy.js"
del /q "js\owl.carousel.min - Copy.js"
del /q "js\progressbar - Copy.js"

:: Delete Font copies
del /q "fonts\* - Copy.*"

:: Delete Miscellaneous
del /q "download\browney - Copy.txt"

popd

echo Cleanup complete!
pause
