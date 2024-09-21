import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

import { request } from "../../../../helpers/request";

function Account() {
    const { account, setAccount, ownedBooks, favoriteBooks } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!account) {
            navigate('/auth');
        }
    }, [account, navigate]);

    async function handleLogout() {
        const result = await request('/backend/logout', 'POST', null, {}, true);
        if (result) {
            localStorage.removeItem('authorized');
            setAccount(null);
            navigate('/auth');
        } else {
            console.log('logout error');
        }
    }

    return (
        account && 
        <div className="account">
            <div className="account-info">
                <h1 className="main-color">Account</h1>
                <p><strong>Name:</strong> {account.name}</p>
                <p><strong>Email:</strong> {account.email}</p>
                <Link to="/constructor" className="button constructor">Constructor</Link>
                <button className="button logout" onClick={handleLogout}>Logout</button>
            </div>

            <div className="full-line"></div>
            
            <div className="two-columns">
                {ownedBooks && ownedBooks.length > 0 && 
                <div className="my-books">
                    <h2 className="main-color">My Books</h2>
                    <ul style={{flexDirection: 'column'}}>
                        {ownedBooks.map((book, index) => (
                            <li className="book-btn" key={index}><Link to={`/book/author/${book.id}`}>{book.name}</Link></li>
                        ))}
                    </ul>
                </div>}
        
                {favoriteBooks && favoriteBooks.length > 0 && 
                <div className="favorite-books">
                    <h2 className="main-color">Favorite Books</h2>
                    <ul>
                        {favoriteBooks.map((book, index) => (
                            <li className="book-btn" key={index}><Link to={`/book/reader/${book.id}`}>{book.name}</Link></li>
                        ))}
                    </ul>
                </div>}

                {!ownedBooks && !favoriteBooks && <p>No any books</p>}
            </div>
        </div>
    );
}

export default React.memo(Account);