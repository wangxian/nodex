<?php
$t = microtime(1);

for ($i=0; $i < 1e5; $i++) { 
	$arr['f'] = function (){
	    return 123;
	};
    $arr['f']();
}

echo (microtime(1) - $t)*1000;
echo "\n";
