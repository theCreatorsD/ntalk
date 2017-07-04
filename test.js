var str = []

str.push("seongryong")
str.push("dongjin")
str.push("sujeong")

console.log(str);



var a = str.indexOf("sangmin")

console.log(a);

if (str.indexOf("sangmin") >= 0) {
  console.log("exists");
} else {
  console.log("does not exist");
}

var index = str.indexOf("dongjin")

if (index > -1) {
  str.splice(index, 1)
}

console.log(str);
