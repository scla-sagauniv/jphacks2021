import addRuby from "./addRuby"
async function getNews(country, pageNumber, categorySelect){

  let mondai_list = [], for_input;
  const url = `https://tatakimaru.herokuapp.com/getnews?country=${country}&pageSize=${pageNumber}&category=${categorySelect}`;

  let res = await fetch(url);
  let json = await res.json();
  for(let i = 0; i < json.articles.length; i++){
    // res = await toHiragana(json.articles[i].title)
    // for_input = await toRome(res, 'kunrei')
    // mondai_list.push({mondaiString: json.articles[i].title, mondaiUrl: json.articles[i].url, displayString: res, inputString: for_input});
    json.articles[i].title = json.articles[i].title.split(" - ")[0];
    if (json.articles[i].author != null) {
      json.articles[i].title = json.articles[i].title.replace(`（${json.articles[i].author}）`, "")
    }
    if (json.articles[i].urlToImage == '') {
      json.articles[i].urlToImage = "https://1.bp.blogspot.com/-D2I7Z7-HLGU/Xlyf7OYUi8I/AAAAAAABXq4/jZ0035aDGiE5dP3WiYhlSqhhMgGy8p7zACNcBGAsYHQ/s180-c/no_image_square.jpg";
    }
    mondai_list.push({mondaiString: json.articles[i].title, mondaiUrl: json.articles[i].url, displayString: json.articles[i].title, inputString: "for_input", mondaiImage: json.articles[i].urlToImage});
  }
  mondai_list = await addRuby(mondai_list)
  return mondai_list
}
export default getNews