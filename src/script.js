function ConnectToBroker() {
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

  const client = mqtt.connect(host, options);

  document.getElementById("message-mqtt").innerHTML +=
    "<span>Connecting to " + host + " on port " + port + "</span> <br/>";

  document.getElementById("message-mqtt").innerHTML +=
    "<span>Using the client ID " + client.options.clientId + "</span> <br/>";

  client.on("connect", function () {
    console.log("Client connected");
  });

  //-------------------------

  topic = document.getElementById("topic-subscriber").value;
  document.getElementById("message-mqtt").innerHTML +=
    "<span>Subscribed to topic " + topic + "</span> <br/>";
  client.subscribe(topic);

  client.on("message", function (topic, message) {
    // message is Buffer
    console.log("sub: " + message.toString());
  });

  return client;
}

function DisconnectFromBroker(client) {
  client.end(true);
  console.log(
    "Client with ID: " + client.options.clientId + ", is disconnected"
  );
}
