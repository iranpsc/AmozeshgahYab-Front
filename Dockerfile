FROM docker.arvancloud.ir/node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# کپی کردن تمام فایل‌های env برای مرحله build
COPY .env* ./

RUN npm run build


FROM docker.arvancloud.ir/node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/.next/static ./.next/static

# در صورت نیاز، env ها را برای Runtime هم در دسترس قرار بده
COPY --from=builder /app/.env* ./

EXPOSE 3000

CMD ["node", "server.js"]