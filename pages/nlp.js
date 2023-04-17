const customData = require('nlp_dependencies/wordfreq2.json');
const posdf = require('nlp_dependencies/posdf.json')
var pos = require('pos');

function freqbyword(word) {
    for (let i = 0; i < customData.length; i++) {
        if (customData[i]["word"] == word) {
            return customData[i]["freq"];
        }
    }
    return 0;
}


function splitText(text, cache = []) {
    if (!text) {
        return [1, []];
    }
    let best_p = -1;
    let best_split = [];
    for (let i = 1; i <= text.length; i++) {
        let word = text.slice(0, i);
        let remainder = text.slice(i);
        if ((word.length > 1 || word === "a" || word === "i")) {
            let f = freqbyword(word);
            if (f > 4e-6) {
                var words = new pos.Lexer().lex(word);
                var tagger = new pos.Tagger();
                var curr_pos = tagger.tag(words);
                var p;
                if (cache.length == 0) {
                    p = posdf['.'][curr_pos[0][1]];
                } else {
                    p = posdf[cache[cache.length - 1][1]][curr_pos[0][1]];
                }
                p *= f;
                let [remainder_p, remainder_words] = splitText(remainder, cache.concat(curr_pos));
                p *= remainder_p;

                if (p > best_p && f > 0) {
                    best_p = p;
                    if (remainder !== "") {
                        best_split = curr_pos.concat(remainder_words);
                    } else {
                        best_split = curr_pos;
                    }
                }
            }
        }
    }
    cache = [best_p, best_split];
    return cache;
}

function addSpaces(text, cache = []) {
    text = text.toLowerCase();
    cacheText = "";
    for (let i = 0; i < cache.length; i++) {
        cacheText += cache[i] + " ";
    }
    if (cache.length > 0) {
        var t = new pos.Lexer().lex(cacheText);
        var tagger = new pos.Tagger();
        cache = tagger.tag(t);
    }
    let words = splitText(text, cache);

    let answer = "";
    let temp = [];
    if (words[0] <= 0) {
        answer = text.split("").join("-");
        temp.push(answer);
    } else {
        for (let i = 0; i < words[1].length; i++) {
            temp.push(words[1][i][0]);
        }
    }
    answer = cacheText;
    for (let i = 0; i < temp.length; i++) {
        answer += temp[i] + " ";
    }
    answer = answer.slice(0, answer.length - 1);
    return [answer, temp];
}

function appendSign(predicted_char, curr_sen = [], temp = [], curr_letters = "") {
    if (predicted_char.length > 1) {
        curr_sen = curr_sen.concat(temp);
        curr_sen.push(predicted_char);
        curr_letters = "";
        temp = [];
    } else {
        curr_letters += predicted_char;
    }
    let [answer, temp2] = addSpaces(curr_letters, curr_sen); // assuming that `add_spaces` is a valid function defined elsewhere
    temp = temp2;
    return [answer, curr_sen, temp, curr_letters];
}

export default appendSign;