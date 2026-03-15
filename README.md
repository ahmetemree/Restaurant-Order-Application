# Restoran Siparis Paneli

Restoranlar icin tek ekranli siparis yonetim paneli. Menu yonetimi ve siparis takibi tek bir arayuzde yapilir.

## Ozellikler

- Menu urun ekleme, duzenleme ve silme (Firebase Firestore)
- Kategoriye gore gruplama (Yemekler, Icecekler, Tatlilar)
- Siparis olusturma, urun ekleme/cikarma
- Toplam tutar hesaplama
- Odeme alma (nakit/kart)

## Teknolojiler

- React
- Bootstrap / React-Bootstrap
- Firebase (Firestore + Hosting)

## Kurulum

1. Repoyu klonlayin:

```
git clone <repo-url>
cd restaurant-order-project
```

2. Bagimliliklari yukleyin:

```
npm install
```

3. Firebase yapilandirmasi:

- Firebase Console'dan yeni proje olusturun
- Firestore veritabanini etkinlestirin
- Proje ayarlarindan web uygulamasi ekleyin
- `src/firebase.js` dosyasindaki config degerlerini kendi proje bilgilerinizle guncelleyin
- `.firebaserc` dosyasindaki proje ID'sini guncelleyin

4. Uygulamayi calistirin:

```
npm start
```

Uygulama http://localhost:3000 adresinde acilir.

## Deploy

```
npm run build
firebase deploy
```

## Proje Yapisi

```
src/
  firebase.js           - Firebase baglantisi
  App.js                - Ana layout
  components/
    MenuSection.js      - Menu listesi ve yonetimi
    MenuItemCard.js     - Tek urun karti
    MenuItemModal.js    - Urun ekleme/duzenleme formu
    OrderSection.js     - Siparis paneli
    OrderItem.js        - Siparisteki urun satiri
    PaymentModal.js     - Odeme ekrani
  hooks/
    useMenu.js          - Firestore CRUD islemleri
```

Firebase Store'da read/write deneyimleyebilmek adına açık hale getirildi. 