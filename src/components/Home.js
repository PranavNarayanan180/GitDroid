import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = [
    {
      id: 1,
      name: 'Snapdragon V2',
      price: 350,
      rating: 4.6,
      image: 'https://via.placeholder.com/200x200?text=Snapdragon+V2'
    },
    {
      id: 2,
      name: 'Gaming Phone',
      price: 450,
      rating: 4.7,
      image: 'https://via.placeholder.com/200x200?text=Gaming+Phone'
    },
    {
      id: 3,
      name: 'SmartCAM phone',
      price: 300,
      rating: 4.5,
      image: 'https://via.placeholder.com/200x200?text=SmartCAM+Phone'
    },
    {
      id: 4,
      name: 'Business Phone',
      price: 220,
      rating: 4.3,
      image: 'https://via.placeholder.com/200x200?text=Business+Phone'
    }
  ];

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div>
          <h1>CUSTOMIZE PHONE THAT MATCHES YOUR STYLE</h1>
          <p>
            200+ Community Members | 20,000+ High-Quality Products | 30,000+ Happy Customers
          </p>
          <Link to="/customize">
            <button className="cta-button">Customize Now</button>
          </Link>
        </div>
      </section>

      {/* Wave Container with Divider and Overlapping Stats */}
      <div className="wave-container">
        <div className="hero-divider">
          <svg viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5f5f5" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              fillOpacity="1"
              d="M0,96L30,90.7C60,85,120,75,180,96C240,117,300,171,360,186.7C420,203,480,181,540,170.7C600,160,660,160,720,176C780,192,840,224,900,224C960,224,1020,192,1080,192C1140,192,1200,224,1260,218.7C1320,213,1380,171,1410,149.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            />
          </svg>
        </div>
        <div className="stats-row">
          <div className="stats-item">
            <h3>200+</h3>
            <p>Community Members</p>
          </div>
          <div className="stats-item">
            <h3>2,000+</h3>
            <p>High-Quality Products</p>
          </div>
          <div className="stats-item">
            <h3>30,000+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>Rating: {product.rating}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;

