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
