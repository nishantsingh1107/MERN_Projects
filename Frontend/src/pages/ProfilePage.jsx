import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useMyContext } from "../context/MyContext";

const ProfilePage = () =>{
    const {setCount} = useMyContext();
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState(-1);

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
        
    };

    const handleEditProduct = async (productId) =>{
        try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    price: updatedPrice,
                }),
                headers:{
                    "content-type":"application/json"
                },
            });
            if(res.status === 200){
                alert("product Updated");
                setEditProductId("");
                getData();
            }
            else{
                const result = await res.json();
                alert(`Error while updating product: ${result.message}`); 
            }
        } catch (err) {
            alert(`cannot update product: ${err.message}`);
            console.log("cannot update product: ", err.message);
        }
        
    };

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
                        <input name="rating" type="number" step="0.1" min="0" max="5" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">Add Product</button>
                </form>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100">{products.map((elem) => {
                        return(
                            <div key={elem._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Product name: {elem.title}</h3>
                                {/* <p className="text-sm text-gray-600 mb-1">Price: <span className="font-medium text-gray-900">${elem.price}</span></p> */}
                                <p className="text-sm text-gray-600 mb-1">Quantity: <span className="text-gray-900">{elem.quantity}</span></p>
                                <p className="text-sm text-gray-600 mb-1">Description: <span className="text-gray-900">{elem.description}</span></p>
                                <p className="text-sm text-gray-600">Rating: <span className="text-yellow-600 font-medium">{elem.rating}</span></p>
                                {elem._id === editProductId ? (
                                    <div>
                                        <input value={updatedPrice} onChange={(elem) =>{
                                            setUpdatedPrice(elem.target.value);
                                        }} className="py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200" onClick={() => {
                                            setEditProductId("");
                                        }}>Cancel</button>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200" onClick={() => {
                                            handleEditProduct(elem._id)
                                        }}>Update</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Price: <span className="font-medium text-gray-900">${elem.price}</span></p>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200" onClick={() =>{
                                            setEditProductId(elem._id)
                                            setUpdatedPrice(elem.price);
                                        }}>Edit</button>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200" onClick={() =>{
                                            setCount((prev) => prev + 1);
                                        }}>Add to Cart</button>
                                    </div>
                                )}
                                
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export { ProfilePage };