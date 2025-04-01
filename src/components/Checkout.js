import React from 'react';

const Checkout = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Express Checkout</h2>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        {/* Payment Options */}
        <div style={{ flex: 1 }}>
          <h3>Payment Method</h3>
          <div>
            <label>
              <input type="radio" name="payment" value="bank" /> Bank
            </label>
            <br />
            <label>
              <input type="radio" name="payment" value="card" /> Card
            </label>
          </div>
          <h3 style={{ marginTop: '1rem' }}>Customer Details</h3>
          <form>
            <input type="text" placeholder="First Name" style={{ display: 'block', margin: '0.5rem 0' }} />
            <input type="text" placeholder="Last Name" style={{ display: 'block', margin: '0.5rem 0' }} />
            <input type="email" placeholder="Email Address" style={{ display: 'block', margin: '0.5rem 0' }} />
            <button style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>Save & Continue</button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ flex: 1 }}>
          <h3>Android Phone</h3>
          <p>Price: £25.00</p>
          <input type="text" placeholder="Coupon code" style={{ marginBottom: '1rem', display: 'block' }} />
          <p>Subtotal: £25.00</p>
          <p>Total: £25.00</p>
          <div style={{ marginTop: '1rem' }}>
            <label>
              <input type="radio" name="shipping" value="fast" /> Fast Shipping
            </label>
            <br />
            <label>
              <input type="radio" name="shipping" value="local" /> Local Pickup
            </label>
            <br />
            <label>
              <input type="radio" name="shipping" value="free" /> Free Shipping
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

