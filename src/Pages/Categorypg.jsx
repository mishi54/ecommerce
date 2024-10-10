import { useLocation } from "react-router-dom";
import ProductCard from '../components/ProductCard'

const CategoryProducts = () => {
    const location = useLocation();
    const { products } = location.state || { products: [] };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.length > 0 ? (
                products.map(product => <ProductCard key={product.id} product={product} />)
            ) : (
                <div>No products found in this category.</div>
            )}
        </div>
    );
};

export default CategoryProducts;
