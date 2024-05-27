
let url = "http://localhost:3000/api"


document.addEventListener("DOMContentLoaded", function (e) { //När sidan laddats in körs
    console.log("DOM");
    e.preventDefault();
    getAll();//körs getAll
    getReview();
});


async function getAll() { //funktion getAll

    try {

            const response = await fetch(url + "/meny", {//fetcha url/secret

                headers: {
                    "Content-Type": "application/json"
                }
            })

           

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
                priceLi.textContent =  "\u00A0\u00A0\u00A0\u00A0\u00A0" + "-" + "\u00A0\u00A0\u00A0\u00A0\u00A0" + item.price + ":-";
                priceLi.style.display = "inline-block";
                priceLi.style.color = "orange";
                priceLi.style.textShadow= "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";

                const nameLi = document.createElement("li");
                nameLi.textContent = item.name ;
                nameLi.style.fontWeight = "900";
                //nameLi.style.textDecoration = "underline";
                nameLi.style.color = "orange";
                nameLi.style.display = "inline-block";
                nameLi.style.textShadow= "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";

                

                const descriptionLi = document.createElement("li");
                descriptionLi.textContent =  item.description;
                descriptionLi.style.color = "white";
                descriptionLi.style.textShadow= "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";

                ItemDiv.appendChild(nameLi);
                ItemDiv.appendChild(priceLi);
                ItemDiv.appendChild(descriptionLi);


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
const bookingButton = document.getElementById("resButton");
const divMessage = document.getElementById("divMessage");
bookingButton.addEventListener("click", function(e) {
    e.preventDefault();
    saveBooking();
})

async function saveBooking() {
    
    let emailInput = document.getElementById("emailID");
    let phoneInput = document.getElementById("phoneID");
    let firstNameInput = document.getElementById("firstNameID");
    let lastNameInput = document.getElementById("lastNameID");
    let tableInput = document.getElementById("tableID");
    let bookDateInput = document.getElementById("bookDateID");


    let emailData = emailInput.value;  
    let phoneData = phoneInput.value;  
    let firstNameData = firstNameInput.value;  
    let lastNameData = lastNameInput.value;  
    let tableData = tableInput.value;
    let bookDateData = new Date(bookDateInput.value);

    bookDateData.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });


    const bookingData = {
        email: emailData,
        phone: phoneData,
        firstName: firstNameData,
        lastName: lastNameData,
        numberGuests: tableData,
        bookDate: bookDateData 
    };

    try {
        const respone = await fetch(url + "/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bookingData)
        })

        if(respone.ok) {
            divMessage.textContent = "Tack för din bokning";
            divMessage.style.display ="block";

            emailInput.value = "";
            phoneInput.value = "";
            firstNameInput.value = "";
            lastNameInput.value = "";
            tableInput.value = "";
            bookDateInput.value = "";
        }

    } catch (error) {
        console.error( error);
    }
}



const sendButton = document.getElementById("sendButton");
const divMessage2 = document.getElementById("divMessage2");

sendButton.addEventListener("click", function(e) {
    e.preventDefault();
    saveReview();
})

async function saveReview() {
    
    let nameInput = document.getElementById("fullNameID");
    let messageInput = document.getElementById("messageID");
    

    let nameData = nameInput.value;    
    let messageData = messageInput.value;  

    let ratingInput = document.getElementsByClassName("ratingClass");

    let ratingData;
    for (const ratings of ratingInput) {
        if (ratings.checked) {
            ratingData = ratings.value;
            break;
        }
    }


    if (!nameData || !ratingData || !messageData) {
        divMessage2.textContent = "Alla fält måste fyllas i!";
        divMessage2.style.display = "block";
        divMessage2.style.color = "orange";
        return;
    }


    const reviewData = {
        name: nameData,
        rating: ratingData,
        message: messageData
    };

    try {
        const respone = await fetch(url + "/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(reviewData)
        })

        if(respone.ok) {
            divMessage2.textContent = "Tack för din recension";
            divMessage2.style.display ="block";

            nameInput.value = "";
            messageInput.value = "";

            for (const rating of ratingInput) {
                rating.checked = false;
            }

        }

    } catch (error) {
        console.error( error);
    }

    getReview()
}

async function getReview() {
    
    console.log("getReview")
        try {

            const response = await fetch(url + "/review", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            const reviewsDiv = document.getElementById("reviewsDiv");

            reviewsDiv.innerHTML = "";

            const last2Reviews = data.slice(-2).reverse();

            last2Reviews.forEach(review => {
                
                const reviewUl = document.createElement("ul");
                
                const nameLi = document.createElement("li");
                nameLi.textContent =  review.name;
                nameLi.style.color = "orange";  

                const ratingLi = document.createElement("li");
                ratingLi.textContent =  "Betyg: " + review.rating +"/5";
                ratingLi.style.color = "yellow";  

                const messageLi = document.createElement("li");
                messageLi.textContent =  review.message;
                


                reviewUl.appendChild(nameLi);
                reviewUl.appendChild(ratingLi);
                reviewUl.appendChild(messageLi);
                
                reviewsDiv.appendChild(reviewUl);
            }
        )
            
            
            
        } catch (error) {
            console.error(error);
        } 
     
}
