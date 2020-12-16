const path = require('path');
const multer = require('multer');
const express = require('express');
const shell = require('shelljs');
const findRemoveSync = require('find-remove');
const app = express();

const stat = process.env.NODE_ENV === 'development' ? 'public' : '';

const CONVERT = `usdpython/usdzconvert/usdzconvert`;
process.env.PYTHONPATH = `usdpython/USD/lib/python:usdpython/USD/lib/python`;

let unifiedFileName = '';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./${stat}/storage`);
  },
  filename(req, file, cb) {
    unifiedFileName = Date.now();
    cb(null, `ar-${unifiedFileName}.glb`);
  },
});

const upload = multer({ storage });

app.use(express.static(stat));


app.post('/generate-ar', upload.single('file'), (req, res) => {
    shell.exec(
        `${CONVERT} ${stat}/storage/ar-${unifiedFileName}.glb ${stat}/storage/ar-${unifiedFileName}.usdz -metersPerUnit 1`
    );
    res.json({ name: `${unifiedFileName}` });
    unifiedFileName = '';
});    

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, stat, 'index.html'));
});

setInterval(() => {
  const remove = findRemoveSync(`${__dirname}/${stat}/storage`, {
    age: { seconds: 600 },
    limit: 100,
    extensions: ['.glb', '.usdz']
  });
}, 360000);
  
app.listen(process.env.PORT || 5000);