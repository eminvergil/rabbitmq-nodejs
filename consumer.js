var amqp = require("amqplib");

var QUEUE_NAME = "TEST_QUEUE";

amqp
  .connect("amqp://admin:admin@localhost/test")
  .then(async function (conn) {
    process.once("SIGINT", function () {
      conn.close();
    });
    const ch = await conn.createChannel();
    var ok = ch.assertQueue(QUEUE_NAME, { durable: false });
    ok = ok.then(function (_qok) {
      return ch.consume(
        QUEUE_NAME,
        function (msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
        },
        { noAck: true }
      );
    });
    const _consumeOk = await ok;
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  })
  .catch(console.warn);
