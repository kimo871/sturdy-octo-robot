
let reason = document.getElementById("reason");
let start_date = document.getElementById("start_date");
let end_date = document.getElementById("end_date");
let form = document.querySelector("form");
console.log(giver()[0],giver()[1],giver()[2])
var handle = async (id,token,obj)=>{
    const operation = await fetch(`Employees/Submit-Vacation/${id}/`,{
     method:"POST",
     headers:{
         "Content-Type":"application/json",
         "credentials": 'same-origin',
         "X-CSRFToken":token
     },
     body:JSON.stringify(obj)
    })
  }

form.onsubmit =function(e){
    e.preventDefault();
    const date1 = new Date(start_date.value);
    let date3 = date1.toDateString();
    const date2 = new Date(end_date.value);
    let date4 = date2.toDateString();
    const date5 = new Date();

    let rest = (date2.getTime() - date1.getTime()) /(1000 * 3600 * 24)+1;

    if (date1 < date5){
        window.alert("wrong add because start Date was left")
    }
    else if(date3 === date4){
        window.alert("wrong add because start_date = end_date")
    }

    else if(rest > giver()[1]){
        alert(`you don't have enough available vacations for this duration your available balance is ${giver()[1]} `)
    }
    else{

        let obj={
            vac_available : giver()[1],
            id:giver()[0],
            start:start_date.value,
            end:end_date.value,
            reason:reason.value,
            rest:rest    
        }
        console.log(JSON.stringify(obj))
        handle(giver()[0],csrftoken,obj)
        window.location.reload()
     
}


}
