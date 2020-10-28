[English version](https://github.com/Logonok/party-en)

# Evado Вечеринка 

Веб-приложение социальной сети, созданное 
на [декларативном фреймворке Evado](https://github.com/mkhorin/evado).

Простая социальная сеть для общения гостей на виртуальной вечеринке.
Зарегистрированные пользователи могут заводить друзей, провозглашать тосты, обсуждать и делиться ими с другими участниками.

## Типовая установка

#### Установите окружение
- [Node.js](https://nodejs.org) (version 12)
- [MongoDB](https://www.mongodb.com/download-center/community) (version 4)

#### Linux
Клонируйте приложение в /app
```sh
cd /app
npm install
NODE_ENV=development node console/install
NODE_ENV=development node console/start
```

#### Windows
Клонируйте приложение в c:/app
```sh
cd c:/app
npm install
set NODE_ENV=development
node console/install
node console/start
```

## Установка через Docker

Клонируйте приложение в /app
```sh
cd /app
docker-compose up -d mongo
docker-compose up --build installer
docker-compose up -d server
```

## Использование

Веб-интерфейс: **http://localhost:3000**

Войти как участник вечеринки:
```sh
Email: b@b.b
Password: 123456
```
Войти как администратор:
```sh
Email: a@a.a
Password: 123456
```