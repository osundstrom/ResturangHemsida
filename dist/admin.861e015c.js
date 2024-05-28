let url = "https://projektdt207-1.onrender.com/api"; //sätter url till render länk
//let url = "http://localhost:3000/api"
let adminLock = document.getElementById("adminLock");
adminLock.addEventListener("click", function() {
    deleteToken();
});
function deleteToken() {
    console.log("deletedToken");
    localStorage.removeItem("token"); //radera token
}
function getToken() {
    return localStorage.getItem("token") // returnerar token
    ;
}
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM");
    getAll(); //körs getAll
});
async function getAll() {
    console.log("k\xf6rs get all");
    const token = getToken(); //token från localstorage
    console.log(token); //loggar token
    try {
        if (!token || token == null) {
            console.error("Ingen token finns"); //skrivs ut
            window.location.href = "login.html"; //om ej token till login
            return;
        } else {
            const response = await fetch(url + "/secret", {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });
            if (!response) {
                console.log("IF1");
                console.error("Kunde ej h\xe4mta data"); //skrivs ut
                window.location.href = "login.html"; //om ej ok response till login
                return;
            }
            let matDiv = document.getElementById("matDiv"); //hämtar element
            let dryckDiv = document.getElementById("dryckDiv"); //hämtar element
            let data = await response.json(); // sätter data 
            matDiv.innerHTML = ""; //rensar
            dryckDiv.innerHTML = ""; //rensar
            //console.log("IF2")
            data.forEach((item)=>{
                console.log("loop");
                const ItemDiv = document.createElement("ul"); //skapar UL
                const typeLi = document.createElement("li"); //skapar LI och sätter innehåll
                typeLi.textContent = item.type;
                const priceLi = document.createElement("li"); //skapar LI och sätter innehåll
                priceLi.textContent = "Pris: " + item.price;
                const nameLi = document.createElement("li"); //skapar LI och sätter innehåll
                nameLi.textContent = "Namn: " + item.name;
                const descriptionLi = document.createElement("li"); //skapar LI och sätter innehåll
                descriptionLi.textContent = "Beskrivning: " + item.description;
                const deleteButton = document.createElement("button"); //skapar button och sätter innehåll
                deleteButton.textContent = "Radera";
                deleteButton.addEventListener("click", async ()=>{
                    try {
                        await fetch(url + "/meny" + item._id, {
                            method: "DELETE",
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json"
                            }
                        });
                        ItemDiv.remove(); //tar bort
                    } catch (error) {
                        console.error(error);
                    }
                });
                const changeButton = document.createElement("button"); //skapar knapp o sätter innehåll
                changeButton.textContent = "\xc4ndra";
                changeButton.addEventListener("click", async ()=>{
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
                    saveButton.addEventListener("click", async ()=>{
                        try {
                            const uppName = nameInput.value; //sätter till inputs värde.
                            const uppDescription = descriptionInput.value; //sätter till inputs värde.
                            const uppPrice = parseFloat(priceInput.value); //gör om string till nummer
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
                                body: JSON.stringify(uppData) //till string 
                            });
                            nameInput.replaceWith(nameLi); //ersätter
                            descriptionInput.replaceWith(descriptionLi); //ersätter
                            priceInput.replaceWith(priceLi); //ersätter
                            saveButton.replaceWith(changeButton); //ersätter
                        } catch (error) {
                            console.error(error);
                        }
                        getAll(); //kör get all så de uppdateras
                    });
                });
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
                if (item.type === "Mat") matDiv.appendChild(ItemDiv);
                else dryckDiv.appendChild(ItemDiv);
            });
            const buttonMeny = document.getElementById("buttonMeny"); //hämtar element
            const formAdmin = document.getElementById("formAdmin");
            buttonMeny.addEventListener("click", async ()=>{
                const token = getToken(); //hmtar token
                //hämtar alla elements values
                let nameItem = document.getElementById("nameID").value;
                let priceItem = document.getElementById("priceID").value;
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
                        body: JSON.stringify(itemData) //till string
                    });
                    if (!response.ok) console.log("failed");
                    else console.log("added");
                //formAdmin.reset();
                } catch (error) {
                    console.error("Error:", error.message);
                }
            });
            getBook(); //kör getBook
            async function getBook() {
                try {
                    const response = await fetch(url + "/booking", {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json(); //sätter data
                    const bookTable = document.getElementById("bookTableDiv"); //hämtar element
                    data.forEach((booking)=>{
                        const bookUl = document.createElement("ul"); //skapar UL
                        const emailLI = document.createElement("li"); //skapar LI sätter innehåll
                        emailLI.textContent = booking.email;
                        const phoneLi = document.createElement("li"); //skapar LI sätter innehåll
                        phoneLi.textContent = booking.phone;
                        const fullNameLi = document.createElement("li"); //skapar LI sätter innehåll
                        fullNameLi.textContent = booking.firstName + " " + booking.lastName;
                        const bookDateLi = document.createElement("li"); //skapar LI sätter innehåll
                        const bookDateNew = new Date(booking.bookDate);
                        const formatDate = bookDateNew.toLocaleString("sv-SE", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        });
                        bookDateLi.textContent = formatDate; //sätter till rätt format
                        const guestLi = document.createElement("li"); //skapar LI sätter innehåll
                        guestLi.textContent = "antal g\xe4ster: " + booking.numberGuests;
                        const deleteButton = document.createElement("button"); //skapar button sätter innehåll
                        deleteButton.textContent = "Radera";
                        deleteButton.addEventListener("click", async ()=>{
                            try {
                                await fetch(url + "/booking" + booking._id, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": "Bearer " + token,
                                        "Content-Type": "application/json"
                                    }
                                });
                                bookUl.remove(); //tar bort
                            } catch (error) {
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
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

//# sourceMappingURL=admin.861e015c.js.map
