const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const multer = require('multer');
const port = 3000;

const DOC_PATH = '../data/doc';
const IMG_PATH = '../data/img';

app.use(cors());

const docUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DOC_PATH);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

const imgUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, IMG_PATH);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/getImgFiles', (req, res) => {
    let fileNameList = [];
    try {
        const files = fs.readdirSync(IMG_PATH);
        files.forEach(file => {
            if (file) {
                fileNameList.push(file);
            }
        });
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
        return res.status(500).json({ error: 'Error reading directory' });
    }

    res.json(fileNameList);
});

app.get('/getDocFiles', (req, res) => {
    let fileNameList = [];
    try {
        const files = fs.readdirSync(DOC_PATH);
        files.forEach(file => {
            if (file) {
                fileNameList.push(file);
            }
        });
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
        return res.status(500).json({ error: 'Error reading directory' });
    }

    res.json(fileNameList);
});

app.post('/uploadDoc', docUpload.single('myFile'), (req, res) => {
    // Multer will have added a file property for request where file's details will be
    const file = req.file;

    if (!file) {
        res.status(400).send('No file uploaded');
        return;
    }

    res.send(`File uploaded: ${file.originalname}`);
});

app.post('/uploadImg', imgUpload.single('myFile'), (req, res) => {
    // Multer will have added a file property for request where file's details will be
    const file = req.file;

    if (!file) {
        res.status(400).send('No file uploaded');
        return;
    }

    res.send(`File uploaded: ${file.originalname}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});