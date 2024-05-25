

//url = "https://projektdt207-1.onrender.com/api";

let url = "http://localhost:3000/api"


function deleteToken() {

    localStorage.removeItem("token");

};

function getToken() {

    return localStorage.getItem("token") // returnerar token
}

document.addEventListener("DOMContentLoaded", function () { //När sidan laddats in körs
    console.log("DOM");
    getAll();//körs getAll
});


async function getAll() { //funktion getAll
    console.log("körs get all");
    const token = getToken(); //token från localstorage

    console.log(token); //loggar token

    try {
        if (!token || token == null) { //om token ej finns, alltå ej finns eller null

            console.error("Ingen token finns"); //skrivs ut

            window.location.href = "login.html";//om ej token till login
            return

        } else {

            const response = await fetch(url + "/secret", {//fetcha url/secret

                headers: {
                    "Authorization": "Bearer " + token, //verifikation med token
                    "Content-Type": "application/json"
                }
            })

            if (!response) { //Om responsen inte är ok
                console.log("IF1")
                console.error("Kunde ej hämta data"); //skrivs ut
                window.location.href = "login.html"; //om ej ok response till login
                return
            }

            let matDiv = document.getElementById("matDiv");
            let dryckDiv = document.getElementById("dryckDiv");
            
           let data = await response.json();
            matDiv.innerHTML = "";
            dryckDiv.innerHTML = "";

            console.log("IF2")

            
            
            

            data.forEach(item => {
                console.log("loop")
                const ItemDiv = document.createElement("ul");
                
                
                const typeLi = document.createElement("li");
                typeLi.textContent = item.type;      

                const priceLi = document.createElement("li");
                priceLi.textContent = "Pris: " + item.price;

                const nameLi = document.createElement("li");
                nameLi.textContent = "Namn: " + item.name ;


                const descriptionLi = document.createElement("li");
                descriptionLi.textContent = "Beskrivning: " + item.description;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Radera";

                deleteButton.addEventListener("click", async () => {
                    try {

                        await fetch(url + "/meny" + item._id, {
                            method: "DELETE",
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json"
                            }
                        });


                        ItemDiv.remove();
                    } catch (error) {
                        console.error(error);
                    }
                });


                const changeButton = document.createElement("button");
                changeButton.textContent = "Ändra";

                changeButton.addEventListener("click", async () => {

                    const nameInput = document.createElement("input");
                    nameInput.value = item.name;
                    nameInput.placeholder = "Namn";


                    const descriptionInput = document.createElement("input");
                    descriptionInput.value = item.description;
                    descriptionInput.placeholder = "Beskrivning";

                    const priceInput = document.createElement("input");
                    priceInput.value = item.price;
                    priceInput.placeholder = "Pris";
                    
                    nameLi.replaceWith(nameInput);
                    descriptionLi.replaceWith(descriptionInput);
                    priceLi.replaceWith(priceInput);

                    changeButton.replaceWith(saveButton);


                    saveButton.addEventListener("click", async () => {

                    try {

                        const uppName = nameInput.value; 
                        const uppDescription = descriptionInput.value; 
                        const uppPrice = parseFloat(priceInput.value); 

                        const uppData = {
                            name: uppName,
                            description: uppDescription,
                            price: parseFloat(uppPrice) 
                        };

                        await fetch(url + "/meny" + item._id, {
                            method: "PUT",
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(uppData)
                        });

                            nameInput.replaceWith(nameLi);
                            descriptionInput.replaceWith(descriptionLi);
                            priceInput.replaceWith(priceLi);

                            saveButton.replaceWith(changeButton);

                            
                    } catch (error) {
                        console.error(error);
                    }
                    getAll();
                });
            })
            
                const saveButton = document.createElement("button");
                saveButton.textContent = "Spara";

                //ItemDiv.appendChild(typeLi);
                
                ItemDiv.appendChild(nameLi);
                ItemDiv.appendChild(priceLi);
                ItemDiv.appendChild(descriptionLi);
                ItemDiv.appendChild(deleteButton);
                ItemDiv.appendChild(changeButton);


                if (item.type === "Mat") {
                    matDiv.appendChild(ItemDiv);
                } else {
                    dryckDiv.appendChild(ItemDiv);
                }

                
                
         })};
        }catch (error) { //vid error
        console.error(error);
     }
 }



const buttonMeny =document.getElementById("buttonMeny");
const formAdmin = document.getElementById("formAdmin");

buttonMeny.addEventListener("click", async () => { 
    const token = getToken();
    let nameItem = document.getElementById("nameID").value;  
    let priceItem =  document.getElementById("priceID").value;  
    let descriptionItem = document.getElementById("descriptionID").value;  
    let typeItem = document.getElementById("typeID").value;  
    
    const itemData = {
        name: nameItem,
        price: priceItem,
        description: descriptionItem,
        type: typeItem
    };

    try {
        const response = await fetch(url + "/meny", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },

            body: JSON.stringify(itemData)
        })

        if (!response.ok) {
            console.log ("failed", response.statusText);
        } else {
            console.log("added")
        }
        
        //formAdmin.reset();

    } catch (error) {
        console.error('Error:', error.message);
    }



})

