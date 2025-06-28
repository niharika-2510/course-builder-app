import { useState } from 'react';

import EmptyState from '../ui/EmptyState';
import Header from '../ui/Header';
import OutlineSidebar from '../ui/OutlineSidebar';

import LinkModal from './LinkModal';
import ModuleCard from './ModuleCard';
import ModuleModal from './ModuleModal';
import UploadModal from './UploadModal';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [currentModule, setCurrentModule] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);

  const handleAddClick = (type) => {
    if (type === 'module') {
      setCurrentModule(null);
      setIsModuleModalOpen(true);
    } else if (type === 'link') {
      setCurrentModuleId(null);
      setIsLinkModalOpen(true);
    } else if (type === 'file') {
      setCurrentModuleId(null);
      setIsUploadModalOpen(true);
    }
  };

  const handleCloseModuleModal = () => {
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleCloseLinkModal = () => {
    setIsLinkModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleSaveModule = (module) => {
    if (currentModule) {
      setModules(modules.map((m) => (m.id === module.id ? module : m)));
    } else {
      setModules([...modules, module]);
    }
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleEditModule = (module) => {
    setCurrentModule(module);
    setIsModuleModalOpen(true);
  };

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter((m) => m.id !== moduleId));
    setItems(items.filter((item) => item.moduleId !== moduleId));
  };

  const handleAddItem = (moduleId, type) => {
    setCurrentModuleId(moduleId);
    if (type === 'link') setIsLinkModalOpen(true);
    else if (type === 'file') setIsUploadModalOpen(true);
  };

  const handleSaveLink = (linkItem) => {
    setItems([...items, linkItem]);
    setIsLinkModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleSaveUpload = (fileItem) => {
    setItems([...items, fileItem]);
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // 🔍 Search and filter
  const filteredModules = modules
    .map((module) => {
      const moduleItems = items.filter((item) => item.moduleId === module.id);
      const moduleMatches = module.name.toLowerCase().includes(searchQuery);
      const matchedItems = moduleItems.filter((item) =>
        (item.title || item.fileName).toLowerCase().includes(searchQuery)
      );
      if (moduleMatches || matchedItems.length > 0) {
        return {
          ...module,
          filteredItems: moduleMatches ? moduleItems : matchedItems,
        };
      }
      return null;
    })
    .filter(Boolean);

  // 🌐 Global resources not linked to any module
  const unassignedItems = items.filter((item) => item.moduleId === null);

  return (
    <div className="course-builder">
      <Header
        onAddClick={handleAddClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div style={{ display: 'flex' }}>
        <OutlineSidebar
          modules={filteredModules}
          onScrollTo={(id) => {
            const el = document.getElementById(`module-${id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <div className="builder-content" style={{ flex: 1, padding: '1rem' }}>
          {modules.length === 0 && unassignedItems.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* 🌐 General Resources Section */}
              {unassignedItems.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>General Resources</h3>
                  {unassignedItems.map((item) => (
                    <div
                      key={item.id}
                      className="resource-item"
                      style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '8px',
                        backgroundColor: '#fafafa',
                      }}
                    >
                      {item.type === 'link' ? (
                        <>
                          🔗 <strong>{item.title}</strong> —{' '}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.url}
                          </a>
                        </>
                      ) : (
                        <>
                          📄 <strong>{item.title}</strong> —{' '}
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.fileName}
                          </a>{' '}
                          ({Math.round(item.fileSize / 1024)} KB)
                        </>
                      )}
                      <button
                        style={{
                          marginLeft: '10px',
                          color: 'red',
                          border: 'none',
                          background: 'none',
                        }}
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 📚 Module List Section */}
              <div className="module-list">
                {filteredModules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    items={module.filteredItems}
                    onEdit={handleEditModule}
                    onDelete={handleDeleteModule}
                    onAddItem={handleAddItem}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🔧 Modals */}
      <ModuleModal
        isOpen={isModuleModalOpen}
        onClose={handleCloseModuleModal}
        onSave={handleSaveModule}
        module={currentModule}
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={handleCloseLinkModal}
        onSave={handleSaveLink}
        moduleId={currentModuleId}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSave={handleSaveUpload}
        moduleId={currentModuleId}
      />
    </div>
  );
};

export default CourseBuilder;
