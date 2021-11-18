async function addRuby(mondai_list) {
    const allSent = mergeSent(mondai_list)
    const json = await postFurigana(allSent)
    let ruby_list_part = [], idx = 0;
    for (let i = 0; i < json.result.word.length; i++) {
        if (json.result.word[i].subword) {
            for (let n = 0; n < json.result.word[i].subword.length; n++) {
                if (/\p{sc=Han}/u.test(json.result.word[i].subword[n].surface)) {
                    ruby_list_part.push({ word: json.result.word[i].subword[n].surface, ruby: json.result.word[i].subword[n].furigana })
                }
                else {
                    ruby_list_part.push({ word: json.result.word[i].subword[n].surface, ruby: undefined })
                }
            }
        }
        else if (/\p{sc=Han}/u.test(json.result.word[i].surface)) {
            ruby_list_part.push({ word: json.result.word[i].surface, ruby: json.result.word[i].furigana })
        }
        else {
            if (json.result.word[i].surface === "<" && json.result.word[i+1].surface === ">") {
                mondai_list[idx]["furigana"] = ruby_list_part
                ruby_list_part = []
                idx++
            }
            else {
                ruby_list_part.push({ word: json.result.word[i].surface, ruby: undefined })
            }
        }
    }
    mondai_list[idx]["furigana"] = ruby_list_part
    return mondai_list
}

async function postFurigana(sent) {
    const furigana_url = `https://tatakimaru.herokuapp.com/postfurigana?sent=${sent}`
    const res = await fetch(furigana_url)
    const json = await res.json()
    return json
}

function mergeSent(mondai_list) {
    let sent_list = []
    for (let i = 0; i < mondai_list.length; i++) {
        sent_list.push(mondai_list[i].mondaiString)
    }
    return sent_list.join('<>')
}

export default addRuby