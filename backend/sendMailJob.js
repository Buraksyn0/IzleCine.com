const amqp = require('amqplib');

async function sendToQueue(data) {
  const queue = 'mail_queue';
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();

  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });

  console.log('Mesaj kuyruğa gönderildi');
  await ch.close();
  await conn.close();
}

module.exports = sendToQueue;
