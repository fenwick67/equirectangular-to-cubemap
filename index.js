var convertToFaces = require('threejs-cubemap-to-equirectangular').transformToCubeFaces;
var argv = require('yargs').argv;
var filename = argv._[0];
var imageSize = require('image-size');
var sharp = require('sharp');

// read file
sharp(filename).raw().toBuffer(function(er,pixelData,info){
  if (er){
    throw er
  }

  // convert the file to image data
  var size = info.height; 

  var r = new Array(6);
  for (var i = 0; i < 6; i ++){
    r[i] = {
      width:size,
      height:size,
      data:new Array(4*size*size)
    }
  }

  // convert to cube faces
  var faces = convertToFaces({width:size*2,height:size,data:imageData},r);

  console.log(faces);

})
