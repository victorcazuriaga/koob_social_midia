FROM node:18

RUN npm install -g pnpm

WORKDIR /app

COPY prisma ./prisma/
COPY "package.json" .
COPY pnpm-lock.yaml .

RUN  pnpm install
COPY . .

CMD ["pnpm", "start:migrate:dev"]
