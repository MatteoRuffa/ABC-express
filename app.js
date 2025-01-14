//Esempio: Upload di file con Multer
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//config storage multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer ({ storage});

//middleware folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes 
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');
    res.send(`file successfully uploaded: <a href="/uploads/${req.file.filename}">view file</a>`);
});

//start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});