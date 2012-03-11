

var a = {
    id: 12,
    showid: function(){
        console.log("exec a.showid()")
        console.log(this.id);
        console.dir(arguments)
    }
}

var b = {
    id: 87,
    showid: function(){
        console.log("exec b.showid()")
        console.log(this.id);
    }
}

a.showid.apply(b,[1,2,3]);
