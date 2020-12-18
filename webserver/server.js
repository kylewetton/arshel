require('dotenv').config();
const path = require('path');
const multer = require('multer');
const express = require('express');
const shell = require('shelljs');
const findRemoveSync = require('find-remove');
const axios = require('axios');
const app = express();

const stat = process.env.NODE_ENV === 'development' ? 'public' : 'build';
const binaryExport = true;

let unifiedFileName = '';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./uploads`);
  },
  filename(req, file, cb) {
    unifiedFileName = Date.now();
    cb(null, `ar-${unifiedFileName}.${binaryExport ? 'glb' : 'gltf'}`);
  },
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, stat)));


app.post('/generate-ar', upload.single('file'), (req, res) => {

  axios.post('http://gltf-to-usdz-service:3000/local-convert', {
    filename: `ar-${unifiedFileName}.glb`
}).then((result) => {
    console.log(result.data);
    unifiedFileName = '';
    
    res.send({name: result.data.outputPath});
}).catch((error) => {
    res.send({success: false, error: "Error while connecting to gltf-to-usdz-service"});
})
    
});    

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, stat, 'index.html'));
});

setInterval(() => {
  const remove = findRemoveSync(`./uploads`, {
    age: { seconds: 600 },
    limit: 100,
    extensions:  ['.glb', '.gltf', '.usdz']
  });
}, 360000);

  
app.listen(8080);
console.log('Web Server: 8080');
console.log(`${__dirname}/${stat}`);