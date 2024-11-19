FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 9169

CMD ["npm", "run", "start"]
