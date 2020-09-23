module.exports = function bin2hex (s) {
  //  discuss at: https://locutus.io/php/bin2hex/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Linuxworld
  // improved by: ntoniazzi (https://locutus.io/php/bin2hex:361#comment_177616)
  // improved by: divinity76 ( https://github.com/divinity76 )
  //   example 1: bin2hex('Kev')
  //   returns 1: '4b6576'
  //   example 2: bin2hex(String.fromCharCode(0x00))
  //   returns 2: '00'
  //   example 3: bin2hex("æ")
  //   returns 3: c3a6

  const arr = (new TextEncoder()).encode(s);
  let ret = "";
  for(let i = 0; i < arr.length; ++i){
	  ret += arr[i].toString(16).padStart(2,"0");
  }
  return ret;
}
