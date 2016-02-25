function base64_encode(data) {
  //  discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Rafał Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  //   example 1: base64_encode('Kevin van Zonneveld');
  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //   example 2: base64_encode('a');
  //   returns 2: 'YQ=='
  //   example 3: base64_encode('✓ à la mode');
  //   returns 3: '4pyTIMOgIGxhIG1vZGU='
  // Wheel re-invented by Warren Gardner (http://www.madmessaging.co.za)
  
  if(!data) return data;
  data = unescape(encodeURIComponent(data));
  
  var cArray = new Uint8Array(data);
  var DataLen = cArray.length, Out = "", Mask = 0xFC, Shift = 6, Carry = 0, i = 0;
  
  while(i < DataLen){
      Out += b64[(Carry << Shift) | ((Mask & cArray[i]) >> (8 - Shift))];
      if(!Shift){  
          Mask = 0xFC;
          Shift = 6;
          Carry = 0;
      }else{
          Carry = ((~Mask) & cArray[i]);
          Shift -= 2;
          Mask = (Mask << 2) & 0xFF;
      }
      if(Shift) i++;
   }
  if(Carry) Out += b64[(Carry << Shift)];

  return Out;
}
