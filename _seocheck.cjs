const ts = require('typescript'), fs = require('fs');
function load(p, subs={}) {
  let src = fs.readFileSync(p,'utf8');
  // drop import lines
  src = src.replace(/^import[^\n]*\n/gm,'');
  for (const [k,v] of Object.entries(subs)) src = src.replace(k, v);
  const js = ts.transpileModule(src,{compilerOptions:{module:'CommonJS',target:'ES2020'}}).outputText;
  const m = {exports:{}};
  new Function('module','exports','require', js)(m, m.exports, require);
  return m.exports;
}
const site = load('src/data/site.ts');
global.__SITE = site.SITE;
// seo.ts uses SITE/SEOProps from @data/site; inject SITE via replacing import already stripped -> need SITE in scope
let seoSrc = fs.readFileSync('src/utils/seo.ts','utf8').replace(/^import[^\n]*\n/gm,'');
const seoJs = ts.transpileModule('const SITE = global.__SITE;\n'+seoSrc,{compilerOptions:{module:'CommonJS',target:'ES2020'}}).outputText;
const m={exports:{}}; new Function('module','exports','require', seoJs)(m,m.exports,require);
const seo = m.exports;

const t1 = seo.formatTitle('Renta de Carpas para Eventos');
const t2 = seo.formatTitle('Renta de Pistas de Baile para Eventos LED Premium Edicion');
const org = seo.organizationJsonLd();
const lb = seo.localBusinessJsonLd();
const lbz = seo.localBusinessJsonLd({id:'https://eventech.mx/zonas/polanco/#localbusiness', areaServed:['Polanco']});
const svc = seo.serviceJsonLd({name:'Renta de Sillas',description:'x',url:'/servicios/mobiliario/sillas/'});
const art = seo.articleJsonLd({title:'T',description:'d',url:'/blog/x/',datePublished:'2026-01-01'});
console.log('title short:', t1, '('+t1.length+')');
console.log('title long :', t2, '('+t2.length+')');
console.log('org @id/logo:', org['@id'], '/', org.logo['@type']);
console.log('lb @id/parent:', lb['@id'], '/', lb.parentOrganization['@id']);
console.log('lb zone @id:', lbz['@id'], 'area:', JSON.stringify(lbz.areaServed));
console.log('service provider @id:', svc.provider['@id']);
console.log('article publisher @id:', art.publisher['@id']);
[org,lb,lbz,svc,art].forEach(x=>JSON.stringify(x));
console.log('ALL SERIALIZE OK; SITE.titleTemplate =', site.SITE.seo.titleTemplate);
