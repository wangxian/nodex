var start_time = new Date().getTime();

$arr = {};
for ($i=0; $i < 1e5; $i++) { 
    $arr['f'] = function (){
        return 123;
    };
    $arr['f']();
}

console.log(new Date().getTime() - start_time);