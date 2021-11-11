package main

import (
	"fmt"
	"os"
	"bytes"
	"net/http"
	"log"
	"io/ioutil"
	"encoding/json"
	"time"

    "github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
    config := cors.DefaultConfig()
	r.Use(cors.New(config))
	r.GET("/", root)
	r.GET("/getnews", getNews)
	r.GET("/postgoo", postGoo)
	port := os.Getenv("PORT")
	r.Run(":" + port)
	// r.Run(":8000")
}

func root(ctx *gin.Context) {
	fmt.Println("hello")
	ctx.Writer.WriteString("root")
	ctx.JSON(http.StatusOK, "hello tatakimaru")
}

	
type resNews struct {
	Status       string `json:"status"`
	TotalResults int    `json:"totalResults"`
	Articles     []struct {
		Source struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"source"`
		Author      interface{} `json:"author"`
		Title       string      `json:"title"`
		Description string      `json:"description"`
		URL         string      `json:"url"`
		URLToImage  string      `json:"urlToImage"`
		PublishedAt time.Time   `json:"publishedAt"`
		Content     interface{} `json:"content"`
	} `json:"articles"`
}

func getNews(ctx *gin.Context) {
	pages := ctx.Query("pageSize")
	cat := ctx.Query("category")
	API_KEY := "c49f779b1bad4a778e96648d34e323ab"
	url := "https://newsapi.org/v2/top-headlines?pageSize="+ pages + "&category=" + cat + "&country=jp&apiKey=" + API_KEY
	
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
    byteArray, _ := ioutil.ReadAll(res.Body)
    jsonBytes := ([]byte)(byteArray)
	res_data := new(resNews)
	if err := json.Unmarshal(jsonBytes, res_data); err != nil {
		fmt.Println("JSON Unmarshal error:", err)
		return
	}
	ctx.JSON(http.StatusOK, res_data)
}

type resGoo struct {
	Converted  string `json:"converted"`
	OutputType string `json:"output_type"`
	RequestID  string `json:"request_id"`
}

func postGoo(ctx *gin.Context) {
	goo_API_KEY := "3696cf44262a79dfedb25087966f9ac4be9792c6e7f579449a451e43ecfbd3c7"
	requestBody := map[string]interface{}{
		"app_id":goo_API_KEY,
		"sentence":ctx.Query("sent"),
		"output_type":"hiragana",
	}
    jsonString, err := json.Marshal(requestBody)
	fmt.Println(requestBody)
    if err != nil {
        panic("Goo request Error")
    }
	url := "https://labs.goo.ne.jp/api/hiragana"
	fmt.Println(bytes.NewBuffer(jsonString))
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonString))
    req.Header.Set("Content-Type", "application/json; charset=utf8")
    client := new(http.Client)
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("%s\n", err)
        ctx.JSON(404, err)
        return
    }
    defer resp.Body.Close()
    byteArray, _ := ioutil.ReadAll(resp.Body)
    jsonBytes := ([]byte)(byteArray)
	res_data := new(resGoo)
	if err := json.Unmarshal(jsonBytes, res_data); err != nil {
		fmt.Println("JSON Unmarshal error:", err)
		return
	}
    ctx.JSON(http.StatusOK, res_data)
}