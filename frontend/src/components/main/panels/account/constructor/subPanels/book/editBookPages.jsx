import React, { useState, useEffect } from "react";
import { request } from "../../../../../../../helpers/request";
import PagePage from "../../../../../book/pagePage";
import Matrix from "./Matrix"; // Убедитесь, что путь к компоненту Matrix корректен

function EditBookPages({ selectedBook }) {
    const [currentPage, setCurrentPage] = useState(null);
    const [currentContent, setCurrentContent] = useState({ title: "", content: [], matrix: [[], []] });
    const [openRedactorPage, setOpenRedactorPage] = useState(false);

    useEffect(() => {
        if (currentPage !== null) {
            fetchPage(currentPage);
        }
    }, [currentPage]);

    const fetchPage = async (pageNumber) => {
        try {
            const response = await request(`/backend/author/page/${selectedBook.id}/${pageNumber}`, 'GET', {}, {});
            if (!response.page) {
                setCurrentContent({ title: 'Page not found', content: [], matrix: [[], []] });
                return;
            }

            const parsedContent = JSON.parse(response.page.content);
            const parsedMatrix = JSON.parse(response.page.matrix);

            setCurrentContent({
                title: response.page.title,
                content: parsedContent,
                matrix: parsedMatrix,
            });

            setOpenRedactorPage(true);
        } catch (error) {
            console.error("Error fetching page:", error);
            setCurrentContent({ title: 'Error fetching page', content: [], matrix: [[], []] });
        }
    };

    const handleTitleChange = (e) => {
        setCurrentContent((prevContent) => ({
            ...prevContent,
            title: e.target.value,
        }));
    };

    const handleAddField = (type) => {
        const newField = { type, value: '' };
        const newContent = [...currentContent.content, newField];
        const newMatrix = [...currentContent.matrix];

        // Вставляем новый элемент в первую колонку по умолчанию
        newMatrix[0].push(newContent.length - 1); 

        setCurrentContent((prevContent) => ({
            ...prevContent,
            content: newContent,
            matrix: newMatrix,
        }));
    };

    const handleRemoveField = (index) => {
        const updatedContent = currentContent.content.filter((_, i) => i !== index);
        const updatedMatrix = currentContent.matrix.map(column => column.filter(value => value !== index));
        const shiftedMatrix = updatedMatrix.map(column =>
            column.map(value => (value > index ? value - 1 : value))
        );

        setCurrentContent({
            ...currentContent,
            content: updatedContent,
            matrix: shiftedMatrix,
        });
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceColumnIndex = parseInt(result.source.droppableId);
        const destColumnIndex = parseInt(result.destination.droppableId);

        const sourceItems = Array.from(currentContent.matrix[sourceColumnIndex]);
        const [removed] = sourceItems.splice(result.source.index, 1);
        const destItems = Array.from(currentContent.matrix[destColumnIndex]);
        destItems.splice(result.destination.index, 0, removed);

        const newMatrix = [...currentContent.matrix];
        newMatrix[sourceColumnIndex] = sourceItems;
        newMatrix[destColumnIndex] = destItems;

        // обновить состояние с новой матрицей
        setCurrentContent((prevContent) => ({
            ...prevContent,
            matrix: newMatrix,
        }));
    };

    const handleSaveChanges = () => {
        console.log(currentContent);
        // Здесь добавьте код для сохранения изменений
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= selectedBook.pagesCount; i++) {
            buttons.push(
                <li className="m-1" key={i}>
                    <button onClick={() => setCurrentPage(i)}>{i}</button>
                </li>
            );
        }
        return buttons;
    };

    return (
        <div className="create-book-page">
            <ul className="row" style={{ justifyContent: 'normal', listStyle: 'none' }}>
                {selectedBook.pagesCount && renderPageButtons()}
            </ul>

            {openRedactorPage && (
                <div className="update-book update-page">
                    <h1>Edit book page</h1>

                    {currentContent.title && (
                        <input
                            value={currentContent.title}
                            onChange={handleTitleChange}
                            placeholder="Enter the title"
                        />
                    )}

                    <h3>Edit Content:</h3>
                    {currentContent.content.map((block, index) => (
                        <div key={index} className="field-container">
                            {block.type === "text" ? (
                                <textarea
                                    value={block.value}
                                    onChange={(e) => {
                                        const newContent = [...currentContent.content];
                                        newContent[index].value = e.target.value;
                                        setCurrentContent({ ...currentContent, content: newContent });
                                    }}
                                    rows={4}
                                />
                            ) : (
                                <input
                                    type="url"
                                    value={block.value}
                                    onChange={(e) => {
                                        const newContent = [...currentContent.content];
                                        newContent[index].value = e.target.value;
                                        setCurrentContent({ ...currentContent, content: newContent });
                                    }}
                                />
                            )}
                            <button onClick={() => handleRemoveField(index)}>Remove</button>
                        </div>
                    ))}

                    <div className="row">
                        <button onClick={() => handleAddField('text')}>Add Text Field</button>
                        <button onClick={() => handleAddField('url')}>Add URL Field</button>
                    </div>

                    <h3>Position edit:</h3>
                    <Matrix 
                        matrix={currentContent.matrix} 
                        fields={currentContent.content} 
                        handleDragEnd={handleDragEnd} 
                    />

                    <div className="row space-between">
                        <button onClick={handleSaveChanges}>Save changes</button>
                        <button className="danger-btn">Delete page</button>
                    </div>
                </div>
            )}

            <div className="full-line"></div>
            
            {currentPage && (
                <PagePage title={currentContent.title} matrix={currentContent.matrix} content={currentContent.content} />
            )}
        </div>
    );
}

export default React.memo(EditBookPages);