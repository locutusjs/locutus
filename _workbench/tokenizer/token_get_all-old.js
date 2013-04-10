function token_get_all(source) {
    // Split given source into PHP tokens
    // +      original by: Marco Marchiò
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: token_name
    // %        note 1: Token numbers depend on the PHP version
    // %        note 2: token_name is only necessary for a non-standard php.js-specific use of this function;
    // %        note 2: if you define an object on this.php_js.phpParser (where "this" is the scope of the
    // %        note 2: token_get_all function (either a namespaced php.js object or the window object)),
    // %        note 2: this function will call that object's methods if they have the same names as the tokens,
    // %        note 2: passing them the string, line number, and token number (in that order)
    // *     example 1: token_get_all('/'+'* comment *'+'/');
    // *     returns 1: [[311, '/* comment */', 1]]

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
/**
    tokens = { // using PHP 5.2.6 on Windows, I get these values for token_name()
        T_REQUIRE_ONCE:258,
        T_REQUIRE:259,
        T_EVAL:260,
        T_INCLUDE_ONCE:261,
        T_INCLUDE:262,
        T_LOGICAL_OR:263,
        T_LOGICAL_XOR:264,
        T_LOGICAL_AND:265,
        T_PRINT:266,
        T_SR_EQUAL:267,
        T_SL_EQUAL:268,
        T_XOR_EQUAL:269,
        T_OR_EQUAL:270,
        T_AND_EQUAL:271,
        T_MOD_EQUAL:272,
        T_CONCAT_EQUAL:273,
        T_DIV_EQUAL:274,
        T_MUL_EQUAL:275,
        T_MINUS_EQUAL:276,
        T_PLUS_EQUAL:277,
        T_BOOLEAN_OR:278,
        T_BOOLEAN_AND:279,
        T_IS_NOT_IDENTICAL:280,
        T_IS_IDENTICAL:281,
        T_IS_NOT_EQUAL:282,
        T_IS_EQUAL:283,
        T_IS_GREATER_OR_EQUAL:284,
        T_IS_SMALLER_OR_EQUAL:285,
        T_SR:286,
        T_SL:287,
        T_INSTANCEOF:288,
        T_UNSET_CAST:289,
        T_BOOL_CAST:290,
        T_OBJECT_CAST:291,
        T_ARRAY_CAST:292,
        T_STRING_CAST:293,
        T_DOUBLE_CAST:294,
        T_INT_CAST:295,
        T_DEC:296,
        T_INC:297,
        T_CLONE:298,
        T_NEW:299,
        T_EXIT:300,
        T_IF:301,
        T_ELSEIF:302,
        T_ELSE:303,
        T_ENDIF:304,
        T_LNUMBER:305,
        T_DNUMBER:306,
        T_STRING:307,
        T_STRING_VARNAME:308,
        T_VARIABLE:309,
        T_NUM_STRING:310,
        T_INLINE_HTML:311,
        T_CHARACTER:312,
        T_BAD_CHARACTER:313,
        T_ENCAPSED_AND_WHITESPACE:314,
        T_CONSTANT_ENCAPSED_STRING:315,
        T_ECHO:316,
        T_DO:317,
        T_WHILE:318,
        T_ENDWHILE:319,
        T_FOR:320,
        T_ENDFOR:321,
        T_FOREACH:322,
        T_ENDFOREACH:323,
        T_DECLARE:324,
        T_ENDDECLARE:325,
        T_AS:326,
        T_SWITCH:327,
        T_ENDSWITCH:328,
        T_CASE:329,
        T_DEFAULT:330,
        T_BREAK:331,
        T_CONTINUE:332,
        T_FUNCTION:333,
        T_CONST:334,
        T_RETURN:335,
        T_TRY:336,
        T_CATCH:337,
        T_THROW:338,
        T_USE:339,
        T_GLOBAL:340,
        T_PUBLIC:341,
        T_PROTECTED:342,
        T_PRIVATE:343,
        T_FINAL:344,
        T_ABSTRACT:345,
        T_STATIC:346,
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
        T_DOUBLE_COLON:375
        /*,UNKNOWN:376,
        UNKNOWN:377,
        UNKNOWN:378,
        UNKNOWN:379,
        UNKNOWN:380,*/
    },
//*/

    // Tokens indentified by a keyword
    keywordsTokens = {
        'abstract':'T_ABSTRACT',
        'as':'T_AS',
        'break':'T_BREAK',
        'case':'T_CASE',
        'catch':'T_CATCH',
        'class':'T_CLASS',
        '__CLASS__':'T_CLASS_C',
        'clone':'T_CLONE',
        'const':'T_CONST',
        'continue':'T_CONTINUE',
        'default':'T_DEFAULT',
        '__DIR__':'T_DIR',
        'do':'T_DO',
        'else':'T_ELSE',
        'enddeclare':'T_ENDDECLARE',
        'endfor':'T_ENDFOR',
        'endforeach':'T_ENDFOREACH',
        'endif':'T_ENDIF',
        'endswitch':'T_ENDSWITCH',
        'endwhile':'T_ENDWHILE',
        'extends':'T_EXTENDS',
        '__FILE__':'T_FILE',
        'final':'T_FINAL',
        'function':'T_FUNCTION',
        '__FUNCTION__':'T_FUNC_C',
        'global':'T_GLOBAL',
        'goto':'T_GOTO',
        'implements':'T_IMPLEMENTS',
        'instanceof':'T_INSTANCEOF',
        'interface':'T_INTERFACE',
        '__LINE__':'T_LINE',
        'and':'T_LOGICAL_AND',
        'or':'T_LOGICAL_OR',
        'xor':'T_LOGICAL_XOR',
        '__METHOD__':'T_METHOD_C',
        '__NAMESPACE__':'T_NS_C',
        'new':'T_NEW',
        'namespace':'T_NAMESPACE',
        'private':'T_PRIVATE',
        'public':'T_PUBLIC',
        'protected':'T_PROTECTED',
        'return':'T_RETURN',
        'static':'T_STATIC',
        'throw':'T_THROW',
        'try':'T_TRY',
        'use':'T_USE',
        'var':'T_VAR',
        'echo':'T_ECHO',
        'exit':'T_EXIT',
        'die':'T_EXIT',
        'include':'T_INCLUDE',
        'include_once':'T_INCLUDE_ONCE',
        'print':'T_PRINT',
        'require':'T_REQUIRE',
        'require_once':'T_REQUIRE_ONCE'
    },
    // Tokens indentified by a keyword followed by a (
    funcLoopCondTokens = {
        'array':'T_ARRAY',
        'declare':'T_DECLARE',
        'elseif':'T_ELSEIF',
        'empty':'T_EMPTY',
        'eval':'T_EVAL',
        'for':'T_FOR',
        'foreach':'T_FOREACH',
        '__halt_compiler':'T_HALT_COMPILER',
        'if':'T_IF',
        'isset':'T_ISSET',
        'list':'T_LIST',
        'switch':'T_SWITCH',
        'unset':'T_UNSET',
        'while':'T_WHILE'
    },
    // Type casting tokens
    castingTokens = {
        'unset':'T_UNSET_CAST',
        'bool':'T_BOOL_CAST',
        'boolean':'T_BOOL_CAST',
        'object':'T_OBJECT_CAST',
        'array':'T_ARRAY_CAST',
        'string':'T_STRING_CAST',
        'binary':'T_STRING_CAST',
        'real':'T_DOUBLE_CAST',
        'double':'T_DOUBLE_CAST',
        'float':'T_DOUBLE_CAST',
        'int':'T_INT_CAST',
        'integer':'T_INT_CAST'
    },
    // 2 chars tokens
    twoCharsTokens = {
        '&&':tokens.T_BOOLEAN_AND,
        '&=':tokens.T_AND_EQUAL,
        '||':tokens.T_BOOLEAN_OR,
        '|=':tokens.T_OR_EQUAL,
        '.=':tokens.T_CONCAT_EQUAL,
        '--':tokens.T_DEC,
        '-=':tokens.T_MINUS_EQUAL,
        '->':tokens.T_OBJECT_OPERATOR,
        '%=':tokens.T_MOD_EQUAL,
        '=>':tokens.T_DOUBLE_ARROW,
        '::':tokens.T_PAAMAYIM_NEKUDOTAYIM,
        '/=':tokens.T_DIV_EQUAL,
        '++':tokens.T_INC,
        '+=':tokens.T_PLUS_EQUAL,
        '<>':tokens.T_IS_NOT_EQUAL,
        '<=':tokens.T_IS_SMALLER_OR_EQUAL,
        '*=':tokens.T_MUL_EQUAL,
        '<%':tokens.T_OPEN_TAG,
        '>=':tokens.T_IS_GREATER_OR_EQUAL,
        '^=':tokens.T_XOR_EQUAL,
        '==':tokens.T_IS_EQUAL,
        '!=':tokens.T_IS_NOT_EQUAL,
        '>>':tokens.T_SR,
        '<<':tokens.T_SL
    },
    // 3 chars tokens
    threeCharsTokens = {
        '===':tokens.T_IS_IDENTICAL,
        '!==':tokens.T_IS_NOT_IDENTICAL,
        '>>=':tokens.T_SR_EQUAL,
        '<<=':tokens.T_SL_EQUAL,
        '<?=':tokens.T_OPEN_TAG_WITH_ECHO,
        '<%=':tokens.T_OPEN_TAG_WITH_ECHO
    },
    // These two variables contain a set of char without an associated token
    nonTokensChar = ';(){}[],~@`', charNoToken = '=+/-*.$|^&<>%!?:',
    // Immediately start an HTML buffer
    buffer = '', bufferType = 'HTML',
    line = 1, isEncapsed, hdlabel, ret = [],
    // Get a word in the code starting from the given index
    getCurrentWord = function (start) {
        var match = (/^([\w]+)\s*(\()?/).exec(source.substr(start));
        return match;
    },
    // Get a type cast construct in the code starting from the given index
    getCurrentCasting = function (start) {
        var match = (/^\(\s*(\w+)\s*\)/).exec(source.substr(start));
        if (match && match[1]) {
            match[1] = match[1].toLowerCase();
        }
        return match;
    },
    // Get a decimal or integer number in the code starting from the given index
    checkCurrentNumber = function (start) {
        var match = (/^\d*\.?\d+(?:x[\da-f]+|e\-?\d+)?/i).exec(source.substr(start));
        if (match) {
            var at;
            if ((/^\d+(?:x[\da-f]+)?$/i).test(match[0])) {at = tokens.T_LNUMBER;}
            else {at = tokens.T_DNUMBER;}
            return [at, match[0]];
        }
        else {return null;}
    },
    // Check if the char at the given index is escaped
    isEscaped = function (start) {
        if (source.charAt(start-1) !== '\\') {return false;}
        var count = 1;
        for (var c = start-2; c>=0; c--) {
            if (source.charAt(c) !== '\\') {break;}
            else {count++;}
        }
        return (count % 2 !== 0);
    },
    // Get the heredoc starting label
    getHeredoc = function (start) {
        var match = (/^(\s*(.*)?)(\r?\n)/i).exec(source.substr(start));
        return match;
    },
    // Get heredoc closing label
    getHeredocClose = function(start, lab) {
        var s = start - 1;
        if (source.charAt(s) !== '\n') {return null;}
        var reg = new RegExp('^' + lab + ';\\r?\\n'),
        match = reg.exec(source.substr(start));
        return match;
    },
    // Get whitespaces at the given position
    // Mode: 0 every whitespace, 1 only next new line, 2 only next space or new line
    getCurrentWhitespaces = function(start, mode) {
        var ascii = source.charCodeAt(start), sp = '';
        if (!mode) {
            while (ascii === 9 || ascii === 10 || ascii === 13 || ascii === 32) {
                sp += source.charAt(start);
                start++;
                ascii = source.charCodeAt(start);
            }
            return sp;
        }
        else if (mode === 1) {
            if (ascii === 10 || (ascii === 13 && source.charCodeAt(start + 1) === 10)) {
                return (ascii === 13 ? source.charAt(start) + source.charAt(start + 1) : source.charAt(start));
            }
            else {return '';}
        }
        else {
            if (ascii === 32 || ascii === 10 || (ascii === 13 && source.charCodeAt(start + 1) === 10)) {
                return (ascii === 13 ? source.charAt(start) + source.charAt(start + 1) : source.charAt(start));
            }
            else {return '';}
        }
    },
    // Count the number of substrings in a given string
    countSubstrings = function (str, sub) {
        if (!str.length || !sub.length) {return 0;}
        var ind = str.indexOf(sub), count = 0;
        while (ind>-1) {
            count++;
            ind = str.indexOf(sub, ind + 1);
        }
        return count;
    },
    // Add a token to the result array
    pushOnRet = function (token, string) {
        if (string === undefined) {ret.push(token);}
        else {ret.push([token, string, line]);}
    },
    oldPushOnRet = pushOnRet;

    var that = this;
    if (this.php_js && this.php_js.phpParser) {
        pushOnRet = function (token, string) {
            var action = that.php_js.phpParser[typeof token === 'number' ? that.token_name(token) : token];
            if (typeof action === 'function') {
                action.call(that.php_js.phpParser, string, line, token);
            }
            oldPushOnRet(token, string);
        };
    }
    // Loop through every character in the string
    for (var i = 0; i < source.length; i++) {
        // Get the current character and its ascii code
        var ch = source.charAt(i), ASCII = source.charCodeAt(i);
        // If is set a buffer then manage it
        if (buffer !== undefined) {
            switch (bufferType) {
                // HTML
                case 'HTML':
                    // If there's no php open tag add the char to the buffer and continue
                    if (ch === '<' && (source.charAt(i + 1) === '?' || source.charAt(i + 1) === '%')) {
                        if (buffer.length) {pushOnRet(tokens.T_INLINE_HTML, buffer);}
                        line += countSubstrings(buffer, '\n');
                        bufferType = undefined;
                        buffer = undefined;
                    }
                    else {
                        buffer += ch;
                        continue;
                    }
                break;
                // Inline comments
                case 'inlineComment':
                    // Stop it if the current char is a new line char otherwise add the char to the buffer
                    buffer += ch;
                    if (ASCII === 10) {
                        pushOnRet(tokens.T_COMMENT, buffer);
                        bufferType = undefined;
                        buffer = undefined;
                        line++;
                    }
                    continue;
                // Multiline e doc comments
                case 'DOCComment':
                case 'multilineComment':
                    // Add the char to the buffer and stop it if there's the close comments sign
                    buffer += ch;
                    if (ch === '*' && source.charAt(i + 1) === '/') {
                        buffer += source.charAt(i + 1);
                        if (bufferType === 'multilineComment') {pushOnRet(tokens.T_COMMENT, buffer);}
                        else {
                            pushOnRet(tokens.T_DOC_COMMENT, buffer);
                        }
                        line += countSubstrings(buffer, '\n');
                        bufferType = undefined;
                        buffer = undefined;
                        i++;
                    }
                    continue;
                // Single quoted strings and double quoted strings
                case 'doubleQuote':
                case 'singleQuote':
                    // If the buffer is a double quote string and the current char is a dollar sign
                    // or a curly bracket and it's not escaped don't skip this part
                    if (bufferType === 'singleQuote' || (ch !== '$' && ch !== '{') || isEscaped(i)) {
                        // Heredoc. If there's a heredoc open and this can close it, close the buffer
                        if (hdlabel && ch === hdlabel.charAt(0) && getHeredocClose(i, hdlabel)) {
                            if (buffer.length) { // Is the fact that token_get_all does report a line break at
                                                             // the end of a HEREDOC, despite it not being counted as
                                                             // part of the HEREDOC, a PHP bug?
                                pushOnRet(tokens.T_ENCAPSED_AND_WHITESPACE, buffer);
                                line += countSubstrings(buffer, '\n');
                            }
                            pushOnRet(tokens.T_END_HEREDOC, hdlabel);
                            i += hdlabel.length - 1;
                            hdlabel = null;
                            bufferType = undefined;
                            buffer = undefined;
                            continue;
                        }
                        else {buffer += ch;}
                        // If the current char is a quote (for single quoted string) or a double quote(for double quoted string)
                        // and it's not escaped close the buffer
                        if (!hdlabel && ((ch === "'" && bufferType === 'singleQuote') ||
                            (ch === '"' && bufferType === 'doubleQuote')) && !isEscaped(i)) {
                            // If the isEncapsed is true add it as a T_ENCAPSED_AND_WHITESPACE otherwise add it as a normal string
                            if (isEncapsed) {
                                if (buffer.length>1) {
                                    pushOnRet(tokens.T_ENCAPSED_AND_WHITESPACE, buffer.substr(0, buffer.length-1));
                                }
                                pushOnRet('"');
                            }
                            else {
                                pushOnRet(tokens.T_CONSTANT_ENCAPSED_STRING, buffer);
                            }
                            line += countSubstrings(buffer, '\n');
                            bufferType = undefined;
                            buffer = undefined;
                        }
                        continue;
                    }
                break;
                // This buffer is activated when {$ is found so if the char is a closed bracket and it's not escaped stop the
                // buffer and reset the double quoted string buffer
                case 'curlyInString':
                    if (ch === '}' && !isEscaped(i)) {
                        pushOnRet('}');
                        bufferType = 'doubleQuote';
                        buffer = '';
                    }
                break;
            }
        }
        var ws;
        if (bufferType !== 'doubleQuote') {
            // Whitespaces
            if (ASCII === 9 || ASCII === 10 || ASCII === 13 || ASCII === 32) {
                ws = getCurrentWhitespaces(i + 1);
                ch += ws;
                pushOnRet(tokens.T_WHITESPACE, ch);
                // If it's new line character increment the line variable
                if (ASCII === 10) {line++;}
                if (ws) {line += countSubstrings(ws, '\n');}
                i += ch.length-1;
                continue;
            }
            // Bad char
            else if (ASCII < 32) {
                pushOnRet(tokens.T_BAD_CHARACTER, ch);
                continue;
            }
            // Char without token: (){}[]
            else if (nonTokensChar.indexOf(ch) !== -1) {
                if (ch === '(') {
                    // Type casting
                    var cast = getCurrentCasting(i);
                    if (cast && castingTokens[cast[1]]) {
                        pushOnRet(castingTokens[cast[1]], cast[0]);
                        i += cast[0].length - 1;
                        continue;
                    }
                }
                pushOnRet(ch);
                continue;
            }
            // Start a comment (with #), single or double quoted string buffer
            else if (ch === '#' || ch === "'" || ch === '"') {
                buffer = ch;
                bufferType = ch === '#' ? 'inlineComment' : (ch === "'" ? 'singleQuote' : 'doubleQuote');
                isEncapsed = false;
                continue;
            }
            // Namespace separator
            else if (ch === '\\') {
                pushOnRet(tokens.T_NS_SEPARATOR, ch);
                continue;
            }
        }
        // Get the current word
        var word = getCurrentWord(i), lowWord = word ? word[1].toLowerCase() : '', nextCharWord = getCurrentWord(i + 1);
        // Keyword
        if (word && (keywordsTokens[word[1]] || keywordsTokens[lowWord])) {
            pushOnRet((keywordsTokens[lowWord] ? tokens[keywordsTokens[lowWord]] : tokens[keywordsTokens[word[1]]]), word[1]);
            i += lowWord.length - 1;
            continue;
        }
        // Functions, loops and condition: every keyword followed by (
        else if (word && word[2] === '(' && funcLoopCondTokens[lowWord]) {
            pushOnRet(tokens[funcLoopCondTokens[lowWord]], word[1]);
            i += lowWord.length - 1;
            continue;
        }
        // Variables
        else if (bufferType != 'doubleQuote' && ch === '$' && nextCharWord) {
            pushOnRet(tokens.T_VARIABLE, ch + nextCharWord[1]);
            i += nextCharWord[1].length;
            continue;
        }
        // Variables inside strings
        else if (bufferType === 'doubleQuote' && (ch === '$' || ch === '{')) {
            var toInsert = [], changeBuffer = false;
            if (ch === '$') {
                // ${a}
                if (source.charAt(i + 1) === '{') {
                    nextCharWord = getCurrentWord(i + 2);
                    if (nextCharWord) {
                        // Get the next word and check that it is followed by a }
                        var afterChar = source.charAt(i + nextCharWord[0].length + 2);
                        if (afterChar === '}') {
                            toInsert.push([tokens.T_DOLLAR_OPEN_CURLY_BRACES, '${']);
                            toInsert.push([tokens.T_STRING_VARNAME, nextCharWord[0]]);
                            toInsert.push('}');
                            i += nextCharWord[0].length + 2;
                        }
                        // ${a[0]}, ${a[b]}
                        else if (afterChar === '[') {
                            // If it's followed by a [ get the array index
                            var nextNextCharWord = getCurrentWord(i + nextCharWord[0].length + 3);
                            // Check also that it's followed by a ] and a }
                            if (nextNextCharWord && source.charAt(i + nextCharWord[0].length + 3 + nextNextCharWord[0].length) === ']' &&
                                source.charAt(i + nextCharWord[0].length + 3 + nextNextCharWord[0].length + 1) === '}') {
                                toInsert.push([tokens.T_DOLLAR_OPEN_CURLY_BRACES, '${']);
                                toInsert.push([tokens.T_STRING_VARNAME, nextCharWord[0]]);
                                toInsert.push('[');
                                if ((/^\d+$/).test(nextNextCharWord[0])) {toInsert.push([tokens.T_LNUMBER, nextNextCharWord[0]]);}
                                else {toInsert.push([tokens.T_STRING, nextNextCharWord[0]]);}
                                toInsert.push(']');
                                toInsert.push('}');
                                i += nextCharWord[0].length + 3 + nextNextCharWord[0].length + 1;
                            }
                        }
                    }
                }
                // $a
                else {
                    nextCharWord = getCurrentWord(i + 1);
                    if (nextCharWord) {
                        toInsert.push([tokens.T_VARIABLE, ch + nextCharWord[1]]);
                        i += nextCharWord[1].length;
                        // $a[0], $a[b]
                        if (source.charAt(i + 1) === '[') {
                            // If it's an array get its index and check that it's followed by a ]
                            nextCharWord = getCurrentWord(i + 2);
                            if (nextCharWord && source.charAt(i + nextCharWord[0].length + 2) === ']') {
                                toInsert.push('[');
                                if ((/^\d+$/).test(nextCharWord[0])) {
                                    toInsert.push([tokens.T_NUM_STRING, nextCharWord[0]]);
                                }
                                else {
                                    toInsert.push([tokens.T_STRING, nextCharWord[0]]);
                                }
                                toInsert.push(']');
                                i += nextCharWord[0].length + 2;
                            }
                        }
                    }
                }
            }
            // {$a}
            else if (source.charAt(i + 1) === '$') {
                // If there are variables inside brackets parse them as normal code by changing the buffer
                toInsert.push([tokens.T_CURLY_OPEN, ch]);
                changeBuffer = true;
            }
            // If there's nothing to insert it means that it's not a string variable sintax
            if (!toInsert.length) {
                buffer += ch;
                continue;
            }
            // Insert the buffer as with the T_ENCAPSED_AND_WHITESPACE token
            if (!isEncapsed && buffer.charAt(0) === '"') {
                pushOnRet('"');
                buffer = buffer.substr(1);
                isEncapsed = true;
            }
            if (buffer.length) {
                pushOnRet(tokens.T_ENCAPSED_AND_WHITESPACE, buffer);
                line += countSubstrings(buffer, '\n');
                buffer = '';
            }
            // Insert every token found
            for (var ind = 0; ind < toInsert.length; ind++) {
                if (Object.prototype.toString.call(toInsert[ind]) === '[object Array]') {
                    pushOnRet(toInsert[ind][0], toInsert[ind][1]);
                }
                else {
                    pushOnRet(toInsert[ind]);
                }
            }
            // Change the buffer if necessary
            if (changeBuffer) {bufferType = 'curlyInString';}
            continue;
        }
        // Concat the current char with the following
        var couple = ch + source.charAt(i + 1), triplet = couple + source.charAt(i + 2), insString;
        // If it's a three chars token add it and continue
        if (threeCharsTokens[triplet]) {
            pushOnRet(threeCharsTokens[triplet], triplet);
            i += 2;
            continue;
        // If it's a two chars token add it and continue
        }
        else if (triplet === '<<<') { // Avoid being treated as '<<' shift by couple check (handle instead in switch below)
        }
        else if (twoCharsTokens[couple]) {
            pushOnRet(twoCharsTokens[couple], couple);
            i++;
            continue;
        }
        // Other symbols
        switch (couple) {
            // If it's a php closing tag start an HTML buffer
            case '?>':
            case '%>':
                ws = getCurrentWhitespaces(i + 2, 1);
                couple += ws;
                pushOnRet(tokens.T_CLOSE_TAG, couple);
                if (ws && ws.indexOf('\n') !== -1) {line++;}
                i += couple.length - 1;
                buffer = '';
                bufferType = 'HTML';
                continue;
            case '<<':
                // If <<< check for heredoc start
                nextCharWord = getHeredoc(i + 3);
                if (source.charAt(i + 2) === '<' && nextCharWord) {
                    // If there's a heredoc start a double quoted string buffer
                    // because they have the same behaviour
                    bufferType = 'doubleQuote';
                    isEncapsed = true;
                    buffer = '';
                    i += nextCharWord[0].length + 2;
                    hdlabel = nextCharWord[1];
                    pushOnRet(tokens.T_START_HEREDOC, '<<<'+nextCharWord[0]);
                    line++;
                    continue;
                }
            break;
            case '<%':
            case '<?':
                insString = couple;
                if (couple === '<?' && source.charAt(i + 2) === 'p' &&
                    source.charAt(i + 3) === 'h' && source.charAt(i + 4) === 'p') {
                    insString += 'php';
                }
                ws = getCurrentWhitespaces(i + 2 + (insString.length>2 ? 3 : 0), 2);
                insString += ws;
                pushOnRet(tokens.T_OPEN_TAG, insString);
                i += insString.length - 1;
                if (ws && ws.indexOf('\n') !== -1) {line++;}
                continue;
            // Start a multiline comment buffer
            case '/*':
                buffer = couple;
                if (source.charAt(i + 2) === '*' && (/\s/).test(source.charAt(i + 3))) {
                    bufferType = 'DOCComment';
                    buffer += source.charAt(i + 2) + source.charAt(i + 3);
                    i += 2;
                }
                else {bufferType = 'multilineComment';}
                i++;
                continue;
            // Start a comment buffer
            case '//':
                buffer = couple;
                bufferType = 'inlineComment';
                i++;
                continue;
            default:
                insString = checkCurrentNumber(i);
                // Other characters without tokens
                if (charNoToken.indexOf(ch) !== -1) {
                    pushOnRet(ch);
                    continue;
                }
                //  Integer and decimal numbers
                else if (insString) {
                    pushOnRet(insString[0], insString[1]);
                    i += insString[1].length - 1;
                    continue;
                }
            break;
        }
        // If a word was found insert it as a T_STRING
        if (word && word[1]) {
            pushOnRet(tokens.T_STRING, word[1]);
            i += word[1].length - 1;
        }
    }
    // Close the HTML buffer if there's one open
    if (buffer !== undefined && bufferType === 'HTML' && buffer.length) {
        pushOnRet(tokens.T_INLINE_HTML, buffer);
    }
    // Return the token array
    return ret;
}
