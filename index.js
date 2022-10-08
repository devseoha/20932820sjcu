const express = require("express");
const router = express.Router();
const axios = require("axios");
const gu = [
  {name: "종로구", lat: "37.5735701", lng: "126.979002"},
  {name: "중구", lat: "37.5638392", lng: "126.9975659"},
  {name: "용산구", lat: "37.532437", lng: "126.9906602"},
  {name: "성동구", lat: "37.5634747", lng: "127.0367004"},
  {name: "광진구", lat: "37.5385149", lng: "127.0824009"},
  {name: "동대문구", lat: "37.5741809", lng: "127.0397615"},
  {name: "중랑구", lat: "37.6063328", lng: "127.0932687"},
  {name: "성북구", lat: "37.5892672", lng: "127.0167286"},
  {name: "강북구", lat: "37.6396935", lng: "127.0254377"},
  {name: "도봉구", lat: "37.6688947", lng: "127.0468641"},
  {name: "노원구", lat: "37.6543624", lng: "127.0566136"},
  {name: "은평구", lat: "37.6027366", lng: "126.9294049"},
  {name: "서대문구", lat: "37.5792045", lng: "126.9367601"},
  {name: "마포구", lat: "37.5660183", lng: "126.9015353"},
  {name: "양천구", lat: "37.5169397", lng: "126.866551"},
  {name: "강서구", lat: "37.5508988", lng: "126.8493948"},
  {name: "구로구", lat: "37.4954459", lng: "126.887518"},
  {name: "금천구", lat: "37.4569659", lng: "126.8953904"},
  {name: "영등포구", lat: "37.5244797", lng: "126.8955111"},
  {name: "동작구", lat: "37.512389", lng: "126.9400754"},
  {name: "관악구", lat: "37.478016", lng: "126.951749"},
  {name: "서초구", lat: "37.4836208", lng: "127.032455"},
  {name: "강남구", lat: "37.5173748", lng: "127.0471635"},
  {name: "송파구", lat: "37.5145435", lng: "127.1059553"},
  {name: "강동구", lat: "37.5300728", lng: "127.1238564"},
];

router.get("/", async function (req, res, next) {
  const selectGu = req.query.gu ? req.query.gu : "관악구";
  const findIdx = gu.findIndex((x) => x.name === selectGu);
  const selectGuObj = gu[findIdx];

  let url = `http://openapi.seoul.go.kr:8088/48555473476d6d3436344853757868/json/tbElecWheelChrCharge/1/1000`;
  const data = await axios.get(url, {headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8", Accept: "*/*"}});

  const result = [];
  const list = data.data.tbElecWheelChrCharge.row;
  list.map((x) => {
    if (x.SIGNGUNM == selectGu && x.LATITUDE != "" && x.LONGITUDE != "") {
      result.push(x);
    }
  });

  res.render("index", {title: "서울시 전동휠체어 급속충전가능기이용 정보", selectGuObj: selectGuObj, gu: gu, list: result});
});

module.exports = router;
