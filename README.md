# Circlo Backend
## How To Run The Code
1. Setup firebase project
2. Setup Web App di firebase
3. Masukkan value config web app ke .env dan simpan service account credential di root folder
4. Sesuaikan file FirebaseAdmin dengan service account yang telah dibuat
5. Setup project di Google Cloud, buat service account untuk aplikasi dan beri role firebase admin
6. Simpan credential di root folder
7. Sesuaikan file storageConfig dengan service account yang baru dibuat
8. Buat bucket di Google Cloud Storage dan buat folder Post, Predict, Trash, User, Donate, dan Ideas.
9. buat database bernama "hackfest" di phpmyadmin
10. import file sql
11. Sesuaikan DbConfig dengan database yang telah dibuat
12. Deploy ML dari repo ML
13. Install dependencies
14. Run program dengan perintah 'npm run start-dev' pada terminal

## Documentation
API Docs Link: https://documenter.getpostman.com/view/28684250/2s9YsM8WHn
Collection Link: https://drive.google.com/file/d/1_LCnH_1gZibQS040rOsE0P1sBj9-mMBT/view?usp=sharing

## Notes
* Task Sequence 2 adalah getTrashIdeas seperti yang ada di API DOCS
* link .env (contoh) : https://drive.google.com/file/d/1HLWJ7cRFdSUIZPQRdCtJr_3NkSHTLS1r/view?usp=sharing  
* Main API Server Link: https://circlo-backend2-sxilj6bmva-et.a.run.app
* ML Server Link: https://ml-hackfest2-dot-circlo-635bd.et.r.appspot.com
