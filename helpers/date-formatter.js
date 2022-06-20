export function getDay(d) {
  var date = new Date(d);

  var day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }

  return day;
}

export function getMonthLong(d) {
  var date = new Date(d);

  var month = date.toLocaleDateString('tr-TR', { month: 'long' });

  return month;
}

export function getMonthShort(d) {
  var date = new Date(d);

  var month = date.toLocaleDateString('tr-TR', { month: 'short' });
  return month;
}

export function getYear(d) {
  var date = new Date(d);

  var year = date.getFullYear();

  return year;
}

export function getFullDate(d) {
  var date = new Date(d);

  var day = date.getDate();
  var month = date.toLocaleDateString('tr-TR', { month: 'short' });
  // var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }
  // if (month < 10) {
  //   month = '0' + month;
  // }

  return day + ' ' + month + ' ' + year;
}

export function getFullTime(d) {
  var date = new Date(d);
  var hour = date.getHours();
  var min = date.getMinutes();

  if (hour == 0) {
    hour = '0' + hour;
  }

  if (min == 0) {
    min = '0' + min;
  }

  return hour + ':' + min;
}

// export function dateFormater(d) {
//   var date = new Date(d);

//   var day = date.getDate();
//   var month = date.getMonth() + 1;
//   var year = date.getFullYear();
//   var hour = date.getHours();
//   var min = date.getMinutes();

//   if (day < 10) {
//     day = '0' + day;
//   }
//   if (month < 10) {
//     month = '0' + month;
//   }

//   if (hour == 0) {
//     hour = '0' + hour;
//   }

//   if (min == 0) {
//     min = '0' + min;
//   }

//   return day + '.' + month + '.' + year + ' - ' + hour + ':' + min;
// }
