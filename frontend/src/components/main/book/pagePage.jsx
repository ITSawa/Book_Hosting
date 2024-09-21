import React from 'react';
import './PagePage.css'; // Assuming you have some basic styling

function PagePage({ title, matrix, content }) {
    const renderColumn = (columnIndex) => {
        if (!Array.isArray(matrix[columnIndex])) {
            return <p>Error: Matrix data is not available</p>;
        }

        return matrix[columnIndex].map((fieldIndex) => (
            <div key={fieldIndex} className="content-item">
                {content[fieldIndex] && content[fieldIndex].type === 'text' ? (
                    <p>{content[fieldIndex].value}</p>
                ) : (
                    <img src={content[fieldIndex] ? content[fieldIndex].value : ''} alt={`Image ${fieldIndex + 1}`} />
                )}
            </div>
        ));
    };

    return (
        <div className='page-page'>
            <h2>{title}</h2>
            <div className="page-page-container">
                <div className="column left-column">
                    {renderColumn(0)}
                </div>
                <div className="column right-column">
                    {renderColumn(1)}
                </div>
            </div>
        </div>
    );
}

export default React.memo(PagePage);