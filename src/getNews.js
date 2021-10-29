async function getNews(pageNumber, categorySelect){
  let mondai_list = [];
  const API_KEY = "";
  const url = `https://newsapi.org/v2/top-headlines?pageSize=${pageNumber}&category=${categorySelect}&country=jp&apiKey=${API_KEY}`;

  let res = await fetch(url);
  let json = await res.json();
  for(let i = 0; i < json.articles.length; i++){
    mondai_list.push({displayString: json.articles[i].title, inputString: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"});
  }
  return mondai_list
}
export default getNews
