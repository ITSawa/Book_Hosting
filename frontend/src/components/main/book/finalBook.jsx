import React, { useEffect, useState } from "react";
import { request } from "../../../helpers/request";
import { useParams } from "react-router-dom";
import BookPage from "./bookPage";
import { Link } from "react-router-dom";

function CoreBookPage() {
    const { permission, bookId } = useParams();
    const [bookData, setBookData] = useState(null);

    async function getBook() {
        const result = await request(`/backend/${permission}/book/${bookId}`, 'GET', {}, {}, true);
        
        if (Array.isArray(result.book) && result.book.length > 0) {
            setBookData(result.book[0]);
        } else {
            console.log('Error: book not found');
            setBookData(null);
        }
    }

    useEffect(() => {
        getBook();
    }, [permission, bookId]);

    return (
        <div>
            {bookData ?
                <>
                    <BookPage bookData={bookData} />
                    <Link to={`/page/${permission}/${bookId}/1`} >Go read</Link>
                </>
                : <h1>Book not found</h1>
            }
        </div>
    );
}

export default CoreBookPage;