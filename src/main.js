
//let url = "http://localhost:3000/api"

let url = "https://projektdt207-1.onrender.com/api"; //sätter  url


document.addEventListener("DOMContentLoaded", function (e) { //När sidan laddats in körs
    console.log("DOM");
    e.preventDefault(); //hindrar default
    getAll();//körs getAll
    getReview(); //kör
});


async function getAll() { //funktion getAll

    try {

            const response = await fetch(url + "/meny", {//fetcha url/secret

                headers: {
                    "Content-Type": "application/json"
                }
            })

           

            let matDiv = document.getElementById("matDiv"); //hämtar element
            let dryckDiv = document.getElementById("dryckDiv"); //hämtar element
            
           let data = await response.json(); //sätter data
            matDiv.innerHTML = ""; //rensar
            dryckDiv.innerHTML = ""; //rensar

            //console.log("IF2")

            
            
            

            data.forEach(item => { //en forEatch loop för varje item i datan. 
                console.log("loop")
                const ItemDiv = document.createElement("ul"); //skapar UL
                
                
                const typeLi = document.createElement("li"); //skapar LI och sätter innehåll
                typeLi.textContent = item.type;      

                const priceLi = document.createElement("li"); //skapar LI och sätter innehåll
                priceLi.textContent =  "\u00A0\u00A0\u00A0\u00A0\u00A0" + "-" + "\u00A0\u00A0\u00A0\u00A0\u00A0" + item.price + ":-"; //u00A0 ger mellanrum, funkade ej med bara +""+"" osv.
                priceLi.style.display = "inline-block"; //lite styles
                priceLi.style.color = "orange"; //lite styles
                priceLi.style.textShadow= "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000"; //lite styles

                const nameLi = document.createElement("li"); //skapar LI och sätter innehåll
                nameLi.textContent = item.name ;
                nameLi.style.fontWeight = "900"; //lite styles
                //nameLi.style.textDecoration = "underline";
                nameLi.style.color = "orange"; //lite styles
                nameLi.style.display = "inline-block"; //lite styles
                nameLi.style.textShadow= "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000"; //lite styles

                

                const descriptionLi = document.createElement("li"); //skapar LI och sätter innehåll
                descriptionLi.textContent =  item.description;
                descriptionLi.style.color = "white"; //lite styles
                descriptionLi.style.textShadow= "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000"; //lite styles

                //lägger till i itemDiv
                ItemDiv.appendChild(nameLi);
                ItemDiv.appendChild(priceLi);
                ItemDiv.appendChild(descriptionLi);

                
                //om de är valt Mat eller annat så läggs de till i olika
                if (item.type === "Mat") {
                    matDiv.appendChild(ItemDiv);
                } else {
                    dryckDiv.appendChild(ItemDiv);
                }

                
                
         });
        }catch (error) { //vid error
        console.error(error);
     }
 }
const bookingButton = document.getElementById("resButton"); //hämtar elemnt
const divMessage = document.getElementById("divMessage");  //hämtar elemnt
bookingButton.addEventListener("click", function(e) { //vid clikc
    e.preventDefault(); //hindrar default
    saveBooking();
})

async function saveBooking() { //funktion för att spara en bokning
    
    //hämtar element
    let emailInput = document.getElementById("emailID"); 
    let phoneInput = document.getElementById("phoneID");
    let firstNameInput = document.getElementById("firstNameID");
    let lastNameInput = document.getElementById("lastNameID");
    let tableInput = document.getElementById("tableID");
    let bookDateInput = document.getElementById("bookDateID");

    //hämtar värdena
    let emailData = emailInput.value;  
    let phoneData = phoneInput.value;  
    let firstNameData = firstNameInput.value;  
    let lastNameData = lastNameInput.value;  
    let tableData = tableInput.value;
    let bookDateData = new Date(bookDateInput.value);

    bookDateData.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" }); //sätter rätt tidzon


    const bookingData = {  //definerar bookingData
        email: emailData,
        phone: phoneData,
        firstName: firstNameData,
        lastName: lastNameData,
        numberGuests: tableData,
        bookDate: bookDateData 
    };

    try {
        const respone = await fetch(url + "/booking", { //fetahcer /booking med Post förfrågan
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bookingData) //till string
        })

        if(respone.ok) { //om responsen är ok
            divMessage.textContent = "Tack för din bokning"; //skriver ut
            divMessage.style.display ="block";

            //renser alla 
            emailInput.value = "";
            phoneInput.value = "";
            firstNameInput.value = "";
            lastNameInput.value = "";
            tableInput.value = "";
            bookDateInput.value = "";
        }

    } catch (error) { //vid error
        console.error( error);
    }
}



const sendButton = document.getElementById("sendButton"); //hämtar element
const divMessage2 = document.getElementById("divMessage2"); //hämtar element

sendButton.addEventListener("click", function(e) { //vid klick
    e.preventDefault(); //hindrarv default
    saveReview(); //kör 
})

async function saveReview() { //saveReview funktion
    
    let nameInput = document.getElementById("fullNameID"); //hämtar element
    let messageInput = document.getElementById("messageID"); //hämtar element
    

    let nameData = nameInput.value;    
    let messageData = messageInput.value;  

    let ratingInput = document.getElementsByClassName("ratingClass"); //hämtar element med class då det är flera

    let ratingData; //sätter ratingData
    for (const ratings of ratingInput) { //kör en for loop
        if (ratings.checked) { //kollar om de är markerat
            ratingData = ratings.value; //sätter datan til värdset borende på antal radio knappar markerade
            break;
        }
    }


    if (!nameData || !ratingData || !messageData) { //om dem är tomma
        divMessage2.textContent = "Alla fält måste fyllas i!"; //skrivs ut
        divMessage2.style.display = "block";
        divMessage2.style.color = "orange";
        return;
    }


    const reviewData = { //definerar reviewData
        name: nameData,
        rating: ratingData,
        message: messageData
    };

    try {
        const respone = await fetch(url + "/review", { //fetchar /review med POST metod
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(reviewData) //till string
        })

        if(respone.ok) { //om repsonse är ok. 
            divMessage2.textContent = "Tack för din recension"; //skriver ut
            divMessage2.style.display ="block";

            nameInput.value = ""; //rensar
            messageInput.value = "";  //rensar

            for (const rating of ratingInput) {  //rensar radiknapparna
                rating.checked = false; //ingen i bockad
            }

        }

    } catch (error) { //vid error
        console.error( error);
    }

    getReview() //kör getReview
}

async function getReview() { //funktion getReview
    
    //console.log("getReview")
        try {

            const response = await fetch(url + "/review", { //fetchar /review med en GET
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json(); //sätter data
            const reviewsDiv = document.getElementById("reviewsDiv"); //hämtar element

            reviewsDiv.innerHTML = ""; //rensar

            const last2Reviews = data.slice(-2).reverse(); //väljer så endast 2 senaste i datan hämtas. 

            last2Reviews.forEach(review => { //kör en foreatchloop för recensioner endast av de 2 senaste i listan som skapades innan. 
                
                const reviewUl = document.createElement("ul"); //skapar UL
                
                const nameLi = document.createElement("li"); //skapar LI samt sätter inehåll.
                nameLi.textContent =  review.name;
                nameLi.style.color = "orange";  //styling

                const ratingLi = document.createElement("li"); //skapar LI samt sätter inehåll.
                ratingLi.textContent =  "Betyg: " + review.rating +"/5"; 
                ratingLi.style.color = "yellow";   //styling

                const messageLi = document.createElement("li"); //skapar LI samt sätter inehåll.
                messageLi.textContent =  review.message;
                

                //lägger till i reviewUl sen i reviewDiv
                reviewUl.appendChild(nameLi);
                reviewUl.appendChild(ratingLi);
                reviewUl.appendChild(messageLi);
                
                reviewsDiv.appendChild(reviewUl);
            }
        )
            
            
            
        } catch (error) { //vid error
            console.error(error);
        } 
     
}
