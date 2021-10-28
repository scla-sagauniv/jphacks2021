import toHiragana from "./toHiragana"
import toRome from "./toRome"
async function getNews(pageNumber, categorySelect){
  let mondai_list = [];
  const API_KEY = "";
  const url = `https://newsapi.org/v2/top-headlines?pageSize=${pageNumber}&category=${categorySelect}&country=jp&apiKey=${API_KEY}`;
  let res = await fetch(url);
  let json = await res.json();
  for(let i = 0; i < json.articles.length; i++){
    mondai_list.push({displayString: json.articles[i].title, inputString: "aaaaaaa"});
  }
  // // デバッグ用
  // toHiragana("「Todayの2.4限目の量子力学入門Ｔｅｓｔ、てげよだきっちゃけど。」PTAに訴えてもらおうぜ")
  // // toHiragana("3月1日は日曜日で祝日、晴れの日でした")
  // .then((res) => {
  //   console.log("「Todayの2.4限目の量子力学入門Ｔｅｓｔ、てげよだきっちゃけど。」PTAに訴えてもらおうぜ")
  //   // console.log("3月1日は日曜日で祝日、晴れの日でした");
  //   console.log(res);
  //   console.log(toRome(res, 'kunrei'));
  // })
  // // let test = "「Todayの2.4げんめのりょうしりきがくにゅうもんＴｅｓｔ、てげよだきっちゃけど。」PTAにうったえてもらおうぜ";
  // // console.log(toRome(test, 'kunrei'));
  return mondai_list
}
export default getNews