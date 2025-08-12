import express from "express";
import cors from "cors";
import {createConnection} from "mysql2/promise";
import csv from "csv-parser";
import fs from "fs";
import multer from "multer";
import path from "path";


const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

async function connectDB() {
    return await createConnection({
        host: "localhost",
        user: "root",
        password: "Qwe.123*",
        database: "clinic_crud"
    })
};

connectDB();

const upload = multer({dest: path.join(process.cwd(), "uploads/")});

app.post("/loadDoctors", upload.single("file"), async (req, res) => {
    let filePath = req.file.path;

    fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (info) => {
        const {hospital_email,full_name,identification} = info;

        try {
        const connection = await connectDB();
        const [result] = await connection.execute("INSERT INTO doctor (hospital_email, full_name, identification) VALUES (?,?,?)", [hospital_email,full_name,identification]);
        await connection.end();
        res.status(201).json({
            message: "Added succesfully!",
            insertedId: result.insertId
        });
    } catch (error) {
        console.error(`The doctor hasn't be added: ${error}`)
        res.status(500).json({error: "Failed to post"});
    };

    fs.unlink(filePath, er => {
        if (er){
            console.error(er);
        }
    });
    });

    
    
})



app.listen(PORT, () => {
    console.log("ready to go");
})

app.get("/patients", async (req,res) => {
    try{
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM patient`);
        await connection.end();
        return res.json(rows); 
    } catch (error) {
        console.error("ERROR: Cannot get /patients:", error.message);
        res.status(500).json({error: "Cannot get patients"})
    };
});


app.get("/appointments", async (req, res) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM medical_appointment`);
        await connection.end();
        return res.json(rows);
    } catch (error) {
        console.error("ERROR: Cannot get /appointments", error.message);
        res.status(500).json({error: "cannot get patients"})
    };
});

app.get("/doctors", async (req, res) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM doctor`);
        await connection.end();
        return res.json(rows);
    } catch (error) {
        console.error("ERROR: cannot get /doctors", error.message);
        res.status(500).json({error: "cannot get doctors"})
    };
});

app.post("/doctors", async (req,res) => {
    const {hospital_email, full_name, identification} = req.body;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute("INSERT INTO doctor (hospital_email, full_name, identification) VALUES (?,?,?)", [hospital_email,full_name,identification]);
        await connection.end();
        res.status(201).json({
            message: "Added succesfully!",
            insertedId: result.insertId
        });
    } catch (error) {
        console.error(`The doctor hasn't be added: ${error}`)
        res.status(500).json({error: "Failed to post"});
    }
})

app.delete("/doctors/:id", async (req,res) => {
    const {id} = req.params;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute("DELETE FROM doctor WHERE doctor_id = ?", [id]);
        await connection.end();
        res.status(200).json({
            message: "Deleted succesfully!",
            id: result
        });
    } catch (error) {
        res.status(500).json({error: "The removed doctor went wrong"});
        console.error(`The doctor hasn't been deleted: ${error}`);
    }
})

app.patch("/doctors/:id", async (req, res) => {
    const {id} = req.params;
    const {full_name, hospital_email, identification} = req.body;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute("UPDATE doctor SET full_name = ?, hospital_email = ?, identification = ? WHERE doctor_id = ?", [full_name,hospital_email,identification,id]);
        await connection.end();
        res.status(200).json({
            message: "Updated succesfully!",
            id: result
        });
    } catch (error) {
        res.status(500).json({error: "The doctor can't be updated"});
        console.error(`The doctor hasn't be updated: ${error}`);
    }
})



app.get("/administrator", async (req, res) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute(`SELECT * FROM administrator`);
        await connection.end();
        return res.json(rows);
    } catch (error) {
        console.error("ERROR: cannot get administrators", error.message);
        res.status(500).json({error: "Cannot get administrator"})
    };
});

