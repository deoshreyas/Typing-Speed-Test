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
        to_add += "<span> </span>";
        chars.push(" ");
    }
    document.getElementById("text").innerHTML = to_add;
    return chars;
}

var characters = initTest();

var num_chars_typed = 0;

document.getElementById("hidden-type").addEventListener("input", function() {
    var text = this.value.split("");
    var spans = document.getElementById("text").getElementsByTagName("span");
    for (var i = 0; i < characters.length; i++) {
        if (i<text.length) {
            if (text[i] == characters[i]) {
                spans[i].style.color = "var(--typed-text)";
            } else {
                spans[i].style.color = "var(--wrong)";
            }
            if (i+1==text.length) {
                spans[i].classList.add("cursor");
            } else {
                spans[i].classList.remove("cursor");
            }
        } else {
            spans[i].style.color = "var(--untyped-text)";
            if (spans[i].classList.contains("cursor")) {
                spans[i].classList.remove("cursor");
            }
        }
    }
    num_chars_typed = text.length;
    scrollLeft(num_chars_typed);
});

document.addEventListener("keydown", function(e) {
    document.getElementById("hidden-type").focus();
});

function scrollLeft(n) {
    var text_element = document.getElementById("text");
    if (n < 10) {
        text_element.style.left = "0";
    } else {
        text_element.style.left = -(n-10) + "ch";
    }
}