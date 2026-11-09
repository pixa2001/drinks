const categories = [
['Refrescos','Erfrischend & alkoholfrei · 0,3 l',[
['Coca Cola','3,80'],['Coca Cola Zero','3,80'],['Fanta','3,80'],['Sprite','3,80'],['Wasser mit/ohne','2,70'],['Bitter Lemon','3,90'],['Tonic Water','3,90'],['Ginger Ale','3,90'],['Red Bull Dose','4,80'],['Orangensaft','3,80'],['Apfelsaft','3,80'],['Maracujasaft','3,80'],['Ananassaft','3,80'],['Kiba','3,80']]],
['Longdrinks','0,3 l · mit 4 cl',[
['Havanna & Soft','8,90'],['Legendarios & Soft','10,70'],['Havanna 7 & Soft','10,50'],['Bacardi & Soft','8,90'],['Bacardi 8 & Soft','10,70'],['Brugal & Soft','8,90'],['Ron Barceló & Soft','9,70'],["Ballantine’s & Soft",'8,70'],['Jack Daniels & Soft','9,70'],['J&B & Soft','8,90'],['Jim Beam & Soft','8,90'],['Jameson & Soft','8,90'],['Absolut & Soft','8,90'],['Absolut & Red Bull','9,50'],['Tanqueray & Soft','9,90'],['Puerto de Indias & Soft','9,90'],['Bombay Gin & Soft','9,90'],['Beefeater Gin & Soft','9,90'],['Jägermeister & Red Bull','9,50'],['Malibu & Soft/Saft','8,70'],['Campari 1 & Soft','8,50'],['Batida de Coco & Soft','8,70']]],
['Shots','Kleine Klassiker · 2 cl',[
['Hierbas dulce/medium/seca','3,80'],['Jose Cuervo Silver','3,80'],['Jose Cuervo Gold','3,80'],['Mexikaner (DIY)','3,80'],['B52','4,50'],['Jägermeister','3,80'],['Limoncello','3,60'],['Kölsch Koks','3,60'],['Flimm','3,60'],['Kettenfett','3,60'],['Ramazotti','3,80'],['Molinari Sambuca','3,80'],['Absolut','3,80']]],
['Shooter','Für einen besonderen Moment',[
['Blowjob','4,50'],['Dirty Sanchez','4,50'],['Electric Blue','4,50'],['Fire Bomb','4,50'],['Orgasmus','4,50'],['Russian Flag','4,50'],['Zipper','4,50']]],
['Whiskey','Pur genießen · 4 cl',[
['Johnny Walker Red','6,90'],['Johnny Walker Black','8,70'],["Ballantine’s",'6,50'],['Jameson','7,20'],['Glenfiddich','8,20'],['Jack Daniels','6,90'],['Gentleman Jack','8,10'],['Chivas','8,60'],['Dimple','8,00'],['J&B','6,90']]],
['Cerveza','Ein kühles Bier. Siempre.',[
['Gilden Kölsch','2,80','0,2 l'],['Estrella Galicia','4,30','0,33 l'],['Desperados','4,90','0,33 l'],['Corona','4,90','0,33 l'],['Schöfferhofer','6,00','0,5 l'],['Schöfferhofer AF','5,80','0,5 l']]],
['Vino / Cava','Für die schönen Stunden',[
['Vino Tinto','5,30'],['Vino Blanco','5,30'],['Tinto de Verano','5,70'],['Calimocho','5,70'],['Sangria','6,00'],['Sangria Especial','6,40'],['Freixenet','5,00','0,1 l'],['Freixenet Flasche','24,40']]],
['Ron','Ein Schluck Karibik · 4 cl',[
['Legendarios','6,70'],['Havanna 7','6,70'],['Ron Barceló','6,70'],['Bacardi 8','6,70'],['Brugal','6,70']]]
];
const nav=document.querySelector('#nav'),menu=document.querySelector('#menu');
categories.forEach(([name,info,items],i)=>{
 const id='kategorie-'+i;const a=document.createElement('a');a.href='#'+id;a.textContent=name;nav.append(a);
 const section=document.createElement('section');section.className='category';section.id=id;
 section.innerHTML=`<div class="category-title"><span class="number">${String(i+1).padStart(2,'0')}</span><h2>${name}</h2></div><p class="section-info">${info}</p><div class="rows"></div>`;
 const rows=section.querySelector('.rows');items.forEach(([drink,price,volume])=>{const row=document.createElement('div');row.className='row';const n=document.createElement('span');n.className='name'+(drink==='Sangria Especial'?' special-name':'');n.textContent=drink;if(volume){const v=document.createElement('span');v.className='volume';v.textContent=volume;n.append(v)}const dots=document.createElement('span');dots.className='dots';dots.setAttribute('aria-hidden','true');const p=document.createElement('span');p.className='price';p.textContent=price+' €';row.append(n,dots,p);rows.append(row)});
 if(name==='Cerveza')section.insertAdjacentHTML('beforeend','<aside class="callout"><div><b>¡Cubito!</b><p>5 trinken, 4 zahlen.<br>Estrella / Corona / Desperados / Grapefruit</p></div><span class="star" aria-hidden="true">✦</span></aside>');menu.append(section);
});
const titles=[...document.querySelectorAll('.category-title')];let previous=scrollY,ticking=false;
function update(){const down=scrollY>=previous;previous=scrollY;const h=innerHeight;for(const title of titles){const r=title.getBoundingClientRect();if(r.top<h*.9&&r.bottom>100){title.classList.add('visible');title.classList.remove('exit-right')}else if(r.top>=h*.9){title.classList.remove('visible');title.classList.toggle('exit-right',!down)}else{title.classList.remove('visible','exit-right')}}let active=0;document.querySelectorAll('.category').forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.4)active=i});[...nav.children].forEach((a,i)=>{a.classList.toggle('active',i===active);if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});addEventListener('resize',update);update();
const modal=document.querySelector('#qr-modal');document.querySelector('#qr-open').onclick=()=>{document.querySelector('#qr').src='qr.svg';modal.showModal()};document.querySelector('#qr-close').onclick=()=>modal.close();modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});document.querySelector('#qr').onerror=()=>document.querySelector('#qr-error').hidden=false;
