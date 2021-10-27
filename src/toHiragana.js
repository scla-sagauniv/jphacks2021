
// 引数：string
// レスポンス(大きさ2の配列)
//  index0：平仮名に変わった日本語の部分
//  index1：文中に含まれていた英語or数字
//    {start_idx: その単語の元の挿入位置}

async function toHiragana(sent) {
    sent = await removeSymbol(sent);
    const [jp, en] = await splitEnNum(sent);
    const hiragana = await postGoo(jp);
    return [hiragana, en];
}

async function postGoo(str) {
  const goo_API_KEY = "";
  const goo_url = "https://labs.goo.ne.jp/api/hiragana";
  let goo_body = {
    app_id: goo_API_KEY,
    sentence: str,
    output_type: "hiragana",
  };
  let goo_res = await fetch(goo_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goo_body),
  });
  let json = await goo_res.json()
  return json.converted;
}

function removeSymbol(sent) {
    let regexp = new RegExp(/[!！"”#＃$＄%％&＆'’(（)）*＊+＋,，.．/／,：;；<＜=＝>＞?？@＠[［\\￥\]］^＾_＿`｀{｛|｜}｝~～｢「｣」]/g );
    return sent.replace(regexp, '');
}

function splitEnNum(sent) {
    let idx_list = [], res, serial_num = 1, last_idx = -2;
    let jp_sent = sent, en_sent_list = [];
    let regexp = new RegExp(/[a-zA-Zａ-ｚＡ-Ｚ0-9]/g );
    while (res = regexp.exec(sent)) {
        if (res.index == last_idx + 1) {
            last_idx = res.index;
            serial_num++;
        }
        else {
            if (serial_num > 1) {
                idx_list[idx_list.length - 1].serial = serial_num;
            }
            idx_list.push({start_idx: res.index, serial: serial_num});
            serial_num = 1
            last_idx = res.index;
        }
    }
    if (serial_num > 1) {
        idx_list[idx_list.length - 1].serial = serial_num;
        serial_num = 1;
    }

    for (let n = 0; n < idx_list.length; n++) {
        en_sent_list.push({word: sent.substr(idx_list[n].start_idx, idx_list[n].serial), address: idx_list[n].start_idx})
        jp_sent = jp_sent.split(en_sent_list[en_sent_list.length-1].word, 2).join('')
    }
    return [jp_sent, en_sent_list];
}

export default toHiragana
