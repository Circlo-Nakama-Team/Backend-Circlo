# Circlo Backend
---------------------
## Overview
The Backend-Circlo repository focuses on creating a REST API that will be used by applications. The Circlo application REST API is created using the Typescript programming language with ExpressJs as the framework, MySQL as the database, and Firebase for authentication.

## How To Run The Code
1. Set up the firebase project
2. Setup Web App in firebase
3. Enter the web app config values ​​into .env and save the service account credentials in the root folder
4. Adjust the FirebaseAdmin file with the service account that has been created
5. Set up the project in Google Cloud, create a service account for the application and give it the firebase admin role
6. Save the credentials in the root folder
7. Adjust the storageConfig file with the newly created service account
8. Create a bucket in Google Cloud Storage and create Post, Predict, Trash, User, Donate and Ideas folders.
9. create a database named "gsc" in phpmyadmin
10. import sql file
11. Adjust DbConfig to the database that has been created
12. Deploy ML from ML repo
13. Install dependencies
14. Run the program with the command 'npm run start-dev' in the terminal
   
## Documentation
API Docs Link: https://documenter.getpostman.com/view/28684250/2s9YsM8WHn
Collection Link: https://drive.google.com/file/d/1_LCnH_1gZibQS040rOsE0P1sBj9-mMBT/view?usp=sharing

## Updated [Top 100 GSC Resubmission]
1. Get articles with web scraping
2. Generate quiz using Gemini AI
3. Add Oauth2 for authentication
4. Push Notification when donate status change
5. Send email verification and reset password

## Notes
* Main API Server Link: https://backend-circlo2-sxilj6bmva-et.a.run.app
* ML Server Link: https://ml-hackfest2-dot-circlo-635bd.et.r.appspot.com
