import express from "express";

import bodyParser from "body-parser";
import { PORT } from "./config/index.js";
import router from "./src/router/router.js";
import * as HTTP from "http"
import { SSL_OP_EPHEMERAL_RSA } from "constants";
import { DEFAULT_MAX_VERSION } from "tls";
//import NVR_SEO from "./src/controller/crawler/aaa.js";
//import DM from "./src/controller/crawler/dm.js";
import COW_SEO from "./src/controller/crawler/cow.js";



const app = express();

var http = HTTP.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

http.listen(PORT, async () => {
	console.log("START IDEA PLATFORM CRAWLER SERVER ..... ", `PORT : ${PORT}`);
	COW_SEO.crawler();
	//DM.crawler()
	//NVR_SEO.crawler();
});