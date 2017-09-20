var convertToFaces = require('threejs-cubemap-to-equirectangular').transformToCubeFaces;
var argv = require('yargs').argv;
var filename = argv._[0];

// read file
var inFile = fs.readFileSync(filename,'buffer');

// convert the file to image data
var imageData = isjpeg(inFile)?readJpeg(inFile):readPng(inFile);
var size = imageSize(inFile).height; 

var r = new Array(6);
for (var i = 0; i < 6; i ++){
  r[i] = {
    width:size,
    height:size,
    data:new Array(4*size*size)
  }
}

// convert to cube faces
var faces = convertToFaces({data:imageData},r);

console.log(faces);
