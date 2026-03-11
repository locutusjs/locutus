// create_function() was deprecated in PHP 7.2 and removed in PHP 8.0.
// Locutus targets PHP 8.3 parity, so the unsafe dynamic-code helper is intentionally absent.
export { call_user_func } from './call_user_func.ts'
export { call_user_func_array } from './call_user_func_array.ts'
export { function_exists } from './function_exists.ts'
export { get_defined_functions } from './get_defined_functions.ts'
