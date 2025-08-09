import express from "express";
import cors from "cors";
import {createConnection} from "mysql2/promise";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

async function connectDB() {
    return await createConnection({
        host: "localhost",
        user: "root",
        password: "Qwe.123*",
        database: "clinic_crudd"
    })
};

connectDB();

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
