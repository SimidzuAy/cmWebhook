## 🕷️ Вебхук для [Чат-Менеджера](https://vk.com/cm)

### 🐛 Возможности
* Ловля всех [типов](https://vk.com/@cm-callback) событий
* Поддержка нескольких пользователей
    * Первый пользователь - самый главный, используется для всех запросов
    * Для инвайтов - Проверка у кого есть в друзьях и последущее добавление
* Использование прокси [xtrafrancyz](https://github.com/xtrafrancyz/vk-proxy)
* Использование конфига

### 🛠️ Конфиг
* `visibleMessagesCount` - Сколько сообщений показать пользователю при добавлении
    * Добавление - после бана / !пригласить
    * От 0 до 1000
* `cm` - Токен чат менеджера
    * [Получение](https://vk.com/@cm-callback-api?anchor=kak-nachat-ispolzovat-callback-api-chat-menedzhera)
* `isProxy` - Использование прокси
    * Принимаемые значения:
        * `true`
        * `false`
* `vks` - Массив[] пользователей, добавлять через ","
    * `token` - токен пользователя вк
        * [Получение](https://vkhost.github.io/) - Kate Mobile
    * `chats` - Обьект чата
        * `Ключ` - UID чата в [Чат-Менеджере](https://vk.com/cm)
            * [Получение](https://vk.com/@cm-callback-api?anchor=ustanovka-vebkhuka-dlya-callback-api)
        * `Значение` - ID чата пользователя вк
            * [Получение](https://vk.com/@cm-callback-api?anchor=ustanovka-vebkhuka-dlya-callback-api)
        * Пример
            ```json 
            {
                "DdcaCE": 182,
                "ключ": 155
            }
          ```
   
### 🔭 Использование

* Перед началом убедитесь что у вас установлен [NodeJs](https://nodejs.org/ru/)
* Так же перед началом прочитайте статьи
    * https://vk.com/@cm-callback
    * https://vk.com/@cm-callback-api

Task | npm | yarn
-----|-----|-----
Установка зависимостей | npm install   | yarn install
Сборка вебхука         | npm run build | yarn build
Запуск вебхука         | npm start     | yarn start


#### 🚩 Todo
- [ ] Использование несколькох пользователей везде
- [ ] Добавление чата к вебхуку не трогая конфиг
- [ ] Управление вебхуком через группу

------

* Нашли баг - писать [сюда](https://github.com/SimidzuAy/cm_webhook/issues/new)
* По вопросам - https://vk.com/simidzuay
        