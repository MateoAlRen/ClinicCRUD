let loginClinic = document.getElementById("loginClinic")

loginClinic.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("emailClinic").value;
    let password = document.getElementById("passwordClinic").value;
    if (!email || !password) {
        alert("You need to load the info to login!");
    } else {
        getValidated(email,password)
    }
});

async function getValidated(email,password) {
    try {
        const res = await fetch("http://localhost:3000/administrator", {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        const validation = data.find(user => user.email === email && user.admin_password === password);

        if (validation) {
            alert("Logged succesfully!")
        } else {
            alert("The user doesn´t exist")
        }
    } catch (error) {
        console.error(`Your petition has a problem: ${error}`)
    }
}




