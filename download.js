// download.js

const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL } = require('firebase/storage');

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyDcwfi9b9WRLeTl-z038poGDfJv-J6iKlk",
  authDomain: "apphtml-ce846.firebaseapp.com",
  databaseURL: "https://apphtml-ce846-default-rtdb.firebaseio.com",
  projectId: "apphtml-ce846",
  storageBucket: "apphtml-ce846.appspot.com",
  messagingSenderId: "362316338686",
  appId: "1:362316338686:web:b1bf51c01f2ad90827dcaf",
  measurementId: "G-XXJMYK0P70"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// 獲取命令行參數
const path = process.argv[2]; // 從命令行獲取第二個參數

if (!path) {
    console.error('請提供要下載的檔案路徑。');
    process.exit(1);
}

const downloadFile = (filePath) => {
    const fileRef = ref(storage, filePath);
    getDownloadURL(fileRef)
        .then((url) => {
            console.log('檔案下載連結:', url);
            // 在這裡添加下載檔案的邏輯，例如使用 axios 進行下載
        })
        .catch((error) => {
            console.error('下載檔案失敗:', error);
        });
};

// 使用從命令行獲取的路徑
downloadFile(path);
