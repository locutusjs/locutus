function PHPToJS (config) {
	this._js = '';
	if (config && typeof config.no$ !== 'undefined') {
		this.no$ = config.no$;
	}
}
PHPToJS.prototype.T_REQUIRE_ONCE = function (string, line, token) {
    this._js += string;
};
PHPToJS.prototype.T_REQUIRE = function (string, line, token) {
    this._js += string;
};
PHPToJS.prototype.T_EVAL = function (string, line, token) {
    this._js += string;
};
PHPToJS.prototype.T_INCLUDE_ONCE = function (string, line, token) {
    this._js += string;
};
PHPToJS.prototype.T_INCLUDE = function (string, line, token) {
    this._js += string;
};
PHPToJS.prototype.T_LOGICAL_OR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_LOGICAL_XOR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_LOGICAL_AND = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_PRINT = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_SR_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_SL_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_XOR_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_OR_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_AND_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_MOD_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CONCAT_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DIV_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_MUL_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_MINUS_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_PLUS_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_BOOLEAN_OR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_BOOLEAN_AND = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IS_NOT_IDENTICAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IS_IDENTICAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IS_NOT_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IS_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IS_GREATER_OR_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IS_SMALLER_OR_EQUAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_SR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_SL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_INSTANCEOF = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_UNSET_CAST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_BOOL_CAST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_OBJECT_CAST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ARRAY_CAST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_STRING_CAST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DOUBLE_CAST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_INT_CAST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DEC = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_INC = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CLONE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_NEW = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_EXIT = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IF = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ELSEIF = function (string, line, token) {
    this._js += 'else if';

};
PHPToJS.prototype.T_ELSE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ENDIF = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_LNUMBER = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DNUMBER = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_STRING = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_STRING_VARNAME = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_VARIABLE = function (string, line, token) {
    this._js += 'var '+ (this.no$ ? string.replace(/^\$/, '') : string);

};
PHPToJS.prototype.T_NUM_STRING = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_INLINE_HTML = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CHARACTER = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_BAD_CHARACTER = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ENCAPSED_AND_WHITESPACE = function (string, line, token) {
    this._js += "'"+string.replace(/'/g, "\\'")+"'";

};
PHPToJS.prototype.T_CONSTANT_ENCAPSED_STRING = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ECHO = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DO = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_WHILE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ENDWHILE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_FOR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ENDFOR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_FOREACH = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ENDFOREACH = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DECLARE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ENDDECLARE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_AS = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_SWITCH = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ENDSWITCH = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CASE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DEFAULT = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_BREAK = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CONTINUE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_GOTO = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_FUNCTION = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CONST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_RETURN = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_TRY = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CATCH = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_THROW = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_USE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_GLOBAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_PUBLIC = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_PROTECTED = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_PRIVATE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_FINAL = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ABSTRACT = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_STATIC = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_VAR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_UNSET = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ISSET = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_EMPTY = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_HALT_COMPILER = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CLASS = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_INTERFACE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_EXTENDS = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_IMPLEMENTS = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_OBJECT_OPERATOR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DOUBLE_ARROW = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_LIST = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_ARRAY = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CLASS_C = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_METHOD_C = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_FUNC_C = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_LINE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_FILE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_COMMENT = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DOC_COMMENT = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_OPEN_TAG = function (string, line, token) {
    // this._js += string;
};
PHPToJS.prototype.T_OPEN_TAG_WITH_ECHO = function (string, line, token) {
    this._js += string;
};
PHPToJS.prototype.T_CLOSE_TAG = function (string, line, token) {
    // this._js += string;
};
PHPToJS.prototype.T_WHITESPACE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_START_HEREDOC = function (string, line, token) {
    //this._js += string;
	this._startedHeredoc = true;
};
PHPToJS.prototype.T_END_HEREDOC = function (string, line, token) {
    //this._js += string;
	this._startedHeredoc = false;

};
PHPToJS.prototype.T_DOLLAR_OPEN_CURLY_BRACES = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_CURLY_OPEN = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_PAAMAYIM_NEKUDOTAYIM = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_NAMESPACE = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_NS_C = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_DIR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype.T_NS_SEPARATOR = function (string, line, token) {
    this._js += string;

};
PHPToJS.prototype['='] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype[';'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['('] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype[')'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['{'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['}'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['['] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype[']'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['~'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['@'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['+'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['/'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['-'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['*'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['.'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['$'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['|'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['^'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['&'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['<'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['>'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['%'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['!'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype['?'] = function (string, line, token) {
	this._js += token;
};
PHPToJS.prototype[':'] = function (string, line, token) {
	this._js += token;
};

