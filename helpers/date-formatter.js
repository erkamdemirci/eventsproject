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

  var year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }

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

export function getDateRangeFormatter(d1, d2) {
  if (filterDateFormatter(d1) !== filterDateFormatter(d2)) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);

    var day1 = date1.getDate();
    var day2 = date2.getDate();

    var month1 = date1.toLocaleDateString('tr-TR', { month: 'short' });
    var month2 = date2.toLocaleDateString('tr-TR', { month: 'short' });

    var year = date1.getFullYear();

    if (day1 < 10) {
      day1 = '0' + day1;
    }
    if (day2 < 10) {
      day2 = '0' + day2;
    }

    return day1 + ' ' + month1 + ' - ' + day2 + ' ' + month2;
  } else {
    var date = new Date(d1);

    var day = date.getDate();
    var month = date.toLocaleDateString('tr-TR', { month: 'short' });

    var year = date.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }

    return day + ' ' + month;
  }

  var day1 = date1.getDate();
  var day2 = date2.getDate();

  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hour = date.getHours();
  var min = date.getMinutes();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  if (hour == 0) {
    hour = '0' + hour;
  }

  if (min == 0) {
    min = '0' + min;
  }

  return year + '-' + month + '-' + day;
}

export function filterDateFormatter(d) {
  var date = new Date(d);

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hour = date.getHours();
  var min = date.getMinutes();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  if (hour == 0) {
    hour = '0' + hour;
  }

  if (min == 0) {
    min = '0' + min;
  }

  return year + '-' + month + '-' + day;
}
