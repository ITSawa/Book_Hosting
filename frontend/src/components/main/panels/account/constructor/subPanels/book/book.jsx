import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../../../context/AppContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateBookPage from "./createBookPage";
import EditBookPages from "./editBookPages";
import EditBook from "./editBook";

function Book() {
    const { selectedBook, setSelectedBook } = useContext(AppContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!selectedBook) {
            navigate('/constructor');
        }
    }, [selectedBook, navigate]);

    const [settingsIndex, setSettingsIndex] = useState(2); // Default position is CreateBookPage

    const handleSwitchChange = (index) => {
        setSettingsIndex(index);
    };

    const [isBookInfoOpen, setIsBookInfoOpen] = useState(false)

    const renderComponent = () => {
        switch (settingsIndex) {
            case 0:
                return <EditBook selectedBook={selectedBook} />;
            case 1:
                return <EditBookPages selectedBook={selectedBook} />;
            case 2:
                return <CreateBookPage />;
            default:
                return null;
        }
    };

    return (
        selectedBook && (
                <div className="book">
                    <div className="book_info">
                        <Link className="close-btn button" to={'/constructor'}>
                            <FontAwesomeIcon icon={faClose} />
                        </Link>

                        <button onClick={() => setIsBookInfoOpen(!isBookInfoOpen)}>{isBookInfoOpen ? 'Close book info': 'Show book info'}</button>
                        
                        {isBookInfoOpen &&
                            <>
                                <div className="book-title">
                                    <h1 className="main-color">Book:</h1> 
                                    <h2 className="text-color">{selectedBook.name}</h2>
                                </div>
                                <div className="book-subtitle">
                                    <h2 className="main-color">Description:</h2> 
                                    <h3 className="text-color">{selectedBook.description}</h3>
                                </div>
                                <div className="book-subtitle">
                                    <h2 className="main-color">Authors:</h2> 
                                    <h3 className="text-color">{selectedBook.authors}</h3>
                                </div>
                                <div className="book-subtitle">
                                    <h2 className="main-color">Author description:</h2> 
                                    <h3 className="text-color">{selectedBook.authorDescription}</h3>
                                </div>
                                <div className="book-subtitle">
                                    <h2 className="main-color">Pages count:</h2> 
                                    <h3 className="text-color">{selectedBook.pagesCount}</h3>
                                </div>
                            </>
                        }
                        
                        {/* <div className="book-subtitle">
                            <h2 className="main-color">Book Price</h2>
                            <h3 className="text-color">{selectedBook.bookPrice}</h3>
                        </div> */}
                        
                        {(selectedBook.bookPrice || selectedBook.onlySubscribers) &&
                            <div className="book-subtitle">
                                <h2 className="main-color">Book Price</h2>
                                <h3 className="text-color">{selectedBook.bookPrice? selectedBook.bookPrice : ''} {selectedBook.onlySubscribers? 'Subscribers access' : ''}</h3>
                            </div>
                        }

                    </div>

                    <div className="line"></div>

                    <div className="edit_book">
                        <div className="switch-container">
                            <button 
                                className={`switch-button ${settingsIndex === 2 ? 'active' : ''}`} 
                                onClick={() => handleSwitchChange(2)}>
                                Create Page
                            </button>
                            <button 
                                className={`switch-button ${settingsIndex === 1 ? 'active' : ''}`} 
                                onClick={() => handleSwitchChange(1)}>
                                Edit Pages
                            </button>
                            <button 
                                className={`switch-button ${settingsIndex === 0 ? 'active' : ''}`} 
                                onClick={() => handleSwitchChange(0)}>
                                Edit Book
                            </button>
                        </div>
                        {renderComponent()}
                    </div>
                </div>
        )
    );
}

export default React.memo(Book);