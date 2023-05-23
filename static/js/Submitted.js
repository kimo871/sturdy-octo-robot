const Department_choices =[
    "Public Safety and emergency services",
    "Student Affairs and services",
    "Academic Staff",
    "Financial Affairs",
    "Human Resources",
  ]

let datapro = giver() ;
let date_now = new Date();
const request = async(Method,key,token)=>{
    const operation = await fetch("http://127.0.0.1:8000/Employees/Submitted-Vacations",{
        method:Method,
        headers:{
            "Content-Type":"application/json",
            "X-CSRFToken":token
        },
        body:JSON.stringify({"id":key})
    }).then(res=> {
       window.location.reload()
    })
}
const send_Vacation = function (Method,key,token){
    console.log(key)
   request(Method,key,token);
}
function show_data(){
    let days;

    let tabel = '';
    for (let i = 0; i < datapro.length;i++){

        let s_date = new Date(datapro[i].startDate);
        let e_date = new Date(datapro[i].endDate);
       // diff_now_end = diff_days(date_now,e_date);
       // diff_now_start = diff_days(date_now,s_date);
       // diff_start_end = diff_days(s_date,e_date);

            tabel += `
        <tr>
            <td>${datapro[i].id}</td>
            <td>${datapro[i].fname}  ${datapro[i].lname}</td>
            <td>${Department_choices[datapro[i].department]}</td>
            <td>${datapro[i].start} <span id="to">To</span> ${datapro[i].end}</td>
            <td>${datapro[i].rest}</td>
            <td>${datapro[i].reason}</td>`
            if(datapro[i].status==="False"){
                tabel+=`<td><button id="sp" key=${datapro[i].vacancy_id} onclick='send_Vacation("PUT",${datapro[i].vacancy_id},token_giver())'}>ACCEPT</button>&nbsp; &nbsp;<button id="sp" onclick='send_Vacation("DELETE",${datapro[i].vacancy_id},token_giver())' } >Refuse</button>`
            }
            else{
                tabel+=`<td>Accepted`
            }
        tabel+=`
            </td>
            
        </tr>
        `
        
    }
    document.getElementById("tbody").innerHTML = tabel;
}


window.onload = show_data();


function delete_data(i){
    datapro.splice(i,1)
    localStorage.vacations = JSON.stringify(datapro)
    localStorage.setItem("rejected",parseInt(localStorage.getItem("rejected"))+1);
    show_data();
}

function acc_vac(i,days){
    let ans = get_employees.filter((item)=> item.id == datapro[i].id);
    console.log(days)
    ans[0].vac_approved= parseInt(ans[0].vac_approved);
  if(ans[0].vac_available > 0){
    ans[0].vac_approved+=days;
     ans[0].vac_available-=days;
    console.log(datapro[i]);
    console.log(ans);
    datapro[i].statues = true;
    localStorage.vacations = JSON.stringify(datapro)
    get_employees = get_employees.map((item)=>{return item.id == datapro[i].id ? Object.assign(item,{vac_approved:ans[0].vac_approved,vac_available:ans[0].vac_available}):item})
    localStorage.setItem("accepted",parseInt(localStorage.getItem("accepted"))+1);
    localStorage.setItem("rejected",parseInt(localStorage.getItem("rejected"))-1);
    localStorage.setItem("employees",JSON.stringify(get_employees));
    }
    delete_data(i)
    show_data()

}


