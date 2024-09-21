import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './createBookPage.css';

const Matrix = ({ matrix, fields, handleDragEnd }) => {
  const renderDroppableColumn = (column, index) => (
    <Droppable key={index} droppableId={`${index}`}>
      {(provided) => (
        <div
          className="droppable-column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {column.map((fieldIndex, i) => (
            <Draggable key={fieldIndex} draggableId={`${fieldIndex}`} index={i}>
              {(provided) => (
                <div
                  className="draggable-item"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {fields[fieldIndex].type === 'text'
                    ? `Content ${fieldIndex + 1}`
                    : `Image ${fieldIndex + 1}`}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="columns-container">
        {matrix.map((column, index) => renderDroppableColumn(column, index))}
      </div>
    </DragDropContext>
  );
};

export default React.memo(Matrix);