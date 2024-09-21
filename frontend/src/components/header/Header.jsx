import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../components/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const { searchTerm, setSearchTerm, account } = useContext(AppContext);

    return (
        <header className="header">
        <div className="container">
            <div className="header-left">
            <Link to="/" className="header-title">
                Book.Lead
            </Link>
            </div>
            <div className="header-center">
            <div className="search-bar">
                <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to={searchTerm && "/search"} className="search-button button">
                <FontAwesomeIcon icon={faSearch} />
                </Link>
            </div>
            </div>
            <div className="header-right">
            <Link to={account ? "/account" : "/auth"} className="account-button">
            {account ? (
                <>
                    <FontAwesomeIcon icon={faUser} />
                </>
                ) : (
                    <FontAwesomeIcon icon={faSignInAlt} />
                )}
            </Link>
            </div>
        </div>
        {/* <div className="line"></div> */}
        </header>
    );
}

export default React.memo(Header);