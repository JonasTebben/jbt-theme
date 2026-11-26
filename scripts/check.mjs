// keeps jbt.theme.json (the Slidecko copy of the theme) in step with the package
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const theme = JSON.parse(readFileSync('jbt.theme.json', 'utf8'))
const readme = readFileSync('README.md', 'utf8')
const tag = `github:JonasTebben/jbt-theme#v${pkg.version}`
const errors = []
if (theme.format !== 'slidecko-theme' || theme.id !== 'jbt' || theme.slidev !== pkg.name) errors.push('jbt.theme.json: format, id or slidev name wrong')
if (theme.pkg !== tag) errors.push(`jbt.theme.json: pkg is ${theme.pkg}, expected ${tag}`)
if (!readme.includes(`npm install ${tag}`)) errors.push(`README.md: install line does not name v${pkg.version}`)
// npm runs these when installing from GitHub (and installs Slidev for them first)
for (const k of ['build', 'prepare', 'prepack', 'preinstall', 'install', 'postinstall']) if (pkg.scripts?.[k]) errors.push(`package.json: no "${k}" script (npm would run it on install from GitHub)`)
if (!pkg.files.includes('jbt.theme.json')) errors.push('package.json: files lacks jbt.theme.json')
// Slidecko nests the CSS under the theme's class: every top-level rule must start with & (the slide)
const tops = theme.css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{[^{}]*\}/g, '{}').split('{}').map(x => x.trim()).filter(Boolean)
for (const t of tops.filter(x => !x.startsWith('&'))) errors.push(`jbt.theme.json: rule without &: ${t}`)
if (process.env.GITHUB_REF_TYPE === 'tag' && process.env.GITHUB_REF_NAME !== `v${pkg.version}`) errors.push(`tag ${process.env.GITHUB_REF_NAME} does not match version ${pkg.version}`)
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log(`ok: v${pkg.version}`)
