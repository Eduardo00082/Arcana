#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function readPackageVersion() {
  const pkgPath = path.join(process.cwd(), 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  return pkg.version
}

function isBinaryFile(filePath) {
  const textExt = ['.js', '.ts', '.jsx', '.tsx', '.json', '.md', '.html', '.css', '.scss']
  return !textExt.includes(path.extname(filePath))
}

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.next'].includes(e.name)) continue
      walk(full, cb)
    } else {
      cb(full)
    }
  }
}

function syncVersion(version) {
  const replacedFiles = []

  walk(process.cwd(), (file) => {
    // skip package.json itself
    if (file.endsWith('package.json')) return
    if (file.includes(path.join(process.cwd(), 'node_modules'))) return
    if (isBinaryFile(file)) return

    let content
    try {
      content = fs.readFileSync(file, 'utf8')
    } catch (e) {
      return
    }

    // Only consider files that mention "Versão" or "Versao"
    if (!/Versã|Versao/i.test(content)) return

    // Replace patterns like "Versão: 0.1.2-beta", "Versão 0.1.2-beta" and similar
    let newContent = content.replace(/(Vers(?:ã|a)o\s*[:\-]?\s*)\d+\.\d+\.\d+(?:[-+][\w.]+)?/gi, `$1${version}`)
    
    // Also replace patterns like "0.1 Beta" with version format (e.g., "0.0.1 Beta")
    const [major, minor, patch] = version.split('.')
    const betaVersion = `${major}.${minor} Beta`
    newContent = newContent.replace(/\d+\.\d+\s+Beta/g, betaVersion)    
    // Replace patterns like value: "0.1" or value: "0.1" (for version displays)
    newContent = newContent.replace(/value:\s*["']\d+\.\d+(?:\.\d+)?(?:[-+][\w.]+)?["']/gi, `value: "${major}.${minor}"`)
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8')
      replacedFiles.push(path.relative(process.cwd(), file))
    }
  })

  return replacedFiles
}

function main() {
  const version = readPackageVersion()
  console.log('Sincronizando arquivos com versão', version)
  const changed = syncVersion(version)
  if (changed.length) {
    console.log('Arquivos atualizados:')
    changed.forEach((f) => console.log(' -', f))
    process.exitCode = 0
  } else {
    console.log('Nenhum arquivo com "Versão" encontrado para atualizar.')
  }
}

main()
