

let url = "https://projektdt207-1.onrender.com/api"; //sätter url till render länk

//let url = "http://localhost:3000/api"


function deleteToken() { //funktion för att radera token

    localStorage.removeItem("token");//radera token

};

function getToken() { //funktion för att hämta token

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

            //window.location.href = "login.html";//om ej token till login
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
                //window.location.href = "login.html"; //om ej ok response till login
                return
            }

            let matDiv = document.getElementById("matDiv"); //hämtar element
            let dryckDiv = document.getElementById("dryckDiv");//hämtar element
            
           let data = await response.json(); // sätter data 
            matDiv.innerHTML = ""; //rensar
            dryckDiv.innerHTML = "";//rensar

            //console.log("IF2")

            

            data.forEach(item => { //forecth loop
                console.log("loop")
                const ItemDiv = document.createElement("ul"); //skapar UL
                
                
                const typeLi = document.createElement("li"); //skapar LI och sätter innehåll
                typeLi.textContent = item.type;      

                const priceLi = document.createElement("li"); //skapar LI och sätter innehåll
                priceLi.textContent = "Pris: " + item.price;

                const nameLi = document.createElement("li"); //skapar LI och sätter innehåll
                nameLi.textContent = "Namn: " + item.name ;


                const descriptionLi = document.createElement("li"); //skapar LI och sätter innehåll
                descriptionLi.textContent = "Beskrivning: " + item.description;

                const deleteButton = document.createElement("button"); //skapar button och sätter innehåll
                deleteButton.textContent = "Radera";

                deleteButton.addEventListener("click", async () => { //vid click
                    try {

                        await fetch(url + "/meny" + item._id, { //hämtar url + /meny med delete
                            method: "DELETE",
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json"
                            }
                        });


                        ItemDiv.remove(); //tar bort
                    } catch (error) { //vid error
                        console.error(error);
                    }
                });


                const changeButton = document.createElement("button"); //skapar knapp o sätter innehåll
                changeButton.textContent = "Ändra";

                changeButton.addEventListener("click", async () => { //vid click

                    const nameInput = document.createElement("input"); //skapar en input sätter placeholder om man raderar innehåll. 
                    nameInput.value = item.name;
                    nameInput.placeholder = "Namn";


                    const descriptionInput = document.createElement("input"); //skapar en input sätter placeholder om man raderar innehåll. 
                    descriptionInput.value = item.description;
                    descriptionInput.placeholder = "Beskrivning";

                    const priceInput = document.createElement("input"); //skapar en input sätter placeholder om man raderar innehåll. 
                    priceInput.value = item.price;
                    priceInput.placeholder = "Pris";
                    
                    nameLi.replaceWith(nameInput); //ersätter tidigare 
                    descriptionLi.replaceWith(descriptionInput); //ersätter tidigare 
                    priceLi.replaceWith(priceInput); //ersätter tidigare 

                    changeButton.replaceWith(saveButton); //chnage blir sparaknapp. 


                    saveButton.addEventListener("click", async () => { //vid klick på spara

                    try {

                        const uppName = nameInput.value; //sätter till inputs värde.
                        const uppDescription = descriptionInput.value;  //sätter till inputs värde.
                        const uppPrice = parseFloat(priceInput.value); //gör om string till nummer

                        const uppData = { //definerar uppData med format
                            name: uppName,
                            description: uppDescription, 
                            price: parseFloat(uppPrice) 
                        };

                        await fetch(url + "/meny" + item._id, { //put förfrågan
                            method: "PUT",
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(uppData) //till string 
                        });

                            nameInput.replaceWith(nameLi); //ersätter
                            descriptionInput.replaceWith(descriptionLi); //ersätter
                            priceInput.replaceWith(priceLi); //ersätter

                            saveButton.replaceWith(changeButton); //ersätter

                            
                    } catch (error) { //vid error
                        console.error(error);
                    }
                    getAll(); //kör get all så de uppdateras
                });
            })
            
                const saveButton = document.createElement("button"); //skapr knapp samt sätter innehåll
                saveButton.textContent = "Spara";

                //ItemDiv.appendChild(typeLi);
                
                //lägger till allt i itemDiv
                ItemDiv.appendChild(nameLi); 
                ItemDiv.appendChild(priceLi);
                ItemDiv.appendChild(descriptionLi);
                ItemDiv.appendChild(deleteButton);
                ItemDiv.appendChild(changeButton);

                //om item.-type är Mat eller annat i detta fallet dryck då. 
                if (item.type === "Mat") {
                    matDiv.appendChild(ItemDiv);
                } else {
                    dryckDiv.appendChild(ItemDiv);
                }

                
                
         })
         const buttonMeny =document.getElementById("buttonMeny"); //hämtar element
         const formAdmin = document.getElementById("formAdmin");
         
         buttonMeny.addEventListener("click", async () => {  //vid click
             const token = getToken(); //hmtar token

             //hämtar alla elements values
             let nameItem = document.getElementById("nameID").value;  
             let priceItem =  document.getElementById("priceID").value;  
             let descriptionItem = document.getElementById("descriptionID").value;  
             let typeItem = document.getElementById("typeID").value;  
             
             const itemData = { //definerar itemData
                 name: nameItem,
                 price: priceItem,
                 description: descriptionItem,
                 type: typeItem
             };
         
             try {
                 const response = await fetch(url + "/meny", { //en post till api/meny
                     method: "POST",
                     headers: {
                         "Authorization": "Bearer " + token,
                         "Content-Type": "application/json"
                     },
         
                     body: JSON.stringify(itemData) //till string
                 })
         
                 if (!response.ok) { //om response ej är ok
                     console.log ("failed");
                 } else {
                     console.log("added")
                 }
                 
                 //formAdmin.reset();
         
             } catch (error) { //vid error
                 console.error("Error:", error.message);
             }
         
         })
         getBook(); //kör getBook
         async function getBook() { //funktion getBook
            try {

                const response = await fetch(url + "/booking", { //get för /booking
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                });
    
                const data = await response.json(); //sätter data

                const bookTable = document.getElementById("bookTableDiv"); //hämtar element
                data.forEach(booking => { //en foreatch loop kollar varje booking i datan. 
                    
                    const bookUl = document.createElement("ul"); //skapar UL
                    
                    const emailLI = document.createElement("li"); //skapar LI sätter innehåll
                    emailLI.textContent =  booking.email;      
    
                    const phoneLi = document.createElement("li");//skapar LI sätter innehåll
                    phoneLi.textContent =  booking.phone;
    
    
                    const fullNameLi = document.createElement("li"); //skapar LI sätter innehåll
                    fullNameLi.textContent =  booking.firstName + " " + booking.lastName;
     
                    const bookDateLi = document.createElement("li"); //skapar LI sätter innehåll
                    const bookDateNew = new Date(booking.bookDate);
                    
                    const formatDate = bookDateNew.toLocaleString("sv-SE", { //sätter så formatet visas som 2000-12-12 22:30 samt i vår tidzon.
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                    bookDateLi.textContent =  formatDate; //sätter till rätt format

                    const guestLi = document.createElement("li");  //skapar LI sätter innehåll
                    guestLi.textContent = "antal gäster: " + booking.numberGuests;

                    const deleteButton = document.createElement("button"); //skapar button sätter innehåll
                    deleteButton.textContent = "Radera"

                    deleteButton.addEventListener("click", async () => { //vid klick
                        try {
    
                            await fetch(url + "/booking" + booking._id, { //delete för /booking
                                method: "DELETE",
                                headers: {
                                    "Authorization": "Bearer " + token,
                                    "Content-Type": "application/json"
                                }
                            });
    
    
                            bookUl.remove(); //tar bort
                        } catch (error) {//vid error
                            console.error(error);
                        }
                    });

                    //lägger till i bookUl sen i booktable
                    bookUl.appendChild(fullNameLi);
                    bookUl.appendChild(emailLI);
                    bookUl.appendChild(phoneLi);
                    bookUl.appendChild(bookDateLi);
                    bookUl.appendChild(guestLi);
                    
                    bookUl.appendChild(deleteButton);
                    bookTable.appendChild(bookUl);
                }
            )
                
                
                
            } catch (error) { //vid error
                console.error(error);
            } 
         }
         


        
        };
        }catch (error) { //vid error
        console.error(error);
     }

     
 }





