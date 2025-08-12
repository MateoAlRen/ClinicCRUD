export async function homeCRUD() {
    document.getElementById("outPut").innerHTML = `
         <div style="display: flex;">
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px; height: 100vh;">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-4">Clinic Crud</span>
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li>
                        <a href="#/home/crud" class="nav-link text-white">
                            Doctors
                        </a>
                    </li>
                    <li>
                        <a href="#/home/crud" class="nav-link text-white">
                            Patients
                        </a>
                    </li>
                    <li>
                        <a href="#/home/crud" class="nav-link text-white">
                            Appointments
                        </a>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                        <strong>mdo</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1"
                        style="">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
            <div style="width: 100%;">
                <form>
                    <div style="text-align: center; padding-bottom: 2rem; padding-top: 2rem;">
                    <h1>Doctor's Section</h1>
                    <div style="display: flex; margin-top: 2rem">
                        <div class="row g-3 align-items-center" style="padding-left: 2rem">
                        <div class="col-auto">
                            <label for="doctorName" class="col-form-label">Full Name</label>
                        </div>
                        <div class="col-auto">
                            <input type="text" id="doctorName" class="form-control" required>
                        </div>
                    </div>
                    <div class="row g-3 align-items-center" style="padding-left: 2rem">
                        <div class="col-auto">
                            <label for="emailDoctor" class="col-form-label">Hospital Email</label>
                        </div>
                        <div class="col-auto">
                            <input type="email" id="doctorEmail" class="form-control" required>
                        </div>
                    </div>
                    <div class="row g-3 align-items-center" style="padding-left: 2rem">
                        <div class="col-auto">
                            <label for="identification" class="col-form-label">identification</label>
                        </div>
                        <div class="col-auto">
                            <input type="number" id="doctorId" class="form-control" required>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success" style="margin-left: 2rem" id="newDoctor">Add</button>
                    </div>
                    <div style="padding: 1.3rem" id="postStatus">
                    </div>
                </form>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">identification</th>
                            <th scope="col">Modify</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody id="addDoctor">
                    </tbody>
                </table>
            </div>
        </div>
       <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Confirm Delete</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete this doctor?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="staticBackdroptwo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modify Doctor</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="doctorInfo">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="confirmModify">Modify</button>
      </div>
    </div>
  </div>

    `;

    window.location.hash = "#/home/crud"
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener("click", function () {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        })
    });
async function loadDoctors() {
    document.getElementById("addDoctor").innerHTML = "";
    try {
        const res = await fetch("http://localhost:3000/doctors", {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
        const data = await res.json();
        data.forEach(doctor => {
            document.getElementById("addDoctor").innerHTML += `
                <tr>
                    <th scope="row">${doctor.doctor_id}</th>
                    <td>${doctor.full_name}</td>
                    <td>${doctor.hospital_email}</td>
                    <td>${doctor.identification}</td>
                    <td><button type="button" class="btn btn-primary modify-btn" data-bs-toggle="modal" data-bs-target="#staticBackdroptwo" data-id="${doctor.doctor_id}" data-name="${doctor.full_name}" data-email="${doctor.hospital_email}" data-identification="${doctor.identification}">Modify</button></td>
                    <td><button type="button" class="btn btn-danger delete-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${doctor.doctor_id}">
                Delete
              </button></td>
                </tr>
        `;
        });
    } catch (error) {
        console.error(`Your petition has a problem ${error}`);
    }
}
    
loadDoctors();

let newDoctor = document.getElementById("newDoctor");
let postStatus =  document.getElementById("postStatus");

newDoctor.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("doctorName").value;
    let email = document.getElementById("doctorEmail").value;
    let identification = document.getElementById("doctorId").value;

    if (!name || !email || !identification) {
        postStatus.innerHTML = `
            <span style="text-align: center; color: red"> You need to complete all the fields </span>
        `
    } else {
        postDoctor(name,email,identification)
    }
})

async function postDoctor(name, email, identification) {
    postStatus.innerHTML = "";
    try {
        const res = await fetch("http://localhost:3000/doctors", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({hospital_email: email, full_name: name, identification: identification})
        });
        if (res.ok){
            postStatus.innerHTML = `
            <span style="text-align: center; color: green"> Doctor added succesfully! </span>`;
            document.getElementById("addDoctor").innerHTML = "";
            loadDoctors();
            setTimeout(() => {
                postStatus.innerHTML = "";
            }, 3000);
        }
    } catch (error) {
        console.error(`There's a problem with your post!: ${error}`);
    }
}

let idDoctor = null;
let nameDoctor = null;
let emailDoctor = null;
let ideDoctor = null;

document.getElementById("addDoctor").addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn")
    if (btn) {
        idDoctor = btn.getAttribute("data-id")
    }
});

document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    if (!idDoctor) return;
    try {
        const res = await fetch(`http://localhost:3000/doctors/${idDoctor}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
        });
        if (res.ok){
            postStatus.innerHTML = `
            <span style="text-align: center; color: red"> Doctor deleted succesfully. </span>`;
            document.getElementById("addDoctor").innerHTML = "";
            const modal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
            modal.hide();
            loadDoctors();
            setTimeout(() => {
                postStatus.innerHTML = "";
            }, 3000);
        } else {
            postStatus.innerHTML = `
            <span style="text-align: center; color: red"> Doctor hasn't been deleted. </span>`;
            const modal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
            modal.hide();
            setTimeout(() => {
                postStatus.innerHTML = "";
            }, 3000);
        }
    } catch (error) {
        console.error(`There's a problem with your method: ${error}`);
    };
});

document.getElementById("addDoctor").addEventListener("click", (e) => {
    const btn = e.target.closest(".modify-btn")
    if (btn) {
        idDoctor = btn.getAttribute("data-id");
        nameDoctor = btn.getAttribute("data-name");
        emailDoctor = btn.getAttribute("data-email");
        ideDoctor = btn.getAttribute("data-identification");
    };

    modifyDoctor(idDoctor,nameDoctor,emailDoctor, ideDoctor);
});

async function modifyDoctor(idDoctor, nameDoctor, emailDoctor, ideDoctor) {
    document.getElementById("doctorInfo").innerHTML = `
        <form>
  <div class="mb-3">
    <label for="doctorId" class="form-label">Doctor ID</label><br>
    <label for="doctorID">${idDoctor}</label>
  </div>
  <div class="mb-3">
    <label for="fullDoctor" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="namemodDoctor" value="${nameDoctor}" required>
  </div>
  <div class="mb-3">
    <label for="emailDoctor" class="form-label">Hospital Email</label>
    <input type="email" class="form-control" id="emailmodDoctor" value="${emailDoctor}" required>
  </div>
  <div class="mb-3">
    <label for="emailDoctor" class="form-label">Hospital Email</label>
    <input type="number" class="form-control" id="idemodDoctor" value="${ideDoctor}" required>
  </div>
</form>
      </div>
    `

    
};

 document.getElementById("confirmModify").addEventListener("click", (e) => {
        e.preventDefault();

        let namemodDoctor = document.getElementById("namemodDoctor").value;
        let emailmodDoctor = document.getElementById("emailmodDoctor").value;
        let ideDoctor = Number(document.getElementById("idemodDoctor").value);

        let body = {full_name: namemodDoctor,
            hospital_email: emailmodDoctor, 
            identification: ideDoctor};

        updateDoctor(body, idDoctor);
    });

async function updateDoctor(body, idDoctor) {
        try {
            const res = await fetch(`http://localhost:3000/doctors/${idDoctor}`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(body)
            });
            if (res.ok){
                postStatus.innerHTML = `
                    <span style="text-align: center; color: green"> Doctor modified succesfully! </span>`;
                document.getElementById("addDoctor").innerHTML = "";
                await loadDoctors();
                setTimeout(() => {
                    postStatus.innerHTML = "";
                }, 3000);
            } else {
                postStatus.innerHTML = `
                    <span style="text-align: center; color: red"> Doctor hasn't been modified. </span>`;
                document.getElementById("addDoctor").innerHTML = "";
            }
        } catch (error) {
        console.error(`There's a problem with your method: ${error}`);
    }
    };

};