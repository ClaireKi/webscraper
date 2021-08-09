const get_response = (url) => {
    var cheerio = require("cheerio")
    var request = require("request-promise")
    var iconv = require('iconv-lite')

    return new Promise((resolve, reject) => {
        request({ url: url, encoding: null }).then(async (body) => {
            
            var doc = iconv.decode(Buffer.from(body), 'EUC-KR').toString() 
            var $ = cheerio.load(doc)

            var is_euc_kr = 
            $("meta[http-equiv='content-type']").attr() != undefined && $("meta[http-equiv='content-type']").attr().content.includes('euc-kr')
            || $("meta[http-equiv='Content-Type']").attr() != undefined && $("meta[http-equiv='Content-Type']").attr().content.includes('euc-kr')
            || $("meta").attr() != undefined && $("meta").attr('charset') == 'euc-kr'
            
            if(is_euc_kr) {
                resolve(cheerio.load(doc))
            } else {
                resolve(cheerio.load(body))
            }
        })
        .catch(e => { 
            // console.log(e); 
            // reject(e) 
        })
    })
}

const get_post_response = (url) => {
    var request = require("request-promise")

    return new Promise((resolve, reject) => {
        request({ url: url, json: true, method: "POST", form: { pagePerContents: 10 } }).then(async (body) => {
            resolve(body.result.list)
        })
        .catch(e => { console.log(e); reject(e) })
    })
}

const CRAWLER_HELPER = {
    get_response
    , get_post_response
}

export default CRAWLER_HELPER