var amqp = require("amqplib");

var QUEUE_NAME = "TEST_QUEUE";

amqp
  .connect("amqp://admin:admin@localhost/test")
  .then(async function (conn) {
    try {
      const ch = await conn.createChannel();
      var msg = process.argv[2] || "Hello World!";
      await ch.assertQueue(QUEUE_NAME, { durable: false });
      ch.sendToQueue(QUEUE_NAME, Buffer.from(msg));
      console.log(" [x] Sent '%s'", msg);
      return await ch.close();
    } finally {
      conn.close();
    }
  })
  .catch(console.warn);
