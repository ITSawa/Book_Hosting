import React from "react";
import WelcomePage from "./info/WelcomePage";
import Account from "./panels/account/Account";
import AuthPanel from "./panels/account/AuthPanel";
import ConstructorMainPane from "./panels/account/constructor/ConstructorMainPanel";
import Book from "./panels/account/constructor/subPanels/book/book";
import NotFound from "../assets/NotFount";
import SearchPanel from "./panels/SearchPanel";
import AboutUs from "./info/serviceInfo/AboutUs";
import Contacts from "./info/serviceInfo/Contacts";
import Privacy from "./info/serviceInfo/Privacy";
import Terms from "./info/serviceInfo/Terms";
import Docs from "./info/serviceInfo/Docs";
import CoreBookPage from "./book/finalBook";
import CorePagePage from "./book/finalPage";
import { Routes, Route } from "react-router-dom";

function Main() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/account" element={<Account />} />
                <Route path="/auth" element={<AuthPanel />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/search" element={<SearchPanel />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contacts />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/constructor" element={<ConstructorMainPane />} />
                <Route path="/constructor/book" element={<Book />} />
                
                {/* Исправлено на правильное использование элемента */}
                <Route path="/book/:permission/:bookId" element={<CoreBookPage />} />
                <Route path="/page/:permission/:bookId/:pageNumber" element={<CorePagePage />} />
                
                {/* Остальные маршруты могут остаются закомментированными */}
                {/* <Route path="/constructor/edit/book" element={<EditBook />} />
                <Route path="/constructor/edit/page" element={<EditBookPage />} />
                <Route path="/constructor/create/page" element={<CreateBookPage />} /> */}
            </Routes>
        </main>
    );
}

export default React.memo(Main);