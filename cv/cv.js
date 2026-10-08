function applyFocus(focus){
  document.querySelectorAll(".focus").forEach(b=>b.classList.toggle("is-active",b.dataset.focus===focus));
  document.querySelectorAll(".theme-card,.experience").forEach(el=>{
    const tags=(el.dataset.tags||"").split(" ").filter(Boolean);
    const priority=focus!=="all"&&tags.includes(focus);
    const soft=focus!=="all"&&!priority;
    el.classList.toggle("is-priority",priority);
    el.classList.toggle("is-soft",soft);
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".focus").forEach(b=>b.addEventListener("click",()=>applyFocus(b.dataset.focus)));
  document.querySelectorAll(".js-print").forEach(b=>b.addEventListener("click",()=>window.print()));
  applyFocus("all");
});