import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleItemClick = (index) => {
    setSelectedItems(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSelectedItems(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(index);
     
      const updatedSelected = new Set();
      newSelected.forEach(selectedIndex => {
        if (selectedIndex < index) {
          updatedSelected.add(selectedIndex);
        } else if (selectedIndex > index) {
          updatedSelected.add(selectedIndex - 1);
        }
      });
      return updatedSelected;
    });
    setOpenMenuIndex(null);
  };

  const handleEdit = (index) => {
    navigate('/customize', { state: { editingItem: cartItems[index] } });
    setOpenMenuIndex(null);
  };

  const handlePayment = () => {
    if (selectedItems.size === 0) {
      alert('Please select at least one item for checkout.');
      return;
    }
    const selectedPhones = Array.from(selectedItems).map(index => cartItems[index]);
    navigate('/checkout', { state: { selectedPhones } });
  };

  const handleClearCart = () => {
    setCartItems([]);
    setSelectedItems(new Set());
    localStorage.removeItem('cart');
  };

  const calculateTotalPrice = () => {
    return Array.from(selectedItems).reduce((total, index) => {
      return total + cartItems[index].totalPrice;
    }, 0);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((_, index) => index)));
    }
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          margin: 0
        }}>YOUR CART</h2>
        {cartItems.length > 0 && (
          <button
            onClick={handleSelectAll}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: '#666',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#f5f5f5';
              e.target.style.borderColor = '#666';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#fff';
              e.target.style.borderColor = '#e0e0e0';
            }}
          >
            {selectedItems.size === cartItems.length ? 'Unselect All' : 'Select All'}
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <p>No shipment to track, place order to track your shipment.....</p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(index)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  width: '100%',
                  maxWidth: '800px',
                  margin: '0 auto',
                  gap: '2rem',
                  border: selectedItems.has(index) ? '2px solid #2c3e50' : '1px solid #e0e0e0',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '250px',
                  height: '250px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  backgroundColor: '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '1.1rem'
                  }}>
                    Picture of<br />the phone
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(index);
                    }}
                  >
                    <span style={{ transform: 'rotate(90deg)', display: 'inline-block' }}>⋮</span>
                  </div>
                  {openMenuIndex === index && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        zIndex: 10,
                        width: '120px'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: 'none',
                          borderBottom: '1px solid #eee',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(index);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          color: '#ff4444'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  padding: '1rem',
                  borderRadius: '10px'
                }}>
                  <h3 style={{
                    margin: '0 0 1rem 0',
                    color: '#2c3e50',
                    fontSize: '1.4rem',
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '0.5rem'
                  }}>Hardware Specifications</h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ margin: 0, color: '#666' }}>
                      <strong style={{ color: '#2c3e50', minWidth: '100px', display: 'inline-block' }}>📸 Camera:</strong> 
                      {item.camera.name}
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>
                      <strong style={{ color: '#2c3e50', minWidth: '100px', display: 'inline-block' }}>🔧 Processor:</strong> 
                      {item.processor.name}
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>
                      <strong style={{ color: '#2c3e50', minWidth: '100px', display: 'inline-block' }}>📱 Display:</strong> 
                      {item.display.name}
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>
                      <strong style={{ color: '#2c3e50', minWidth: '100px', display: 'inline-block' }}>💾 RAM:</strong> 
                      {item.ram.name}
                    </p>
                    <p style={{ margin: 0, color: '#666', gridColumn: '1 / -1' }}>
                      <strong style={{ color: '#2c3e50', minWidth: '100px', display: 'inline-block' }}>💽 Storage:</strong> 
                      {item.rom.name}
                    </p>
                  </div>

                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#2c3e50',
                    color: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '1.1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Total Price</span>
                    <span style={{ 
                      fontSize: '1.4rem',
                      fontWeight: 'bold'
                    }}>${item.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            padding: '1rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button
              onClick={handleClearCart}
              style={{
                padding: '0.8rem 2rem',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#666',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.borderColor = '#666';
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={handlePayment}
              style={{
                padding: '0.8rem 2rem',
                backgroundColor: selectedItems.size > 0 ? '#2c3e50' : '#95a5a6',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: selectedItems.size > 0 ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                opacity: selectedItems.size > 0 ? 1 : 0.7
              }}
              onMouseEnter={e => {
                if (selectedItems.size > 0) {
                  e.target.style.backgroundColor = '#34495e';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={e => {
                if (selectedItems.size > 0) {
                  e.target.style.backgroundColor = '#2c3e50';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {selectedItems.size > 0
                ? `Proceed to Checkout ($${calculateTotalPrice()})`
                : 'Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

