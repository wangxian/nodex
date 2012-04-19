
/**
 * 测试 new function \ json function parse
 */

var start_time = new Date().getTime();
var j = {
    a:function(){
        for(t=0;t<1000000;t++){
          var arr = [98,2,15,0,29,10,100,50,20,10,20,25,48,90,27,16,25,55,27,10,125,14,221,11,1,199,1,21,43,153,14,24,423,312,4,242,212,142,21,100];
          for(i=0;i<arr.length;i++){
                for(j=i+1; j< arr.length;j++){
                    if(arr[i] > arr[j]) {
                        var c = arr[j];
                        arr[j] = arr[i];
                        arr[i] = c;
                    }
                }
            }  
        }
    },
    b:function(){
        for(i=0;i<10000;i++);
    }
}
j.a();
console.log(new Date().getTime() - start_time);

var start_time = new Date().getTime();
var f = function(){
    this.a = function () {
        for(t=0;t<1000000;t++){
          var arr = [98,2,15,0,29,10,100,50,20,10,20,25,48,90,27,16,25,55,27,10,125,14,221,11,1,199,1,21,43,153,14,24,423,312,4,242,212,142,21,100];
          for(i=0;i<arr.length;i++){
                for(j=i+1; j< arr.length;j++){
                    if(arr[i] > arr[j]) {
                        var c = arr[j];
                        arr[j] = arr[i];
                        arr[i] = c;
                    }
                }
            }
        }
    };
    this.b = function(){
        for(i=0;i<10000;i++); 
    }
}
new f().a();
console.log(new Date().getTime() - start_time);




