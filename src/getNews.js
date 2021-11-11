import toHiragana from "./toHiragana"
import toRome from "./toRome"
async function getNews(pageNumber, categorySelect){

  let mondai_list = [], for_input;
  const url = `http://localhost:8000/getnews?pageSize=${pageNumber}&category=${categorySelect}`;

  let res = await fetch(url);
  let json = await res.json();
  console.log(json)
  console.log(json.articles)
  for(let i = 0; i < json.articles.length; i++){
    res = await toHiragana(json.articles[i].title)
    for_input = await toRome(res, 'kunrei')
    mondai_list.push({mondaiString: json.articles[i].title, mondaiUrl: json.articles[i].url, displayString: res, inputString: for_input});
  }
  return mondai_list
}
export default getNews