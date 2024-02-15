## [Браузерная игра Fast Paws](2d96a7d3e2d2.vps.myjino.ru/)
Котику на пути встречаются препятствия или мелкие животные (добыча). Для того, чтобы поймать добычу, нужно на нее запрыгнуть. Для прыжка моно использовать пробел или "тап".

### [Механика игры](https://github.com/Vakulina/fast-paws-game/blob/main/GAME-INFO.md)

### Реализованный функционал
- Страница с игрой
- Создание/редактирование профиля
- [API форума](https://github.com/Vakulina/fast-paws-game/blob/main/packages/server/src/controllers/README.md)
- Лидерборд (рейтинг игроков)
- Темизация
- Возможность использовать offline (после первой загрузки и кэширования ресурсов)

### Используемые технологии
- React, React Router, Redux Toolkit
- Typescript
- Canvas API
- styled component
- JWT-Авторизация (реализация клиентской части)
- OAuth Яндекс
- Service Worker
- proxy - проксирование запросов к стороннему серверу [ya-praktikum](https://ya-praktikum.tech/api/v2/swagger/#/), используемому для авторизации пользователей
- Express
- PostgreSQL
- Vite
- Docker, Docker-Compose
- Server Side Rendering (SSR)
- nginx
- jest

### Как запускать локально
1. Шаблон переменных находится в файле .env.sample. Создайте файл .env в корне проекта и скопируйте туда переменные.
2. Убедитесь что у вас установлен `node` и `docker`
3. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
4. Выполните команду `yarn build`
5. Запустите контейнер для БД `yarn docker:db`
6. Выполните команду `yarn dev:server` чтобы запустить сервер (на собранный контейнер с client-частью будет создана символьная ссылка)
7. Проект запустится на 5000 порту

### [Деплой](https://2d96a7d3e2d2.vps.myjino.ru/)