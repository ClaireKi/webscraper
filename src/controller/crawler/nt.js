import CRAWLER_HELPER from "../helper/crawler_helper"
import * as moment from "moment"
import { request } from "http";

function getToday(date){
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

const Excel = require('exceljs');

let url = `https://news.nate.com/recent?cate=soc&mid=n0401&type=c&date=`

const crawler = async() => {
    //excel 만들기
    const workbook = new Excel.Workbook();

    //변수 설정
    var idNum = 1;
    var searchStartDate = new Date('2021-05-26');
    var searchEndDate = new Date();
    searchEndDate.setDate(searchEndDate.getDate() + 1);

    
    while(!(getToday(searchStartDate) == getToday(searchEndDate))){
        const worksheet = workbook.addWorksheet(`${getToday(searchStartDate)}`);
        //excel 열 이름 설정
        worksheet.columns = [
            {header: 'Id', key: 'id', width: 10},
            {header: 'Link', key: 'link', width: 30},
            {header: 'Title', key: 'title', width: 30}, 
            {header: 'Date', key: 'date', width: 15,}
        ];
        var dateForURL = getToday(searchStartDate);
        //기사 page 방문
        for(var pageNum = 1; pageNum <= 100; pageNum++){
            var param = { url: `${url}${dateForURL}&page${pageNum}` }
            var $ = await CRAWLER_HELPER.get_response(param.url).catch(e => { console.log(e); throw e })
            
            $("div #newsContents").find("div .postSubjectContent").each(async function(index, item) {
                for(var liNum = 1;liNum <= 15; liNum++){
                    var link = $(this).find('div.mduSubjectList:nth-child('+liNum+') a').attr("href")
                    var newLink = `https:${link}`
                    if(newLink != undefined || newLink != "") { 
                        await CRAWLER_HELPER.get_response(newLink)
                        .then(async result => {
                            var title = result("div#articleView h3").text()
                            var date = result("p.articleInfo span.firstDate em").text()
                            console.log(title)
                            //원하는 키워드 입력
                            if(title.includes("집")){
                                worksheet.addRow({id: idNum, link: newLink, title: title, date: date})
                                workbook.xlsx.writeFile('./crawler_nate.xlsx');
                                idNum++;
                            }
                        })
                        .catch(e => { console.log(e); })

                    }
                }
            })
        }
        searchStartDate.setDate(searchStartDate.getDate() + 1);
        console.log(searchStartDate)
    }
    
    console.log('크롤링이 완료되었습니다.')
}

const NT = {
    crawler
}

export default NT