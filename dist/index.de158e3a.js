let url = "http://localhost:3000/api";
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM");
    getAll(); //körs getAll
});
async function getAll() {
    try {
        const response = await fetch(url + "/meny", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        let matDiv = document.getElementById("matDiv");
        let dryckDiv = document.getElementById("dryckDiv");
        let data = await response.json();
        matDiv.innerHTML = "";
        dryckDiv.innerHTML = "";
        console.log("IF2");
        data.forEach((item)=>{
            console.log("loop");
            const ItemDiv = document.createElement("ul");
            const typeLi = document.createElement("li");
            typeLi.textContent = item.type;
            const priceLi = document.createElement("li");
            priceLi.textContent = "\xa0\xa0\xa0\xa0\xa0-\xa0\xa0\xa0\xa0\xa0" + item.price + ":-";
            priceLi.style.display = "inline-block";
            priceLi.style.color = "orange";
            priceLi.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";
            const nameLi = document.createElement("li");
            nameLi.textContent = item.name;
            nameLi.style.fontWeight = "900";
            //nameLi.style.textDecoration = "underline";
            nameLi.style.fontSize = "130%";
            nameLi.style.color = "orange";
            nameLi.style.display = "inline-block";
            nameLi.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";
            const descriptionLi = document.createElement("li");
            descriptionLi.textContent = item.description;
            descriptionLi.style.color = "white";
            descriptionLi.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";
            ItemDiv.appendChild(nameLi);
            ItemDiv.appendChild(priceLi);
            ItemDiv.appendChild(descriptionLi);
            if (item.type === "Mat") matDiv.appendChild(ItemDiv);
            else dryckDiv.appendChild(ItemDiv);
        });
    } catch (error) {
        console.error(error);
    }
}
const bookingButton = document.getElementById("resButton");
const divMessage = document.getElementById("divMessage");
bookingButton.addEventListener("click", function(e) {
    e.preventDefault();
    saveBooking();
});
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
    bookDateData.toLocaleString("sv-SE", {
        timeZone: "Europe/Stockholm"
    });
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
        });
        if (respone.ok) {
            divMessage.textContent = "Tack f\xf6r din bokning";
            divMessage.style.display = "block";
            emailInput.value = "";
            phoneInput.value = "";
            firstNameInput.value = "";
            lastNameInput.value = "";
            tableInput.value = "";
            bookDateInput.value = "";
        }
    } catch (error) {
        console.error(error);
    }
}

//# sourceMappingURL=index.de158e3a.js.map
