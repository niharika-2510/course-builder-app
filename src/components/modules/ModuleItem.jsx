const ModuleItem = ({ item, onDelete }) => {
  if (!item || !item.type) return null;

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  if (item.type === 'link') {
    return (
      <div className="module-item link-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-link" aria-label="Link Icon">🔗</span>
          </div>
          <div className="item-info">
            <h4 className="item-title">{item.title}</h4>
            <a
              href={item.url}
              className="item-url"
              target="_blank"
              rel="noopener noreferrer"
              title={item.url}
            >
              {item.url}
            </a>
          </div>
        </div>
        <button
          className="item-delete"
          onClick={handleDelete}
          aria-label="Delete link item"
          title="Delete"
        >
          <span className="delete-icon">🗑️</span>
        </button>
      </div>
    );
  }

  if (item.type === 'file') {
    return (
      <div className="module-item file-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-file" aria-label="File Icon">📄</span>
          </div>
          <div className="item-info">
            <h4 className="item-title">{item.title}</h4>
            <p className="item-details" title={item.fileName}>
              {item.fileName} ({Math.round(item.fileSize / 1024)} KB)
            </p>
          </div>
        </div>
        <button
          className="item-delete"
          onClick={handleDelete}
          aria-label="Delete file item"
          title="Delete"
        >
          <span className="delete-icon">🗑️</span>
        </button>
      </div>
    );
  }

  return null; // Fallback for unknown item types
};

export default ModuleItem;
