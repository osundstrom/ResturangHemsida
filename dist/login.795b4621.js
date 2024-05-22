let url = "https://projektdt207.onrender.com/api" // url
;
//----------------logga in användare--------------------------------//
let loginButton = document.getElementById("buttonLogin"); //hämtar knappen
loginButton.addEventListener("click", async function(e) {
    e.preventDefault(); //hindrar defualt
    let usernameInput = document.getElementById("usernameIDLogin").value; //shämtar username
    let passwordInput = document.getElementById("passwordIDLogin").value; //hämtar password
    let errorDiv = document.getElementById("messageErr");
    const user = {
        username: usernameInput,
        password: passwordInput
    };
    try {
        const response = await fetch(url + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user) //Gör om user till json
        });
        if (!response.ok) {
            console.log("error");
            throw new Error("inloggning misslyckades"); //skickar error
        }
        const data = await response.json(); //till json 
        localStorage.setItem("token", data.recivedToken.token); //sparar token i localstorage från data.recivedToken
        console.log("Bra inloggning");
        window.location.href = "admin.html" //laddar in 
        ;
    } catch (error) {
        console.error("Fel inloggning", error);
        errorDiv.textContent = "Felaktigt anv\xe4ndarnamn/l\xf6senord"; //skriver ut i errodiv
        errorDiv.style.display = "block"; //ändrar till block
    }
});

//# sourceMappingURL=login.795b4621.js.map
