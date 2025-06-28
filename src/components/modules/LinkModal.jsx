import { useState } from 'react';

const LinkModal = ({ isOpen, onClose, onSave, moduleId }) => {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!linkTitle.trim() || !linkUrl.trim()) return;

    onSave({
      id: Date.now().toString(),
      moduleId,                     // could be null or a valid module ID
      type: 'link',
      title: linkTitle.trim(),
      url: linkUrl.trim(),
    });

    // Reset fields and close
    setLinkTitle('');
    setLinkUrl('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add a link</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="link-title">Link Title</label>
              <input
                id="link-title"
                type="text"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="e.g., Introduction Video"
                className="form-input"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="link-url">URL</label>
              <input
                id="link-url"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="form-input"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-create"
              disabled={!linkTitle.trim() || !linkUrl.trim()}
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
