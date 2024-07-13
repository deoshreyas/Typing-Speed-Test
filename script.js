var words_list = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "imbe", "jackfruit", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "ximenia", "yuzu", "zucchini", "apricot", "blackberry", "cantaloupe", "dragonfruit", "eggplant", "feijoa", "guava", "huckleberry", "indianprune", "jujube", "kumquat", "lychee", "mulberry", "nectar", "olive", "pomegranate", "quince", "raisin", "starfruit", "tamarind", "ugli", "viburnum", "waxberry", "xigua", "yam", "zinfandel"];

function generate(n) {
    var words = [];
    for (var i = 0; i < n; i++) {
        var index = Math.floor(Math.random() * words_list.length);
        words.push(words_list[index]);
    }
    return words;
}

var chunk_size = 5;

var total_chars = 0;

function initTest() {
    var sentence = generate(chunk_size);
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
    document.getElementById("text").innerHTML += to_add;
    total_chars += chars.length;
    return chars;
}

var characters = initTest();

var chars_typed = 0;

document.getElementById("hidden-type").addEventListener("input", function() {
    var text = this.value.split("");
    var spans = document.getElementById("text").getElementsByTagName("span");
    for (var i = 0; i < characters.length; i++) {
        if (i<text.length) {
            if (text[i] == characters[i]) {
                spans[i].style.color = "var(--typed-text)";
                spans[i].classList.remove("wrong-char");
            } else {
                spans[i].style.color = "var(--wrong)";
                spans[i].classList.add("wrong-char");
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
    chars_typed = text.length;
    scrollLeft();
    gen_chunk();
});

function scrollLeft() {
    var text_element = document.getElementById("text");
    var screen_width = window.innerWidth;
    var cursor_element = document.querySelector(".cursor"); 
    if (cursor_element) {
        var cursor_position = cursor_element.getBoundingClientRect().left;
        if (cursor_position >= screen_width * 0.25) { 
            var new_left_pos = parseInt(text_element.style.left || '0px', 10) - (screen_width * 0.25);
            text_element.style.left = new_left_pos + "px"; 
        } else if (cursor_position < 0) {
            var new_left_pos = parseInt(text_element.style.left || '0px', 10) + (screen_width * 0.25);
            text_element.style.left = new_left_pos + "px";
        }
    }
}

function gen_chunk() {
    if (chars_typed >= total_chars * 0.75) {
        var new_characters = initTest();
        characters = characters.concat(new_characters);
    }
}

document.getElementById("time").addEventListener("click", function() {
    document.getElementById("time").focus();
});

document.getElementById("text").addEventListener("click", function() {
    document.getElementById("hidden-type").focus();
});

document.getElementById("time").addEventListener("input", function() {
    var val = document.getElementById("time").value;
    val = parseInt(val);
    if (isFinite(val)) {
        if (val < 10 || isNaN(val)) {
            val = 5;
        } else if (val > 600) {
            val = 600;
        }
    } else {
        val = 10;
    }
    document.getElementById("time").value = val;
});

var global_time = 0;

var started = false;

document.addEventListener("keydown", function(event) {
    if (document.activeElement == document.getElementById("hidden-type") && !started) {
        global_time = document.getElementById("time").value;
        startTest();
    }
});

var data;
var chart;

function startTest() {
    started = true;
    var time = document.getElementById("time").value;
    document.getElementById("time").disabled = true;
    document.getElementById("time").classList.add("activated-time");
    data = [];
    initCpsChart();
    var chars_last_sec = 0;
    var interval = setInterval(function() {
        time--;
        if (time <= 0) {
            clearInterval(interval);
            endTest();
        }
        document.getElementById("time").value = time;

        var chars_this_sec = chars_typed - chars_last_sec;
        chars_last_sec = chars_typed;
        data.push(chars_this_sec);
        updateCpsChart(data);
    }, 1000);
}

function endTest() {
    document.getElementById("hidden-type").disabled = true;
    document.getElementById("test-stuff").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("results").classList.add("flex");
    // accuracy
    var wrong = document.getElementsByClassName("wrong-char").length;
    var accuracy = (chars_typed - wrong) / chars_typed * 100;
    accuracy = accuracy.toFixed(2);
    document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy + "%";
    // cps 
    var cps = chars_typed / global_time;
    cps = cps.toFixed(0);
    document.getElementById("cps").innerHTML = "Characters Per Second (CPS): " + cps;
    // wpm
    var wpm = chars_typed / 5 / global_time * 60;
    wpm = wpm.toFixed(0);
    document.getElementById("wpm").innerHTML = "Words Per Minute (WPM): " + wpm;
}

function initCpsChart() {
    var ctx = document.getElementById("chart").getContext("2d");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Characters Per Second (CPS)",
                data: [],
                backgroundColor: "#f8f8f2",
                borderColor: "#f85050",
                color: "#242424",
                borderWidth: 2
            }]
        }
    });
}

function updateCpsChart(data) {
    chart.data.labels = data.map((_, index) => index + 1);
    chart.data.datasets[0].data = data; 
    chart.update();
}