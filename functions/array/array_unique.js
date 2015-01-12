// for ie8 and less
if (!Array.isArray)
		Array.isArray = function(ar) {
			return Object.prototype.toString.call(ar) === '[object Array]';
		};

var array_unique = function(ar){
	var r = [], i = 0 , t;
	for( ; i < ar.length ; i++) {
		if(Array.isArray(ar[i]))
			ar[i] = array_unique(ar[i])
		else
			for(t = i+1; t < ar.length ; t++)
				if(ar[i] === ar[t])
					t = ++i
			r.push(ar[i])
	} return r;
},

// example
var toto = [
	'tutu',
	'tutu',
	'tete',
	[
		'tata',
		'tata',
		'tata',
		[
			'toto',
			'toto',
			'titi',
		]
	]
];

toto = array_unique(toto);
/*
result :
[
	'tutu',
	'tete',
	[
		'tata',
		[
			'toto',
			'titi',
		]
	]
]
*/
