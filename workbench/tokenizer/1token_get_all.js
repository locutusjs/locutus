function token_get_all (source) {
	// Split given source into PHP tokens
	// + original by: Marco Marchiò
	// + improved by: Brett Zamir (http://brett-zamir.me)
	// - depends on: token_name
	// % note 1: Token numbers depend on the PHP version
	// % note 2: token_name is only necessary for a non-standard php.js-specific use of this function;
	// % note 2: if you define an object on this.php_js.phpParser (where "this" is the scope of the
	// % note 2: token_get_all function (either a namespaced php.js object or the window object)),
	// % note 2: this function will call that object's methods if they have the same names as the tokens,
	// % note 2: passing them the string, line number, and token number (in that order)
	// * example 1: token_get_all('/'+'* comment *'+'/');
	// * returns 1: [[311, '/* comment */', 1]]
	
	// Token to number conversion
    var tokens = {
        T_REQUIRE_ONCE:261,
        T_REQUIRE:260,
        T_EVAL:259,
        T_INCLUDE_ONCE:258,
        T_INCLUDE:257,
        T_LOGICAL_OR:262,
        T_LOGICAL_XOR:263,
        T_LOGICAL_AND:264,
        T_PRINT:265,
        T_SR_EQUAL:276,
        T_SL_EQUAL:275,
        T_XOR_EQUAL:274,
        T_OR_EQUAL:273,
        T_AND_EQUAL:272,
        T_MOD_EQUAL:271,
        T_CONCAT_EQUAL:270,
        T_DIV_EQUAL:269,
        T_MUL_EQUAL:268,
        T_MINUS_EQUAL:267,
        T_PLUS_EQUAL:266,
        T_BOOLEAN_OR:277,
        T_BOOLEAN_AND:278,
        T_IS_NOT_IDENTICAL:282,
        T_IS_IDENTICAL:281,
        T_IS_NOT_EQUAL:280,
        T_IS_EQUAL:279,
        T_IS_GREATER_OR_EQUAL:284,
        T_IS_SMALLER_OR_EQUAL:283,
        T_SR:286,
        T_SL:285,
        T_INSTANCEOF:287,
        T_UNSET_CAST:296,
        T_BOOL_CAST:295,
        T_OBJECT_CAST:294,
        T_ARRAY_CAST:293,
        T_STRING_CAST:292,
        T_DOUBLE_CAST:291,
        T_INT_CAST:290,
        T_DEC:289,
        T_INC:288,
        T_CLONE:298,
        T_NEW:297,
        T_EXIT:299,
        T_IF:300,
        T_ELSEIF:301,
        T_ELSE:302,
        T_ENDIF:303,
        T_LNUMBER:304,
        T_DNUMBER:305,
        T_STRING:306,
        T_STRING_VARNAME:307,
        T_VARIABLE:308,
        T_NUM_STRING:309,
        T_INLINE_HTML:310,
        T_CHARACTER:311,
        T_BAD_CHARACTER:312,
        T_ENCAPSED_AND_WHITESPACE:313,
        T_CONSTANT_ENCAPSED_STRING:314,
        T_ECHO:315,
        T_DO:316,
        T_WHILE:317,
        T_ENDWHILE:318,
        T_FOR:319,
        T_ENDFOR:320,
        T_FOREACH:321,
        T_ENDFOREACH:322,
        T_DECLARE:323,
        T_ENDDECLARE:324,
        T_AS:325,
        T_SWITCH:326,
        T_ENDSWITCH:327,
        T_CASE:328,
        T_DEFAULT:329,
        T_BREAK:330,
        T_CONTINUE:331,
        T_GOTO:332,
        T_FUNCTION:333,
        T_CONST:334,
        T_RETURN:335,
        T_TRY:336,
        T_CATCH:337,
        T_THROW:338,
        T_USE:339,
        T_GLOBAL:340,
        T_PUBLIC:346,
        T_PROTECTED:345,
        T_PRIVATE:344,
        T_FINAL:343,
        T_ABSTRACT:342,
        T_STATIC:341,
        T_VAR:347,
        T_UNSET:348,
        T_ISSET:349,
        T_EMPTY:350,
        T_HALT_COMPILER:351,
        T_CLASS:352,
        T_INTERFACE:353,
        T_EXTENDS:354,
        T_IMPLEMENTS:355,
        T_OBJECT_OPERATOR:356,
        T_DOUBLE_ARROW:357,
        T_LIST:358,
        T_ARRAY:359,
        T_CLASS_C:360,
        T_METHOD_C:361,
        T_FUNC_C:362,
        T_LINE:363,
        T_FILE:364,
        T_COMMENT:365,
        T_DOC_COMMENT:366,
        T_OPEN_TAG:367,
        T_OPEN_TAG_WITH_ECHO:368,
        T_CLOSE_TAG:369,
        T_WHITESPACE:370,
        T_START_HEREDOC:371,
        T_END_HEREDOC:372,
        T_DOLLAR_OPEN_CURLY_BRACES:373,
        T_CURLY_OPEN:374,
        T_PAAMAYIM_NEKUDOTAYIM:375,
        T_NAMESPACE:376,
        T_NS_C:377,
        T_DIR:378,
        T_NS_SEPARATOR:379
    },
	//Keywords tokens
	keywordsToken = {
		"abstract": tokens.T_ABSTRACT,
		"array": tokens.T_ARRAY,
		"as": tokens.T_AS,
		"break": tokens.T_BREAK,
		"case": tokens.T_CASE,
		"catch": tokens.T_CATCH,
		"class": tokens.T_CLASS,
		"__CLASS__": tokens.T_CLASS_C,
		"clone": tokens.T_CLONE,
		"const": tokens.T_CONST,
		"continue": tokens.T_CONTINUE,
		"declare": tokens.T_DECLARE,
		"default": tokens.T_DEFAULT,
		"__DIR__": tokens.T_DIR,
		"die": tokens.T_EXIT,
		"do": tokens.T_DO,
		"echo": tokens.T_ECHO,
		"else": tokens.T_ELSE,
		"elseif": tokens.T_ELSEIF,
		"empty": tokens.T_EMPTY,
		"enddeclare": tokens.T_ENDDECLARE,
		"endfor": tokens.T_ENDFOR,
		"endforeach": tokens.T_ENDFOREACH,
		"endif": tokens.T_ENDIF,
		"endswitch": tokens.T_ENDSWITCH,
		"endwhile": tokens.T_ENDWHILE,
		"eval": tokens.T_EVAL,
		"exit": tokens.T_EXIT,
		"extends": tokens.T_EXTENDS,
		"__FILE__": tokens.T_FILE,
		"final": tokens.T_FINAL,
		"for": tokens.T_FOR,
		"foreach": tokens.T_FOREACH,
		"function": tokens.T_FUNCTION,
		"__FUNCTION__": tokens.T_FUNC_C,
		"global": tokens.T_GLOBAL,
		"goto": tokens.T_GOTO,
		"__halt_compiler": tokens.T_HALT_COMPILER,
		"if": tokens.T_IF,
		"implements": tokens.T_IMPLEMENTS,
		"include": tokens.T_INCLUDE,
		"include_once": tokens.T_INCLUDE_ONCE,
		"instanceof": tokens.T_INSTANCEOF,
		"interface": tokens.T_INTERFACE,
		"isset": tokens.T_ISSET,
		"__LINE__": tokens.T_LINE,
		"list": tokens.T_LIST,
		"and": tokens.T_LOGICAL_AND,
		"or": tokens.T_LOGICAL_OR,
		"xor": tokens.T_LOGICAL_XOR,
		"__METHOD__": tokens.T_METHOD_C,
		"namespace": tokens.T_NAMESPACE,
		"__NAMESPACE__": tokens.T_NS_C,
		"new": tokens.T_NEW,
		"print": tokens.T_PRINT,
		"private": tokens.T_PRIVATE,
		"public": tokens.T_PUBLIC,
		"protected": tokens.T_PROTECTED,
		"require": tokens.T_REQUIRE,
		"require_once": tokens.T_REQUIRE_ONCE,
		"return": tokens.T_RETURN,
		"static": tokens.T_STATIC,
		"switch": tokens.T_SWITCH,
		"throw": tokens.T_THROW,
		"try": tokens.T_TRY,
		"unset": tokens.T_UNSET,
		"use": tokens.T_USE,
		"var": tokens.T_VAR,
		"while": tokens.T_WHILE
	},
	//Type casting tokens
	typeCasting = {
		"array": tokens.T_ARRAY_CAST,
		"bool": tokens.T_BOOL_CAST,
		"boolean": tokens.T_BOOL_CAST,
		"real": tokens.T_DOUBLE_CAST,
		"double": tokens.T_DOUBLE_CAST,
		"float": tokens.T_DOUBLE_CAST,
		"int": tokens.T_INT_CAST,
		"integer": tokens.T_INT_CAST,
		"object": tokens.T_OBJECT_CAST,
		"string": tokens.T_STRING_CAST,
		"unset": tokens.T_UNSET_CAST,
		"binary": tokens.T_STRING_CAST
	},
	//Symbols tokens
	symbols = {
		"&=": tokens.T_AND_EQUAL,
		"&&": tokens.T_BOOLEAN_AND,
		"||": tokens.T_BOOLEAN_OR,
		"?>": tokens.T_CLOSE_TAG,
		"%>": tokens.T_CLOSE_TAG,
		".=": tokens.T_CONCAT_EQUAL,
		"--": tokens.T_DEC,
		"/=": tokens.T_DIV_EQUAL,
		"=>": tokens.T_DOUBLE_ARROW,
		"::": tokens.T_PAAMAYIM_NEKUDOTAYIM,
		"++": tokens.T_INC,		
		"==": tokens.T_IS_EQUAL,
		">=": tokens.T_IS_GREATER_OR_EQUAL,
		"===": tokens.T_IS_IDENTICAL,
		"!=": tokens.T_IS_NOT_EQUAL,
		"<>": tokens.T_IS_NOT_EQUAL,
		"!==": tokens.T_IS_NOT_IDENTICAL,
		"<=": tokens.T_IS_SMALLER_OR_EQUAL,
		"-=": tokens.T_MINUS_EQUAL,
		"%=": tokens.T_MOD_EQUAL,
		"*=": tokens.T_MUL_EQUAL,
		"\\": tokens.T_NS_SEPARATOR,		
		"->": tokens.T_OBJECT_OPERATOR,
		"|=": tokens.T_OR_EQUAL,
		"+=": tokens.T_PLUS_EQUAL,
		"<<": tokens.T_SL,
		"<<=": tokens.T_SL_EQUAL,
		">>": tokens.T_SR,	
		">>=": tokens.T_SR_EQUAL,
		"^=": tokens.T_XOR_EQUAL
	},
	//Buffer tokens
	bufferTokens = {
		"html": tokens.T_INLINE_HTML,
		"inlineComment": tokens.T_COMMENT,
		"comment": tokens.T_COMMENT,
		"docComment": tokens.T_DOC_COMMENT,
		"singleQuote": tokens.T_CONSTANT_ENCAPSED_STRING,
		"doubleQuotes": tokens.T_CONSTANT_ENCAPSED_STRING,
		"nowdoc": tokens.T_ENCAPSED_AND_WHITESPACE,
		"heredoc": tokens.T_ENCAPSED_AND_WHITESPACE
	},
	//Buffer type. Start an html buffer immediatelly.
	bufferType = "html",
	//Buffer content
	buffer = "",
	match,
	token,
	//Last emitted token
	lastToken,
	//Results array
	ret = [],
	//Word that started the heredoc or nowdoc buffer
	heredocWord,
	//Line number
	line = 1,
	//Line at which the buffer begins
	lineBuffer = 1,
	//Flag that indicates if the current double quoted string has been splitted
	split,
	//This variable will store the previous buffer type of the tokenizer before parsing a
	//complex variable syntax
	complexVarPrevBuffer,
	//Number of open brackets inside a complex variable syntax
	openBrackets,
	//Function to emit tokens
	emitToken = function (token, code, preventBuffer, l) {
		if (!preventBuffer && bufferType) {
			buffer += token;
			lastToken = null;
		} else {
			lastToken = code ? code : token;
			ret.push(code ? [code, token, l || line] : token);
		}
	},
	//Function to emit and close the current buffer
	emitBuffer = function () {
		buffer && emitToken(buffer, bufferTokens[bufferType], true, lineBuffer);
		buffer = "";
		bufferType = null;
	},
	//Function to check if the token at the current index is escaped
	isEscaped = function () {
		var escaped = false,
			i = match.index - 1;
		for (1; i >= 0; i--) {
			if (source.charAt(i) !== "\\") {
				break;
			}
			escaped = !escaped;
		}
		return escaped;
	},
	//This function is used to split a double quoted string or a heredoc buffer after a variable
	//has been found inside it
	splitString = function () {
		//Don't emit empty buffers
		if (!buffer) {
			return;
		}
		//If the buffer is a double quoted string and it has not yet been splitted, emit the double
		//quotes as a token without an associated code
		if (bufferType === "doubleQuotes" && !split) {
			split = true;
			emitToken('"', null, true);
			buffer = buffer.substr(1);
		}
		buffer && emitToken(buffer, tokens.T_ENCAPSED_AND_WHITESPACE, true, lineBuffer);
		buffer = "";
		lineBuffer = line;
	},
	//Returns the number of line feed characters in the given string
	getNewLines = function (str) {
		var i = 0;
		str.replace(newLines, function () {
			i++;
		});
		return i;
	},
	//Regexp that matches starting whitespaces
	nextWS = /^\s/,
	//Regexp that matches starting line feeds
	nextLF = /^\r?\n/,
	//Regexp to remove characters and get the type in type casting tokens
	castType = /^\(\s*|\s*\)$/g,
	//Regexp used to find additional whitespaces matches by the first group of the main regexp
	additionalSpaces = /(\r?\n)(\s+)$/,
	//Regexp used to find line feed characters in a string
	newLines = /\n/g,
	//Regexp used to strip useless characters from heredoc start declaration
	heredocStripChars = /^<<<\s*"?|["']?\r?\n/g,
	//Regexp to check if the characters that follow a word are valid as heredoc end declaration
	heredocEndFollowing = /^;?\r?\n/,
	//Tokenizer regexp
	tokenizer = /(\s+)|(<(?:\?(?:php\r?\s?|=)?|%=?))|\b(__halt_compiler|__CLASS__|__DIR__|__FILE__|__FUNCTION__|__LINE__|__METHOD__|__NAMESPACE__|abstract|and|array|as|break|case|catch|class|clone|const|continue|declare|default|die|do|echo|elseif|else|empty|enddeclare|endforeach|endfor|endif|endswitch|endwhile|eval|exit|final|foreach|for|function|extends|global|goto|if|implements|include_once|include|instanceof|interface|isset|list|namespace|new|or|xor|print|private|protected|public|require_once|require|return|static|switch|throw|try|unset|use|var|while)\b|(\(\s*(?:array|bool(?:ean)?|real|double|float|int(?:eger)?|object|string|unset|binary)\s*\))|((?:\d+(?:\.\d*)?|\d*\.\d+)e[\+\-]?\d+|\d*\.\d+|\d+\.\d*)|(\d+(?:x[0-9a-fA-F]+)?)|(\$[a-zA-Z_][a-zA-Z_0-9]*)|(\/\/|\/\*\*?|\*\/|#)|(<<<\s*['"]?[a-zA-Z]\w*['"]?\r?\n)|(&[=&]?|\.=?|\/=?|-[=\->]?|::?|\^=?|%[=>]?|\?>?|\+[=\+]?|\*=?|\|[=\|]?|!={0,2}|=(?:>|={1,2})?|>>?=?|<(?:>|<?=?)?|[\\;\(\)\{\}\[\],~@`\$"'])|(\w+)|(.)/ig;
	
	while (match = tokenizer.exec(source)) {
		if (match[1]) {
			//Whitespace
			token = match[1];
			//Since PHP closing tag token matches also the following line feed
			//character, if the last token was a PHP closing tag and the current
			//one starts with a line feed, this character must be removed and
			//added to the previous token
			if (lastToken === tokens.T_CLOSE_TAG) {
				token = token.replace(nextLF, function (a) {
					ret[ret.length - 1][1] += a;
					line++;
					lineBuffer++;
					return "";
				});
				if (!token) {
					continue;
				}
			}
			emitToken(token, tokens.T_WHITESPACE);
			if (token.indexOf("\n") > -1) {
				//Increment line number if the token contains one or more line feed characters
				line += getNewLines(token);
				//Close the inline comment buffer if it's open
				if (bufferType === "inlineComment") {
					//Since the regexp matches multilple whitespaces but the comment token includes
					//only the first line feed, the other whitespaces must be emitted as a separated
					//token
					var spToken = false,
						lf;
					buffer = buffer.replace(additionalSpaces, function (a, p, n) {
						spToken = n;
						return p;
					});
					emitBuffer();
					if (spToken) {
						lf = getNewLines(spToken);
						emitToken(spToken, tokens.T_WHITESPACE, true, line - lf);
					}
				}
			}
		} else if (match[2]) {
			//PHP Open tags
			token = match[2];
			//If there's an active html buffer emit it as a token
			if (bufferType === "html") {
				emitBuffer();
			}
			emitToken(
				token,
				token === "<?=" || token === "<%=" ? tokens.T_OPEN_TAG_WITH_ECHO : tokens.T_OPEN_TAG
			);
			if (token.indexOf("\n") > -1) {
				line++;
			}
		} else if (match[3]) {
			//Keywords
			token = match[3];
			//If it's preceded by -> than it's an object property and it must be tokenized as T_STRING
			emitToken(
				token,
				lastToken === tokens.T_OBJECT_OPERATOR ?
				tokens.T_STRING :
				keywordsToken[token] || keywordsToken[token.toLowerCase()]
			);
		} else if (match[4]) {
			//Type-casting
			token = match[4].replace(castType, "").toLowerCase();
			emitToken(match[4], typeCasting[token]);
		} else if (match[5]) {
			//Floating point numbers
			emitToken(match[5], tokens.T_DNUMBER);
		} else if (match[6] || match[6] === "0") {
			//Integer numbers
			//Numeric array index inside a heredoc or a double quoted string
			if (lastToken === "[" && (bufferType === "heredoc" || bufferType === "doubleQuotes")) {
				emitToken(match[6], tokens.T_NUM_STRING, true);
			} else {
				token = match[6];
				var isHex = token.charAt(1).toLowerCase() === "x";
				//If it's greater than 2147483648 it's considered as a floating point number
				emitToken(
					token,
					parseInt(isHex ? parseInt(token, 16) : token, 10) < 2147483648 ?
					tokens.T_LNUMBER :
					tokens.T_DNUMBER
				);
			}
		} else if (match[7]) {
			//Variable
			//If there's an active buffer emit the token only if it's inside a double quoted string
			//or a  heredoc and it's not escaped
			if ((bufferType === "heredoc" || bufferType === "doubleQuotes") && !isEscaped()) {
				splitString();
				emitToken(match[7], tokens.T_VARIABLE, true);
			} else {
				emitToken(match[7], tokens.T_VARIABLE);
			}
		} else if(match[8]) {
			//Comment signs
			token = match[8];
			//Change the buffer only if there's no active buffer
			if (!bufferType) {
				if (token === "//" || token === "#") {
					bufferType = "inlineComment";
				} else if (token === "/**") {
					bufferType = nextWS.test(source.substr(match.index + token.length)) ?
								"docComment" :
								"comment";
				} else if (token === "/*") {
					bufferType = "comment";
				}
				lineBuffer = line;
			}
			emitToken(token);
			//Close the multi line comment buffer if there's one open
			if (token === "*/" && (bufferType === "comment" || bufferType === "docComment")) {
				emitBuffer();
			}
		} else if (match[9]) {
			//Heredoc and nowdoc start declaration
			token = match[9];
			emitToken(token, tokens.T_START_HEREDOC);
			line++;
			if (!bufferType) {
				heredocWord = token.replace(heredocStripChars, "");
				//If the first character is a quote then it's a nowdoc otherwise it's an heredoc
				if (heredocWord.charAt(0) === "'") {
					//Strip the leading quote
					heredocWord = heredocWord.substr(1);
					bufferType = "nowdoc";
				} else {
					bufferType = "heredoc";
				}
				lineBuffer = line;
			}
		} else if (match[10]) {
			//Symbols
			token = match[10];
			if (token in symbols) {
				//Syntax $obj->prop inside strings and heredoc
				if (token === "->" && lastToken === tokens.T_VARIABLE && (bufferType === "heredoc" ||
					bufferType === "doubleQuotes")) {
					emitToken(token, symbols[token], true);
					continue;
				}
				emitToken(token, symbols[token]);
				//If the token is a PHP close tag and there isn't an active buffer start an html buffer
				if (!bufferType && symbols[token] === tokens.T_CLOSE_TAG) {
					bufferType = "html";
					lineBuffer = line;
				}
			} else {
				//Start string buffers if there isn't an active buffer
				if (!bufferType && (token === "'" || token === '"')) {
					if (token === "'") {
						bufferType = "singleQuote";
					} else {
						split = false;
						bufferType = "doubleQuotes";
					}
					lineBuffer = line;
					//Add the token to the buffer and continue to skip next checks
					emitToken(token);
					continue;
				} else if (token === '"' && bufferType === "doubleQuotes" && !isEscaped()) {
					//If the string has been splitted emit the current buffer and the double quotes
					//as separate tokens
					if (split) {
						splitString();
						bufferType = null;
						emitToken('"');
					} else {
						emitToken('"');
						emitBuffer();
					}
					continue;
				} else if (bufferType === "heredoc" || bufferType === "doubleQuotes") {
					//Array index delimiters inside heredoc or double quotes
					if ((token === "[" && lastToken === tokens.T_VARIABLE) ||
						(token === "]" && (lastToken === tokens.T_NUM_STRING ||
						lastToken === tokens.T_STRING))) {
						emitToken(token, null, true);
						continue;
					} else if (((token === "$" && source.charAt(match.index + 1) === "{") ||
								(token === "{" && source.charAt(match.index + 1) === "$")) &&
								!isEscaped()) {
						//Complex variable syntax ${varname} or {$varname}. Store the current
						//buffer type and evaluate next tokens as there's no active buffer.
						//The current buffer will be reset when the declaration is closed
						splitString();
						complexVarPrevBuffer = bufferType;
						bufferType = null;
						if (token === "$") {
							emitToken(token + "{", tokens.T_DOLLAR_OPEN_CURLY_BRACES);
							openBrackets = 0;
						} else {
							emitToken(token, tokens.T_CURLY_OPEN);
							openBrackets = 1;
						}
						continue;
					}
				} else if (complexVarPrevBuffer && !openBrackets && token === "{") {
					//Skip the token if it's the bracket that follows the dollar in the
					//${varname} syntax because it's included in the previous token
					openBrackets++;
					continue;
				}
				emitToken(token);
				//Increment or decrement the number of open brackets inside a complex
				//variable syntax
				if (complexVarPrevBuffer && (token === "{" || token === "}")) {
					if (token === "{") {
						openBrackets++;
					} else if (!--openBrackets) {
						//If every bracket has been closed reset the previous buffer
						bufferType = complexVarPrevBuffer;
						complexVarPrevBuffer = null;
					}
				} else if (token === "'" && bufferType === "singleQuote" && !isEscaped()) {
					//Stop the single quoted string buffer if the character is a quote,
					//there's an open single quoted string buffer and the character is
					//not escaped
					emitBuffer();
				}
			}
		} else if (match[11]) {
			//Word
			token = match[11];
			//If there's an open nowdoc or heredoc buffer, the string is the same that the one
			//that has started the buffer, it's preceded by a line feed and followed by the
			//right characters then emit the buffer and the word
			if ((bufferType === "nowdoc" || bufferType === "heredoc") && token === heredocWord &&
				source.charAt(match.index - 1) === "\n" &&
				heredocEndFollowing.test(source.substr(match.index + token.length))) {
				emitBuffer();
				emitToken(token, tokens.T_END_HEREDOC);
				continue;
			} else if ((bufferType === "heredoc" || bufferType === "doubleQuotes")) {
				if (lastToken === "[") {
					//Literal array index inside a heredoc or a double quoted string
					emitToken(token, tokens.T_STRING, true);
					continue;
				} else if (lastToken === tokens.T_OBJECT_OPERATOR) {
					//Syntax $obj->prop inside strings and heredoc
					emitToken(token, tokens.T_STRING, true);
					continue;
				}
			} else  if (complexVarPrevBuffer && lastToken === tokens.T_DOLLAR_OPEN_CURLY_BRACES) {
				//Complex variable syntax  ${varname}
				emitToken(token, tokens.T_STRING_VARNAME);
				continue;
			}
			emitToken(token, tokens.T_STRING);
		} else {
			//Other characters
			//If below ASCII 32 it's a bad character
			if (token.charCodeAt(0) < 32) {
				emitToken(match[12], tokens.T_BAD_CHARACTER);
			} else {
				//If there isn't an open buffer there should be an syntax error, but we don't care
				//so it will be emitted as a simple string
				emitToken(match[12], tokens.T_STRING);
			}
		}
	}	
	//If there's an open buffer emit it
	if (bufferType && (bufferType !== "doubleQuotes" || !split)) {
		emitBuffer();
	} else {
		splitString();
	}
	return ret;
}
