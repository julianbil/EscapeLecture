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
//function update() { get("mytext"); }
//var intervalID = setInterval(update, 1000);

function put(id, doc) {
    http.open("PUT", dburl + id, false);
    http.setRequestHeader("Content-type", "application/json");
    var docAsString = JSON.stringify(doc);
    http.send(docAsString);
}

function fakeQuestion(qst) {

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  // add a zero in front of numbers<10
  m = checkTime(m);
  var time = h + ":" + m ;
  var question = {
    title: qst,
    time: time,
    personen: 4,
    state: "Offen"
  };
  main_add_question(question);
}

function main_add_question(question){
  var html = '<div class="view-content-items-item">\
<div id="" class="vciitem-title">' + question.title + '</div>\
    <div class="vciitem-time">' + question.time + '</div>\
    <div class="vciitem-seperator"></div>\
    <div class="vciitem-personen">' + question.personen + ' Personen fragen sich das auch</div>\
    <div class="vciitem-state">' + question.state + '</div>\
    <div class="vciitem-seperator"></div>\
    <div class="vciitem-answer">\
      <div class="vciitem-answer-noanswer">Noch keine antworten</div>\
    </div>\
    <div class="vciitem-seperator"></div>\
    <div class="vciitem-command">Auf Frage antworten</div>\
  </div>';
    document.getElementsByClassName("view-content-items")[0].innerHTML += html;
}

function main_footer_submit(){
  var question = document.getElementById("question-text").value;
  try{
     put("question", {'_id':'question','value':question, "_rev": "1-967a00dff5e02add41819138abb3284d"}) 
  } catch (e) {
    console.warn("error: " + e.message);  
  }
    
  fakeQuestion(question);
  document.getElementById("question-text").value = "";
}
