import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

const ProfilePage = () =>{
    const [products, setProducts] = useState([]);


    const getData  = async () => {
        try{
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                method: "GET",
            });
            const result = await resp.json();
            console.log("Result ---> ",result);
            setProducts(result.data.products);
        } catch (err) {
            console.warn("Error while getting products ---> ", err.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (elem) => {
        try{
            elem.preventDefault();
            const title = elem.target.title.value;
            const price = elem.target.price.value;
            const description = elem.target.description.value;
            const quantity = elem.target.quantity.value;
            const rating = elem.target.rating.value;

            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                method: "POST",
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    quantity,
                    rating,
                }),
                headers: {
                    "content-type" : "application/json",
                },
            });
            if(resp.status =='201'){
                alert("Product Added!");
                getData();
                console.log(resp);
            }
            else{
                const result = await resp.json();
                alert(`Invalid Data: ${result.message}`);
            }
        } catch (err) {
            console.warn("Cannot create product ---> ", err.message);
            alert(`Cannot createproduct: ${err.message}`);
        }
        
    }

    return(
        <div>
            <Navbar />
            <div>
                <form onSubmit={handleSubmit} className="mx-auto my-10 flex flex-col gap-6 p-8 bg-white shadow-md border rounded-2xl max-w-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Product</h2>
                    <div className = "flex flex-col gap-1">
                        <label>Title:</label>
                        <input name="title" type="text" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <label className="text-sm text-gray-700">Price:</label>
                        <input name="price" type="number" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <label className="text-sm text-gray-700">Description:</label>
                        <input name="description" type="text" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <label className="text-sm text-gray-700">Quantity:</label>
                        <input name="quantity" type="number" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <label className="text-sm text-gray-700">Rating:</label>
                        <input name="rating" type="float" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">Add Product</button>
                </form>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100">{products.map((elem) => {
                        return(
                            <div key={elem.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Product name: {elem.title}</h3>
                                <p className="text-sm text-gray-600 mb-1">Price: <span className="font-medium text-gray-900">${elem.price}</span></p>
                                <p className="text-sm text-gray-600 mb-1">Quantity: <span className="text-gray-900">{elem.quantity}</span></p>
                                <p className="text-sm text-gray-600 mb-1">Description: <span className="text-gray-900">{elem.description}</span></p>
                                <p className="text-sm text-gray-600">Rating: <span className="text-yellow-600 font-medium">{elem.rating}</span></p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export { ProfilePage };