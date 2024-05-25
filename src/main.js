
let url = "http://localhost:3000/api"


document.addEventListener("DOMContentLoaded", function () { //När sidan laddats in körs
    console.log("DOM");
    getAll();//körs getAll
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
                priceLi.textContent =  "\u00A0\u00A0\u00A0\u00A0\u00A0" + item.price + ":-";
                priceLi.style.display = "inline-block";
                priceLi.style.color = "black";
                priceLi.style.textShadow= "-1px -1px 0 #f4c885, 1px -1px 0 #f4c885, -1px  1px 0 #f4c885, 1px  1px 0 #f4c885";

                const nameLi = document.createElement("li");
                nameLi.textContent = item.name ;
                nameLi.style.fontWeight = "900";
                nameLi.style.textDecoration = "underline";
                nameLi.style.fontSize = "130%";
                nameLi.style.display = "inline-block";
                nameLi.style.textShadow= "-1px -1px 0 #f4c885, 1px -1px 0 #f4c885, -1px  1px 0 #f4c885, 1px  1px 0 #f4c885";

                

                const descriptionLi = document.createElement("li");
                descriptionLi.textContent =  item.description;
                descriptionLi.style.textShadow= "-1px -1px 0 #f4ec76, 1px -1px 0 #f4ec76, -1px  1px 0 #f4ec76, 1px  1px 0 #f4ec76";

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