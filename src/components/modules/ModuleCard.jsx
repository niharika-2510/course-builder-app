// ModuleCard.jsx
import { useState } from 'react';
import UploadModal from './UploadModal';
import LinkModal from './LinkModal';
import ResourceItem from './ResourceItem';

const ModuleCard = ({
  module,
  items = [],
  onEdit,
  onDelete,
  onAddItem,
  onDeleteItem,
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  // ✅ Drag-and-drop reorder logic (optional: to persist in global state)
  const moveResource = (fromIndex, toIndex) => {
    const updated = [...items];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    // This version only reorders locally — update in parent if needed
  };

  return (
    <div
      className="module-card"
      id={`module-${module.id}`}
      style={{
        border: '1px solid #ddd',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '8px',
        background: '#fff',
      }}
    >
      <div
        className="module-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h3>{module.name}</h3>
        <div>
          <button onClick={() => onEdit(module)}>✏️ Edit</button>
          <button onClick={() => onDelete(module.id)} style={{ marginLeft: '8px' }}>
            🗑️ Delete
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <button onClick={() => onAddItem(module.id, 'file')}>📤 Upload File</button>
        <button onClick={() => onAddItem(module.id, 'link')} style={{ marginLeft: '8px' }}>
          🔗 Add Link
        </button>
      </div>

      {/* ✅ Uploaded resources */}
      <div className="resource-list">
        {items.length === 0 ? (
          <p style={{ color: '#666' }}>No resources added yet.</p>
        ) : (
          items.map((res, index) => (
            <ResourceItem
              key={res.id}
              resource={res}
              index={index}
              moveResource={moveResource}
              onDelete={() => onDeleteItem(res.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
