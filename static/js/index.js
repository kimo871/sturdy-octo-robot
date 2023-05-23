const icon = document.querySelector(".mobile-view > button");

const div = document.querySelector("nav > .mobile-view");
console.log(icon); console.log(div);
icon.addEventListener("click",()=>{
  
  setTimeout(()=>{
    div.style.display = div.style.display === "block" ? "none" : "block";
   
  },150)

 setTimeout(()=>{
    div.style.opacity = div.style.opacity === '0' ? '1' : '0';
  },180)

 
  
})