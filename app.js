module.exports = function wrap(text, type) {
  type = type.toString().toLowerCase();
  var maxlength = 160;
  if(text.length > maxlength){
    if(maxlength == 70) maxlength = 67;
    if(maxlength == 155) maxlength = 149;
    if(maxlength == 160) maxlength = 153;
  }
  var result = [];
  var len = text.length;
      var totalStrCount = parseInt(len / maxlength);
      if (len % maxlength != 0) totalStrCount++
      for (var i = 0; i < totalStrCount; i++) {
          if (i == totalStrCount) {
              result.push(text);
          } else {
              var strPiece = text.substring(0, maxlength);
              result.push(strPiece);
              text = text.substring(maxlength, text.length);
          }
      }
  return result;
}
