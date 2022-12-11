xcopy /s node_modules .\dist\node_modules

copy package.json .\dist

copy package-lock.json .\dist

copy README.md .\dist

tsc