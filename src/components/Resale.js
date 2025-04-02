import React, { useState, useEffect } from 'react';

const Resale = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    
    const savedRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    setPendingRequests(savedRequests);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }

    
    const newRequest = {
      id: Date.now(),
      fileName: file.name,
      uploadDate: new Date().toLocaleDateString(),
      status: 'Pending',
      deviceDetails: {
        model: 'Custom Phone',
        specs: 'To be determined',
        condition: 'New'
      }
    };

    
    const updatedRequests = [...pendingRequests, newRequest];
    setPendingRequests(updatedRequests);
    localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));

    setFile(null);
    setUploadStatus('Invoice uploaded successfully!');
  };

  const handleDeleteRequest = (id) => {
    const updatedRequests = pendingRequests.filter(request => request.id !== id);
    setPendingRequests(updatedRequests);
    localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
  };

  return (
    <div style={{ padding: '2rem', minHeight: 'calc(100vh - 200px)', position: 'relative' }}>
      <h2 style={{ marginBottom: '2rem', color: '#333' }}>Upload Invoice Detail</h2>
      
      {/* Upload Section */}
      <div 
        style={{ 
          border: `2px dashed ${dragActive ? '#000' : '#ccc'}`,
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: dragActive ? '#f8f8f8' : '#fff',
          borderRadius: '10px',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          {file ? file.name : 'Drag & Drop Invoice Here or Click to Upload'}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#999' }}>
          Supported formats: PDF, JPG, JPEG, PNG
        </p>
      </div>

      {uploadStatus && (
        <p style={{ 
          marginTop: '1rem', 
          color: uploadStatus.includes('successfully') ? '#28a745' : '#dc3545',
          textAlign: 'center'
        }}>
          {uploadStatus}
        </p>
      )}

      <button
        onClick={handleUpload}
        style={{
          marginTop: '1rem',
          padding: '0.8rem 2rem',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => {
          e.target.style.backgroundColor = '#333';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = '#000';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Upload Invoice
      </button>

      {/* Pending Requests Section */}
      <h3 style={{ marginTop: '3rem', marginBottom: '1rem', color: '#333' }}>Pending Requests</h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {pendingRequests.length === 0 ? (
          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '10px',
            color: '#666'
          }}>
            No pending requests
          </div>
        ) : (
          pendingRequests.map(request => (
            <div
              key={request.id}
              style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>{request.fileName}</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Uploaded on: {request.uploadDate}
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Status: <span style={{ color: '#ffa500' }}>{request.status}</span>
                </p>
              </div>
              <button
                onClick={() => handleDeleteRequest(request.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ff4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = '#cc0000';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = '#ff4444';
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Resale;

