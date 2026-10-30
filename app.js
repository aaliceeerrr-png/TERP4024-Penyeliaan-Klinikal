'use strict';
const PRA_QUESTIONS=[
'Apakah objektif utama yang ingin dicapai dalam pengajaran ini?',
'Bagaimanakah guru akan menentukan sama ada murid berjaya mencapai objektif pembelajaran?',
'Bagaimanakah guru menentukan tiga tahap kemahiran murid?',
'Bagaimanakah soalan dan lembaran kerja disesuaikan mengikut tahap murid?',
'Apakah cabaran yang guru jangka semasa melaksanakan aktiviti tersebut?',
'Bagaimanakah aktiviti nombor bergambar menyokong pembelajaran?',
'Apakah tujuan penggunaan pemasa dan bagaimana kesesuaian masa ditentukan?',
'Bagaimanakah hasil lembaran kerja digunakan untuk mengenal pasti kefahaman murid?',
'Apakah maklum balas atau bimbingan yang dirancang untuk murid yang memerlukan bantuan?',
'Apakah fokus pemerhatian yang ingin dipersetujui bersama dan mengapa?'
];
const INDICATORS={terbeza:[
'Guru mengenal pasti atau merujuk tahap keupayaan murid.',
'Guru menyediakan tugasan atau soalan dengan aras yang sesuai.',
'Arahan aktiviti difahami oleh murid daripada tahap berbeza.',
'Guru memberi bantuan mengikut keperluan murid.',
'Murid daripada pelbagai tahap mengambil bahagian dalam aktiviti.',
'Masa dan sokongan diubah suai apabila diperlukan.'
],pentaksiran:[
'Guru menerangkan jangkaan atau kriteria kejayaan.',
'Guru menggunakan soalan/aktiviti untuk mengesan kefahaman.',
'Lembaran kerja digunakan sebagai evidens pembelajaran.',
'Guru menyemak respons atau kaedah penyelesaian murid.',
'Guru memberikan maklum balas yang membantu pembetulan.',
'Guru menggunakan dapatan untuk tindakan susulan.'
]};
const $=s=>document.querySelector(s);
function addFields(){PRA_QUESTIONS.forEach((q,i)=>{const d=document.createElement('div');d.className='question';const l=document.createElement('label');l.textContent=(i+1)+'. '+q;const a=document.createElement('textarea');a.name='soalan'+(i+1);a.rows=3;a.placeholder='Catatan jawapan sebenar guru dan hasil perbincangan…';l.appendChild(a);d.appendChild(l);$('#praQuestions').appendChild(d)});Object.entries(INDICATORS).forEach(([key,arr])=>{const el=$('#indicators'+(key==='terbeza'?'Terbeza':'Pentaksiran'));arr.forEach((q,i)=>{const div=document.createElement('div');div.className='indicator';const head=document.createElement('div');head.className='indicator-head';const strong=document.createElement('strong');strong.textContent=(i+1)+'. '+q;const select=document.createElement('select');select.name=key+(i+1)+'_skala';[['','Pilih skala'],...['1','2','3','4','5','TD'].map(n=>[n,n])].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;select.appendChild(o)});head.append(strong,select);const area=document.createElement('textarea');area.name=key+(i+1)+'_bukti';area.rows=2;area.placeholder='Evidens khusus (tindakan, respons murid, masa rakaman jika ada)…';div.append(head,area);el.appendChild(div)})})}
addFields();
let current='pra';
function switchPage(id){current=id;document.querySelectorAll('.view').forEach(el=>el.classList.toggle('active',el.id===id));document.querySelectorAll('.tab').forEach(el=>el.classList.toggle('active',el.dataset.page===id));$('#toolbar').style.display=id==='panduan'?'none':'flex';$('#toolbarLabel').textContent=id==='pra'?'Pra Penyeliaan':'Pemerhatian';window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>switchPage(b.dataset.page)));
const ENDPOINT_KEY='terp4024_gas_url';
function refreshStatus(){const url=localStorage.getItem(ENDPOINT_KEY)||'';$('#endpoint').value=url;$('#dbStatus').textContent=url?'Sambungan telah ditetapkan (belum diuji)':'Belum disambungkan ke Google Sheets';$('#dbStatus').classList.toggle('ready',!!url)}
$('#saveEndpoint').addEventListener('click',()=>{const value=$('#endpoint').value.trim();if(!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(value)){alert('Masukkan URL Google Apps Script yang betul dan berakhir dengan /exec.');return}localStorage.setItem(ENDPOINT_KEY,value);refreshStatus();alert('Alamat disimpan pada pelayar ini. Uji penghantaran sebenar sebelum digunakan.')});
$('#clearEndpoint').addEventListener('click',()=>{localStorage.removeItem(ENDPOINT_KEY);refreshStatus()});refreshStatus();
function getEntries(form){return Array.from(form.elements).filter(e=>e.name).map(el=>({key:el.name,label:(el.closest('label')?.childNodes[0]?.textContent||el.closest('.indicator')?.querySelector('strong')?.textContent||el.name).trim(),value:el.type==='checkbox'?(el.checked?'Ya':'Tidak'):el.value.trim()}))}
function escapeHtml(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function printCurrent(){const entries=getEntries($('#form'+(current==='pra'?'Pra':'Pemerhatian')));const title=current==='pra'?'BORANG PERBINCANGAN PRA PENYELIAAN':'INSTRUMEN PEMERHATIAN BILIK DARJAH';const rows=entries.map(e=>`<section class="entry"><div class="key">${escapeHtml(e.label)}</div><div class="value">${escapeHtml(e.value||'—')}</div></section>`).join('');const html=`<!doctype html><html lang="ms"><head><meta charset="utf-8"><title>${title}</title><style>@page{size:A4;margin:15mm}body{font:11pt/1.5 Arial,sans-serif;color:#172b38}h1{font-size:17pt;border-bottom:2px solid #183c47;padding-bottom:10px}p{color:#647785}.entry{break-inside:avoid;padding:9px 0;border-bottom:1px solid #d5e0e5}.key{font-weight:700;margin-bottom:3px}.value{white-space:pre-wrap;overflow-wrap:anywhere}</style></head><body><h1>${title}</h1><p>TERP4024 · Pengamal Pengajaran Klinikal</p>${rows}<script>window.onload=()=>window.print();<\/script></body></html>`;const w=window.open('','_blank');if(!w){alert('Benarkan pop-up untuk mencetak atau menyimpan PDF.');return}w.document.open();w.document.write(html);w.document.close()}
$('#printBtn').addEventListener('click',printCurrent);$('#pdfBtn').addEventListener('click',()=>{alert('Dalam dialog cetakan, pilih Save as PDF / Simpan sebagai PDF.');printCurrent()});
$('#submitBtn').addEventListener('click',()=>{const endpoint=localStorage.getItem(ENDPOINT_KEY);if(!endpoint){alert('Belum ada sambungan Google Sheets. Buka tab Panduan & sambungan dahulu.');switchPage('panduan');return}const type=current==='pra'?'Pra_Penyeliaan':'Pemerhatian';const form=$('#form'+(current==='pra'?'Pra':'Pemerhatian'));if(!form.reportValidity())return;const details={};getEntries(form).forEach(e=>details[e.key]=e.value);const payload=JSON.stringify({type,details});if(!confirm('Hantar rekod ini kepada Google Sheets? PASTIKAN tab pengesahan Google dibuka dan memaparkan status berjaya.'))return;const post=document.createElement('form');post.method='POST';post.action=endpoint;post.target='_blank';post.style.display='none';const hidden=document.createElement('input');hidden.type='hidden';hidden.name='payload';hidden.value=payload;post.appendChild(hidden);document.body.appendChild(post);post.submit();post.remove();alert('Permintaan penghantaran dibuka pada tab baharu. Respons hanya dianggap tersimpan jika halaman Google mengesahkan “Berjaya disimpan”.')});
