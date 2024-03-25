let client = null;
let con = document.querySelector("#connect");
con.addEventListener("click", connectToBroker);

let dis = document.querySelector("#disconnect");
dis.addEventListener("click", disconnectFromBroker);

let pub = document.querySelector("#publish");
pub.addEventListener("click", publishToBroker);

let subscribe = document.querySelector("#subscribe");
subscribe.addEventListener("click", subscribeTopic);

let clientStatus = document.getElementById("status");

//----------------------- functions ------------------------------------------
function subscribeTopic(event) {
  event.preventDefault();
  topic = document.getElementById("topic-subscriber").value;
  document.getElementById("message-mqtt").innerHTML +=
    "<span>Subscribed to topic " + topic + "</span> <br/><br/><br/>";

  client.subscribe(topic);
  client.on("message", function (topic, message) {
    document.getElementById("message-mqtt").innerHTML +=
      "<span>Sub: " + message.toString() + "</span> <br/>";
  });
}

function connectClient(host, options) {
  client = mqtt.connect(host, options);

  document.getElementById("message-mqtt").innerHTML +=
    "<span>Connecting to " + host + " on port " + port + "</span> <br/>";
  document.getElementById("message-mqtt").innerHTML +=
    "<span>Using the client ID " + client.options.clientId + "</span> <br/>";

  client.on("connect", function () {
    console.log("Client connected");
    clientStatus.innerHTML = "Connected";
    clientStatus.style.color = "#23a827";
  });
}

function connectToBroker(event) {
  event.preventDefault();
  host = "wws://" + document.getElementById("host").value;
  port = document.getElementById("port").value;
  userID = document.getElementById("username").value;
  passwordID = document.getElementById("password").value;

  var options = {
    host: host,
    schema: "wss://",
    path: "/mqtt",
    port: port,
    protocol: "mqtts",
    username: userID,
    password: passwordID,
  };

  connectClient(host, options);
}

function disconnectFromBroker(event) {
  event.preventDefault();
  console.log("diconnecting...");
  stopConnection(client);
}

function stopConnection(client) {
  setTimeout(function () {
    //clearInterval(pubLoop);           // dopisać pętlę do pub /sub? dodać obiekty osobne pub sub?
    client.end();
    console.log(
      "Client with ID: " + client.options.clientId + ", is disconnected"
    );
  }, 10); // stop after 0.0001sec
  clientStatus.innerHTML = "Disconnected";
  clientStatus.style.color = "#e20a40";
}

function publishToBroker(event) {
  event.preventDefault();
  console.log("test");

  var topic_publisher = document.getElementById("topic-publisher").value;
  var message_publisher = document.getElementById("message-publisher").value;
  client.publish(topic_publisher, message_publisher);
  document.getElementById("message-mqtt").innerHTML +=
    "<span>Published to topic " +
    topic_publisher +
    " ,the message: " +
    message_publisher +
    "</span> <br/>";
}
