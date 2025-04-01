import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  // Selected index for order placement (via double-click)
  const [selectedIndex, setSelectedIndex] = useState(null);
  // Which card's 3-dot menu is open (store index, or null if none)
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // Handle double-click on card: mark as selected (place order) and highlight green.
  const handleDoubleClick = (index) => {
    setSelectedIndex(index);
  };

  // Handle three-dot menu toggle.
  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Handle deletion of an item.
  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Reset selection if needed.
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else if (selectedIndex > index) {
      setSelectedIndex(selectedIndex - 1);
    }
    setOpenMenuIndex(null);
  };

  // Handle edit: navigate to Customization page with the selected item for editing.
  const handleEdit = (index) => {
    navigate('/customize', { state: { editingItem: cartItems[index] } });
    setOpenMenuIndex(null);
  };

  // Handle Payment: navigate to Checkout with the selected phone configuration.
  const handlePayment = () => {
    if (selectedIndex === null) {
      alert('Please double-click an item to select it for payment.');
      return;
    }
    navigate('/checkout', { state: { selectedPhone: cartItems[selectedIndex] } });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              onDoubleClick={() => handleDoubleClick(index)}
              style={{
                position: 'relative',
                border: selectedIndex === index ? '2px solid green' : '1px solid #ccc',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1rem',
                cursor: 'pointer',
                backgroundColor: selectedIndex === index ? '#e0ffe0' : '#fff',
                transition: 'background-color 0.3s ease, border 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Customized Phone</h3>
                <div>
                  <span
                    style={{
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(index);
                    }}
                  >
                    ⋮
                  </span>
                  {openMenuIndex === index && (
                    <div
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '30px',
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        zIndex: 10
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        style={{
                          display: 'block',
                          padding: '0.5rem 1rem',
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          display: 'block',
                          padding: '0.5rem 1rem',
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p>
                <strong>Camera:</strong> {item.camera.name}
              </p>
              <p>
                <strong>Processor:</strong> {item.processor.name}
              </p>
              <p>
                <strong>Display:</strong> {item.display.name}
              </p>
              <p>
                <strong>RAM:</strong> {item.ram.name}
              </p>
              <p>
                <strong>ROM:</strong> {item.rom.name}
              </p>
              <p>
                <strong>Total Price:</strong> ${item.totalPrice}
              </p>
            </div>
          ))}
          {/* Payment Button with Total Amount of Selected Item */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#28a745', // green color
                color: '#fff',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                transition: 'background-color 0.3s ease, transform 0.3s ease'
              }}
              onClick={handlePayment}
              onDoubleClick={handlePayment} // allow double-click also
              onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
            >
              {selectedIndex !== null
                ? `Pay $${cartItems[selectedIndex].totalPrice}`
                : 'Select a phone & Pay'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

