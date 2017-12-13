
// -----------	exports	-------------
var user = require('./user');

var vasya = new user.User("Вася");
var petya = new user.User("Петя");

vasya.hello(petya);

// -----------	global	-------------
/*
require('./user');

var vasya = new User("Вася");
var petya = new User("Петя");

vasya.hello(petya);
*/
