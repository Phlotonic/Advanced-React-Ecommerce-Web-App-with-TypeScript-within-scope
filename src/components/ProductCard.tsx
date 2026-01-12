import { Product } from '../types/product';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

// Product card styles
const cardStyles = {
  card: {
    background: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '12px',
    padding: '20px',
    margin: '15px 0',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  
  header: {
    borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
    paddingBottom: '15px',
    marginBottom: '15px'
  },
  
  title: {
    color: '#ffd700',
    fontSize: 'clamp(18px, 4vw, 24px)',
    fontWeight: '700',
    margin: '0 0 10px 0',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '1px',
    textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
  },
  
  image: {
    width: '100%',
    maxWidth: '300px',
    height: '200px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    marginBottom: '15px'
  },
  
  info: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginBottom: '15px'
  },
  
  infoItem: {
    color: 'rgba(255, 215, 0, 0.8)',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    fontFamily: 'monospace, "Courier New"',
    letterSpacing: '0.5px'
  },
  
  price: {
    color: '#ffd700',
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    fontFamily: 'monospace, "Courier New"',
    textShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
  },
  
  description: {
    color: 'rgba(255, 215, 0, 0.9)',
    fontSize: 'clamp(13px, 3vw, 15px)',
    lineHeight: '1.6',
    marginBottom: '20px',
    fontFamily: 'monospace, "Courier New"'
  },
  
  button: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
    border: '2px solid rgba(255, 215, 0, 0.5)',
    borderRadius: '8px',
    color: '#ffd700',
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    fontFamily: 'monospace, "Courier New"',
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
  },
  
  ratingStars: {
    color: '#ffd700',
    fontSize: '16px'
  }
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push('☆');
    }
    
    return stars.join('');
  };
  
  return (
    <>
      <style>
        {`
          .product-card:hover {
            border-color: rgba(255, 215, 0, 0.6) !important;
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
          }
          
          .add-to-cart-btn:hover {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1)) !important;
            border-color: rgba(255, 215, 0, 0.8) !important;
            transform: translateY(-2px);
            box-shadow: 0 0 25px rgba(255, 215, 0, 0.4) !important;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
          }
        `}
      </style>
      <article style={cardStyles.card} className="product-card">
        <div style={cardStyles.header}>
          <h2 style={cardStyles.title}>{product.title}</h2>
          <img 
            src={product.image} 
            alt={product.title} 
            style={cardStyles.image}
          />
        </div>
        
        <div style={cardStyles.info}>
          <div style={cardStyles.infoItem}>
            <strong>Category:</strong> {product.category}
          </div>
          {product.rating && product.rating.rate && (
            <div style={cardStyles.infoItem}>
              <strong>Rating:</strong> 
              <span style={cardStyles.ratingStars}> {renderStars(product.rating.rate)}</span>
              <span> ({product.rating.count || 0} reviews)</span>
            </div>
          )}
        </div>
        
        <div style={cardStyles.price}>
          ${product.price.toFixed(2)}
        </div>
        
        <p style={cardStyles.description}>
          {product.description}
        </p>
        
        <button 
          onClick={handleAddToCart}
          style={cardStyles.button}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </article>
    </>
  );
};

export default ProductCard;