import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
// import MainServerTest from "../../pages/MainServerTest/MainServerTest.tsx";
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
import {useState} from "react";
import UserContext from "../../contexts/UserContext/UserContext.tsx";
import {Provider} from "react-redux";
import store from "../../redux";

function App() {
    const [user, setUser] = useState(null);

    return (
        <Provider store={store}>
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/*<Route index element={<MainServerTest />} />*/}
                        <Route index element={<Main />} />
                        <Route path={"news"} element={<News />} />
                        <Route path={"news/:id"} element={<NewsCardDetail news={news}/>}/>
                        <Route path={"courses"} element={<Courses />} />
                        <Route path={"championships"} element={<Championships />} />
                        <Route path={"services"} element={<ServicesPage/>} />
                        <Route path={"services/:id"} element={<ServiceDetail services={services}/>}/>
                        <Route path={"courses/:id"} element={<CourseDetail courses={courses}/>}/>
                    </Route>
                    <Route path="*" element={< NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    </Provider>
    )
}

export default App;
