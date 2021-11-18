async function makeRuby(mondai_list) {
    const allSent = mergeSent(mondai_list)
    const json = await postFurigana(allSent)
    console.log(json)
    let ruby_list = [];
    for (let i = 0; i < json.result.word.length; i++) {
        if (json.result.word[i].subword) {
            for (let n = 0; n < json.result.word[i].subword.length; n++) {
                if (/\p{sc=Han}/u.test(json.result.word[i].subword[n].surface)) {
                ruby_list.push({ kanzi: json.result.word[i].subword[n].surface, furigana: json.result.word[i].subword[n].furigana })
                }
            }
        }
        else {
            if (/\p{sc=Han}/u.test(json.result.word[i].surface)) {
                ruby_list.push({ kanzi: json.result.word[i].surface, furigana: json.result.word[i].furigana })
            }
        }
    }
    return ruby_list
}

async function postFurigana(sent) {
    const furigana_url = `https://tatakimaru.herokuapp.com/postfurigana?sent=${sent}`
    const res = await fetch(furigana_url)
    const json = await res.json()
    return json
}

function mergeSent(mondai_list) {
    console.log(mondai_list)
    let sent_list = []
    for (let i = 0; i < mondai_list.length; i++) {
        sent_list.push(mondai_list[i].mondaiString)
    }
    return sent_list.join('<>')
}

export default makeRuby