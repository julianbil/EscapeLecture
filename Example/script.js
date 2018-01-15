var dburl = "http://127.0.0.1:5984/gmci/";
var http = new XMLHttpRequest();

function updateText(response) {
    document.getElementById("mytext").innerHTML = response.value;
}

http.onreadystatechange = function() {
    if (http.readyState == 4) {
        if (http.status == 200) {
            var response = JSON.parse(http.responseText);
            updateText(response);
        }
    }
};

function get(name) {
    http.open("GET", dburl + name, false);
    http.send();
}

// http updates with a fixed interval (ms)
function update() { get("mytext"); }
var intervalID = setInterval(update, 1000);

function put(id, doc) {
    http.open("PUT", dburl + id, false);
    http.setRequestHeader("Content-type", "application/json");
    var docAsString = JSON.stringify(doc);
    http.send(docAsString);
}

function main_footer_submit(){
  var question = document.getElementById("question-text").value;
  put("question", {'_id':'question1','value':question})
}
