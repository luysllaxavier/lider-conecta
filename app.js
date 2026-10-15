const $ = (id) => document.getElementById(id);
const defaultConsultants = [
  {id:1,name:"Ana Souza",phone:"(99) 99900-0001",brand:"Natura",consent:true},
  {id:2,name:"Mariana Lima",phone:"(99) 99900-0002",brand:"Avon",consent:true},
  {id:3,name:"Carla Mendes",phone:"(99) 99900-0003",brand:"Ambas",consent:false}
];
let consultants = [...defaultConsultants];
let artworks = [];
let campaigns = [];
let nextId = 4;
let imageData = "";
let selectedRecipients = new Set();

function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2800)}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function goTo(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$("page-"+page).classList.add("active");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));$("sidebar").classList.remove("open");if(page==="campanhas"){renderRecipients();refreshArtSelect()}if(page==="historico")renderHistory();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>goTo(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>goTo(b.dataset.goto)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));

function renderConsultants(){
 const q=$("searchConsultants").value.toLowerCase();const brand=$("brandFilter").value;
 const rows=consultants.filter(c=>(c.name+" "+c.phone).toLowerCase().includes(q)&&(!brand||c.brand===brand));
 $("consultantsTable").innerHTML=rows.length?rows.map(c=>`<tr><td><div class="person-cell"><span class="person-avatar">${escapeHtml(c.name.charAt(0).toUpperCase())}</span><b>${escapeHtml(c.name)}</b></div></td><td>${escapeHtml(c.phone)}</td><td>${escapeHtml(c.brand)}</td><td><span class="tag ${c.consent?"ok":"no"}">${c.consent?"Autorizada":"Não autorizada"}</span></td></tr>`).join(""):`<tr><td colspan="4">Nenhuma consultora encontrada.</td></tr>`;
 $("statConsultoras").textContent=consultants.length;
}
$("searchConsultants").addEventListener("input",renderConsultants);$("brandFilter").addEventListener("change",renderConsultants);
$("addConsultantBtn").addEventListener("click",()=>$("consultantDialog").showModal());$("closeDialog").addEventListener("click",()=>$("consultantDialog").close());
$("consultantForm").addEventListener("submit",e=>{e.preventDefault();consultants.push({id:nextId++,name:$("newName").value.trim(),phone:$("newPhone").value.trim(),brand:$("newBrand").value,consent:$("newConsent").checked});$("consultantDialog").close();e.target.reset();renderConsultants();renderRecipients();toast("Consultora adicionada nesta demonstração.")});

function updatePreview(){
 $("previewTitle").textContent=$("artTitle").value||"Sua campanha";
 $("previewSubtitle").textContent=$("artSubtitle").value;
 $("previewPrice").textContent=$("artPrice").value;
 $("artPreview").style.background=$("artColor").value;
}
["artTitle","artSubtitle","artPrice","artColor"].forEach(id=>$(id).addEventListener("input",updatePreview));
$("artImage").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file)return;if(file.size>5*1024*1024){toast("Escolha uma imagem de até 5 MB.");e.target.value="";return}const reader=new FileReader();reader.onload=()=>{imageData=reader.result;$("previewImage").src=imageData;$("previewImageWrap").classList.remove("hidden")};reader.readAsDataURL(file)});
$("resetArt").addEventListener("click",()=>{imageData="";$("artImage").value="";$("previewImage").removeAttribute("src");$("previewImageWrap").classList.add("hidden");toast("Imagem removida da pré-visualização.")});
function renderArtworks(){$("savedArts").innerHTML=artworks.length?artworks.map(a=>`<div class="saved-art"><div class="saved-art-color" style="background:${a.color}">${a.image?"▧":"✦"}</div><b>${escapeHtml(a.title)}</b><button data-use-art="${a.id}">Usar na campanha</button></div>`).join(""):'Você ainda não salvou nenhuma arte.';$("statArtes").textContent=artworks.length;refreshArtSelect();document.querySelectorAll("[data-use-art]").forEach(b=>b.addEventListener("click",()=>{goTo("campanhas");$("campaignArt").value=b.dataset.useArt;toast("Arte selecionada para a campanha.")}))}
$("saveArt").addEventListener("click",()=>{const a={id:Date.now(),title:$("artTitle").value||"Arte sem título",subtitle:$("artSubtitle").value,price:$("artPrice").value,color:$("artColor").value,image:imageData};artworks.push(a);renderArtworks();toast("Arte salva nesta demonstração.")});
function refreshArtSelect(){const select=$("campaignArt");const current=select.value;select.innerHTML='<option value="">Sem arte selecionada</option>'+artworks.map(a=>`<option value="${a.id}">${escapeHtml(a.title)}</option>`).join("");if(artworks.some(a=>String(a.id)===current))select.value=current}
function renderRecipients(){const eligible=consultants.filter(c=>c.consent);$("recipientList").innerHTML=consultants.map(c=>`<label class="recipient"><input type="checkbox" data-recipient="${c.id}" ${selectedRecipients.has(c.id)?"checked":""} ${c.consent?"":"disabled"}><span class="recipient-info"><b>${escapeHtml(c.name)}</b><small>${escapeHtml(c.brand)} · ${escapeHtml(c.phone)}${c.consent?"":" · Sem autorização promocional"}</small></span></label>`).join("");document.querySelectorAll("[data-recipient]").forEach(cb=>cb.addEventListener("change",()=>{const id=Number(cb.dataset.recipient);if(cb.checked)selectedRecipients.add(id);else selectedRecipients.delete(id);updateSelectedCount()}));updateSelectedCount()}
function updateSelectedCount(){const count=[...selectedRecipients].filter(id=>consultants.some(c=>c.id===id&&c.consent)).length;$("selectedCount").textContent=count+" selecionadas";$("summaryCount").textContent=count}
$("selectAll").addEventListener("click",()=>{consultants.filter(c=>c.consent).forEach(c=>selectedRecipients.add(c.id));renderRecipients()});
$("clearSelection").addEventListener("click",()=>{selectedRecipients.clear();renderRecipients()});
$("campaignMode").addEventListener("change",()=> $("scheduleFields").classList.toggle("hidden",$("campaignMode").value!=="agendado"));
$("prepareCampaign").addEventListener("click",()=>{const name=$("campaignName").value.trim();const mode=$("campaignMode").value;const count=[...selectedRecipients].filter(id=>consultants.some(c=>c.id===id&&c.consent)).length;if(!name){toast("Digite o nome da campanha.");return}if(!count){toast("Selecione ao menos uma consultora autorizada.");return}if(mode==="agendado"&&!$("campaignDate").value){toast("Escolha a data e a hora.");return}const art=artworks.find(a=>String(a.id)===$("campaignArt").value);campaigns.unshift({id:Date.now(),name,message:$("campaignMessage").value,artTitle:art?art.title:"Sem imagem",mode,date:mode==="agendado"?$("campaignDate").value:"",count,status:"Preparada — não enviada",created:new Date().toLocaleString("pt-BR")});$("statCampanhas").textContent=campaigns.length;toast("Campanha salva em modo de demonstração. Nenhuma mensagem foi enviada.");$("campaignName").value="";goTo("historico")});
function renderHistory(){$("campaignHistory").innerHTML=campaigns.length?campaigns.map(c=>`<div class="history-row"><div><b>${escapeHtml(c.name)}</b><small>${escapeHtml(c.artTitle)} · ${c.count} destinatária(s) · Criada em ${escapeHtml(c.created)}</small><small>${c.mode==="agendado"?"Agendamento: "+escapeHtml(c.date.replace("T"," ")):"Preparada para envio imediato"}</small></div><span class="tag">${escapeHtml(c.status)}</span></div>`).join(""):'Nenhuma campanha preparada ainda.'}
renderConsultants();renderRecipients();updatePreview();renderArtworks();renderHistory();
