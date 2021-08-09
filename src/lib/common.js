var fs = require('fs')
var moment = require('moment')
const req_ip = require('request-ip')
var geoip = require('geoip-country')

/**
 * 2019.11.01 주석 작성
 * 국내 아이피만 필터링하는 기능
 */
export const filter_ip = req => {
	return new Promise((resolve, reject) => {
		var geo = geoip.lookup(req_ip.getClientIp(req))
		if (geo == null || geo.country != 'KR') {
			resolve(true)
		} else {
			resolve(false)
		}
	})
}

/**
 * 2019 06.10 코드 작성
 * 클라이언트 아이피 가져오는 함수
 */
export const getIP = req => {
	var ipAddress

	if (!!req.hasOwnProperty('sessionID')) {
		ipAddress = req.headers['x-forwarded-for']
	} else {
		if (!ipAddress) {
			var forwardedIpsStr = req.header('x-forwarded-for')

			if (forwardedIpsStr) {
				var forwardedIps = forwardedIpsStr.split(',')
				ipAddress = forwardedIps[0]
			}
			if (!ipAddress) {
				ipAddress = req.connection.remoteAddress
			}
		}
	}

	if (ipAddress.split(':').length > 3) {
		return ipAddress.split(':')[3]
	} else {
		return ipAddress
	}
}

export const make_success_response = (message, data) => {
	return {
		status: 200,
		message: message,
		data: data,
	}
}

export const make_error_respose = (message, error_message) => {
	return {
		status: 300,
		message: message,
		error: {
			message: error_message
		},
	}
}

// 문자열 치환
const replaceAll = (str, searchStr, replaceStr) => {
    return str.split(searchStr).join(replaceStr);
}
