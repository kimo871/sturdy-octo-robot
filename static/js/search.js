const search = document.querySelector("form > input[type='text']");
let table = document.querySelector("table > tbody");
console.log(giver()[1]);
const Department_choices =[
  "Public Safety and emergency services",
  "Student Affairs and services",
  "Academic Staff",
  "Financial Affairs",
  "Human Resources",
]
const showdata = (data,search_query)=>{
    table.innerHTML="";
    search_query = search_query.toLowerCase().trim();
    console.log(search_query)
    if(!search_query.length==0){
     data =data.filter((item)=> item.fname.toLowerCase().includes(search_query) || item.lname.toLowerCase().includes(search_query));
     console.log(data)
    }

for(let r=0; r<data.length; r++){
  table.innerHTML+=`<tr>
   <td>${data[r].id}</td>
   <td>${data[r].fname}&nbsp; ${data[r].lname}</td>
   <td>${Department_choices[data[r].Department[0]]}</td>
   <td><a href="Edit-User/${data[r].id}" target="_blank" class=action-icon ><i class="fa-solid fa-pen-to-square"></i></a>&nbsp; &nbsp; <a href="Submit-Vacation/${data[r].id}" class="action-icon"  ><i class="fa-solid fa-file"></i></a></td>
         </tr>`
         
}
}
search.addEventListener("change",function(e){
 console.log(e.target.value)
 showdata(giver()[1],e.target.value);
})


showdata(giver()[1],'')

