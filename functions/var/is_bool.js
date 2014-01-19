function is_bool(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_bool/
  // original by: Onno Marsman
  // improved by: CoursesWeb (http://www.coursesweb.net/)
  //   example 1: is_bool(false);
  //   returns 1: true
  //   example 2: is_bool(0);
  //   returns 2: false

  return (mixed_var === true || mixed_var === false); // Faster (in FF) than type checking
}