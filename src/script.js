//<input type="button" class="button" onclick="ConnectToBroker()" value="Connect">
let client;
let con = document.querySelector("#connect");
con.addEventListener("click", connectToBroker);

let dis = document.querySelector("#disconnect");
dis.addEventListener("click", disconnectFromBroker);

function connectClient(options) {
  client = mqtt.connect(options.host, options);

  document.getElementById("message-mqtt").innerHTML +=
    "<span>Connecting to " + host + " on port " + port + "</span> <br/>";

  document.getElementById("message-mqtt").innerHTML +=
    "<span>Using the client ID " + client.options.clientId + "</span> <br/>";

  client.on("connect", function () {
    console.log("Client connected");
  });

  topic = document.getElementById("topic-subscriber").value;
  document.getElementById("message-mqtt").innerHTML +=
    "<span>Subscribed to topic " + topic + "</span> <br/>";
  client.subscribe(topic);

  client.on("message", function (topic, message) {
    // message is Buffer
    console.log("sub: " + message.toString());
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

  connectClient(options);
}

function disconnectFromBroker(event) {
  event.preventDefault();
  console.log("diconnecting...");
  stopConnection(client);
}

function stopConnection(client) {
  setTimeout(function () {
    //clearInterval(pubLoop);
    client.end();
    console.log(
      "Client with ID: " + client.options.clientId + ", is disconnected"
    );
  }, 10); // stop after 0.0001sec
}
