FROM node:20

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080

RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm start"]