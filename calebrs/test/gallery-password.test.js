const assert = require('assert');

const { PASSWORD_GALLERIES, resolveGalleryForPassword } = require('../app.js');

assert.ok(PASSWORD_GALLERIES.greenbrier, 'Greenbrier gallery config should exist');
assert.strictEqual(resolveGalleryForPassword('greenbrier').key, 'greenbrier');
assert.strictEqual(resolveGalleryForPassword('wrong-password'), null);

console.log('gallery password checks: ok');
