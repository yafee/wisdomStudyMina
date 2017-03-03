// function formatTime(date) {
//   var year = date.getFullYear()
//   var month = date.getMonth() + 1
//   var day = date.getDate()

//   var hour = date.getHours()
//   var minute = date.getMinutes()
//   var second = date.getSeconds()


//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// function formatNumber(n) {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
function cutString(str){
  if(str.length>=20){
    return str.substring(0,12)+'...';
  } else {
    return str;
  }
}

function handleArr(checkedBooks,bookId){
  let index = checkedBooks.indexOf(bookId);
  if(index == -1){
    return checkedBooks.concat([bookId]);
  } else {
    checkedBooks.splice(index,1);
    return checkedBooks;
  }
}

module.exports = {
  cutString:cutString,
  handleArr:handleArr
}
