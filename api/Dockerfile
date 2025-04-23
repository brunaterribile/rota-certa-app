FROM node:20

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install

# Copy source files
COPY . .

# Generate Prisma client and build TypeScript
RUN npx prisma generate && npm run build

# Copy wait-for-it script
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

EXPOSE 8080

# Verify build files exist before starting
RUN ls -la /usr/src/app/build

CMD ["sh", "-c", "./wait-for-it.sh api-rotacerta-pg:5432 -t 60 -- npx prisma migrate deploy && npx prisma db seed && npm start"]