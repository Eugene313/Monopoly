FROM node:14

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run start
