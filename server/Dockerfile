FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production 

COPY /src ./src/

EXPOSE 3001

CMD [ "node","src/app.js" ]