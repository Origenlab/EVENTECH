import { build } from 'esbuild';
import { fileURLToPath } from 'url';
// bundle seo.ts + site.ts, stub the @data alias
const res = await build({
  entryPoints: ['src/utils/seo.ts'],
  bundle: true, write: false, format: 'esm', platform: 'node',
  alias: { '@data/site': fileURLToPath(new URL('./src/data/site.ts', import.meta.url)) },
  logLevel: 'silent',
});
const code = res.outputFiles[0].text;
const mod = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const t1 = mod.formatTitle('Renta de Carpas para Eventos');
const t2 = mod.formatTitle('Renta de Pistas de Baile para Eventos LED Premium');
const org = mod.organizationJsonLd();
const lb = mod.localBusinessJsonLd();
const svc = mod.serviceJsonLd({name:'Renta de Sillas', description:'x', url:'/servicios/mobiliario/sillas/'});
console.log('formatTitle short:', t1, '('+t1.length+')');
console.log('formatTitle long :', t2, '('+t2.length+')');
console.log('org @id:', org['@id'], '| logo type:', org.logo['@type']);
console.log('localBusiness @id:', lb['@id'], '| parentOrg:', lb.parentOrganization['@id']);
console.log('service provider @id:', svc.provider['@id']);
// validate all are JSON-serializable
for (const [k,v] of Object.entries({org,lb,svc})) JSON.stringify(v);
console.log('ALL JSON-LD serialize OK');
