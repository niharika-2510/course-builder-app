import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ResourceItem = ({ resource, index, moveResource, onDelete }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'RESOURCE',
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveResource(draggedItem.index, index);
      draggedItem.index = index;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'RESOURCE',
    item: { id: resource.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  drag(drop(ref));

  if (!resource) return null;

  return (
    <div
      ref={ref}
      className="resource-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
        marginBottom: '8px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#fff',
        cursor: 'grab',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        {resource.type === 'file' ? (
          <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
            📄 {resource.title || resource.fileName}
          </a>
        ) : (
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            🔗 {resource.title}
          </a>
        )}
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(resource.id)}
          style={{
            marginLeft: '10px',
            color: 'red',
            border: 'none',
            background: 'none',
            cursor: 'pointer'
          }}
          aria-label="Delete resource"
        >
          🗑️
        </button>
      )}
    </div>
  );
};

export default ResourceItem;
