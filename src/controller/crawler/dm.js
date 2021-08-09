import CRAWLER_HELPER from "../helper/crawler_helper"
//import * as moment from "moment"
import { request } from "http";

function getToday(date){
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

String.prototype.checkwords = function(words) { 
    if(Array.isArray(words)) {
        return words.filter(item => this.includes(item)).length > 0
    } else {
        return false
    }
}

//키워드 설정
// let areas = ['안동']
// let disasters = ['서리']
// let crops = ['배', '사과']
let areas = ['안동', '상주', '영천', '의성']
let disasters = ['서리', '냉해']
let crops = ['배', '사과', '복숭아', '포도']


var moment = require('moment');
const Excel = require('exceljs');

let url = `https://news.daum.net/breakingnews/society?page=`

const crawler = async() => {
    //excel 만들기
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(`data`);

    //변수 설정
    var searchStartDate = new Date('2021-04-10');
    var searchEndDate = new Date('2021-05-30');
    searchEndDate.setDate(searchEndDate.getDate() + 1);
    
    while(!(getToday(searchStartDate) == getToday(searchEndDate))){
        //excel 열 이름 설정
        worksheet.columns = [
            { header: '연도', key: 'year', width: 30 }, 
            { header: '날짜', key: 'date', width: 30 },  
            { header: '작물', key: 'crop', width: 30 },  
            { header: '지역', key: 'area', width: 30 }, 
            { header: '재해', key: 'disaster', width: 30 },
            { header: '제목', key: 'title', width: 30 }, 
            { header: '링크', key: 'link', width: 30 }, 
        ];

        var dateForURL = getToday(searchStartDate);
        //기사 page 방문
        for(var pageNum = 1; pageNum <= 10; pageNum++){
            var param = { url: `${url}${pageNum}&regDate=${dateForURL}` }
            console.log(param)
            var $ = await CRAWLER_HELPER.get_response(param.url).catch(e => { console.log(e); throw e })
    
            $("div #mArticle").find("div .box_etc").each(async function(index, item) {
                for(var liNum = 1;liNum <= 15; liNum++){
                    var link = $(this).find('div ul.list_allnews li:nth-child('+liNum+') a').attr("href")
                    if(link != undefined || link != "") { 
                        await CRAWLER_HELPER.get_response(link)
                        .then(async result => {
                            var title = result("div.head_view h3").text()
                            var date = result("div.head_view span.num_date").text()
                            var year = date.split(".")[0];
                            var articleBody = result("div#harmonyContainer section p").text()

                            areas.forEach(function(area) {
                                disasters.forEach(async function(disaster) {
                                    crops.forEach(async function(crop) {
                                        var condition1 = title.checkwords(areas);
                                        var condition2 = title.checkwords(disasters);
                                        var condition3 = title.checkwords(crops);

                                        //console.log('condition1->', condition1)
                                        //console.log('condition1->', condition1)
                                        var conditionTit = condition1 || condition2 || condition3

                                        var condition4 = articleBody.checkwords(areas);
                                        var condition5 = articleBody.checkwords(disasters);
                                        var condition6 = articleBody.checkwords(crops);

                                        var conditionArt = condition4 && condition5 && condition6

                                        if(conditionTit && conditionArt){
                                            worksheet.addRow({
                                                year: year,
                                                date: date, 
                                                crop: crop,
                                                area: area,
                                                disaster: disaster,
                                                title: title,
                                                link: link
                                            });
                                            workbook.xlsx.writeFile(`${moment().add(-1, 'day').format('YYYYMMDD')}_daum.xlsx`);
                                        }
                                    })
                                })
                            })
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

const DM = {
    crawler
}

export default DM