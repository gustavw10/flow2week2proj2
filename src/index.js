import 'bootstrap/dist/css/bootstrap.css'


const url = "http://restcountries.eu/rest/v1/alpha?codes=";

document.getElementById("svg2").addEventListener("click", function(event){
   
    const eventTarget = event.target.id;
    fetch(url + eventTarget)
    .then(res=>fetchWithErrorCheck(res))
    .then((out) => {
      console.log( out);
    
      event.preventDefault;
      console.log(event.target.style)
      event.target.style.fill = "blue";
      const outp = JSON.stringify(out)
      document.getElementById("textbox").innerHTML = "Raw output fra endpoint:<br>" + outp;
    })
    .catch(err => { throw err });

});

function fetchWithErrorCheck(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}


const url2 = "https://www.conphas.com/corstest/api/person/all";
display();
function display() {
    document.getElementById("output").value = "";
    fetch(url2)
            .then(res => fetchWithErrorCheck(res))
            .then((data) => {
               console.log(data)

              var line = "<table class=\"table table-dark\">" + "<thead class=\"thead-dark\">" + "<tr>" + "<th scope=\"col\">ID</th>" + "<th scope=\"col\">Firstname</th>"
                + "<th scope=\"col\">Lastname</th>" + "<th scope=\"col\">Phone</th>" + "<th scope=\"col\">Street</th>" + 
                 "<th scope=\"col\">Zip</th>" + "<th scope=\"col\">City</th>" +"</tr>" + "</thead>" + "<tbody>"


               const trs = data.personsDTO.map(user => {
                    //return `<tr><td>${user.id}</td><td>${user.fName}</td><td>${user.lName}</td><td>${user.phone}</td><td>${user.street}</td><td>${user.zip}</td><td>${user.city}</td></tr>`
                    console.log(data)
                    line = line + "<tr>" + "<td>" + user.id + "</td>" + "<td>" + user.fName + "</td>" + "<td>" + user.lName + "</td>" + "<td>" + user.phone + "</td>" 
                    + "<td>" + user.street + "</td>" + "<td>" + user.zip + "</td>" + "<td>" + user.city + "</td>"  + "</tr>"
                });
                line = line + "</tr>" + "</tbody>" + "</table>"

                console.log(line)
                
                const trStr = trs.join("");
                document.getElementById("output").innerHTML = line;
                //console.log(trStr);
            });
}

document.getElementById("reloadPage").onclick = () => {
    window.location.reload();
}

document.getElementById("addMemb").onclick = () => {

    const dataMember = {
     name: document.getElementById("firstName").value,
     age: document.getElementById("lastName").value,
     gender: document.getElementById("phone").value,
     email: document.getElementById("street").value,
 }
     fetch(url2, {
         method: 'post',
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json'
   },
     body: JSON.stringify(dataMember)
       }).then(res=>res.json())
      .then(res => console.log(res));
      console.log(dataMember)
 }