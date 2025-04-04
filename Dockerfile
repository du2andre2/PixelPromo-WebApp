FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . . 
COPY .env-prod /app/.env  

RUN npm run build

FROM node:23-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install --frozen-lockfile 

COPY --from=builder /app/dist /app/dist

EXPOSE 4173

CMD ["npx", "vite", "preview", "--port", "4173", "--host"]
