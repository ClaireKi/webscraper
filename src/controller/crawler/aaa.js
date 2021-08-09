
import CRAWLER_HELPER from '../helper/crawler_helper';

//replaceAll prototype 선언
String.prototype.replaceAll = function(org, dest) { return this.split(org).join(dest); }

//검색 url
let url = [
    `https://search.naver.com/search.naver?where=news&sm=tab_jum&query=`,
]

//키워드 설정

let areas = ['안동', '상주', '영천', '의성']
let disasters = ['동해', '냉해', '서리', '우박', '강풍', '가뭄', '폭염', '대설', '태풍', '폭우', '고온해']
let crops = ['배', '사과', '복숭아', '포도', '감', '자두']

//excel 관련
const Excel = require('exceljs');
var moment = require('moment');


//변수 선언
//var pageNum = 2;
//var pageNumLoop = 2;

const crawler = async () => {
    
    makeContentes();
    
}


const makeContentes = async () => {
    const workbook = new Excel.Workbook();

    const worksheet = workbook.addWorksheet('전체 기사');

    worksheet.columns = [
        { header: '연도', key: 'year', width: 30 }, 
        { header: '날짜', key: 'date', width: 30 },  
        { header: '작물', key: 'crop', width: 30 },  
        { header: '지역', key: 'area', width: 30 }, 
        { header: '재해', key: 'disaster', width: 30 },
        { header: '제목', key: 'title', width: 30 }, 
        { header: '링크', key: 'link', width: 30 }, 
    ];

    areas.forEach(function(area) {
        disasters.forEach(async function(disaster) {
            crops.forEach(async function(crop) {
                //while (pageNumLoop <= pageNum) {
                    var param = { url: `${url}${encodeURI(area)}+${encodeURI(disaster)}+${encodeURI(crop)}&start=5}` }  //${pageNumLoop > 1 ? (pageNum * pageNumLoop) + 1 : 0
                    var $ = await CRAWLER_HELPER.get_response(param.url).catch(e => { console.log(e); throw e })

                    $("div #content").find("div #main_pack").each(async function(index, item) {
                        for(var liNum = 1; liNum <= 10; liNum++) {
                            var link = $(this).find('div ul.list_news li:nth-child('+liNum+') div.news_wrap a.news_tit').attr("href");
                            var title = $(this).find('div ul.list_news li:nth-child('+liNum+') div.news_wrap a.news_tit').text();
                            var date = $(this).find('div ul.list_news li:nth-child('+liNum+') div.news_wrap span.info').text();
                            var year = date.split('.')[0];

                            var contents = {
                                link : `${link}`,
                                title : `${title}`,
                                date : `${date}`,
                                year : `${year}`,
                                crop : `${crop}`,
                                area : `${area}`,
                                disaster : `${disaster}`
                            }

                            console.log(link)
                            worksheet.addRow({
                                year: contents.year,
                                date: contents.date, 
                                crop: contents.crop,
                                area: contents.area,
                                disaster: contents.disaster,
                                title: contents.title,
                                link: contents.link
                            });

                            workbook.xlsx.writeFile(`${moment().add(-1, 'day').format('YYYYMMDD')}_naver5.xlsx`);
                        }
                    })
                //    pageNumLoop++;
                //}
                //pageNumLoop = 1
            })
        })
    })
}

const NVR_SEO = {
    crawler
}

export default NVR_SEO