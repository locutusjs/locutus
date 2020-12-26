module.exports = function random_bytes (length) {
  // warning, unlike the php random_bytes(), this returns length random-ish unicode characters, 
  // which usually encode to significantly more than $length bytes in UTF-8 encoding; 
  // unlike php's strings, javascript strings are not binary safe, if you truly want random bytes instead of random unicode characters, 
  // use Uint8Array instead. (see the code below for an example)
  // 
  //   example 1: let $bytes = random_bytes(5);
  //   returns 1: Þ¶¼¡ö
  length = Number(length);
  if(Number.isNaN(length)){
    throw new Error("Argument #1 ($length) must be of type int");
  }
  if(length<1){
    // ps <1 is controversial... ref https://bugs.php.net/bug.php?id=80214
    throw new Error("ValueError: random_bytes(): Argument #1 ($length) must be greater than 0");
  }
  // can add some Number.isFinite errorchecks here too but the array constructor will do it for us in any case
  let randArr = new Uint8Array(length);
  // ps, crypto.getRandomValues is supposed to be a cryptograpically secure random generator, just like php's random_bytes()
  window.crypto.getRandomValues(randArr);
  // return randArr;
  let randString = "";
  for(let i=0; i < length; ++i){
    randString += String.fromCharCode(randArr[i]);
  }
  return randString;
}
