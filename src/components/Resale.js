import React from 'react';

const Resale = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload Invoice Detail</h2>
      <div style={{ marginTop: '1rem', border: '2px dashed #ccc', padding: '2rem' }}>
        <p>Drag & Drop Invoice Here or Click to Upload</p>
      </div>
      <h3 style={{ marginTop: '2rem' }}>Pending Request</h3>
      <div style={{
        height: '100px',
        backgroundColor: '#eee',
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p>List of devices awaiting approval</p>
      </div>
    </div>
  );
};

export default Resale;

