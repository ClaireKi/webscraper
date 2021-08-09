import express from "express";

// import CRAWLER from "../controller/crawler";
// import { getIP, make_error_respose } from "../lib/common";
// import DAO from "../DAO";

const router = express.Router();
 
router.route("/gggg").get((req, res) =>{
// CBF.crawler()
});

// router.route("/crawl_url")
//     .post((req, res) => {
//         var param = {
//             res,
//             url: req.body.url,
//             article_id: req.body.article_id,
//             team_flag: req.body.team_flag,
//             uid: req.body.uid,
//             ip: getIP(req),
//         }

//         if(param.url == undefined || param.url == '') { res.send(make_error_respose(`url을 입력해 주세요`, 'url을 입력해 주세요')); return }

//         CRAWLER.setup_crawler(param)
//     })

export default router;
