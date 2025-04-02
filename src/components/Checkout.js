import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
    accountNumber: ''
  });

  useEffect(() => {
    if (location.state?.selectedPhones) {
      setSelectedPhones(location.state.selectedPhones);
    } else {
      navigate('/cart');
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotal = () => {
    return selectedPhones.reduce((total, phone) => total + phone.totalPrice, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    
    localStorage.removeItem('cart');
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#666'
                }}>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#666'
                }}>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </>
        );

      case 'upi':
        return (
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#666'
            }}>UPI ID</label>
            <input
              type="text"
              name="upiId"
              placeholder="username@upi"
              value={formData.upiId}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <p style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.9rem', 
              color: '#666',
              fontStyle: 'italic'
            }}>
              Example: username@upi
            </p>
          </div>
        );

      case 'net_banking':
        return (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Bank Name</label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#fff'
                }}
              >
                <option value="">Select Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </>
        );

      case 'cod':
        return (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <p style={{ 
              margin: 0, 
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5'
            }}>
              Cash on Delivery is available for orders above $50. 
              You will be required to pay the full amount in cash when the order is delivered.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      position: 'relative'
    }}>
      {showThankYou && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 1000,
          textAlign: 'center',
          maxWidth: '400px',
          width: '90%'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            🎉
          </div>
          <h3 style={{
            fontSize: '1.8rem',
            color: '#2c3e50',
            marginBottom: '1rem'
          }}>
            Thank You!
          </h3>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            lineHeight: '1.5',
            marginBottom: '1.5rem'
          }}>
            Your order has been placed successfully. 
            We'll send you an email confirmation shortly.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <span style={{
              fontSize: '1.2rem',
              color: '#2c3e50',
              fontWeight: 'bold'
            }}>
              ${calculateTotal()}
            </span>
            <span style={{
              color: '#666',
              fontSize: '1.1rem'
            }}>
              has been charged
            </span>
          </div>
        </div>
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: showThankYou ? 999 : -1,
        transition: 'all 0.3s ease'
      }} />

      <h2 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '2rem',
        color: '#2c3e50'
      }}>Checkout</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        {/* Order Summary */}
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#2c3e50',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '0.5rem'
          }}>Order Summary</h3>

          {selectedPhones.map((phone, index) => (
            <div key={index} style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: '#666' }}>📱</span>
                </div>
                <div>
                  <h4 style={{ margin: 0, color: '#2c3e50' }}>Custom Phone</h4>
                  <p style={{ margin: 0, color: '#666' }}>${phone.totalPrice}</p>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                <p style={{ margin: 0 }}>📸 {phone.camera.name}</p>
                <p style={{ margin: 0 }}>🔧 {phone.processor.name}</p>
                <p style={{ margin: 0 }}>📱 {phone.display.name}</p>
                <p style={{ margin: 0 }}>💾 {phone.ram.name}</p>
                <p style={{ margin: 0, gridColumn: '1 / -1' }}>💽 {phone.rom.name}</p>
              </div>
            </div>
          ))}

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#000000',
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
            }}>Total Amount</span>
            <span style={{ 
              fontSize: '1.4rem',
              fontWeight: 'bold'
            }}>${calculateTotal()}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#2c3e50',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '0.5rem'
          }}>Payment Details</h3>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#666'
                }}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#666'
                }}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Shipping Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#666'
                }}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#666'
                }}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#666'
                }}>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#fff'
                }}
              >
                <option value="credit_card">Credit Card</option>
                <option value="upi">UPI</option>
                <option value="net_banking">Net Banking</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            {renderPaymentForm()}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#000000',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = '#333333';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = '#000000';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



