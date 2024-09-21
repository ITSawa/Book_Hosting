import React, { useState, useEffect, useContext } from "react";
import { request } from "../../../../../../../helpers/request";
import { AppContext } from "../../../../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import BookPage from '../../../../../book/bookPage'

function EditBook({ selectedBook }) {
    const { setSelectedBook, ownedBooks, setOwnedBooks } = useContext(AppContext);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        author_description: "",
        authors: "",
        book_preview_img_url: ""
    });
    const navigate = useNavigate();

    const [bookPreview, setBookPreview] = useState(false);

    useEffect(() => {
        if (selectedBook) {
            setFormData({
                name: selectedBook.name,
                description: selectedBook.description,
                author_description: selectedBook.author_description,
                authors: selectedBook.authors,
                book_preview_img_url: selectedBook.book_preview_img_url
            });
        }
    }, [selectedBook]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleDelete() {
        const result = await request('/backend/author/book/', 'DELETE', { bookId: selectedBook.id });

        if (!result.book) {
            console.log("Book deletion error");
            return;
        }

        console.log("Book deleted");
        setSelectedBook(null);
        setOwnedBooks(ownedBooks.filter(book => book.id !== selectedBook.id));
        navigate('/constructor');
    }

    async function handleSaveChanges() {
        const result = await request('/backend/author/book', 'PUT', { id: selectedBook.id, book: formData });

        if (result.book) {
            console.log("Book updated");
            setSelectedBook(formData);

            setTimeout(() => {
                setOpenSuccess(true);
                setSuccessMessage("Changes saved");
                setTimeout(() => {
                    setOpenSuccess(false);
                }, 3000);
            }, 1000);
        }
    }

    return (
        <div className="update-book">
            <input 
                type="text" 
                name="name" 
                placeholder="Book name" 
                value={formData.name} 
                onChange={handleChange}
            />
            <textarea 
                name="description" 
                placeholder="Description" 
                value={formData.description} 
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="author_description" 
                placeholder="Author description" 
                value={formData.author_description} 
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="authors" 
                placeholder="Authors" 
                value={formData.authors} 
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="book_preview_img_url" 
                placeholder="Preview image url" 
                value={formData.book_preview_img_url} 
                onChange={handleChange}
            />

            {openSuccess && <div className="success">
                <p>{successMessage}</p>
            </div>}

            <div className="row space-between">
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleDelete} className="danger-btn">Delete Book</button>
            </div>

            <div className="full-line" style={{marginTop: '3rem'}}></div>
            
            <button onClick={() => setBookPreview(!bookPreview)}>{bookPreview ? 'Close preview': 'Show preview'}</button>
            {bookPreview && <BookPage bookData={selectedBook} />}
        </div>
    )
}

export default React.memo(EditBook);