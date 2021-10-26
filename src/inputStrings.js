let mondai_list = [];
const API_KEY = "a301759d867c4aeebf416dff3af6dfad";
const url = `https://newsapi.org/v2/top-headlines?pageSize=5&country=jp&apiKey=${API_KEY}`;
fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then((json) => {
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line no-console
      // console.log(json.articles[i].title);
      mondai_list.push({
        displayString: json.articles[i].title,
        inputString: "aaaaaaa",
      });
    }
    //eslint-disable-next-line no-console
    console.log(mondai_list);
    return mondai_list;
  })
  .then((res) => {
    //eslint-disable-next-line no-console
    console.log(res);
  });


// const mondai_list = [
//   { displayString: "邪銀三郎", inputString: "yokoshimaginzaburou" },
//   { displayString: "Release", inputString: "release" },
//   { displayString: "FAIL HARDER", inputString: "failharder" },
//   { displayString: "サミュエル", inputString: "samuel" },
//   { displayString: "労働組合", inputString: "roudoukumiai" },
//   { displayString: "テストしたい", inputString: "testshitai" },
//   { displayString: "たびに出よう", inputString: "tabinideyou" },
//   { displayString: "ランチはちくわ", inputString: "ranchihachikuwa" },
//   { displayString: "ランチパック", inputString: "ranchipakku" },
//   {
//     displayString: "マージボタンをおしただけ",
//     inputString: "ma-jibotanwooshitadake",
//   },
//   {
//     displayString: "何もしてないのにこわれた",
//     inputString: "nanimoshitenainonikowareta",
//   },
//   { displayString: "まほうで動いている", inputString: "mahoudeugoiteiru" },
//   {
//     displayString: "転職してラッパーになる",
//     inputString: "tenshokushiterappa-ninaru",
//   },
//   { displayString: "単価を上げてください", inputString: "tankawoagetekudasai" },
//   {
//     displayString: "今日もストゼロを飲む",
//     inputString: "kyoumosutozerowonomu",
//   },
//   {
//     displayString: "リーダブルコードよんだかい",
//     inputString: "ri-daburuko-doyondakai",
//   },
//   {
//     displayString: "夏となればまた格別",
//     inputString: "natsutonarebamatakakubetsu",
//   },
//   { displayString: "お寿司がたべたい", inputString: "osushigatabetai" },
//   { displayString: "会いたくて震える", inputString: "aitakutefurueru" },
//   {
//     displayString: "あっさりしたものが食べたい",
//     inputString: "assarishitamonogatabetai",
//   },
//   { displayString: "歳かな", inputString: "toshikana" },
//   {
//     displayString: "マスターにプッシュしよう",
//     inputString: "masuta-nipusshushiyou",
//   },
//   { displayString: "労働基準法", inputString: "roudoukijunhou" },
//   { displayString: "みなし残業", inputString: "minashizangyou" },
//   { displayString: "ドナドナ", inputString: "donadona" },
//   { displayString: "商流が深い", inputString: "shouryuugafukai" },
//   { displayString: "年金", inputString: "nenkin" },
//   { displayString: "非正規雇用", inputString: "hiseikikoyou" },
//   { displayString: "セグフォしてますね", inputString: "segufoshitemasune" },
//   { displayString: "コアダンプ読みますか", inputString: "koadanpuyomimasuka" },
//   {
//     displayString: "腹痛のため遅れます",
//     inputString: "fukutsuunotameokuremasu",
//   },
//   {
//     displayString: "午前休でお願いします",
//     inputString: "gozenkyuudeonegaishimasu",
//   },
//   {
//     displayString: "全休でお願いします",
//     inputString: "zenkyuudeonegaishimasu",
//   },
//   {
//     displayString: "なんで動いてるんだろう",
//     inputString: "nandeugoiterundarou",
//   },
//   { displayString: "例外は握り潰せ", inputString: "reigaihanigiritsubuse" },
//   { displayString: "TRUNCATEしてみよう", inputString: "truncateshitemiyou" },
//   {
//     displayString: "サーバー強化で耐えよう",
//     inputString: "sa-ba-kyoukadetaeyou",
//   },
//   {
//     displayString: "本番で動かしてみよう",
//     inputString: "honbandeugokashitemiyou",
//   },
//   {
//     displayString: "Noticeくらいなら平気",
//     inputString: "noticekurainaraheiki",
//   },
//   { displayString: "名刺はないです", inputString: "meishihanaidesu" },
// ];

export default mondai_list;
