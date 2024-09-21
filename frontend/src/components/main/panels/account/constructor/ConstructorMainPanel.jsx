import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

import CreateBook from "./subPanels/createBook";


function ConstructorMainPanel() {
    const { account, ownedBooks, setSelectedBook } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!account) {
            navigate('/auth');
        }
    }, [account, navigate]);

    return (
        <div className="constructor book">

                <div className="book_edit">
                    <h1>Book constructor</h1>
                    <CreateBook />
                </div>
                
                <div className="line"></div>

                <div className="books_list book_info">
                    <h2>Books</h2>
                    {
                        ownedBooks && ownedBooks.length > 0 ? ownedBooks.map((book, index) => (
                            <Link
                            key={index}
                            to={`/constructor/book`}
                            onClick={() => setSelectedBook(book)}
                            className="book-btn"
                            >
                                {book.name}
                            </Link>
                        )): <p>No books</p>
                    }
                </div>
        </div>
    )
}

export default React.memo(ConstructorMainPanel)