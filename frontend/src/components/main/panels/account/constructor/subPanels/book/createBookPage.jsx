import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './createBookPage.css';
import { request } from '../../../../../../../helpers/request';
import { AppContext } from '../../../../../../context/AppContext';
import PagePage from '../../../../../book/pagePage';
import Matrix from './Matrix';


function CreateBookPage() {
    const { selectedBook, setSelectedBook } = useContext(AppContext);

    const [fields, setFields] = useState([]);
    const [matrix, setMatrix] = useState([[], []]); // Two columns for drag-and-drop
    const [title, setTitle] = useState("");

    // Add a new field with a specific type
    const handleAddField = (type) => {
        const newField = { type, value: '' };
        const newFields = [...fields, newField];
        const newMatrix = [...matrix];
        newMatrix[0].push(newFields.length - 1);
        setFields(newFields);
        setMatrix(newMatrix);
    };

    // Remove a specific field
    const handleRemoveField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        const newMatrix = matrix.map(column => column.filter(value => value !== index));
        setFields(updatedFields);

        // Update the matrix to shift indices
        const shiftedMatrix = newMatrix.map(column =>
            column.map(value => (value > index ? value - 1 : value))
        );

        setMatrix(shiftedMatrix);
    };

    // Handle changes in fields
    const handleChange = (index, value) => {
        const updatedFields = [...fields];
        updatedFields[index].value = value;
        setFields(updatedFields);
    };

    // Remove duplicates from the matrix
    const removeDuplicates = (matrix) => {
        return matrix.map(column => [...new Set(column)]);
    };

    // Handle drag and drop
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceColumnIndex = parseInt(result.source.droppableId);
        const destColumnIndex = parseInt(result.destination.droppableId);

        const sourceItems = Array.from(matrix[sourceColumnIndex]);
        const [removed] = sourceItems.splice(result.source.index, 1);
        const destItems = Array.from(matrix[destColumnIndex]);
        destItems.splice(result.destination.index, 0, removed);

        const newMatrix = [...matrix];
        newMatrix[sourceColumnIndex] = sourceItems;
        newMatrix[destColumnIndex] = destItems;

        // Remove duplicates
        const cleanedMatrix = removeDuplicates(newMatrix);

        setMatrix(cleanedMatrix);

        console.log("Drag ended");
        console.log("Source column index:", sourceColumnIndex);
        console.log("Destination column index:", destColumnIndex);
        console.log("Removed item:", removed);
        console.log("New matrix:", newMatrix);
        console.log("Cleaned matrix:", cleanedMatrix);
    };

    const handleRequest = async () => {
        // console.log("Requesting...");
        // console.log(title)
        // console.log(matrix)
        // console.log(fields)
        
        if (!title || !matrix || !fields) {
            console.log("Title, matrix or fields is empty");
            return;
        }

        const page = {
            title: title,
            matrix: JSON.stringify(matrix),
            content: JSON.stringify(fields),
            bookId: selectedBook.id,
            name: selectedBook.name
        }

        console.log(page)

        const result = await request('/backend/author/page', 'POST', {
            page: page
        })

        if (result.page) {
            console.log("Page created");
            setTitle("");
            setMatrix([[], []]);
            setFields([]);
            const newData = { ...selectedBook, pagesCount: selectedBook.pagesCount + 1 };
            setSelectedBook(newData);

            // console.log(result.page);
        } else {
            console.log("Page creation error");
        }
    }

    return (
    <div className="create_page_container">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      {/* Render fields dynamically */}
      {fields.map((field, index) => (
        <div key={index} className="field-container">
          {field.type === 'text' ? (
            <textarea
              placeholder={`Content ${index + 1}`}
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder={`URL for image ${index + 1}`}
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          )}
          {fields.length === 1 || (fields.length - 1 === index && (
            <button onClick={() => handleRemoveField(index)}>Remove</button>
          ))}
        </div>
      ))}
      {/* Buttons to add new fields */}
      <button onClick={() => handleAddField('text')}>Add Content Field</button>
      <button className='ml-1' onClick={() => handleAddField('url')}>Add Image URL Field</button>

      <div className='full-line'></div>

      {/* Используем новый компонент Matrix */}
      <h3>Position edit:</h3>
      <Matrix matrix={matrix} fields={fields} handleDragEnd={handleDragEnd} />
      
      <button onClick={handleRequest}>Create Page</button>

      <div className='full-line'></div>

      <h3>Page preview:</h3>
      <PagePage title={title} matrix={matrix} content={fields} />
    </div>
  );
}

export default React.memo(CreateBookPage);