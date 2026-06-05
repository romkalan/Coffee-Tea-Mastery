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

    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, []);

    return null;
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter basename="/Coffee-Tea-Mastery">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path={"news"} element={<News />} />
                        <Route path={"news/:id"} element={<NewsCardDetail />}/>
                        <Route path={"courses"} element={<Courses />} />
                        <Route path={"courses/:id"} element={<CourseDetail />}/>
                        <Route path={"services"} element={<ServicesPage/>} />
                        <Route path={"services/:id"} element={<ServiceDetail />}/>
                        <Route path={"championships"} element={<Championships />} />
                        <Route path={"profile"} element={<Profile />} />
                    </Route>
                    <Route path="*" element={< NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
