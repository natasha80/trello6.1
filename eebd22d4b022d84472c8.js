import Form from"./addForm";import Card from"./Card";import DnD from"./DnD";const addForm=new Form,addCard=document.querySelectorAll(".add-card-container"),allCardsArr=[];function makeNewCard(e,t){const r=new Card(e);allCardsArr.push(r),allCardsArr.forEach(((e,t)=>{e.id=t})),r.createNewCard(r,t,allCardsArr)}addCard.forEach((e=>{e.addEventListener("click",(()=>{const t=e.closest(".list-container"),r=t.querySelector(".list"),l=addForm.createForm();t.appendChild(l),addForm.closeForm(l,e,t),l.addEventListener("submit",(o=>{o.preventDefault(),makeNewCard(addForm.addCardTitle(l),r),addForm.afterSubmit(l,e,t);const d=document.querySelectorAll(".list"),a=document.querySelectorAll(".list-item");DnD(a,d)}))}))})),window.onbeforeunload=function(){const e=[];let t=document.querySelectorAll(".list-item:not(.elementary)"),r=document.querySelectorAll(".list");t.forEach((t=>{let l;for(l=0;l<r.length&&t.parentElement!==r.item(l);l++);let o={title:t.firstChild.textContent,list_index:l};e.push(o)})),localStorage.setItem("data",JSON.stringify(e))},window.addEventListener("DOMContentLoaded",(()=>{let e=null;try{e=JSON.parse(localStorage.getItem("data"))}catch(e){return alert(e),void console.log(e)}let t=document.querySelectorAll(".list");e.forEach((e=>{makeNewCard(e.title,t[e.list_index])}));const r=document.querySelectorAll(".list"),l=document.querySelectorAll(".list-item");DnD(l,r)}));