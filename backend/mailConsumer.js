require('dotenv').config();
const amqp = require('amqplib');
const nodemailer = require('nodemailer');

async function start() {
  const queue = 'mail_queue';
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true });

  ch.consume(queue, async (msg) => {
    if (msg !== null) {
      const { email, resetLink } = JSON.parse(msg.content.toString());
      console.log(`E-posta gönderiliyor: ${email}`);

      // E-posta gönderme
     const transporter = nodemailer.createTransport({
     service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

      // Güzel HTML e-posta şablonu
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Şifre Sıfırlama - İzleCine</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    background-color: #ffffff;
                    border-radius: 10px;
                    padding: 30px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #91249d;
                    margin-bottom: 10px;
                }
                .title {
                    color: #2c3e50;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                .content {
                    margin-bottom: 30px;
                }
                .button {
                    display: inline-block;
                    background-color: #91249d;
                    color: white;
                    padding: 15px 30px;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: bold;
                    margin: 20px 0;
                    transition: background-color 0.3s;
                }
                .button:hover {
                    background-color: #7a1f85;
                }
                .warning {
                    background-color: #fff3cd;
                    border: 1px solid #ffeaa7;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                    color: #856404;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    color: #666;
                    font-size: 14px;
                }
                .link {
                    color: #91249d;
                    text-decoration: none;
                }
                .link:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🎬 İzleCine</div>
                    <h1 class="title">Şifre Sıfırlama Talebi</h1>
                </div>
                
                <div class="content">
                    <p>Merhaba,</p>
                    
                    <p>İzleCine hesabınız için şifre sıfırlama talebinde bulundunuz. Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
                    
                    <p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
                    
                    <div style="text-align: center;">
                        <a href="${resetLink}" class="button">Şifremi Sıfırla</a>
                    </div>
                    
                    <div class="warning">
                        <strong>⚠️ Güvenlik Uyarısı:</strong>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>Bu link sadece 1 saat geçerlidir</li>
                            <li>Linki başkalarıyla paylaşmayın</li>
                            <li>Şifrenizi güçlü ve benzersiz yapın</li>
                        </ul>
                    </div>
                    
                    <p>Eğer buton çalışmıyorsa, aşağıdaki linki tarayıcınıza kopyalayabilirsiniz:</p>
                    <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 12px;">
                        <a href="${resetLink}" class="link">${resetLink}</a>
                    </p>
                </div>
                
                <div class="footer">
                    <p>Bu e-posta İzleCine hesabınızla ilgili güvenlik işlemleri için gönderilmiştir.</p>
                    <p>Herhangi bir sorunuz varsa <a href="mailto:support@izlecine.com" class="link">support@izlecine.com</a> adresinden bizimle iletişime geçebilirsiniz.</p>
                    <p>© 2024 İzleCine. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: 'İzleCine <noreply@izlecine.com>',
        to: email,
        subject: '🔐 İzleCine - Şifre Sıfırlama Bağlantısı',
        html: htmlContent,
      });

      console.log(`✅ E-posta başarıyla gönderildi: ${email}`);
      ch.ack(msg);
    }
  });

  console.log('📨 Mail Consumer çalışıyor...');
}

start();
