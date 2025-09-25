const BASE = "http://localhost:3001/users";

async function test() {
    try {
        console.log("=== 1. Создание пользователя (CREATE) ===");
        let res = await fetch(BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Alice", email: "alice@mail.com", age: 20 }),
        });
        let data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        const id = data._id;

        console.log("\n=== 2. Получение всех пользователей (READ) ===");
        res = await fetch(BASE);
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 3. Получение одного пользователя (READ ONE) ===");
        res = await fetch(`${BASE}/${id}`);
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 3a. Проверка несуществующего пользователя (404) ===");
        res = await fetch(`${BASE}/64f0f0f0f0f0f0f0f0f0f0f0`);
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 3b. Проверка с неверным ID (400) ===");
        res = await fetch(`${BASE}/invalid-id`);
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 4. Обновление пользователя (UPDATE) ===");
        res = await fetch(`${BASE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age: 25 }),
        });
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 4a. Обновление несуществующего пользователя (404) ===");
        res = await fetch(`${BASE}/64f0f0f0f0f0f0f0f0f0f0f0`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age: 30 }),
        });
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 4b. Обновление с неверным ID (400) ===");
        res = await fetch(`${BASE}/invalid-id`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age: 30 }),
        });
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 5. Удаление пользователя (DELETE) ===");
        res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 5a. Удаление несуществующего пользователя (404) ===");
        res = await fetch(`${BASE}/64f0f0f0f0f0f0f0f0f0f0f0`, { method: "DELETE" });
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

        console.log("\n=== 5b. Удаление с неверным ID (400) ===");
        res = await fetch(`${BASE}/invalid-id`, { method: "DELETE" });
        data = await res.json();
        console.log("Статус:", res.status, "Ответ:", data);

    } catch (err) {
        console.error("Ошибка теста:", err);
    }
}

test();
