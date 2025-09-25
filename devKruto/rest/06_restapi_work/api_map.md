# REST API (CRUD User)


## Модель User
```js
{
  _id: ObjectId,   // MongoDB ID
  name: string,    // обязательное
  email: string,   // обязательное, формат email
  age: number      // >= 0
}
```

## 1. Создание пользователя (CREATE)
`POST /users`

Тело запроса:
```js
{
  "name": "Alice",
  "email": "alice@mail.com",
  "age": 20
}
```
Успех (201):
```js
{
  "_id": "...",
  "name": "Alice",
  "email": "alice@mail.com",
  "age": 20,
  "__v": 0
}
```
Ошибка (400):
```js
{ "error": "User validation failed: name: Path `name` is required." }
```

## 2. Получение всех пользователей (READ)
`GET /users`  

Успех (200):
```js
[
  { "_id": "...", "name": "Alice", "email": "alice@mail.com", "age": 20 },
  { "_id": "...", "name": "Bob", "email": "bob@mail.com", "age": 25 }
]
```

## 3. Получение одного пользователя (READ ONE)
`GET /users/:id ` 

Успех (200):
```js
{ "_id": "...", "name": "Alice", "email": "alice@mail.com", "age": 20 }
```
Ошибка (404):
```js
{ "error": "Не найден" }
```
Ошибка (400):
```js
{ "error": "Неверный ID" }
```

## 4. Обновление пользователя (UPDATE)
`PUT /users/:id ` 

Тело запроса (любые поля):
```js
{ "age": 21 }
```
Успех (200):
```js
{ "_id": "...", "name": "Alice", "email": "alice@mail.com", "age": 21 }
```
Ошибка (404):
```js
{ "error": "Не найден" }
```
Ошибка (400):
```js
{ "error": "Ошибка обновления" }
```

## 5. Удаление пользователя (DELETE)
`DELETE /users/:id ` 

Успех (200):
```js
{ "status": "Удалён" }
```
Ошибка (404):
```js
{ "error": "Не найден" }
```
Ошибка (400):
```js
{ "error": "Ошибка удаления" }
```

## Дополнительно (по желанию)
- Валидация email
- age >= 0
