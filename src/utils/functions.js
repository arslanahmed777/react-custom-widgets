const range = (start, stop, step = 1) => {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

function Compare(a, b, key, method) {
  let newarr = [];
  if (method == 'complement') {
    newarr = a.filter(function (item) {
      for (var i = 0, len = b.length; i < len; i++) {
        if (b[i][key] == item[key]) {
          return false;
        }
      }
      return true;
    });
  } else if (method == 'intersection') {
    newarr = a.filter(function (item) {
      for (var i = 0, len = b.length; i < len; i++) {
        if (b[i][key] == item[key]) {
          return true;
        }
      }
      return false;
    });
  } else if (method == 'union') {
    newarr = a.concat(b);
    for (var i = 0; i < newarr.length; i++) {
      for (var j = i + 1; j < newarr.length; j++) {
        if (newarr[i][key] === newarr[j][key]) {
          newarr.splice(j, 1);
          j--;
        }
      }
    }
  }
  return newarr;
}
export { range, Compare };
