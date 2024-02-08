FROM node:alpine

WORKDIR /app
COPY package.json .
COPY . .
RUN npm install

CMD npm run build && npm start