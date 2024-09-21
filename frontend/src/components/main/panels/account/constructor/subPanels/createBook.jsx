import React, { useState, useContext } from "react";
import { request } from "../../../../../../helpers/request";
import { AppContext } from "../../../../../context/AppContext";
import BookPage from "../../../../book/bookPage";

function CreateBook() {

    const { ownedBooks, setOwnedBooks } = useContext(AppContext);

    const [book, setBook] = useState({
        name: '',
        description: '',
        authors: '',
        authorDescription: '',
        previewImgUrl: '',
        onlySubscribers: false,
        bookPrice: 0,
        pagesCount: 0,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [isBookPreviewOpen, setIsBookPreviewOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleToggle = () => {
        setBook(prevBook => ({
            ...prevBook,
            onlySubscribers: !prevBook.onlySubscribers
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Creating book...");
        console.log(book);

        try {
            const result = await request('/backend/author/book', 'POST', { book: book }, {}, true);
            if (result) {
                console.log("Book created");
                setBook({
                    name: '',
                    description: '',
                    authors: '',
                    authorDescription: '',
                    previewImgUrl: '',
                    onlySubscribers: false,
                    bookPrice: 0,
                    pagesCount: 0,
                });
                setIsOpen(false);
                console.log(result);
                setOwnedBooks([...ownedBooks, result.book]);
            } else {
                console.log("Book creation error");
            }
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Close" : "Create Book"}
            </button>
            {isOpen && (
                <div className="create-book">
                    <div>
                        <label>
                            Book Name:
                            <input 
                                type="text" 
                                name="name" 
                                value={book.name} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Description:
                            <textarea 
                                name="description" 
                                value={book.description} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Authors:
                            <input 
                                type="text" 
                                name="authors" 
                                value={book.authors} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Author Description:
                            <textarea 
                                name="authorDescription" 
                                value={book.authorDescription} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Preview Image URL:
                            <input 
                                type="text" 
                                name="previewImgUrl" 
                                value={book.previewImgUrl} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Book Price:
                            <input 
                                type="number" 
                                name="bookPrice"
                                min="0"
                                max="1000"
                                value={book.bookPrice} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Pages Count:
                            <input 
                                type="number" 
                                name="pagesCount"
                                min="0"
                                value={book.pagesCount} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>

                    <div className="switch-button-container row">
                        <h4>Only Subscribers?</h4>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={book.onlySubscribers} 
                                onChange={handleToggle} 
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <button onClick={handleSubmit}>Create book</button>

                    <div className="full-line" style={{marginTop: '3rem'}}></div>
                    <button onClick={() => setIsBookPreviewOpen(!isBookPreviewOpen)}>
                        {isBookPreviewOpen ? "Close" : "Preview"}
                    </button>
                    {isBookPreviewOpen && <BookPage bookData={book} />}
                </div>
            )}
        </>
    );
}

export default React.memo(CreateBook);