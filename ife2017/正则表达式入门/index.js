function isPhoneNum(str) {
    var regExp=/^1(?:(?:3[0-9])|(?:5[^4])|(?:8[0,2,3,5-9])|(?:7[0-8])|(?:47))\d{8}$/;
    return regExp.test(str.trim());
}
function hasAdjacentSame(str){
    var regExp=/(?:\s+|^)(\w+)\s+\1/;
    return regExp.test(str.trim());
}
console.log(hasAdjacentSame('foo foo'));
console.log(hasAdjacentSame('foo bar foo'));
console.log(hasAdjacentSame('foo  barbar bar'));
