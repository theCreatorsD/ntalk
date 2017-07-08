var arr = [
  {
    title : "2위",
    proser : [
      "일식",
      "이식",
      "삼식"
    ],
    stance : true
  },
  {
    title : "1위",
    proser : [
      "성룡",
      "준수",
      "상민",
      "태영"
    ],
    stance : false
  },
  {
    title : "0위",
    proser : [
      "성룡",
      "준수",
      "상민",
      "태영",
      "징거",
      "호치"
    ],
    stance : true
  },
  {
    title : "3위",
    proser : [
      "쌈자"
    ],
    stance : false
  }  
]


// console.log("start best selection");
// var _best = []
// _best = _arguments.slice()

var _bestDisagree = []
var _bestAgree = []
for (var i = 0; i < arr.length; i++) {
  if (arr[i].stance) {
    _bestAgree.push(arr[i])
  } else {
    _bestDisagree.push(arr[i])
  }
}

console.log(_bestAgree);
console.log("");
console.log(_bestDisagree);

var tmp, j

for (var i = 0; i < _bestAgree.length; i++) {
  tmp = _bestAgree[i]
  j = i
  while (j > 0 && _bestAgree[j - 1].proser.length <= tmp.proser.length) {
    _bestAgree[j] = _bestAgree[j - 1]
    j --
  }
  _bestAgree[j] = tmp
}

for (var i = 0; i < _bestDisagree.length; i++) {
  tmp = _bestDisagree[i]
  j = i
  while (j > 0 && _bestDisagree[j - 1].proser.length <= tmp.proser.length) {
    _bestDisagree[j] = _bestDisagree[j - 1]
    j --
  }
  _bestDisagree[j] = tmp
}
console.log("----------------------------------------------------");
console.log(_bestAgree);
console.log("");
console.log(_bestDisagree);







console.log("----------------------------------------------------");
console.log(arr);
console.log("----------------------------------------------------");
//
//
// var tmp, j
// for (var i = 0; i < _best.length; i++) {
//   tmp = _best[i]
//   j = i
//   while (j > 0 && _best[j - 1].proser.length <= tmp.proser.length) {
//     _best[j] = _best[j - 1]
//     j --
//   }
//   _best[j] = tmp
// }
// console.log(_best);
// console.log(arr);

//
// console.log(_best.length)
//
// var tmp, inner
//
//
// for (var i = 1; i < _best.length; i++) {
//   tmp = _best[i];
//   inner = i
//   while (inner > 0 && _best[inner - 1].proser.lehgtn >= tmp.proser.length) {
//     _best[inner] = _best[inner -1]
//     inner --;
//   }
//   _best[inner] = tmp;
//   //console.log(_best[i].proser.length);
//   // var j = 0
//   // for (j = i - 1; j >=0; j--) {
//   //   if (_best[j].proser.length > key) {
//   //     _best[j+1] = _best[j]
//   //   } else {
//   //     break
//   //   }
//   // }
//   // _best[j+1] = key
// }
// for (var i = 0; i < 3; i++) {
//   _best[i].proser.length
// }
// console.log(_best);


// console.log(arr[2].proser.length);
// console.log(arr);
