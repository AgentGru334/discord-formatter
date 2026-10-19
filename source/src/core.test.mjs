import test from 'node:test';
import assert from 'node:assert/strict';
import {renderMarkdown,serialize,plainDoc,plainText,ansiBody,ansiPreview,outputFor,defaults,validateOutput,checkConfig,checkDoc,checkRules,builtins} from './core.mjs';
test('Discord underline, nested emphasis, spoilers, and subtext render',()=>{
 assert.match(renderMarkdown('__**underlined bold**__'),/<u><strong>underlined bold<\/strong><\/u>/);
 assert.match(renderMarkdown('A ||**secret**|| here'),/class="spoiler"[^>]*><strong>secret<\/strong><\/span>/);
 assert.match(renderMarkdown('-# A footnote'),/class="subtext"/);
 assert.doesNotMatch(renderMarkdown('`||literal||`'),/class="spoiler"/);
 assert.match(renderMarkdown('\\|\\|literal\\|\\|'),/\|\|literal\|\|/);
});
test('Preview renders hostile text inertly',()=>{
 assert.doesNotMatch(renderMarkdown('<img src=x onerror=alert(1)>'),/<img/);
 assert.doesNotMatch(renderMarkdown('[click](javascript:alert(1))'),/href="javascript/);
 assert.match(renderMarkdown('[Docs](https://example.com)'),/rel="noopener noreferrer"/);
});
test('Serialize combined emphasis without redundant closing and opening marks',()=>{
 const doc={type:'doc',content:[{type:'paragraph',content:[{type:'text',text:'A ',marks:[{type:'bold'}]},{type:'text',text:'great',marks:[{type:'bold'},{type:'italic'}]},{type:'text',text:' find',marks:[{type:'bold'}]}]}]};
 const result=serialize(doc);assert.equal(result,'**A *great* find**');assert.match(renderMarkdown(result),/<strong>A <em>great<\/em> find<\/strong>/);
});
test('Preserve literal Markdown characters and list structure',()=>{
 assert.equal(serialize(plainDoc('**literal**')),'\\*\\*literal\\*\\*');
 const doc={type:'doc',content:[{type:'bulletList',content:[{type:'listItem',content:[{type:'paragraph',content:[{type:'text',text:'First'}]}]},{type:'listItem',content:[{type:'paragraph',content:[{type:'text',text:'Second'}]}]}]}]};
 assert.equal(serialize(doc),'- First\n- Second');
});
test('Formatting selections that include spaces still produce valid Markdown',()=>{
 const doc={type:'doc',content:[{type:'paragraph',content:[{type:'text',text:' bold ',marks:[{type:'bold'}]}]}]};
 assert.equal(serialize(doc),' **bold** ');assert.match(renderMarkdown(serialize(doc)),/<strong>bold<\/strong>/);
});
test('ANSI uses actual ESC characters, resets each styled run, and escapes preview HTML',()=>{
 const doc={type:'doc',content:[{type:'paragraph',content:[{type:'text',text:'<red>',marks:[{type:'bold'},{type:'ansiColor',attrs:{fg:31,bg:null}}]},{type:'text',text:' normal'}]}]};
 assert.equal(ansiBody(doc),'\x1b[1;31m<red>\x1b[0m normal');
 assert.match(ansiPreview(doc),/&lt;red&gt;/);assert.doesNotMatch(ansiPreview(doc),/<red>/);
 const output=outputFor('ansi',{ansi:doc});assert.ok(output.startsWith('```ansi\n\x1b['));assert.ok(output.endsWith('\n```'));
});
test('Validation counts output fences and uses line limits, required fields, and placeholders',()=>{
 const output=outputFor('code',{code:{language:'python',text:'a'.repeat(1990)}});
 assert.equal(validateOutput(output,defaults(),'code','a'.repeat(1990)).errors.length,1);
 const r={...defaults(),requiredText:['reward'],requiredFields:['Code'],maxLines:2};
 const v=validateOutput('## Title\nReward: keys\nCode: {Code}',r,'message','Title\nReward: keys\nCode: {Code}');assert.equal(v.errors.length,3);
 assert.equal(validateOutput('Reward: keys\nCode: TEST',r,'message','Reward: keys\nCode: TEST').errors.length,0);
 assert.ok(validateOutput('Code:\nReward: keys',{...defaults(),requiredFields:['Code']},'message','Code:\nReward: keys').errors.some(x=>x.includes('Code')));
 assert.equal(validateOutput('```js\n```\n```',defaults(),'code','```').errors.length,1);
});
test('Team config round trips and rejects malformed or hostile schema',()=>{
 const config={app:'tacklebox-discord-formatter',version:1,rules:defaults(),templates:[{id:'custom-example',name:'Example',mode:'message',text:'Hello'}],drafts:{message:'Hello',ansi:plainDoc('ANSI'),code:{language:'json',text:'{}'}}};
 const result=checkConfig(JSON.parse(JSON.stringify(config)));assert.equal(result.templates[0].text,'Hello');assert.equal(result.drafts.message,'Hello');
 assert.throws(()=>checkConfig({...config,version:2}));assert.throws(()=>checkConfig({...config,templates:[{...config.templates[0],id:'tb-shift'}]}));
 assert.throws(()=>checkRules({...defaults(),maxChars:-1}));
 assert.throws(()=>checkDoc({type:'doc',content:[{type:'paragraph',content:[{type:'text',text:'bad',marks:[{type:'ansiColor',attrs:{fg:'red;background:url(x)',bg:null}}]}]}]}));
});
test('Built-in templates contain sample layouts and valid ANSI content',()=>{
 assert.equal(new Set(builtins.map(t=>t.id)).size,builtins.length);
 for(const t of builtins){if(t.mode==='ansi'){checkDoc(t.doc);assert.ok(plainText(t.doc))}else assert.ok(t.text.length>0)}
});
