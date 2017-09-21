/*



*/

var convertToFaces = require('equirect-cubemap-faces-js').transformToCubeFaces;
var argv = require('yargs').argv;
var filename = argv._[0];
var PNG = require('pngjs').PNG;
var fs = require('fs');
var path = require('path');

/*
load an image file and return an object with...
  data (buffer or array of ints containing the image data in rgba format)
  width
  height
*/
function loadImage(filename){
  return PNG.sync.read(fs.readFileSync(path.join(process.cwd(),filename)));
}
/*
save an image.
Params:
  filename
  imageData (buffer or array of ints containing the image data in rgba format)
*/
function saveImage(filename,imageData){
  var file = PNG.sync.write(imageData,{width:outSize,height:outSize});
  fs.writeFileSync(filename,file);
}

var inFileName = argv._[0];
if (!inFileName){
  throw new Error('You must supply a filename');
}

console.log('loading file '+inFileName+'...');
var image = loadImage(inFileName)
console.log('loaded');

// convert the file to image data
var outSize = argv.outputsize || argv.outputSize || image.height;
var imageData = image.data;

var r = new Array(6);
for (var i = 0; i < 6; i ++){
  r[i] = {
    width:outSize,
    height:outSize,
    data:new Buffer(4*outSize*outSize)
  }
}

console.log('converting to cubemap (this may take a while)...')

// convert to cube faces
var faces = convertToFaces({width:image.width,height:image.height,data:imageData},r);

console.log('converted file, now writing files...')

for (var i = 0; i < 6; i ++){
  console.log('writing file '+(i+1)+' of 6')
  saveImage(i+'.png',faces[i])
}
console.log('done!')
