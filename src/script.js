function ConnectToBroker() {
  clientID = "clientID: " + parseInt(Math.random() * 100);
  console.log(clientID);

  host = document.getElementById("host").value;
  port = document.getElementById("port").value;
  userID = document.getElementById("username").value;
  passwordID = document.getElementById("password").value;

  document.getElementById("message-mqtt").innerHTML +=
    "<span>Connecting to " + host + "on port " + port + "</span> <br/>";

  document.getElementById("message-mqtt").innerHTML +=
    "<span>Using the client ID " + clientID + "</span> <br/>";

  client = new Paho.MQTT.Client(host, Number(port), clientID);

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  client.connect({
    onSuccess: onConnect,
  });
}

function onConnect() {
  topic = document.getElementById("topic-subscriber").value;
  document.getElementById("message-mqtt").innerHTML +=
    "<span>Subscribed to topic " + topic + "</span> <br/>";
  client.subscribe(topic);
}

function onConnectionLost(responseObject) {
  document.getElementById("message-mqtt").innerHTML +=
    "<span>ERROR: Connection is lost</span> <br/>";

  if (responseObject != 0) {
    document.getElementById("message-mqtt").innerHTML +=
      "<span>ERROR:" + responseObject.errorMessage + "</span> <br/>";
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived" + message.payloadString);
  document.getElementById("message-mqtt").innerHTML +=
    "<span>Topic: " +
    message.destinationName +
    "Message: " +
    message.payloadString +
    "</span> <br/>";
}

function DisconnectFromBroker() {}

function PublishMessageToTopic() {}
