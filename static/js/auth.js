const form = document.querySelector("form");

const send = async (token,obj)=>{
 const operation = await fetch("http://127.0.0.1:8000/login",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "X-CSRFToken":token
    },
    body:JSON.stringify(obj)
 })
}

form.onsubmit = function (e){

let obj={};
const data = new FormData(form);

for(let entry of data){
    obj[entry[0]]=entry[1];
}
console.log(obj)
send(giver(),obj)
}

