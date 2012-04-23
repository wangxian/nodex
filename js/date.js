
Date.prototype.getMyDate = function(){
  return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate();
}

Date.prototype.getMyDateTime = function(){
  return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate() + ' ' +
  this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds();
}

var now = new Date();
console.log(now.getMyDate());
console.log(now.getMyDateTime());
