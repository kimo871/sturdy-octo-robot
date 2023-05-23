


const dialogue_container = document.querySelector(".dialogue-container");

const NO_button = document.querySelector("button.undo-delete");

const YES_button = document.querySelector("button.action-delete");


let form = document.querySelector("form");
let radios = document.querySelectorAll("input[type='radio']")
var form_inputs = document.querySelectorAll("form input");
const delete_btn = document.querySelectorAll("form input[type='submit']")[1];
document.querySelector("select").selectedIndex=parseInt(giver()[1]);
form_inputs = Array.from(form_inputs);
console.log(form_inputs)
var id = parseInt(form_inputs[1].value);
console.log(id)
async function delete_it (token2) {
        const operation = await fetch(`http://127.0.0.1:8000/Employees/Edit-User/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "credentials": 'same-origin',
                "X-CSRFToken":token2
            },
            body : JSON.stringify(id)
        }).then(res=> {
           // display response
           alert("Successfully Deleted")}).catch((err)=>{
            alert("there is error")
        })

    };

async function   wait (obj,token2){
    const r = await fetch(`http://127.0.0.1:8000/Employees/Edit-User/${id}/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "credentials": 'same-origin',
            "X-CSRFToken":token2
        },
        body:JSON.stringify(obj)
    }).then(res=>{
        alert("successfully updated")
    }).catch(err=> alert(err))
    }
// update employee info
form.onsubmit = function(e){
e.preventDefault();
console.log(e )
let obj={};
const data = new FormData(form);

for(let entry of data){
    obj[entry[0]]=entry[1];
}
for(let i=0; i<radios.length; i++){
    console.log(radios[i])
    if(radios[i].checked){
        obj.status=radios[i].getAttribute('key');
        break;
    }
}
obj['dep_index']=document.querySelector("select").selectedIndex;
obj['vac_available']=parseInt(obj['vac_available']);
console.log(obj)

if(obj.salary <= 0){
    alert("salary cannot be smaller or equal to zero");
   
   
}

else if((new Date().getFullYear() - new Date(obj.date).getFullYear())< 18){
 alert("employee age must be 18 or older !");
}
else{
// update data in local storage
if(e.submitter.defaultValue.includes("Update")){
    wait(obj,giver()[0]);
}

else{
    dialogue_container.style.display="block"; dialogue.style.display="block";
}

}
}
//end



//end



// handling dialgue

const dialogue = document.querySelector(".dialogue");

const close = document.querySelector("i.fa-rectangle-xmark");

dialogue_container.style.display="none"; dialogue.style.display="none";


YES_button.addEventListener("click", ()=>{
    let organize = async ()=>{
    console.log(giver()[0])
    await delete_it(giver()[0])
    dialogue_container.style.display="none"; dialogue.style.display="none";
    }
    organize();
})

NO_button.addEventListener("click",()=>{
     // styling
     dialogue_container.style.display="none";
     dialogue.style.display="none";
})   

close.addEventListener("click",()=>{
    // styling
    dialogue_container.style.display="none";
    dialogue.style.display="none";

})




