
//let url = "https://projektdt207.onrender.com/api" // url


let url = "https://projektdt207-1.onrender.com/api";

//let url = "http://localhost:3000/api"

//----------------logga in användare--------------------------------//

let loginButton = document.getElementById("buttonLogin"); //hämtar knappen

loginButton.addEventListener("click", async function(e) { //vid klick
    e.preventDefault(); //hindrar defualt
    
    let usernameInput = document.getElementById("usernameIDLogin").value;//shämtar username
    let passwordInput = document.getElementById("passwordIDLogin").value;//hämtar password
    let errorDiv = document.getElementById("messageErr");

    const user = { //skapar user med värden som hämtades
        username: usernameInput,
        password: passwordInput
    };

    try {
    const response = await fetch(url+"/login", { //skickat fetch mot url
        method: "POST", //POST förfrågan
        headers: {
          "Content-Type": "application/json", //JSON fromat
        },
        
        body: JSON.stringify(user) //Gör om user till json
      })
      if (!response.ok) { //om response är ej ok
        console.log("error")
        throw new Error("inloggning misslyckades"); //skickar error
      }
    
      const data = await response.json(); //till json 

    
      localStorage.setItem("token", data.recivedToken.token); //sparar token i localstorage från data.recivedToken
      console.log("Bra inloggning");
      window.location.href = "admin.html" //laddar in 

      
    } catch(error) { //vid error
        console.error("Fel inloggning", error) 
        errorDiv.textContent = "Felaktigt användarnamn/lösenord"; //skriver ut i errodiv
        errorDiv.style.display = "block"; //ändrar till block
      }

})
