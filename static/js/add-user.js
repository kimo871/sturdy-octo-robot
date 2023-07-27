


let input_forms = document.querySelectorAll(".inputdiv > input");
let form  = document.querySelector("form")
  async function   wait (obj,token2=giver()){
    const r = await fetch("Employees/Add-User/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "credentials": 'same-origin',
            "X-CSRFToken":token2
        },
        body:JSON.stringify(obj)
    }).then(()=> alert("Added Successfully")).catch(err=> alert(err))
    }
    
input_forms = Array.from(input_forms);
form.onsubmit = function (e){
    let obj={};
    //code
e.preventDefault();
const data = new FormData(form);
input_forms.map((item)=>{

        obj[item.getAttribute("name")]=item.value;
        console.log(obj);
    
    let output = "";
    for (const entry of data) {
     obj[entry[0]]=entry[1];
    }
    obj['vac_approved']=0;
})
console.log(obj)
obj['dep_index']=parseInt(document.querySelector("select").selectedIndex);
obj['Department']=document.querySelector("select").selectedOptions[0].innerText;
obj['vac_available']=parseInt(obj['vac_available']);
console.log(new Date().getFullYear() - new Date(obj.birth).getFullYear())
if(obj.gender === undefined || obj.status === undefined ){
    alert("fill the form correctly including radio buttons");
    
}
else if(obj.salary <= 0){
    alert("salary cannot be smaller or equal to zero");
   
}

else if(obj.vac_available <= 0){
    alert("available vacancies cannot be smaller or equal to zero");
}
else if((new Date().getFullYear() - new Date(obj.birth).getFullYear())< 18){
    alert("employee age must be 18 or older !");
   }
else{
//obj.name= obj.fname+obj.lname;
console.log(obj);
wait(obj,giver());

}

}



// 2.collect data if validated in object   // 2. if not show insert error message to user
// your code

// 3. call addEmployee(object) wait for response and tell user response in alert
