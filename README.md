# Lab3_SOAD
Простий Node.js/Express.js RESTful вебсервіс, який надає API для виконання операцій над елементами TODO-списку (додавання, виведення, оновлення, видалення).

# Особливості
- Шляхи для виконання операцій над елементами TODO-списку (додавання, виведення всіх елементів, виведення елемента за id, оновлення за id, видалення за id).
- Приймає як XML, так і JSON-запити.
- Обробка виняткових ситуацій (невалідний XML-запит, невалідні дані в запиті).

# Структура

```
Lab3_SOAD/
├── server.js             # Головний файл
├── db/
│   ├── connection.js     # Параметри підключення до MongoDB
├── middleware/
│   ├── formatResponse.js # Файл визначення форми відповіді на запит
├── models/
│   ├── Todo.js           # Файл опису властивостей елемента TODO-списку
├── routes/
│   ├── crudRoutes.js     # Файл опису CRUD-операцій
├── utils/
│   ├── xmlParser.js      # Обробник XML-запитів
├── .env                  # Змінні оточення (за бажанням)
├── .gitignore            # Git ignore правила
└── README.md             # Документація
```

## Необхідні інструменти реалізації

- Node.js
- Express.js
- MongoDB
- Git

## Установлення

1. Клонуйте репозиторій:

```bash
git clone <repository-url>
cd Lab3_SOAD
```

2. Завантажте залежності:

```bash
npm install
```

3. Створіть `.env` файл у головній директорії (за бажанням):

```bash
PORT=3000
MONGO_URI=mongodb://localhost:<номер_порту>
```

## Запуск додатку

Режим розробника:

```bash
npm run dev
```

Звичайний запуск:

```bash
node server.js
```

## Доступні шляхи

### CRUD шляхи

Створення нового завдання:

- Endpoint: `POST /tasks`
- Content-Type: `application/xml` або `application/json`

Приклад запиту:

```json
{
    "title": "Complete Lab 3",
    "description": "Complete Lab 3 (Service-oriented software development)",
    "dueDate": "2025-06-05"
}
```

або

```xml
<task>
    <title>Complete Lab 3</title>
    <description>Complete Lab 3 (Service-oriented software development)</description>
    <dueDate>2025-06-05</dueDate>
</task>
```

Приклад відповіді:

```json
{
    "title": "Complete Lab 3",
    "description": "Complete Lab 3 (Service-oriented software development)",
    "dueDate": "2025-06-05T00:00:00.000Z",
    "completed": false,
    "_id": "6840608d3c93a76c3aa69ca0",
    "createdAt": "2025-06-04T15:04:45.207Z",
    "updatedAt": "2025-06-04T15:04:45.207Z",
    "__v": 0
}
```

Виведення усіх елементів списку:

- Endpoint: `GET /tasks`

Приклад запиту:

```url
http://localhost:3000/tasks
```

Приклад відповіді:

```json
{
    "title": "Complete Lab 3",
    "description": "Complete Lab 3 (Service-oriented software development)",
    "dueDate": "2025-06-05T00:00:00.000Z",
    "completed": false,
    "_id": "6840608d3c93a76c3aa69ca0",
    "createdAt": "2025-06-04T15:04:45.207Z",
    "updatedAt": "2025-06-04T15:04:45.207Z",
    "__v": 0
}
```

Виведення елемента списку за id:

- Endpoint: `GET /tasks/:id`

Приклад запиту:

```url
http://localhost:3000/tasks/6840608d3c93a76c3aa69ca0
```

Приклад відповіді:

```json
{
    "title": "Complete Lab 3",
    "description": "Complete Lab 3 (Service-oriented software development)",
    "dueDate": "2025-06-05T00:00:00.000Z",
    "completed": false,
    "_id": "6840608d3c93a76c3aa69ca0",
    "createdAt": "2025-06-04T15:04:45.207Z",
    "updatedAt": "2025-06-04T15:04:45.207Z",
    "__v": 0
}
```

Оновлення завдання за id:

- Endpoint: `PUT /tasks/:id`
- Content-Type: `application/xml` або `application/json`

Приклад запиту:

```json
{
    "completed": true
}
```

або

```xml
<task>
    <completed>true</completed>
</task>
```

Приклад відповіді:

```json
{
    "_id": "6840608d3c93a76c3aa69ca0",
    "title": "Complete Lab 3",
    "description": "Complete Lab 3 (Service-oriented software development)",
    "dueDate": "2025-06-05T00:00:00.000Z",
    "completed": true,
    "createdAt": "2025-06-04T15:04:45.207Z",
    "updatedAt": "2025-06-04T20:00:29.651Z",
    "__v": 0
}
```

Видалення елемента списку за id:

- Endpoint: `DELETE /tasks/:id`

Приклад запиту:

```url
http://localhost:3000/tasks/6840608d3c93a76c3aa69ca0
```

Приклад відповіді:

```text
204 No Content
```

## Обробка виняткових ситуацій

Сервіс повертає errors у наступних випадках:

- Невдале додавання елементу до списку (через помилку на сервері)
- Спотворені XML-запити
- Пусті значення обов'язкових полів
- Невалідне значення дати (не дата, або дата раніше)

## Ліцензія

Creative Commons Zero v1.0 Universal