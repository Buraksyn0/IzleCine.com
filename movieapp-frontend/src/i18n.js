import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      "Profil": "Profil",
      "İzleme Listesi": "İzleme Listesi",
      "Ayarlar": "Ayarlar",
      "Tema": "Tema",
      "Dil": "Dil",
      "Çok güzel bir film!": "Çok güzel bir film!",
      "Hoşgeldiniz": "Hoşgeldiniz",
      "Giriş Yap": "Giriş Yap",
      "Trend Filmler": "Trend Filmler",
      "Yeni Gelenler": "Yeni Gelenler",
      "Aksiyon Filmleri": "Aksiyon Filmleri",
      "Komedi Filmleri": "Komedi Filmleri",
      "Drama Filmleri": "Drama Filmleri",
      "Aksiyon": "Aksiyon",
      "Macera": "Macera",
      "Animasyon": "Animasyon",
      "Komedi": "Komedi",
      "Suç": "Suç",
      "Belgesel": "Belgesel",
      "Drama": "Drama",
      "Aile": "Aile",
      "Fantastik": "Fantastik",
      "Tarih": "Tarih",
      "Korku": "Korku",
      "Müzik": "Müzik",
      "Gizem": "Gizem",
      "Romantik": "Romantik",
      "Bilim Kurgu": "Bilim Kurgu",
      "TV Filmi": "TV Filmi",
      "Gerilim": "Gerilim",
      "Savaş": "Savaş",
      "Western": "Western"
    }
  },
  en: {
    translation: {
      "Profil": "Profile",
      "İzleme Listesi": "Watchlist",
      "Ayarlar": "Settings",
      "Tema": "Theme",
      "Dil": "Language",
      "Çok güzel bir film!": "Very nice movie!",
      "Hoşgeldiniz": "Welcome",
      "Giriş Yap": "Login",
      "Trend Filmler": "Trending Movies",
      "Yeni Gelenler": "New Arrivals",
      "Aksiyon Filmleri": "Action Movies",
      "Komedi Filmleri": "Comedy Movies",
      "Drama Filmleri": "Drama Movies",
      "Aksiyon": "Action",
      "Macera": "Adventure",
      "Animasyon": "Animation",
      "Komedi": "Comedy",
      "Suç": "Crime",
      "Belgesel": "Documentary",
      "Drama": "Drama",
      "Aile": "Family",
      "Fantastik": "Fantasy",
      "Tarih": "History",
      "Korku": "Horror",
      "Müzik": "Music",
      "Gizem": "Mystery",
      "Romantik": "Romance",
      "Bilim Kurgu": "Science Fiction",
      "TV Filmi": "TV Movie",
      "Gerilim": "Thriller",
      "Savaş": "War",
      "Western": "Western"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 