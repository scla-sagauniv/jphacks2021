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
	r.GET("/postfurigana", postFurigana)
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
	country := ctx.Query("country")
	pages := ctx.Query("pageSize")
	cat := ctx.Query("category")
	API_KEY := "a301759d867c4aeebf416dff3af6dfad"
	url := "https://newsapi.org/v2/top-headlines?pageSize="+ pages + "&category=" + cat + "&country=" + country + "&apiKey=" + API_KEY
	
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


type reqFurigana struct {
	ID      string `json:"id"`
	Jsonrpc string `json:"jsonrpc"`
	Method  string `json:"method"`
	Params  struct {
		Q     string `json:"q"`
		Grade int    `json:"grade"`
	} `json:"params"`
}

type resFurigana struct {
	ID      string `json:"id"`
	Jsonrpc string `json:"jsonrpc"`
	Result  struct {
		Word []struct {
			Surface  string `json:"surface"`
			Furigana string `json:"furigana,omitempty"`
			Roman    string `json:"roman,omitempty"`
			Subword  []struct {
				Furigana string `json:"furigana"`
				Roman    string `json:"roman"`
				Surface  string `json:"surface"`
			} `json:"subword,omitempty"`
		} `json:"word"`
	} `json:"result"`
}

func postFurigana(ctx *gin.Context) {
	app_id := "Yahoo AppID: dj00aiZpPXhqZkE3emJwZ2pYdyZzPWNvbnN1bWVyc2VjcmV0Jng9YmM-"

	requestBody := new(reqFurigana)
	requestBody.ID = "1"
	requestBody.Jsonrpc = "2.0"
	requestBody.Method = "jlp.furiganaservice.furigana"
	requestBody.Params.Q = ctx.Query("sent")
	requestBody.Params.Grade = 1
	
    jsonString, err := json.Marshal(requestBody)
	fmt.Println("[+] %s\n", string(jsonString))
    if err != nil {
        panic("Furigana request Error")
    }
	url := "https://jlp.yahooapis.jp/FuriganaService/V2/furigana"
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonString))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("User-Agent", app_id)
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
	res_data := new(resFurigana)
	if err := json.Unmarshal(jsonBytes, res_data); err != nil {
		fmt.Println("JSON Unmarshal error:", err)
		return
	}
	fmt.Println("[+] %s\n", string(jsonBytes))
    ctx.JSON(http.StatusOK, res_data)
}