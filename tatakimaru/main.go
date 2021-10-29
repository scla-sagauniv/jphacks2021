package main

import (
	"fmt"
	"os"
	"bytes"
	"net/http"
	"log"
	"io/ioutil"
	"encoding/json"

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
}

func root(ctx *gin.Context) {
	fmt.Println("hello")
	ctx.Writer.WriteString("root")
	ctx.JSON(http.StatusOK, "hello tatakimaru")
}

func getNews(ctx *gin.Context) {
	pages := ctx.Query("pageSize")
	cat := ctx.Query("category")
	API_KEY := "a301759d867c4aeebf416dff3af6dfad"
	url := "https://newsapi.org/v2/top-headlines?pageSize="+ pages + "&category=" + cat + "&country=jp&apiKey=" + API_KEY
	
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
    byteArray, _ := ioutil.ReadAll(res.Body)
    jsonBytes := ([]byte)(byteArray)
	fmt.Println(pages)
	ctx.JSON(http.StatusOK, string(jsonBytes))
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
    ctx.JSON(http.StatusOK, string(jsonBytes))
}