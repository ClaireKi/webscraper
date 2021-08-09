
// 입력된 문장에서 지정한 단어가 포함되어있는지 확인하는 기능
String.prototype.checkwords = function(words) { 
    if(Array.isArray(words)) {
        return words.filter(item => this.includes(item)).length > 0
    } else {
        return false
    }
}

const areaAndDisaster = (link, result) => {
    var title = result("#articleTitle").text()
    var articleBody = result("div._article_body_contents").text()

    console.log(title)

    var contents = null
    var condition1 = title.checkwords(["안동", "영천", "의성", "상주","원주"])
    var condition2 = articleBody.checkwords(["안동", "영천", "의성", "상주","원주"])
    var condition3 = title.checkwords(["서리","냉해","대설"])
    var condition4 = articleBody.checkwords(["서리","냉해","대설"])

    var conditionSet = (condition1||condition2) && (condition3||condition4)

    if(conditionSet) {
        var temp = link.split('sid1=')
        var sectorNum = temp[1].substring(0,3)

        if( sectorNum == '001' ) {
            return {
                link: `${link}`,
                title: `${title}`,
                sector: '속보'
            };
        }else if(sectorNum == '102'){
            return contents = {
                link: `${link}`,
                title: `${title}`,
                sector: '사회'
            };
        }else if(sectorNum == '103'){
            return contents = {
                link: `${link}`,
                title: `${title}`,
                sector: '생활문화'
            };
        }
    }

    return contents;
}

function getToday(date){
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

const FUNC = {
    areaAndDisaster, getToday
}

export default FUNC
