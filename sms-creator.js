var iconv = require('iconv-lite');
var Buffer = require('buffer').Buffer;
var concat_ref = 0;

function wrap(text, type) {
  concat_ref = concat_ref < 99 ? concat_ref + 1 : 1;
  type = type.toString().toLowerCase();
  var max = 160;
  if(type.includes('ascii')){
    max = 160;
    type = 'ascii';
  } else if(type.includes('latin') || type.includes('turkish')){
    max = 155;
    type = 'latin';
  } else {
    max = 70;
    type = 'unicode';
  }
  if(text.length > max){
    if(max == 70) max = 67;
    if(max == 155) max = 149;
    if(max == 160) max = 153;
  }
  var result = [];
  var len = text.length;
  var totalStrCount = parseInt(len / max);
  if (len % max != 0) totalStrCount++
  for (var i = 0; i < totalStrCount; i++) {
    var udh = [];
    var str = text.substring(0, max);
    if (type == 'ascii'){
      iconv.encode(part,'ascii')
      if(totalStrCount > 1){
        udh[0] = 0x05
        udh[1] = 0x00
        udh[2] = 0x03
        udh[3] = concat_ref
        udh[4] = totalStrCount
        udh[5] = i + 1
      }
    } else if (type == 'latin') {
      if(info.length > 1){
        udh[0] = 0x8
        udh[1] = 0x25
        udh[2] = 0x1
        udh[3] = 0x1
        udh[4] = 0x0
        udh[5] = 0x3
        udh[6] = concat_ref
        udh[7] = totalStrCount
        udh[8] = i + 1
      }else{
        udh[0] = 0x3
        udh[1] = 0x25
        udh[2] = 0x1
        udh[3] = 0x1
      }
    } else {
      if(info.length > 1){
        udh[0] = 0x05
        udh[1] = 0x00
        udh[2] = 0x03
        udh[3] = concat_ref
        udh[4] = totalStrCount
        udh[5] = i + 1
      }
    }
    if(udh.length > 0) str = { udh:Buffer.from(udh), message: str };
    result.push(str);
    text = text.substring(max, text.length);
  }
  return result;
}
