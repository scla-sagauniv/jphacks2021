import toHiragana from "./toHiragana"
import toRome from "./toRome"
async function getNews(pageNumber, categorySelect){
  let mondai_list = [], for_input;
  const API_KEY = "a301759d867c4aeebf416dff3af6dfad";
  const url = `https://newsapi.org/v2/top-headlines?pageSize=${pageNumber}&category=${categorySelect}&country=jp&apiKey=${API_KEY}`;
  let res = await fetch(url);
  let json = await res.json();
  for(let i = 0; i < json.articles.length; i++){
    res = await toHiragana(json.articles[i].title)
    for_input = await toRome(res, 'kunrei')
    mondai_list.push({displayString: json.articles[i].title, inputString: for_input});
  }
  return mondai_list
}
export default getNews