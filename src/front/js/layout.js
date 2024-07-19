import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { NotFound404 } from "./pages/NotFound404.jsx";
import { Personajes } from "./pages/Personajes.jsx";
import { DetallePersonajes } from "./pages/DetallePersonajes.jsx";
import { Demo } from "./pages/demo";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Planetas } from "./pages/Planetas.jsx";
import { DetallePlanetas } from "./pages/DetallePlanetas.jsx";
import { DetalleNaves } from "./pages/DetalleNaves.jsx";

import { Naves } from "./pages/Naves.jsx";
import { Spinner } from "./component/Spinner.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { AddContact } from "./pages/AddContact.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Personajes />} path="/personajes" />
                        <Route element={<Planetas />} path="/planetas" />
                        <Route element={<Naves />} path="/naves" />
                        <Route element={<DetallePersonajes />} path="/detalle-personajes" />
                        <Route element={<DetallePlanetas />} path="/detalle-planetas" />
                        <Route element={<DetalleNaves />} path="/detalle-naves" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route element={<AddContact />} path="/addcontact" />
                        <Route element={<NotFound404 />} path='*'/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
