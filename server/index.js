// IMPORTS

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer, { diskStorage } from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATION

const __filename = fileURLToPath(import.meta.url);  //used to get directory name when using modules
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json);
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "25mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "25mb", extended: true}));
app.use(cors());
app.use("/files", express.static(path.join(__dirname, 'public/files')))

// FILE STORAGE

const storage = multer.diskStorage({    //multer info
    destination: function (req, file, cb) { //everytime someone uploads it saves in the folder
        cb(null, "public/files");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer ({storage})   //upload files