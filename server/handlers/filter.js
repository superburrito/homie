'use strict';

module.exports = function (user) {
	return {
		id: user.id,
		fbId: user.fbId || null,
		name: user.name,
		email: user.email,
		bgUrl: user.bgUrl || null
	}
}