# Авторизация, Личный кабинет и Карта навыков

## Резюме
Добавить осмысленную авторизацию в Coffee-Tea-Mastery: регистрация/вход через email+пароль, личный кабинет с пройденными курсами и визуальной картой навыков (архипелаг), возможность записи на курсы.

## Мотивация
Текущая авторизация хранит имя/email в памяти (UserContext) и не даёт пользователю никаких возможностей. Нужно сделать авторизацию полезной: отслеживать прогресс, мотивировать проходить курсы через геймификацию (карта навыков).

## Архитектура

### Backend (JSON-server mock)
- Один `db.json` с ключами: `services`, `courses`, `users`, `enrollments`
- json-server на порту 3000
- На продакшене замена на PostgreSQL + REST API без изменения фронта

### Frontend
- **UserContext → Redux**: удалить UserContext, добавить `authSlice`
- **RTK Query**: эндпоинты для login, register, getMe, enrollments
- **React Router**: новая страница `/profile`

## Data Flow

### Авторизация
`LoginForm → RTK Query login(email, password) → GET /users?email=x&password=y`
`Регистрация → RTK Query → POST /users`
`После успеха → dispatch(setUser) → Header обновляется`

### Запись на курс
`Button "Записаться" → POST /enrollments { userId, courseId, status: "enrolled" }`
`Кнопка "Отметить пройденным" → PATCH /enrollments/:id { status: "completed" }`

### Карта навыков
`Загрузка профиля → RTK Query getEnrollments(userId)`
`Группировка по skillArea курса → маппинг на остров`
`Закрашен = есть enrollment со статусом completed по этой области`

## Компоненты

### db.json
Добавить массивы:
- `users`: id, name, email, password, role (student/expert/admin), photo
- `enrollments`: id, userId, courseId, status (enrolled/completed), enrolledAt, completedAt

### authSlice (redux/entities/auth/)
- state: `{ user, isLoggedIn }`
- эндпоинты: `loginUser`, `registerUser`
- при инициализации: `GET /users?email=X` если есть сохранённый email в localStorage

### Profile endpoints (redux/entities/profile/)
- `getEnrollments(userId)` → GET /enrollments?userId=X&\_expand=course
- `createEnrollment` → POST /enrollments
- `completeEnrollment` → PATCH /enrollments/:id

### LoginForm (обновлённый)
- Поля: email + пароль
- Переключение: вход / регистрация
- При регистрации — дополнительное поле "Имя"
- Валидация ошибок (email занят, неверный пароль)

### ProfilePage `/profile`
- Секция 1: Инфо (имя, email, роль)
- Секция 2: Мои курсы (список, записан/пройден, кнопка отметить)
- Секция 3: Карта навыков (острова)
- Защищённый роут: редирект на главную если не авторизован

### SkillsMap
- SVG-архипелаг с островами: Эспрессо, Латте-арт, Обжарка, Альтернатива, Каппинг, Чай, Управление
- Каждый остров связан с skillArea
- Закрашивается при наличии completed курса в этой области
- Клик на остров → список курсов области

### SkillArea для существующих курсов

| course-1 | Базовый курс бариста | basics |
| course-2 | Продвинутый курс: Латте-арт | latte-art |
| course-3 | Обжарка кофе для альтернативы | roasting |

В моки courses.ts добавить поле `skillArea`.

### Header (обновлённый)
- Неавторизован: кнопка "Войти"
- Авторизован: кнопка с именем → открывается меню "Профиль" / "Выйти"
- Ссылка на `/profile`

## План реализации

1. **db.json** — добавить users, enrollments
2. **authSlice** — создать Redux slice + RTK Query endpoints
3. **Удалить UserContext** — заменить на Redux везде
4. **Обновить ModalLogin/LoginForm** — email+пароль, регистрация/вход
5. **ProfilePage** — новая страница с курсами
6. **EnrollButton** — на странице курса
7. **SkillsMap** — карта-архипелаг
8. **Lint + typecheck + build**

## Не сделано в этом спринте
- Кофейный калькулятор (отложен)
- Комментарии к новостям (отложено)
- Настоящая БД (PostgreSQL/Supabase)
- Восстановление пароля
- Разделение ролей (student/expert/admin) — только задел в типе

## Технический долг
- Пароль хранится в plain text (json-server не умеет хешировать)
- Логин через `GET /users?email=X&password=Y` — не REST, но json-server не поддерживает POST /login
