
// 引数：string
// レスポンス：記号がなくなって漢字が平仮名になった文
//             -.,'は通す

async function toHiragana(sent) {
    sent = await removeSymbol(sent);
    let full_hiragana = await postGoo(sent);
    const [jp, ennum_list] = await splitEnNum(sent);
    let ennum_hiragana = await postGoo(ennum_list.join("<>"));
    let ennum_list_hiragana = ennum_hiragana.split(/<>/g);
    for (let n = 0; n < ennum_list_hiragana.length; n++) {
        full_hiragana = full_hiragana.replace(ennum_list_hiragana[n], ennum_list[n]);
    }
    return full_hiragana;
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
  let json = await goo_res.json();
  return json.converted.replace(/ /g, "");
}

function removeSymbol(sent) {
    let regexp = new RegExp(/[!！"”#＃$＄%％&＆’(（)）*＊+＋,，．/／,：;；<＜=＝>＞?？@＠[［\\￥\]］^＾_＿`｀{｛|｜}｝~～｢「｣」]/g );
    return sent.replace(regexp, '');
}

function splitEnNum(sent) {
    let idx_list = [], res, serial_num = 1, last_idx = -2;
    let jp_sent = sent, en_sent_list = [];
    let regexp = new RegExp(/[a-zA-Zａ-ｚＡ-Ｚ0-9０-９.,']/g );
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
        en_sent_list.push(sent.substr(idx_list[n].start_idx, idx_list[n].serial))
        jp_sent = jp_sent.split(en_sent_list.slice(-1), 2).join('<>')
    }
    return [jp_sent, en_sent_list];
}

export default toHiragana
