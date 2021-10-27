async function getNews(){
  let mondai_list = [];
  const API_KEY = "a301759d867c4aeebf416dff3af6dfad";
  const url = `https://newsapi.org/v2/top-headlines?pageSize=5&country=jp&apiKey=${API_KEY}`;
  let res = await fetch(url);
  let json = await res.json();

  const goo_API_KEY = "3696cf44262a79dfedb25087966f9ac4be9792c6e7f579449a451e43ecfbd3c7";
  const goo_url = 'https://labs.goo.ne.jp/api/hiragana';
  let goo_body = {
    app_id: goo_API_KEY,
    sentence: json.articles[0].title,
    output_type: "hiragana"
  };
  let goo_res = await fetch(goo_url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(goo_body)
  });

  console.log(goo_res.json());
  console.log(json.articles[0].title);

  // const yahoo_API_KEY = '';
  // const yahoo_url = 'https://jlp.yahooapis.jp/FuriganaService/V2/furigana';
  // let yahoo_body = {
  //   id: "1234-1",
  //   jsonrpc: "2.0",
  //   method: "jlp.furiganaservice.furigana",
  //   params: {
  //     q: json.articles[0].title,
  //     grade: 1
  //   }
  // }
  // let yahoo_res = await fetch(yahoo_url, {
  //   method: 'POST',
  //   mode: 'no-cors',
  //   headers: {
  //     'Content-Type':'application/json',
  //     'User-Agent': `Yahoo AppID:${yahoo_API_KEY}`
  //   },
  //   body: JSON.stringify(yahoo_body)
  // });

  // console.log(yahoo_res.json());

  for(let i = 0; i < json.articles.length; i++){
    mondai_list.push({displayString: json.articles[i].title, inputString: "aaaaaaa"});
  }
  return mondai_list
}
export default getNews

