import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const source=dirname(dirname(fileURLToPath(import.meta.url)));
const website=join(source,'..','website');
const target=join(source,'..','TB_Discord_Formatter_Standalone_Ready.html');
let html=await readFile(join(website,'index.html'),'utf8');
const css=await readFile(join(website,'app.css'),'utf8');
const js=await readFile(join(website,'app.js'),'utf8');
const icons=await Promise.all([192,512].map(async size=>{const b64=(await readFile(join(website,`TB_App_Icon_Ready_${size}.png`))).toString('base64');return[size,b64]}));
html=html.replace('<link rel="manifest" href="./manifest.webmanifest">',()=> '')
 .replace('<link rel="icon" href="./TB_App_Icon_Ready_192.png">',()=>`<link rel="icon" href="data:image/png;base64,${icons[0][1]}">`)
 .replace('<link rel="apple-touch-icon" href="./TB_App_Icon_Ready_192.png">',()=> '')
 .replace('<link rel="stylesheet" href="./app.css">',()=>`<style>\n${css}\n</style>`)
 // Use a replacer callback so JavaScript replacement tokens such as $& in
 // bundled regexes are inserted literally instead of expanding to the match.
 .replace('<script src="./app.js" defer></script>',()=>`<script>window.TB_STANDALONE=true;\n${js.replace(/<\/script/gi,'<\\/script')}\n</script>`);
const markup=html.split('<script>window.TB_STANDALONE=true;')[0];
if(markup.includes('src="./app.js"')||markup.includes('href="./app.css"')||markup.includes('TB_App_Icon_Ready_192.png')||!html.includes('window.TB_STANDALONE=true;'))throw Error('Standalone bundle has unresolved app assets.');
await mkdir(dirname(target),{recursive:true});await writeFile(target,html,'utf8');
console.log(`Built the standalone app at ${target}`);
