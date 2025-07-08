const sendToQueue = require('./sendMailJob');

const testMail = {
  email: 'aytencoskun.112@gmail.com',
  resetLink: 'https://izlecine.com/reset-password?token=abc123'
};

sendToQueue(testMail);
