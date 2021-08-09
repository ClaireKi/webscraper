
import { contents } from 'cheerio/lib/api/traversing';
import CRAWLER_HELPER from '../helper/crawler_helper';

//replaceAll prototype 선언
String.prototype.replaceAll = function(org, dest) { return this.split(org).join(dest); }


//excel 관련
const Excel = require('exceljs');
var moment = require('moment');


const crawler = async () => {
    //뉴스 데이터 다 긁어오기
    var article = await makeContents(); 
    //뉴스 데이터 중 업데이트 된 데이터만 긁어오기
    var updateData = filterPrevious(article);
    //엑셀에 업데이트 데이터 작성
    writeExcelFile(updateData)
}

const makeContents = async () => {
    let url = [
        `http://www.chuksannews.co.kr/news/section_list_all.html?sec_no=37`,
    ]
    var contentsArr = []
    var endPageNum = 100;
    var pageNum = 1;

    while (pageNum <= endPageNum) {
        var param = { url: `${url}&page=${pageNum}` }  //${pageNumLoop > 1 ? (pageNum * pageNumLoop) + 1 : 0
        var $ = await CRAWLER_HELPER.get_response(param.url).catch(e => { console.log(e); throw e })
        $(".art_list_all li").find("a").each(async function() {
            var link = $(this).attr("href");
            var newLink = `http://www.chuksannews.co.kr${link}`
            var content = {
                year : $(this).find('ul li.date').text().split('-')[0],
                date : $(this).find('ul li.date').text(),
                title : $(this).find('h2').text(),
                link : newLink
            }
            contentsArr.push(content)
        })
        pageNum++;
    }
    return contentsArr;
}

const filterPrevious = (contentsArr) => {
    var comparisonTitle = ``;
    function findPrevious(element) {
        if(element.title == comparisonTitle) return true;
    }
    var index = contentsArr.findIndex(findPrevious)
    var updatedContentArr = []
    updatedContentArr = contentsArr.slice(0,index);

    return updatedContentArr;
}

const writeExcelFile =  (updateData) => {
    const workbook = new Excel.Workbook();

    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.columns = [
        { header: '연도', key: 'year', width: 30 }, 
        { header: '날짜', key: 'date', width: 30 },  
        { header: '제목', key: 'title', width: 30 }, 
        { header: '링크', key: 'link', width: 30 }, 
    ];
    console.log(updateData)

    updateData.forEach((content) => {
        worksheet.addRow(content);
        workbook.xlsx.writeFile(`${moment().add(-1, 'day').format('YYYYMMDD')}_hanwoo.xlsx`)
    })
    console.log(`Done`)
}


const COW_SEO = {
    crawler
}

export default COW_SEO


/*const getPrevious = async () => {
    var excelFile = `20210629_hanwoo.xlsx`
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(excelFile)
        .then(function(){
            var dataSheet = workbook.getWorksheet('Sheet 1');
            console.log(dataSheet)
            const cell = dataSheet.getCell('C2');
            console.log(cell);
        })
}*/