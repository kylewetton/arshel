const path = require('path');
const multer = require('multer');
const express = require('express');
const shell = require('shelljs');
const findRemoveSync = require('find-remove');
const app = express();


const BASEPATH = 'usdpython';
const PYTHONPATH = process.env.PYTHONPATH;
const CONVERT = `${BASEPATH}/usdzconvert/usdzconvert`;
process.env.PYTHONPATH = `${PYTHONPATH}:${BASEPATH}/USD/lib/python`

let unifiedFileName = '';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/storage');
  },
  filename(req, file, cb) {
    unifiedFileName = Date.now();
    cb(null, `ar-${unifiedFileName}.glb`);
  },
});

const upload = multer({ storage });

app.use(express.static('public'));


app.post('/generate-ar', upload.single('file'), (req, res) => {
    shell.exec(
        `${CONVERT} public/storage/ar-${unifiedFileName}.glb public/storage/ar-${unifiedFileName}.usdz -metersPerUnit 1`
    );
    res.json({ name: `${unifiedFileName}` });
    unifiedFileName = '';
});    

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  
  app.listen(process.env.PORT || 5000);