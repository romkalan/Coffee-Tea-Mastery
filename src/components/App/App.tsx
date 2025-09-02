import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import Main from "../../pages/Main/Main.tsx";
import News from "../../pages/News/News.tsx";
import Courses from "../../pages/Courses/Courses.tsx";
import Championships from "../../pages/Сhampionships/Championships.tsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.tsx";
import ServiceDetail from "../../pages/ServiceDetail/ServiceDetail.tsx";
import ServicesPage from "../../pages/ServicesPage/ServicesPage.tsx";
import {services} from "../../mocks/services.ts";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path={"news"} element={<News />} />
                        <Route path={"courses"} element={<Courses />} />
                        <Route path={"championships"} element={<Championships />} />
                        <Route path={"services"} element={<ServicesPage/>} />
                        <Route path={"services/:id"} element={<ServiceDetail services={services}/>}/>
                    </Route>
                    <Route path="*" element={< NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
