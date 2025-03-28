const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Define Schema for Esports Data
const EsportsSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String, // Store image path
});

const Esports = mongoose.model("Esports", EsportsSchema);

// Multer Storage Configuration for Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// API to Upload Image and Save Esports Data
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const newEsport = new Esports({
            title: req.body.title,
            description: req.body.description,
            image: req.file.path, // Save file path
        });

        await newEsport.save();
        res.json({ message: "Esports Data Saved Successfully", data: newEsport });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to Fetch Esports Data
app.get("/esports", async (req, res) => {
    try {
        const esports = await Esports.find();
        res.json(esports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve Images
app.use("/uploads", express.static("uploads"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
