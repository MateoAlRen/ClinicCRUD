export async function loginCRUD() {
    document.getElementById("outPut").innerHTML = `
        <form>
        <div
            style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
            <div style="border: 1px solid rgba(0, 0, 0, 0.411); padding: 6rem; border-radius: 25px; box-shadow: 0px 0px 2px black;">
                <div class="mb-5">
                    <label for="InputEmail" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="emailClinic" placeholder="Email" required>
                </div>
                <div class="mb-5">
                    <label for="InputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" placeholder="password" id="passwordClinic" required>
                </div>
                <button type="click" id="loginClinic" class="btn btn-secondary w-100" style="color: white;">Submit</button>
                <div id="loginStatus" style="text-align: center; margin-top: 2rem;"></div>
            </div>
        </div>
    </form>
    `
    window.location.hash = "#/login"
let loginClinic = document.getElementById("loginClinic");
let status = document.getElementById("loginStatus");

loginClinic.addEventListener("click", (e) => {
    status.innerHTML = ``;
    e.preventDefault();
    let email = document.getElementById("emailClinic").value;
    let password = document.getElementById("passwordClinic").value;
    if (!email || !password) {
        status.innerHTML = `<span style="color: red"> You need to complete all the fields! </span>`
    } else {
        getValidated(email,password)
    };
});

async function getValidated(email,password) {
    status.innerHTML = ``;
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
            sessionStorage.setItem("user", JSON.stringify(validation));
            status.innerHTML = `<span style="color: black"> Welcome back, ${validation.admin_name} </span>`
            setTimeout(() => {
                window.location.hash = "#/home/crud"
            }, 3000);
        } else {
            status.innerHTML = `<span style="color: red"> The email or password are wrong! </span>`
        }
    } catch (error) {
        console.error(`Your petition has a problem: ${error}`)
    }
}


}






