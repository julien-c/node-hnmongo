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
			file_put_contents($i.'.json', pretty_json(json_encode($h['content'])));
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









/******/


function pretty_json($json) {

    $result      = '';
    $pos         = 0;
    $strLen      = strlen($json);
    $indentStr   = '  ';
    $newLine     = "\n";
    $prevChar    = '';
    $outOfQuotes = true;

    for ($i=0; $i<=$strLen; $i++) {

        // Grab the next character in the string.
        $char = substr($json, $i, 1);

        // Are we inside a quoted string?
        if ($char == '"' && $prevChar != '\\') {
            $outOfQuotes = !$outOfQuotes;
        
        // If this character is the end of an element, 
        // output a new line and indent the next line.
        } else if(($char == '}' || $char == ']') && $outOfQuotes) {
            $result .= $newLine;
            $pos --;
            for ($j=0; $j<$pos; $j++) {
                $result .= $indentStr;
            }
        }
        
        // Add the character to the result string.
        $result .= $char;

        // If the last character was the beginning of an element, 
        // output a new line and indent the next line.
        if (($char == ',' || $char == '{' || $char == '[') && $outOfQuotes) {
            $result .= $newLine;
            if ($char == '{' || $char == '[') {
                $pos ++;
            }
            
            for ($j = 0; $j < $pos; $j++) {
                $result .= $indentStr;
            }
        }
        
        $prevChar = $char;
    }

    return $result;
}