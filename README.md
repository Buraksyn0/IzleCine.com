# İzleCine.com

**Proje Tanımı:**  İzleCine.com, film severler için bir eleştiri ve öneri platformudur. Kullanıcılar, en yeni filmleri keşfederken,kullanıcıların kişilsel yorumlarını görebilir, film önerileri sayesinde izleyecekleri yeni yapımlara karar verebilirler. Sitemizde yer alan detaylı film incelemeleri, kullanıcı yorumları ve puanlama sistemi, ziyaretçilere film seçme konusunda yardımcı olur. Ayrıca, kullanıcılar izledikleri filmleri derecelendirip, kendi yorumlarını paylaşarak topluluğumuza katkıda bulunabilirler. izleseMi.com olarak, kaliteli ve güvenilir içerik sunarak, film severlerin doğru film seçimlerini yapmalarına yardımcı olmayı hedefliyoruz. Filmlerle ilgili güncel haberler ile sinema dünyasına dair her şey bir arada!

**Proje Kategorisi:**  Film Eleştirisi ve Öneri Platformu

**Referans Uygulama:** [IMDb](https://www.imdb.com/)

**Uygulama Adresi:** [izlecine.vercel.app](https://izlecine.vercel.app/) 

**Grup Adı:** fivebytes

**Proje Ekibi:** Ayten Coşkun,Burak Sayan,Enes Buğra Demirel,Furkan Patat,İbrahim Halil Yılmaz

1. [Gereksinim Analizi](Gereksinim-Analizi.md)
2. [Durum-Diyagrami](Durum-Diyagrami.md)
3. [Durum Senaryoları](Durum-Senaryoları.md)
4. [Front-End](movieapp-frontend)
5. [Back-End](movieapp-backend/src)
6. [Video Sunum](Sunum.md)

Önemli Notlar:

Admin paneline /admin endpointe ile erişilmektedir.

![Ekran Görüntüsü - 2025-04-20 23-56-51](https://github.com/user-attachments/assets/a73ff110-c2ba-49ce-99e1-e9baff6ca5d4)

# Backend

Node.js, Express.js ve MongoDB ile hazırlanmış backend projesi bu dizinde yer alacaktır.

## Kurulum

1. `cd backend`
2. `npm install`
3. `.env` dosyasını oluşturun ve `MONGO_URI` değerini girin.
4. `npm start` ile başlatın.

## Klasör Yapısı

- backend/
  - controllers/
  - models/
  - routes/
  - server.js
  - .env
