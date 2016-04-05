
const utils = {
	fromNow: (dateString) => {
		const now = new Date();
		const date = new Date(dateString);
		if (date.getFullYear() < now.getFullYear()) {
			return now.getFullYear() - date.getFullYear() + '年';
		} else if (date.getMonth() < now.getMonth()) {
			return now.getMonth() - date.getMonth() + '月';
		} else if (date.getDate() < now.getDate()) {
			return now.getDate() - date.getDate() + '天';
		} else if (date.getHours() < now.getHours()) {
			return now.getHours() - date.getHours() + '小时';
		} else if (date.getMinutes() < now.getMinutes()) {
			return now.getMinutes() - date.getMinutes() + '分钟';
		} else if (date.getSeconds() < now.getSeconds()) {
			return now.getSeconds() - date.getSeconds() + '秒';
		}
	}
};
module.exports = utils;
