# Auth + Profile + Skills Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace fake auth (UserContext) with real Redux-based auth, add profile page with enrollments, and build a visual skill map (archipelago).

**Architecture:** Redux Toolkit (authSlice) + RTK Query (enrollments API) + React Router (profile page) + CSS/SVG (skill map). JSON-server handles persistence for users and enrollments.

**Tech Stack:** React 19, Redux Toolkit, RTK Query, CSS Modules, classNames, TypeScript 5.x

---

### Task 1: Extend types and db.json

**Files:**
- Modify: `src/types/user.ts`
- Create: `src/types/enrollment.ts`
- Modify: `src/types/course.ts`
- Modify: `db.json`

- [ ] **Step 1: Update TUser type**

Write to `src/types/user.ts`:
```ts
export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "student" | "expert" | "administrator";
    photo?: string;
};
```

- [ ] **Step 2: Create TEnrollment type**

Write to `src/types/enrollment.ts`:
```ts
export type TEnrollment = {
    id: string;
    userId: string;
    courseId: string;
    status: "enrolled" | "completed";
    enrolledAt: string;
    completedAt?: string;
};
```

- [ ] **Step 3: Add skillArea to TCourse**

Edit `src/types/course.ts` — add `skillArea?: string;` after `video?`:
```ts
export type TCourse = {
    id: string;
    title: string;
    type: string;
    price: number;
    time: string;
    date?: string;
    seats?: number;
    format: string;
    description: string;
    text: string;
    expertId: string;
    image: string;
    previewImage: string;
    video?: string;
    skillArea?: string;
};
```

- [ ] **Step 4: Extend db.json with users and enrollments**

Write to `db.json` — replace entire file content (keeping existing services and courses, adding users + enrollments):

```json
{
  "services": [
    { "id": "serv-1", "title": "Обслуживание кофейного оборудования", "type": "services", "price": 10000, "time": "1 день", "format": "offline", "description": "Ваша кофемашина или кофемолка вышла из строя? Мы проведем диагностику и все починим!", "actions": ["Проведем калибровку", "Выявим проблему", "Все починим"], "results": ["Качественный продукт", "Надежных партнеров", "Гарантию на 1 год"], "image": "/images/serviceImage.jpg", "previewImage": "#", "reviews": ["Отличный сервис!", "Все быстро и качественно"], "video": "#" },
    { "id": "serv-2", "title": "Каппинг-сессия", "type": "services", "price": 15000, "time": "4 часа", "format": "offline", "description": "Профессиональная дегустация и оценка качества кофе. Научим ваших сотрудников разбираться в кофе!", "actions": ["Поставим каппинг", "Опишем каждый образец", "Научим сотрудников"], "results": ["Понимание вкуса", "Выявление лучших сортов", "Повышение квалификации"], "image": "/images/serviceImage.jpg", "previewImage": "#", "reviews": ["Очень познавательно!", "Теперь мы знаем о кофе все"], "video": "#" },
    { "id": "serv-3", "title": "Разработка меню кофейни", "type": "services", "price": 20000, "time": "3 дня", "format": "offline", "description": "Создадим уникальное меню, которое увеличит продажи и порадует ваших гостей!", "actions": ["Анализ заведения", "Разработка концепции", "Создание меню"], "results": ["Уникальное меню", "Рост продаж", "Довольные гости"], "image": "/images/serviceImage.jpg", "previewImage": "#", "reviews": ["Меню стало лучше", "Продажи выросли на 30%"], "video": "#" },
    { "id": "serv-4", "title": "Тренинг-сессия для вашей команды", "type": "services", "price": 15000, "time": "2 дня", "format": "offline", "description": "Профедем диагностику слабых мест ваших работников и доведем до профессионального уровня их навыки", "actions": ["Диагностика бариста", "Тренировка настройки помола", "Каппинг-сессия"], "results": ["Рост продаж", "Довольные гости"], "image": "/images/serviceImage.jpg", "previewImage": "#", "reviews": ["Меню стало лучше", "Продажи выросли на 40%"], "video": "#" }
  ],
  "courses": [
    { "id": "course-1", "title": "Сенсорика кофе", "type": "courses", "price": 15000, "time": "2 дня", "format": "offline", "description": "Вы когда-нибудь задумывались, почему кофе описывается как \"с нотками черники и шоколада\"?", "seats": 30, "expertId": "exp-1", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" },
    { "id": "course-2", "title": "Чайный мастер", "type": "courses", "price": 20000, "time": "3 дня", "format": "offline", "description": "Полное погружение в чайную культуру", "seats": 30, "expertId": "exp-2", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" },
    { "id": "course-3", "title": "Классика приготовления кофе", "type": "courses", "price": 15000, "time": "2 дня", "format": "offline", "description": "Освойте классические методы приготовления кофе", "seats": 30, "expertId": "exp-1", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" },
    { "id": "course-4", "title": "Создание концепции кофейни", "type": "courses", "price": 10000, "time": "2 дня", "format": "online", "description": "Как открыть и развивать кофейню", "seats": 30, "expertId": "exp-3", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" },
    { "id": "course-5", "title": "Создание чайной карты", "type": "courses", "price": 10000, "time": "2 дня", "format": "online", "description": "Разработка чайного меню для заведения", "seats": 30, "expertId": "exp-2", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" },
    { "id": "course-6", "title": "Просвещение в кофейной и чайной культуре гостей", "type": "courses", "price": 10000, "time": "2 дня", "format": "online", "description": "Как обучать и вовлекать гостей", "seats": 30, "expertId": "exp-1", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" },
    { "id": "course-7", "title": "Мастерство приготовления кофе и чая", "type": "courses", "price": 50000, "time": "7 дней", "format": "offline", "description": "Полный курс от бариста до титестера", "seats": 30, "expertId": "exp-1", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" },
    { "id": "course-8", "title": "Латте-арт (базовый)", "type": "courses", "price": 15000, "time": "2 дня", "format": "offline", "description": "Научитесь рисовать на кофе", "seats": 30, "expertId": "exp-3", "image": "/images/courseImage.png", "previewImage": "#", "video": "#" }
  ],
  "users": [
    { "id": "u1", "name": "Роман", "email": "romkalan@mail.ru", "password": "123", "role": "student" },
    { "id": "u2", "name": "Юлия", "email": "yulia@mail.ru", "password": "123", "role": "student" },
    { "id": "u3", "name": "Денис", "email": "denis@mail.ru", "password": "123", "role": "student" }
  ],
  "enrollments": [
    { "id": "e1", "userId": "u1", "courseId": "course-1", "status": "completed", "enrolledAt": "2026-01-15", "completedAt": "2026-01-17" },
    { "id": "e2", "userId": "u1", "courseId": "course-3", "status": "completed", "enrolledAt": "2026-02-01", "completedAt": "2026-02-03" },
    { "id": "e3", "userId": "u1", "courseId": "course-8", "status": "completed", "enrolledAt": "2026-03-10", "completedAt": "2026-03-12" },
    { "id": "e4", "userId": "u2", "courseId": "course-2", "status": "completed", "enrolledAt": "2026-02-20", "completedAt": "2026-02-23" }
  ]
}
```

- [ ] **Step 5: Commit**

```bash
git add src/types/user.ts src/types/enrollment.ts src/types/course.ts db.json
git commit -m "feat: add types for auth, enrollment, skillArea; extend db.json"
```

---

### Task 2: Make mock courses IDs static and add skillArea

**Files:**
- Modify: `src/mocks/courses.ts`

- [ ] **Step 1: Replace generated UUIDs with static IDs and add skillArea**

Edit `src/mocks/courses.ts`:
- Remove `generateUUID` import
- Replace each course's `id: generateUUID()` with static IDs matching db.json: `"course-1"` through `"course-8"`
- Add `skillArea` to each course matching the course content:

```ts
import type {TCourse} from "../types/course.ts";
import {formatDateWithoutYear} from "../utils/utils.ts";
import {DetailInfoTypes, FormatsForDetailInfo} from "../utils/helpers.ts";

export const courses: TCourse[] = [
    {
        id: "course-1",
        title: "Сенсорика кофе",
        type: DetailInfoTypes.courses,
        price: 15000,
        time: "2 дня",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.offline,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "34543623632fdgasdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "cupping",
    },
    {
        id: "course-2",
        title: "Чайный мастер",
        type: DetailInfoTypes.courses,
        price: 20000,
        time: "3 дня",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.offline,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "345436gnfdgndf632fdgasdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "tea",
    },
    {
        id: "course-3",
        title: "Классика приготовления кофе",
        type: DetailInfoTypes.courses,
        price: 15000,
        time: "2 дня",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.offline,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "34543623632fdgasdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "basics",
    },
    {
        id: "course-4",
        title: "Создание концепции кофейни",
        type: DetailInfoTypes.courses,
        price: 10000,
        time: "2 дня",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.online,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "3454hvgjgfdbcrcbsdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "management",
    },
    {
        id: "course-5",
        title: "Создание чайной карты",
        type: DetailInfoTypes.courses,
        price: 10000,
        time: "2 дня",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.online,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "3454362hjhg8fbd789sdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "tea",
    },
    {
        id: "course-6",
        title: "Просвещение в кофейной и чайной культуре гостей",
        type: DetailInfoTypes.courses,
        price: 10000,
        time: "2 дня",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.online,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "34543623632fdgasdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "management",
    },
    {
        id: "course-7",
        title: "Мастерство приготовления кофе и чая",
        type: DetailInfoTypes.courses,
        price: 50000,
        time: "7 дней",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.offline,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "3454362hjhg8fbd789sdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "basics",
    },
    {
        id: "course-8",
        title: "Латте-арт (базовый)",
        type: DetailInfoTypes.courses,
        price: 15000,
        time: "2 дня",
        date: formatDateWithoutYear(new Date()),
        seats: 30,
        format: FormatsForDetailInfo.offline,
        description: "Вы когда-нибудь задумывались...",
        text: "",
        expertId: "3454hvgjgfdbcrcbsdfgs",
        image: "/images/courseImage.png",
        previewImage: "#",
        video: "#",
        skillArea: "latte-art",
    },
];
```

Keep the duplicate entries? Actually there are many duplicated courses in mocks. Let me count - courses.ts has 16 entries, many are duplicates (same title). We only have 8 unique courses in db.json. So I need to map 16 mock entries to 8 db.json courses.

Actually, looking at it more carefully, the mocks have many duplicates with the same title. The db.json I wrote has 8 unique courses. Let me just use 8 unique courses to match. The other 8 were duplicates anyway.

Let me adjust: I'll keep 8 courses in both db.json and mocks, each with a unique ID and skillArea.

So the file should have 8 courses, matching db.json.

- [ ] **Step 2: Commit**

```bash
git add src/mocks/courses.ts
git commit -m "feat: make course IDs static, add skillArea mapping"
```

---

### Task 3: Add authSlice with RTK Query endpoints

**Files:**
- Create: `src/redux/entities/auth/authSlice.ts`
- Create: `src/redux/entities/auth/index.ts`

- [ ] **Step 1: Create authSlice**

Write to `src/redux/entities/auth/authSlice.ts`:
```ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TUser } from "../../../types/user.ts";
import type { State } from "../../index.ts";

type AuthState = {
    user: TUser | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
};

const stored = localStorage.getItem("coffee_user");
const initialUser: TUser | null = stored ? JSON.parse(stored) : null;

const initialState: AuthState = {
    user: initialUser,
    isLoggedIn: !!initialUser,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    TUser,
    { email: string; password: string },
    { state: State }
>("auth/login", async (credentials) => {
    const res = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`
    );
    const users: TUser[] = await res.json();
    if (users.length === 0) {
        throw new Error("Неверный email или пароль");
    }
    localStorage.setItem("coffee_user", JSON.stringify(users[0]));
    return users[0];
});

export const registerUser = createAsyncThunk<
    TUser,
    { name: string; email: string; password: string },
    { state: State }
>("auth/register", async (data) => {
    const check = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(data.email)}`
    );
    const existing: TUser[] = await check.json();
    if (existing.length > 0) {
        throw new Error("Email уже зарегистрирован");
    }
    const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            role: "student",
        }),
    });
    const user: TUser = await res.json();
    localStorage.setItem("coffee_user", JSON.stringify(user));
    return user;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("coffee_user");
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка входа";
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка регистрации";
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export const selectUser = (state: State) => state.auth.user;
export const selectIsLoggedIn = (state: State) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: State) => state.auth.loading;
export const selectAuthError = (state: State) => state.auth.error;

export default authSlice.reducer;
```

- [ ] **Step 2: Create auth index**

Write to `src/redux/entities/auth/index.ts`:
```ts
export { default as authReducer } from "./authSlice.ts";
export {
    loginUser,
    registerUser,
    logout,
    clearError,
    selectUser,
    selectIsLoggedIn,
    selectAuthLoading,
    selectAuthError,
} from "./authSlice.ts";
```

- [ ] **Step 3: Add auth reducer to store**

Edit `src/redux/index.ts`:
```ts
import {configureStore} from "@reduxjs/toolkit";
import courseReducer from "./entities/course";
import serviceReducer from "./entities/service";
import { authReducer } from "./entities/auth";
import api from "./services/api.js";

const store = configureStore({
    reducer: {
        courses: courseReducer,
        services: serviceReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
```

- [ ] **Step 4: Commit**

```bash
git add src/redux/entities/auth/ src/redux/index.ts
git commit -m "feat: add authSlice with login/register, add to store"
```

---

### Task 4: Replace UserContext with Redux auth in Header

**Files:**
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/App/App.tsx`
- Modify: `src/components/LoginForm/LoginForm.tsx`
- Modify: `src/components/ModalLogin/ModalLogin.tsx`

- [ ] **Step 1: Update Header to use Redux**

Edit `src/components/Header/Header.tsx`:
```tsx
import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink, useNavigate} from "react-router";
import Logo from "../Logo/Logo.tsx";
import {useState} from "react";
import ModalLogin from "../ModalLogin/ModalLogin.tsx";
import {useAppSelector} from "../../redux/hooks/hooks.ts";
import {selectUser} from "../../redux/entities/auth";

function Header() {
    const user = useAppSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const userName = user === null ? "Войти" : user.name;

    const handleLoginClick = () => {
        if (user) {
            setShowMenu(!showMenu);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <div className={classNames(styles.root)}>
            <Logo />
            <nav className={classNames(styles.headerPages)}>
                <NavLink to={"/"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Главная</NavLink>
                <NavLink to={"/news"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Новости</NavLink>
                <NavLink to={"/courses"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Курсы</NavLink>
                <NavLink to={"/services"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Услуги</NavLink>
                <NavLink to={"/championships"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Чемпионаты</NavLink>
            </nav>
            <ul className={classNames(styles.helpers)}>
                <li>
                    <button onClick={handleLoginClick}>
                        {userName}
                    </button>
                    {showMenu && user && (
                        <div className={classNames(styles.userMenu)}>
                            <button onClick={() => { navigate("/profile"); setShowMenu(false); }}>
                                Личный кабинет
                            </button>
                        </div>
                    )}
                </li>
                <li>
                    <ModalLogin isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                </li>
            </ul>
        </div>
    );
}

export default Header;
```

- [ ] **Step 2: Remove UserContext from App**

Edit `src/components/App/App.tsx`:
```tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import Main from "../../pages/Main/Main.tsx";
import News from "../../pages/News/News.tsx";
import Courses from "../../pages/Courses/Courses.tsx";
import Championships from "../../pages/Сhampionships/Championships.tsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.tsx";
import ServiceDetail from "../../pages/ServiceDetail/ServiceDetail.tsx";
import ServicesPage from "../../pages/ServicesPage/ServicesPage.tsx";
import NewsCardDetail from "../../pages/NewsCardDetail/NewsCardDetail.tsx";
import {services} from "../../mocks/services.ts";
import {courses} from "../../mocks/courses.ts";
import {news} from "../../mocks/news.ts";
import CourseDetail from "../../pages/CourseDetail/CourseDetail.tsx";
import Profile from "../../pages/Profile/Profile.tsx";
import {useEffect} from "react";
import {Provider} from "react-redux";
import store from "../../redux";

function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path={"news"} element={<News />} />
                        <Route path={"news/:id"} element={<NewsCardDetail news={news}/>}/>
                        <Route path={"courses"} element={<Courses />} />
                        <Route path={"championships"} element={<Championships />} />
                        <Route path={"services"} element={<ServicesPage/>} />
                        <Route path={"services/:id"} element={<ServiceDetail services={services}/>}/>
                        <Route path={"courses/:id"} element={<CourseDetail courses={courses}/>}/>
                        <Route path={"profile"} element={<Profile />} />
                    </Route>
                    <Route path="*" element={< NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
```

- [ ] **Step 3: Update LoginForm to use Redux**

Rewrite `src/components/LoginForm/LoginForm.tsx`:
```tsx
import {useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";
import {loginUser, registerUser, clearError, selectAuthLoading, selectAuthError} from "../../redux/entities/auth";

interface LoginFormProps {
    onClose: () => void;
}

function LoginForm({ onClose }: LoginFormProps) {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) dispatch(clearError());
    };

    const handleSubmit = async () => {
        if (isRegister) {
            const result = await dispatch(registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }));
            if (registerUser.fulfilled.match(result)) {
                onClose();
            }
        } else {
            const result = await dispatch(loginUser({
                email: formData.email,
                password: formData.password,
            }));
            if (loginUser.fulfilled.match(result)) {
                onClose();
            }
        }
    };

    return (
        <div className={classNames(styles.form)}>
            <div className={classNames(styles.tabs)}>
                <button
                    className={classNames(styles.tab, !isRegister && styles.tabActive)}
                    onClick={() => { setIsRegister(false); dispatch(clearError()); }}
                >
                    Вход
                </button>
                <button
                    className={classNames(styles.tab, isRegister && styles.tabActive)}
                    onClick={() => { setIsRegister(true); dispatch(clearError()); }}
                >
                    Регистрация
                </button>
            </div>

            {isRegister && (
                <input
                    className={classNames(styles.formInput)}
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleFieldChange}
                />
            )}
            <input
                className={classNames(styles.formInput)}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFieldChange}
            />
            <input
                className={classNames(styles.formInput)}
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleFieldChange}
            />

            {error && <p className={classNames(styles.error)}>{error}</p>}

            <button
                className={classNames(styles.loginButton)}
                onClick={handleSubmit}
                disabled={loading || !formData.email || !formData.password || (isRegister && !formData.name)}
            >
                {loading ? "Загрузка..." : (isRegister ? "Зарегистрироваться" : "Войти")}
            </button>
        </div>
    );
}

export default LoginForm;
```

- [ ] **Step 4: Update ModalLogin — remove UserContext dependency**

Edit ModalLogin — same file, just remove UserContext import (it's not used in ModalLogin):
The current ModalLogin doesn't use UserContext directly, but remove the import if present. No changes needed actually — ModalLogin already doesn't import UserContext.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header/Header.tsx src/components/App/App.tsx src/components/LoginForm/LoginForm.tsx
git commit -m "feat: replace UserContext with Redux auth in Header, App, LoginForm"
```

---

### Task 5: Add LoginForm styles for tabs

**Files:**
- Modify: `src/components/LoginForm/styles.module.scss`

- [ ] **Step 1: Add styles for tabs and error**

Read current LoginForm styles, then append:
```scss
.tabs {
    display: flex;
    gap: 0;
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ccc;
}

.tab {
    flex: 1;
    padding: 8px 16px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
}

.tabActive {
    background: #4D0505;
    color: white;
}

.error {
    color: #d32f2f;
    font-size: 13px;
    margin: 8px 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoginForm/styles.module.scss
git commit -m "feat: add login form tab and error styles"
```

---

### Task 6: Create profile API endpoints

**Files:**
- Create: `src/redux/entities/profile/profileApi.ts`
- Create: `src/redux/entities/profile/index.ts`

- [ ] **Step 1: Create profileApi with RTK Query**

Write to `src/redux/entities/profile/profileApi.ts`:
```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["Enrollments"],
    endpoints: (builder) => ({
        getEnrollments: builder.query({
            query: (userId: string) => `enrollments?userId=${userId}`,
            providesTags: ["Enrollments"],
        }),
        createEnrollment: builder.mutation({
            query: (data) => ({
                url: "enrollments",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Enrollments"],
        }),
        completeEnrollment: builder.mutation({
            query: ({ id, completedAt }) => ({
                url: `enrollments/${id}`,
                method: "PATCH",
                body: { status: "completed", completedAt },
            }),
            invalidatesTags: ["Enrollments"],
        }),
    }),
});

export const {
    useGetEnrollmentsQuery,
    useCreateEnrollmentMutation,
    useCompleteEnrollmentMutation,
} = profileApi;
```

- [ ] **Step 2: Create profile index**

Write to `src/redux/entities/profile/index.ts`:
```ts
export { profileApi, useGetEnrollmentsQuery, useCreateEnrollmentMutation, useCompleteEnrollmentMutation } from "./profileApi.ts";
```

- [ ] **Step 3: Add profileApi to store**

Edit `src/redux/index.ts` to add profileApi:
```ts
import {configureStore} from "@reduxjs/toolkit";
import courseReducer from "./entities/course";
import serviceReducer from "./entities/service";
import { authReducer } from "./entities/auth";
import { profileApi } from "./entities/profile";
import api from "./services/api.js";

const store = configureStore({
    reducer: {
        courses: courseReducer,
        services: serviceReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, profileApi.middleware),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
```

- [ ] **Step 4: Commit**

```bash
git add src/redux/entities/profile/ src/redux/index.ts
git commit -m "feat: add profileApi with enrollment CRUD"
```

---

### Task 7: Create Profile page

**Files:**
- Create: `src/pages/Profile/Profile.tsx`
- Create: `src/pages/Profile/styles.module.scss`

- [ ] **Step 1: Create Profile page component**

Write to `src/pages/Profile/Profile.tsx`:
```tsx
import {useAppSelector} from "../../redux/hooks/hooks.ts";
import {selectUser, logout} from "../../redux/entities/auth";
import {useGetEnrollmentsQuery, useCompleteEnrollmentMutation} from "../../redux/entities/profile";
import {courses} from "../../mocks/courses.ts";
import {useNavigate} from "react-router";
import classNames from "classnames";
import styles from "./styles.module.scss";
import SkillsMap from "../../components/SkillsMap/SkillsMap.tsx";

function Profile() {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: enrollments = [] } = useGetEnrollmentsQuery(user?.id ?? "", {
        skip: !user,
    });

    const [completeEnrollment] = useCompleteEnrollmentMutation();

    if (!user) {
        navigate("/");
        return null;
    }

    const getCourseTitle = (courseId: string) => {
        return courses.find(c => c.id === courseId)?.title ?? courseId;
    };

    const getSkillArea = (courseId: string) => {
        return courses.find(c => c.id === courseId)?.skillArea;
    };

    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.header)}>
                <h1>Личный кабинет</h1>
                <button className={classNames(styles.logoutBtn)} onClick={() => { dispatch(logout()); navigate("/"); }}>
                    Выйти
                </button>
            </div>

            <section className={classNames(styles.section)}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </section>

            <section className={classNames(styles.section)}>
                <h2>Мои курсы</h2>
                {enrollments.length === 0 && <p>Вы ещё не записались ни на один курс</p>}
                <ul className={classNames(styles.courseList)}>
                    {enrollments.map((enrollment: any) => (
                        <li key={enrollment.id} className={classNames(styles.courseItem)}>
                            <div>
                                <strong>{getCourseTitle(enrollment.courseId)}</strong>
                                <span className={classNames(styles.badge, enrollment.status === "completed" ? styles.completed : styles.enrolled)}>
                                    {enrollment.status === "completed" ? "Пройден" : "Записан"}
                                </span>
                            </div>
                            {enrollment.status === "enrolled" && (
                                <button
                                    className={classNames(styles.completeBtn)}
                                    onClick={() => completeEnrollment({
                                        id: enrollment.id,
                                        completedAt: new Date().toISOString()
                                    })}
                                >
                                    Отметить пройденным
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </section>

            <section className={classNames(styles.section)}>
                <h2>Карта навыков</h2>
                <SkillsMap enrollments={enrollments} getSkillArea={getSkillArea} />
            </section>
        </div>
    );
}

export default Profile;
```

Wait, I need to also import `useAppDispatch`. Let me fix:

```tsx
import {useAppSelector, useAppDispatch} from "../../redux/hooks/hooks.ts";
```

- [ ] **Step 2: Create Profile styles**

Write to `src/pages/Profile/styles.module.scss`:
```scss
.root {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 16px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.logoutBtn {
    padding: 8px 16px;
    border: 1px solid #ccc;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #f5f5f5;
    }
}

.section {
    margin-bottom: 32px;

    h2 {
        margin-bottom: 16px;
        font-size: 20px;
    }
}

.courseList {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.courseItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
}

.badge {
    margin-left: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
}

.enrolled {
    background: #e3f2fd;
    color: #1565c0;
}

.completed {
    background: #e8f5e9;
    color: #2e7d32;
}

.completeBtn {
    padding: 6px 12px;
    border: none;
    background: #4D0505;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
        opacity: 0.9;
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Profile/
git commit -m "feat: add Profile page with courses and skills map"
```

---

### Task 8: Create SkillsMap component

**Files:**
- Create: `src/components/SkillsMap/SkillsMap.tsx`
- Create: `src/components/SkillsMap/styles.module.scss`

- [ ] **Step 1: Create SkillsMap component with SVG archipelago**

Write to `src/components/SkillsMap/SkillsMap.tsx`:
```tsx
import classNames from "classnames";
import styles from "./styles.module.scss";

interface SkillArea {
    id: string;
    label: string;
    color: string;
    courses: string[];
}

const skillAreas: SkillArea[] = [
    { id: "basics", label: "Эспрессо", color: "#8B4513", courses: ["course-3", "course-7"] },
    { id: "latte-art", label: "Латте-арт", color: "#D2691E", courses: ["course-8"] },
    { id: "cupping", label: "Каппинг", color: "#A0522D", courses: ["course-1"] },
    { id: "tea", label: "Чай", color: "#2E7D32", courses: ["course-2", "course-5"] },
    { id: "management", label: "Управление", color: "#1565C0", courses: ["course-4", "course-6"] },
];

interface SkillsMapProps {
    enrollments: { courseId: string; status: string }[];
    getSkillArea: (courseId: string) => string | undefined;
}

function SkillsMap({ enrollments }: SkillsMapProps) {
    const completedCourseIds = new Set(
        enrollments.filter(e => e.status === "completed").map(e => e.courseId)
    );

    const isCompleted = (area: SkillArea) =>
        area.courses.some(cid => completedCourseIds.has(cid));

    return (
        <div className={classNames(styles.root)}>
            <svg viewBox="0 0 600 400" className={classNames(styles.map)}>
                {/* Water background */}
                <rect width="600" height="400" fill="#e3f2fd" rx="16" />

                {/* Islands */}
                {/* Espresso */}
                <ellipse cx="150" cy="120" rx="80" ry="50"
                    fill={isCompleted(skillAreas[0]) ? skillAreas[0].color : "#e0e0e0"}
                    className={classNames(styles.island)}
                />
                <text x="150" y="125" textAnchor="middle" fill={isCompleted(skillAreas[0]) ? "white" : "#999"} fontSize="14" fontWeight="600">
                    {skillAreas[0].label}
                </text>

                {/* Latte-art */}
                <ellipse cx="350" cy="100" rx="70" ry="45"
                    fill={isCompleted(skillAreas[1]) ? skillAreas[1].color : "#e0e0e0"}
                    className={classNames(styles.island)}
                />
                <text x="350" y="105" textAnchor="middle" fill={isCompleted(skillAreas[1]) ? "white" : "#999"} fontSize="14" fontWeight="600">
                    {skillAreas[1].label}
                </text>

                {/* Cupping */}
                <ellipse cx="450" cy="220" rx="75" ry="45"
                    fill={isCompleted(skillAreas[2]) ? skillAreas[2].color : "#e0e0e0"}
                    className={classNames(styles.island)}
                />
                <text x="450" y="225" textAnchor="middle" fill={isCompleted(skillAreas[2]) ? "white" : "#999"} fontSize="14" fontWeight="600">
                    {skillAreas[2].label}
                </text>

                {/* Tea */}
                <ellipse cx="200" cy="280" rx="80" ry="50"
                    fill={isCompleted(skillAreas[3]) ? skillAreas[3].color : "#e0e0e0"}
                    className={classNames(styles.island)}
                />
                <text x="200" y="285" textAnchor="middle" fill={isCompleted(skillAreas[3]) ? "white" : "#999"} fontSize="14" fontWeight="600">
                    {skillAreas[3].label}
                </text>

                {/* Management */}
                <ellipse cx="350" cy="320" rx="90" ry="45"
                    fill={isCompleted(skillAreas[4]) ? skillAreas[4].color : "#e0e0e0"}
                    className={classNames(styles.island)}
                />
                <text x="350" y="325" textAnchor="middle" fill={isCompleted(skillAreas[4]) ? "white" : "#999"} fontSize="14" fontWeight="600">
                    {skillAreas[4].label}
                </text>

                {/* Sea decorations */}
                <text x="40" y="60" fontSize="24" fill="#bbdefb">~</text>
                <text x="520" y="370" fontSize="24" fill="#bbdefb">~</text>
                <text x="500" y="50" fontSize="20" fill="#bbdefb">~</text>
                <text x="80" y="370" fontSize="20" fill="#bbdefb">~</text>
            </svg>
        </div>
    );
}

export default SkillsMap;
```

- [ ] **Step 2: Create SkillsMap styles**

Write to `src/components/SkillsMap/styles.module.scss`:
```scss
.root {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

.map {
    width: 100%;
    height: auto;

    .island {
        transition: fill 0.5s ease;
        cursor: pointer;

        &:hover {
            opacity: 0.85;
        }
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillsMap/
git commit -m "feat: add SkillsMap archipelago component"
```

---

### Task 9: Add enroll button to CourseDetail page

**Files:**
- Modify: `src/pages/CourseDetail/CourseDetail.tsx`

- [ ] **Step 1: Add enroll button to CourseDetail**

Edit `src/pages/CourseDetail/CourseDetail.tsx`:
```tsx
import type {TCourse} from "../../types/course.ts";
import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router";
import classNames from "classnames";
import ServiceRequestFrom from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
import Services from "../../components/Services/Services.tsx";
import DetailCourseInfo from "../../components/DetailCourseInfo/DetailCourseInfo.tsx";
import ExpertOfCourse from "../../components/ExpertOfCourse/ExpertOfCourse.tsx";
import {useAppSelector, useAppDispatch} from "../../redux/hooks/hooks.ts";
import {selectUser} from "../../redux/entities/auth";
import {useGetEnrollmentsQuery, useCreateEnrollmentMutation} from "../../redux/entities/profile";
import ModalLogin from "../../components/ModalLogin/ModalLogin.tsx";

interface CourseDetailProps {
    courses: TCourse[];
}

function CourseDetail({courses}: CourseDetailProps){
    const params = useParams();
    const course = courses.find((course) => course.id === params.id);
    const anotherCourses = courses.sort((() => Math.random() - 0.5)).slice(0, 3);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showLogin, setShowLogin] = useState(false);

    const { data: enrollments = [] } = useGetEnrollmentsQuery(user?.id ?? "", {
        skip: !user,
    });

    const [createEnrollment] = useCreateEnrollmentMutation();

    const myEnrollment = course
        ? enrollments.find((e: any) => e.courseId === course.id)
        : null;

    const handleEnroll = () => {
        if (!user) {
            setShowLogin(true);
            return;
        }
        if (course) {
            createEnrollment({
                userId: user.id,
                courseId: course.id,
                status: "enrolled",
                enrolledAt: new Date().toISOString(),
            });
        }
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

    if (!course) {
        return null;
    }

    return (
        <div>
            <div className={classNames(styles.root)}>
                <DetailCourseInfo course={course}/>
                <ExpertOfCourse expertId={course.expertId}/>

                <div className={classNames(styles.enrollSection)}>
                    {myEnrollment ? (
                        <p className={classNames(styles.enrolledText)}>
                            {myEnrollment.status === "completed"
                                ? "Курс пройден"
                                : "Вы записаны на этот курс"}
                        </p>
                    ) : (
                        <button
                            className={classNames(styles.enrollButton)}
                            onClick={handleEnroll}
                        >
                            {user ? "Записаться на курс" : "Войдите, чтобы записаться"}
                        </button>
                    )}
                </div>

                <ServiceRequestFrom/>
                <Services services={anotherCourses}>Другие услуги</Services>
            </div>
            <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </div>
    )
}

export default CourseDetail;
```

- [ ] **Step 2: Add enroll button styles**

Read `src/pages/CourseDetail/styles.module.scss` and append:
```scss
.enrollSection {
    margin: 24px 0;
    text-align: center;
}

.enrollButton {
    padding: 12px 24px;
    background: #4D0505;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
}

.enrolledText {
    color: #2e7d32;
    font-weight: 600;
    font-size: 16px;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/CourseDetail/
git commit -m "feat: add enroll button to course detail page"
```

---

### Task 10: Remove UserContext file

**Files:**
- Delete: `src/contexts/UserContext/UserContext.tsx`

- [ ] **Step 1: Delete UserContext**

```bash
rm src/contexts/UserContext/UserContext.tsx
```

If the directory is empty, can remove it too:
```bash
rmdir src/contexts/UserContext
rmdir src/contexts
```

- [ ] **Step 2: Commit**

```bash
git add src/contexts/
git commit -m "refactor: remove UserContext, fully migrated to Redux auth"
```

---

### Task 11: Run verification

**Files:**
- Run build checks

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc -b`
Expected: No errors

If there are errors, fix them inline.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve type/lint issues after auth migration"
```
