const admin = require('firebase-admin');
const fs = require('fs');

// 使用你的Firebase項目的服務賬戶密鑰文件
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com' // 使用你的Firebase項目的ID
});

const bucket = admin.storage().bucket();

// 下載文件
const srcFilename = 'path/in/storage/to/your-file.png'; // Firebase Storage中的文件路徑
const destFilename = 'path/to/download/to/your-file.png'; // 下載到本地的路徑

bucket.file(srcFilename).download({ destination: destFilename }, (err) => {
  if (err) {
    console.error('Error downloading file:', err);
  } else {
    console.log('File downloaded successfully to', destFilename);
  }
});
