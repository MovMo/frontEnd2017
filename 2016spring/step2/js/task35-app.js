var commands=[/^(go)(?:\s+([\d+]))?$/,/^turn[Left|Right|Bottom]$/];
//console.log('go 3'.match(commands[0]));
result='go 3'.match(commands[0]);
console.log(result[0]);
console.log(result[1]);
console.log(result[2]);