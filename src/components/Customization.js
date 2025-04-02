import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Customization = () => {
  const navigate = useNavigate();

  // Define hardware options for each category.
  const hardwareOptions = {
    camera: [
      { id: 1, name: '12MP Camera', price: 50, description: 'High quality 12MP camera for stunning photos.' },
      { id: 2, name: '48MP Camera', price: 100, description: 'Ultra HD 48MP camera with excellent low-light performance.' },
      { id: 3, name: '108MP Camera', price: 150, description: 'Professional 108MP camera for advanced photography.' }
    ],
    processor: [
      { id: 1, name: 'Snapdragon 888', price: 200, description: 'High performance chipset for intensive tasks.' },
      { id: 2, name: 'Exynos 2100', price: 180, description: 'Efficient and powerful chipset for smooth performance.' },
      { id: 3, name: 'Dimensity 9400', price: 150, description: 'Cost-effective processor with reliable performance.' }
    ],
    display: [
      { id: 1, name: '6.1" OLED', price: 100, description: 'Vivid colors and deep blacks with an OLED panel.' },
      { id: 2, name: '6.7" AMOLED', price: 150, description: 'Larger AMOLED display with vibrant visuals.' },
      { id: 3, name: '6.2" LCD', price: 80, description: 'Energy-efficient LCD display with good viewing angles.' }
    ],
    ram: [
      { id: 1, name: '8GB RAM', price: 50, description: 'Standard memory configuration for everyday tasks.' },
      { id: 2, name: '12GB RAM', price: 80, description: 'Extra memory for heavy multitasking and gaming.' },
      { id: 3, name: '16GB RAM', price: 100, description: 'High-performance memory for intensive applications and gaming.' }
    ],
    rom: [
      { id: 1, name: '128GB Storage', price: 60, description: 'Ample storage space for apps, photos, and more.' },
      { id: 2, name: '256GB Storage', price: 100, description: 'Large storage capacity for extensive media and files.' },
      { id: 3, name: '512GB Storage', price: 150, description: 'Massive storage space for extensive media library and applications.' }
    ]
  };

  // Manage state for selected options; default selections provided.
  const [selectedOptions, setSelectedOptions] = useState({
    camera: hardwareOptions.camera[0],
    processor: hardwareOptions.processor[0],
    display: hardwareOptions.display[0],
    ram: hardwareOptions.ram[0],
    rom: hardwareOptions.rom[0]
  });

  // Manage hover state for an option (for hover effects).
  const [hoveredOption, setHoveredOption] = useState({ category: null, id: null });

  // Base price for the phone.
  const basePrice = 300;

  // Total price = base price + price of each selected option.
  const totalPrice = basePrice +
    selectedOptions.camera.price +
    selectedOptions.processor.price +
    selectedOptions.display.price +
    selectedOptions.ram.price +
    selectedOptions.rom.price;

  // Handler to update the selected option for a given category.
  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({ ...prev, [category]: option }));
  };

  // Save the design in localStorage and navigate to Cart page.
  const handleSaveDesign = () => {
    const phoneConfig = {
      camera: selectedOptions.camera,
      processor: selectedOptions.processor,
      display: selectedOptions.display,
      ram: selectedOptions.ram,
      rom: selectedOptions.rom,
      totalPrice
    };

    // Retrieve current cart from localStorage (or create a new array).
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(phoneConfig);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Navigate to the cart page to view the saved phone.
    navigate('/cart');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Price Counter at the top */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Total Price: ${totalPrice}</h2>
        <p style={{ color: '#666' }}>Customized Phone</p>
      </div>

      {/* Phone Image Display */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src="https://via.placeholder.com/300x600?text=Customized+Phone"
          alt="Customized Phone"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      {/* Horizontal Swipe Container for Hardware Options */}
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: '2rem' }}>
        {Object.keys(hardwareOptions).map(category => (
          <div
            key={category}
            style={{
              display: 'inline-block',
              marginRight: '2rem',
              verticalAlign: 'top',
              width: '200px'
            }}
          >
            <h3 style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>{category}</h3>
            {hardwareOptions[category].map(option => {
              // Check if this option is currently selected or hovered.
              const isSelected = selectedOptions[category].id === option.id;
              const isHovered =
                hoveredOption.category === category && hoveredOption.id === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(category, option)}
                  onMouseEnter={() => setHoveredOption({ category, id: option.id })}
                  onMouseLeave={() => setHoveredOption({ category: null, id: null })}
                  style={{
                    border: isSelected ? '2px solid #000' : '1px solid #ccc',
                    backgroundColor: isSelected ? '#f0f0f0' : '#fff',
                    padding: '1rem',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    cursor: 'pointer',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isHovered ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{option.name}</p>
                  <p style={{ color: '#666' }}>${option.price}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Detailed Description of Selected Options */}
      <div style={{ marginBottom: '2rem' }}>
        {Object.keys(selectedOptions).map(category => (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ textTransform: 'capitalize', fontWeight: '600', marginBottom: '0.25rem' }}>
              {category} Details:
            </h3>
            <p style={{ fontWeight: '600' }}>{selectedOptions[category].name}</p>
            <p style={{ color: '#666' }}>{selectedOptions[category].description}</p>
          </div>
        ))}
      </div>

      {/* Save Design and Add to Cart Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            transition: 'background-color 0.3s ease, transform 0.3s ease'
          }}
          onClick={handleSaveDesign}
          onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
        >
          Save Design and Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Customization;



