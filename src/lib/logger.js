const winston = require('winston')
require('winston-daily-rotate-file')
require('date-utils')

const { combine, timestamp, label, printf, splat } = winston.format

// const log_format = printf((info, { level, message, timestamp }) => {
const log_format = printf(info => {
	return `${info.timestamp} [ ${info.level.toUpperCase()} ] : ${info.message} ` // log 출력 포맷 정의
})

export const logger = winston.createLogger({
	level: 'debug', // 최소 레벨
	// 파일저장
	transports: [
		new winston.transports.DailyRotateFile({
			filename: 'log/system.log', // log 폴더에 system.log 이름으로 저장
			zippedArchive: true, // 압축여부
			format: combine(
				timestamp(),
				log_format, // log 출력 포맷
			),
		}),
		// 콘솔 출력
		new winston.transports.Console({
			format: combine(
				timestamp(),
				log_format, // log 출력 포맷
			),
		}),
	],
})
