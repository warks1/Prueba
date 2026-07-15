import fs from 'node:fs/promises';

const source=JSON.parse(await fs.readFile(new URL('../catalog-source.json',import.meta.url),'utf8'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f']/g,'').replace(/[^a-z0-9 ]/g,'');
const choose=(items,song)=>{
  const valid=(items||[]).filter(x=>x.previewUrl);
  const a=norm(song.artist),t=norm(song.title);
  return valid.find(x=>norm(x.artistName)===a&&norm(x.trackName).includes(t))||
    valid.find(x=>norm(x.artistName).includes(a.split(' ')[0])&&norm(x.trackName).includes(t.split(' ')[0]))||valid[0];
};
const tracks=[];
for(const song of source){
  let found=null;
  for(const country of ['ES','US','GB']){
    const q=new URLSearchParams({term:`${song.artist} ${song.title}`,media:'music',entity:'song',limit:'12',country});
    try{
      const res=await fetch(`https://itunes.apple.com/search?${q}`,{headers:{'User-Agent':'DimeQuienCanta-CatalogBuilder/6.0'}});
      if(res.ok)found=choose((await res.json()).results,song);
    }catch(e){console.warn('Error',song.artist,song.title,country,e.message)}
    if(found)break;
  }
  if(found){
    tracks.push({...song,trackId:found.trackId,artist:found.artistName||song.artist,title:found.trackName||song.title,previewUrl:found.previewUrl,artwork:(found.artworkUrl100||'').replace('100x100','300x300')});
    console.log('OK',song.artist,'-',song.title);
  }else console.warn('SIN PREVIEW',song.artist,'-',song.title);
  await sleep(120);
}
if(tracks.length<10)throw new Error(`Solo se validaron ${tracks.length} previews; se requieren al menos 10.`);
await fs.writeFile(new URL('../catalog-cache.json',import.meta.url),JSON.stringify({generatedAt:new Date().toISOString(),provider:'Apple iTunes Search API',tracks},null,2)+'\n');
console.log(`Catálogo generado: ${tracks.length} canciones.`);
