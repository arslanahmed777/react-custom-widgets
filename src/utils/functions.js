const range = (start, stop, step = 1) => {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

function Compare(a, b, key, method) {
  let newarr = [];
  if (method === 'complement') {
    newarr = a.filter(function (item) {
      for (var i = 0, len = b.length; i < len; i++) {
        if (b[i][key] === item[key]) {
          return false;
        }
      }
      return true;
    });
  } else if (method === 'intersection') {
    newarr = a.filter(function (item) {
      for (var i = 0, len = b.length; i < len; i++) {
        if (b[i][key] === item[key]) {
          return true;
        }
      }
      return false;
    });
  } else if (method === 'union') {
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


const getTodayDate = (date) => {

  var today = new Date(date)
  var dd = today.getDate()
  var mm = today.getMonth() + 1 //January is 0!
  var yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = yyyy + '-' + mm + '-' + dd
  return today
}

const FormatDate = (date, formatTo) => {
  let seperator = "";
  let a = new Date(date);

  const month =
    (a.getMonth() + 1).toString().length === 1
      ? "0" + (a.getMonth() + 1).toString()
      : a.getMonth() + 1;

  const day =
    a.getDate().toString().length === 1
      ? "0" + a.getDate().toString()
      : a.getDate();

  let b = {
    dd: day,
    mm: month,
    yyyy: a.getFullYear(),
  };

  if (formatTo.includes("/")) seperator = "/";
  else if (formatTo.includes("-")) seperator = "-";

  let elements = formatTo.split(seperator);

  const newDate =
    b[elements[0]] + seperator + b[elements[1]] + seperator + b[elements[2]];

  return newDate;
};
export { range, Compare, getTodayDate, FormatDate };
