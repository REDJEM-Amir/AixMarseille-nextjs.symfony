#
# 🏡 Production Build
#
FROM node:alpine as builder

ARG API_BACKEND
ENV API_BACKEND=${API_BACKEND}

RUN npm install -g npm@latest

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

RUN npm install -g npm@latest

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 5600

CMD ["npm", "run", "start"]