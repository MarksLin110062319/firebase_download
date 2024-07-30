// download.js

const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL } = require('firebase/storage');
const axios = require('axios'); // 引入 axios
const fs = require('fs'); // 引入 fs 模組

// Firebase 配置
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
            // 使用 axios 下載檔案
            return axios({
                method: 'GET',
                url: url,
                responseType: 'stream' // 設定響應類型為流
            });
        })
        .then(response => {
            const writer = fs.createWriteStream(filePath.split('/').pop()); // 使用檔名進行存檔
            response.data.pipe(writer); // 將下載的數據寫入文件
            writer.on('finish', () => {
                console.log('檔案下載完成！');
            });
            writer.on('error', (error) => {
                console.error('檔案下載錯誤:', error);
            });
        })
        .catch((error) => {
            console.error('下載檔案失敗:', error);
        });
};

// 使用從命令行獲取的路徑
downloadFile(path);
