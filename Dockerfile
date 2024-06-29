# Указываем базовый образ с Node.js 16
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Компилируем TypeScript
RUN npm run build

# Указываем команду для запуска приложения
CMD ["npm", "run", "start"]
