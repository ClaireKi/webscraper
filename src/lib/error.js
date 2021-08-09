// 비속어 포함 에러
const BADWORD_INPUT_ERROR = input => {
	return {
		title: '비속어 포함 에러',
		message: input + '에 비속어가 포함되어 있습니다',
	}
}

// 미입력 에러
const NOT_FOUND_ERROR = input => {
	var display_title = input

	switch (input) {
		case 'email':
			display_title = '이메일'
			break
		case 'name':
			display_title = '닉네임'
			break
		case 'password':
			display_title = '비밀번호'
			break
		case 'password_re':
			display_title = '비밀번호확인'
			break
		case 'anon_password':
			display_title = '임시비밀번호'
			break
		case 'title':
			display_title = '제목'
			break
		case 'content':
			display_title = '내용'
			break
		case 'body':
			display_title = '내용'
			break
		case 'option1':
			display_title = 'A 설명글'
			break
		case 'option1_color':
			display_title = 'A 팀 색상'
			break
		case 'option2':
			display_title = 'B 설명글'
			break
		case 'option2_color':
			display_title = 'B 팀 색상'
			break
		case 'type':
			display_title = '타입'
			break
		case 'sql':
			display_title = '쿼리문'
			break
		case 'tag':
			display_title = '태그(머리말)'
			break
		case 'board_name':
			display_title = '커뮤니티 이름'
			break
	}

	return {
		title: input + ' 미입력 에러',
		message: display_title + '을(를) 입력해 주세요',
	}
}

// 비밀번호 미일치 에러
const PASSWORD_NOT_MATCH = () => {
	return { title: 'password 오류', message: '비밀번호가 일치하지 않습니다' }
}

// 비밀번호, 비밀번호 확인 미일치 에러
const PASSWORD_NOT_MATCH_PASSWORD_RE = () => {
	return {
		title: 'password 오류',
		message: '비밀번호와 비밀번호확인이 일치하지 않습니다',
	}
}

// 이메일 형식 에러
const NOT_VALIDATE_EMAIL = () => {
	return {
		title: 'email 형식 오류',
		message: '이메일 형식이 올바르지 않습니다',
	}
}

// 글자수 부족 에러
const COUNT_LESS_ERROR = (title, count) => {
	var display_title = title

	switch (title) {
		case 'email':
			display_title = '이메일'
			break
		case 'name':
			display_title = '닉네임'
			break
		case 'password':
			display_title = '비밀번호'
			break
		case 'password_re':
			display_title = '비밀번호확인'
			break
		case 'anon_password':
			display_title = '임시비밀번호'
			break
		case 'title':
			display_title = '제목'
			break
		case 'content':
			display_title = '내용'
			break
		case 'option1':
			display_title = 'A 설명글'
			break
		case 'option1_color':
			display_title = 'A 팀 색상'
			break
		case 'option2':
			display_title = 'B 설명글'
			break
		case 'option2_color':
			display_title = 'B 팀 색상'
			break
		case 'type':
			display_title = '타입'
			break
	}

	return {
		title: `${title} 횟수제한 에러`,
		message: `${display_title}은(는) ${count}자 이상 입력하셔야 합니다`,
	}
}

// 글자수 초과 에러
const COUNT_MORE_ERROR = (title, count) => {
	return {
		title: `${title} 횟수제한 에러`,
		message: `${title}은(는) ${count}자 이하로 입력하셔야 합니다`,
	}
}

// 알림설정 is_on 파리미터 에러
const CHECK_SPELL_IN_ON = () => {
	return {
		title: `is_on의 철자 에러`,
		message: `is_on은 on 또는 off 를 입력하셔야 합니다`,
	}
}

const Error = {
	BADWORD_INPUT_ERROR,
	NOT_FOUND_ERROR,
	PASSWORD_NOT_MATCH,
	NOT_VALIDATE_EMAIL,
	COUNT_LESS_ERROR,
	COUNT_MORE_ERROR,
	PASSWORD_NOT_MATCH_PASSWORD_RE,
	CHECK_SPELL_IN_ON,
}

export default Error
