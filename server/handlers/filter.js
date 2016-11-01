'use strict';

module.exports = function (user) {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		bgUrl: user.bgUrl || null
	}
}