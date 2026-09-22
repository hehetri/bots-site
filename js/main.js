(() => {
const links=[...document.querySelectorAll("[data-page]")],pages=[...document.querySelectorAll("[data-page-view]")];
function show(page,update=true){const target=pages.some(p=>p.dataset.pageView===page)?page:"home";pages.forEach(p=>p.classList.toggle("active-page",p.dataset.pageView===target));links.forEach(a=>a.classList.toggle("active",a.dataset.page===target&&a.tagName==="A"&&a.closest(".main-nav")));if(update)history.pushState({page:target},"","#"+target);window.scrollTo({top:0,behavior:"smooth"});}
links.forEach(a=>a.addEventListener("click",e=>{e.preventDefault();show(a.dataset.page)}));
window.addEventListener("popstate",()=>show(location.hash.slice(1)||"home",false));show(location.hash.slice(1)||"home",false);

const time=document.getElementById("server-time");
function clock(){if(time)time.textContent=new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:false,timeZoneName:"short"}).format(new Date()).replace("GMT","UTC")}
clock();setInterval(clock,30000);

const lb=document.getElementById("lang-btn"),lm=document.getElementById("lang-menu");
lb.addEventListener("click",()=>lm.hidden=!lm.hidden);
lm.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{lb.querySelector("span").textContent=b.textContent.trim().slice(0,2).toUpperCase();lm.hidden=true}));
document.addEventListener("click",e=>{if(!lm.hidden&&!lm.contains(e.target)&&!lb.contains(e.target))lm.hidden=true});

const API="./api/";
const playerCount=document.querySelector(".status>div:nth-of-type(4) b");
async function loadStatus(){
 try{
  const r=await fetch(API+"server-status.php",{cache:"no-store"});const d=await r.json();
  const rows=document.querySelectorAll(".status>div:not(.status-head)");
  if(rows[0])rows[0].querySelector("b").textContent=d.login_server==="online"?"Online":"Checking";
  if(rows[1])rows[1].querySelector("b").textContent=d.game_server==="online"?"Online":"Checking";
  if(d.players_online!==null&&playerCount)playerCount.textContent=Number(d.players_online).toLocaleString("en-GB");
 }catch(_){}
}
loadStatus();setInterval(loadStatus,60000);

async function loadRanking(){
 const body=document.querySelector("#page-ranking tbody");if(!body)return;
 try{
  const r=await fetch(API+"ranking.php?limit=50",{cache:"no-store"});const d=await r.json();
  if(!d.ok||!d.rows?.length)return;
  body.innerHTML=d.rows.map((x,i)=>"<tr><td>"+(i+1)+"</td><td>"+escapeHtml(x.player)+"</td><td>"+Number(x.level).toLocaleString()+"</td><td>"+Number(x.experience).toLocaleString()+"</td><td>"+escapeHtml(x.guild??"—")+"</td></tr>").join("");
  const note=document.querySelector("#page-ranking .note");if(note)note.textContent="Live ranking connected to bout_evolution.";
 }catch(_){}
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
loadRanking();

async function loadNews(){
 try{
  const r=await fetch(API+"news.php?limit=10",{cache:"no-store"});const d=await r.json();
  if(!d.ok||!d.rows?.length)return;
  const cards=document.querySelectorAll("#page-community .news-cards article");
  d.rows.slice(0,3).forEach((x,i)=>{if(!cards[i])return;cards[i].querySelector("span").textContent=(x.category||"NOTICE")+" · "+(x.published_at||"");cards[i].querySelector("h3").textContent=x.title;cards[i].querySelector("p").textContent=x.excerpt||"";});
 }catch(_){}
}
loadNews();

document.querySelectorAll("#page-ranking .tabs button").forEach((button,index)=>{
 button.addEventListener("click",()=>{
  document.querySelectorAll("#page-ranking .tabs button").forEach(b=>b.classList.remove("active"));button.classList.add("active");
  // The API currently exposes the verified level/experience dataset; guild mode will use the same endpoint after its schema is confirmed.
  loadRanking();
 });
});

async function loadLauncher(){
 try{
  const r=await fetch(API+"launcher.php",{cache:"no-store"});const d=await r.json();
  if(d.ok&&d.download_url){
   document.querySelectorAll(".real-btn").forEach(a=>{if(a.textContent.includes("DOWNLOAD CLIENT")){a.href=d.download_url;a.target="_blank";a.onclick=null;}});
  }
 }catch(_){}
}
loadLauncher();

const form=document.getElementById("support-form"),msg=document.getElementById("form-msg");
form.addEventListener("submit",e=>{e.preventDefault();msg.textContent="Support request captured. Ticket/email backend can be connected when the support service is configured.";form.reset()});
})();