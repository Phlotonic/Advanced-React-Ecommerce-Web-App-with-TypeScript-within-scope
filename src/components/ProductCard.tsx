import { Product } from '../types/product'; // Assuming you have product.ts
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product; // The prop is named 'product' and its type is 'Product'
}

const ProductCard = ({ product }: ProductCardProps) => { // Destructuring 'product' from props
  const dispatch = useDispatch(); // Get the dispatch function from the hook

    const handleAddToCart = () => {
      // Call the addItem action creator with the product,
      // and then pass the resulting action object to dispatch:
      dispatch(addItem(product));            
        };
  
    return (          
          // Use product.id as the unique key for each element in the list:
          <article>
            {/* We use the 'product' object's properties to display the details */}
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} width="100" /> {/* Basic image display */}
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p> {/* Format price */}
            <p>Rating: {product.rating.rate}/5 ({product.rating.count} reviews)</p>
            <p>Description: {product.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </article>
    );
};

export default ProductCard;