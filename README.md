# Evado Party App

Демонстрационное веб-приложение социальной сети,
созданное на фреймворке Evado.

- [Декларативный фреймворк Evado](https://github.com/mkhorin/evado)

## Типовая установка

#### Установите окружение
- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/download-center/community)

#### Linux
Клонируйте приложение в /app
```sh
cd /app
npm install
NODE_ENV=development node console/install
```

#### Windows
Клонируйте приложение в c:/app
```sh
cd c:/app
npm install
set NODE_ENV=development
node console/install
```

## Запуск

#### Linux
```sh
cd /app
NODE_ENV=development node console/start
```

#### Windows
```sh
cd c:/app
set NODE_ENV=development
node console/start
```
 
Веб-интерфейс: **http://localhost:3000**

Войти как администратор:
```sh
Email: a@a.a
Password: 123456
```
Войти как участник:
```sh
Email: b@b.b
Password: 123456
```

## Установка через Docker

Клонируйте приложение в /app
```sh
cd /app
docker-compose up -d mongo
docker-compose up --build installer
docker-compose up -d server
```
Веб-интерфейс: **http://localhost:3000**