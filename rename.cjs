const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/Daniel Kimeu/g, 'Jevance Ochieng')
    .replace(/daniel\.kimeu\.takataka/g, 'jevance.ochieng')
    .replace(/daniel-kimeu/g, 'jevance-ochieng')
    .replace(/danielkimeu/g, 'jevanceochieng')
    .replace(/Daniel_Kimeu/g, 'Jevance_Ochieng')
    .replace(/Daniel/g, 'Jevance')
    .replace(/daniel/g, 'jevance')
    .replace(/Kimeu/g, 'Ochieng')
    .replace(/kimeu/g, 'ochieng');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.md')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
replaceInFile(path.join(__dirname, 'index.html'));
