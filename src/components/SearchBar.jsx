import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter search data
    const filterSearchData = products
        .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 8);

    return (
        <div>
            <div className="input flex justify-center">
                <input
                    type="text"
                    placeholder="Search here"
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black"
                />
            </div>
            <div className="flex justify-center">
                {search && (
                    <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
                        {loading ? (
                            <div className="flex justify-center">
                                <span>Loading...</span>
                            </div>
                        ) : filterSearchData.length > 0 ? (
                            <>
                                {filterSearchData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="py-2 px-2 cursor-pointer"
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                className="w-10"
                                                src={item.image}
                                                alt={item.title}
                                            />
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="flex justify-center">
                                <img
                                    className="w-20"
                                    src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                                    alt="No results"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
