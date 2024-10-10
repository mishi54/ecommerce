import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import myImage from '../assets/jewelry.png';
import myImg from '../assets/clothes.png';
import axios from 'axios';

const categoriesData = [
    {
        image: myImg,
        name: "men's clothing"
    },
    {
        image: myImage,
        name: 'jewelery'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
        name: 'electronics'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
        name: "women's clothing"
    },
];

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
                const filteredCategories = categoriesData.filter(category => uniqueCategories.includes(category.name));
                setCategories(filteredCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryClick = async (categoryName) => {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        const products = response.data;
        navigate(`/category/${categoryName}`, { state: { products } }); 
    };

    if (loading) return <div className="text-4xl text-blue-800 text-center text-bold">Loading...</div>;

    return (
        <div>
            <div className="flex flex-col mt-5">
                <div className="flex overflow-x-scroll md:justify-center lg:justify-center hide-scroll-bar">
                    <div className="flex">
                        {categories.map((item, index) => (
                            <div key={index} className="px-3 lg:px-10">
                                <div 
                                    onClick={() => handleCategoryClick(item.name)} 
                                    className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-blue-600 transition-all hover:bg-silver-400 cursor-pointer mb-1"
                                >
                                    <div className="flex justify-center mb-12 rounded-md">
                                        <img src={item.image} alt={item.name} className="rounded-md" />
                                    </div>
                                </div>
                                <h1 className='text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase'>{item.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .hide-scroll-bar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
            ` }} />
        </div>
    );
};

export default Category;
