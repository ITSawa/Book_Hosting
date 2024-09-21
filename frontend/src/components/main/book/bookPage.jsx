import React from 'react';
import './BookPage.css';

function BookPage({ bookData }) {
    if (!bookData) {
        return <div>No book data available</div>;
    }

    const { name, description, previewImgUrl, authors, authorDescription, bookPrice, pagesCount, onlySubscribers } = bookData;

    return (
        <div className="book-page">
            {previewImgUrl ? (
                <div className="book-preview">
                    <img src={previewImgUrl} alt={`${name} cover`} className="book-cover" />
                    <div className="book-info-on-image">
                        <h1 className="book-title">{name}</h1>
                        <p className="book-description">{description}</p>
                        <h4 className="authors-title">About authors</h4>
                        <p className="book-authors">Authors: {authors}</p>
                        <p className="author-description">{authorDescription}</p>
                        <div className='book-info'>
                        <p className="book-price">Price: ${bookPrice}</p>
                        <p className="book-pages">Pages: {pagesCount}</p>
                        {onlySubscribers && (
                            <p className="subscribers-only">Only for Subscribers</p>
                        )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="book-info-no-image">
                    <h1 className="book-title">{name}</h1>
                    <p className="book-description">{description}</p>
                    <h4 className="authors-title">About authors</h4>
                    <p className="book-authors">Authors: {authors}</p>
                    <p className="author-description">{authorDescription}</p>
                    <div className='book-info'>
                        <p className="book-price">Price: ${bookPrice}</p>
                        <p className="book-pages">Pages: {pagesCount}</p>
                        {onlySubscribers && (
                            <p className="subscribers-only">Only for Subscribers</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(BookPage);