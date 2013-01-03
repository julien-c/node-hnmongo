<?php

$m = new Mongo();
$c = $m->hnmeteor->homepage->find();

$i = 0;
$different = 0;

foreach ($c as $h) {
	if ($i > 0) {
		// Compare current homepage to the previous one:
		if ($h['content'] == $previous['content']) {
			echo "I";
		}
		else {
			echo "D";
			$different++;
		}
		// file_put_contents($i.'.json', json_encode($h['content']));
	}
	$previous = $h;
	$i++;
	// echo "\n";
}

echo "\n";
echo sprintf("Different: %d out of %d", $different, $i);
echo "\n";
