FROM node:18

WORKDIR /usr/src/app

ENV PORT 8080

COPY . .

RUN npm install

# RUN npm run build
EXPOSE 8080

CMD [ "npm", "run", "start-prod"]