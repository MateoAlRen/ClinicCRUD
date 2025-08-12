let inputFile = document.getElementById("csv");
let send = document.getElementById("sendCSV");

send.addEventListener("click", (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", inputFile.files[0]);

        sendCSV(formData)

})

async function sendCSV(formData) {
    try{
        const res = await fetch("http://localhost:3000/loadDoctors", {
            method: "POST",
            body: formData
        })
    } catch (error) {
        console.error(error);
    }
}

