var words_list = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "imbe", "jackfruit", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "ximenia", "yuzu", "zucchini", "apricot", "blackberry", "cantaloupe", "dragonfruit", "eggplant", "feijoa", "guava", "huckleberry", "indianprune", "jujube", "kumquat", "lychee", "mulberry", "nectar", "olive", "pomegranate", "quince", "raisin", "starfruit", "tamarind", "ugli", "viburnum", "waxberry", "xigua", "yam", "zinfandel"];

function generate(n) {
    var words = [];
    for (var i = 0; i < n; i++) {
        var index = Math.floor(Math.random() * words_list.length);
        words.push(words_list[index]);
    }
    return words;
}

function initTest() {
    var sentence = generate(50);
    var to_add = ""
    var chars = [];
    for (var i = 0; i < sentence.length; i++) {
        var word = sentence[i].split("");
        for (var j = 0; j < word.length; j++) {
            to_add += "<span>" + word[j] + "</span>";
            chars.push(word[j]);
        }
    }
    document.getElementById("text").innerHTML = to_add;
    return chars;
}

var characters = initTest();

document.getElementById("hidden-type").addEventListener("input", function() {
    var text = this.value.split("");
    var spans = document.getElementById("text").getElementsByTagName("span");
    for (var i = 0; i < characters.length; i++) {
        if (i<text.length) {
            if (text[i] == characters[i]) {
                spans[i].style.color = "green";
            } else {
                spans[i].style.color = "red";
            }
        } else {
            spans[i].style.color = "black";
        }
    }
});