<?php
"Simple string"



'Simple \' string'



"This is {$great} {test"



"This is ${great}"



"This is $great[0]testtest"



"This is $great[abc]testtest"



"This is $great[abc][cde]testtest"



"This is \$great[abc][cde]testtest"



"This is \{\$great}"



"This is \${great}"



"This is ok: {$arr[foo][3]}"



"abc{$obj->values[3]->name}def"



"abc{${$object->getName()}}def"


"multiline string
test"


"multiline string
and $var too"

'multiline string
test'

<<<EOT
test a test b test c
test a test b test c
EOT;



<<<EOT
test a $test b test c
EOT;


<<<EOT
test a \$test b test c
EOT;


<<<"EOT"
test a $test b test c
EOT;


<<<'EOT'
test a $test b test c
EOT;