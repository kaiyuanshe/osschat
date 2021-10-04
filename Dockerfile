FROM node:lts

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app

RUN npm run build

ENV NODE_ENV=production

CMD node /app/dist/bin/main.js
