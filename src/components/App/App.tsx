import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../Layout/Layout.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Layout>
                            <h1>Bee Barista</h1>
                        </Layout>
                    }>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
