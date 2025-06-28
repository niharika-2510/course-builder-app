import { useState } from 'react';

const UploadModal = ({ isOpen, onClose, onSave, moduleId }) => {
  const [fileTitle, setFileTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile || !fileTitle.trim()) return;

    const previewUrl = URL.createObjectURL(selectedFile); // ✅ local preview

    onSave({
      id: Date.now().toString(),
      moduleId,
      type: 'file',
      title: fileTitle.trim(),
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
      fileUrl: previewUrl, // ✅ temporary local link
    });

    // Reset fields
    setFileTitle('');
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Upload File</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="file-title">File Title</label>
              <input
                id="file-title"
                type="text"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
                placeholder="Enter a title"
                className="form-input"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="file-upload">Select File</label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="file-input"
              />
              {selectedFile && (
                <div className="selected-file">
                  <span className="file-name">{selectedFile.name}</span>
                  <span className="file-size">
                    ({Math.round(selectedFile.size / 1024)} KB)
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-create"
              disabled={!fileTitle.trim() || !selectedFile}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
