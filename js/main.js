(() => {
const links=[...document.querySelectorAll("[data-page]")], pages=[...document.querySelectorAll("[data-page-view]")];
function show(page,update=true){const target=page||"home";pages.forEach(p=>p.classList.toggle("active-page",p.dataset.pageView===target));links.forEach(a=>a.classList.toggle("active",a.dataset.page===target&&a.tagName==="A"&&a.closest(".main-nav")));if(update) history.pushState({page:target},"","#"+target);window.scrollTo({top:0,behavior:"smooth"});}
links.forEach(a=>a.addEventListener("click",e=>{e.preventDefault();show(a.dataset.page)}));
window.addEventListener("popstate",()=>show(location.hash.slice(1)||"home",false));
show(location.hash.slice(1)||"home",false);
const time=document.getElementById("server-time");function clock(){if(time)time.textContent=new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:false,timeZoneName:"short"}).format(new Date()).replace("GMT","UTC")}clock();setInterval(clock,30000);
const lb=document.getElementById("lang-btn"),lm=document.getElementById("lang-menu");lb.addEventListener("click",()=>lm.hidden=!lm.hidden);lm.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{lb.querySelector("span").textContent=b.textContent.trim().slice(0,2).toUpperCase();lm.hidden=true}));
document.addEventListener("click",e=>{if(!lm.hidden&&!lm.contains(e.target)&&!lb.contains(e.target))lm.hidden=true});
const form=document.getElementById("support-form"),msg=document.getElementById("form-msg");form.addEventListener("submit",e=>{e.preventDefault();msg.textContent="Support form ready. Backend email/ticket integration will be connected next.";form.reset()});
})();