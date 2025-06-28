const OutlineSidebar = ({ modules, onScrollTo }) => {
  return (
    <aside style={{
      width: '200px',
      padding: '1rem',
      borderRight: '1px solid #eee',
      backgroundColor: '#fafafa',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto'
    }}>
      <h4 style={{ marginBottom: '1rem' }}>Course Outline</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {modules.map((mod) => (
          <li key={mod.id} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => onScrollTo(mod.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0,
                fontSize: '0.95rem'
              }}
              aria-label={`Scroll to module ${mod.name}`}
              tabIndex={0}
            >
              {mod.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default OutlineSidebar;
