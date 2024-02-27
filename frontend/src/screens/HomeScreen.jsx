import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { FaMobile, FaListUl, FaTv, FaToolbox, FaXbox } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { IoIosLaptop } from "react-icons/io";
import { BsSmartwatch } from "react-icons/bs";
import Paginate from "../components/Paginate";
import ImageCarousel from "../components/ImageCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const [category, setCategory] = useState("");

  const filteredProducts =
    category && category !== "All" && data
      ? data.products.filter((product) => product.category === category)
      : data?.products || [];

  const handleFilterByCategory = (category) => {
    setCategory(category);
  };

  return (
    <>
      {isLoading || error ? (
        <>
          {isLoading && <Loader msg={"Retreiving Products..."} />}
          {error && <Message>{error.error}</Message>}
        </>
      ) : (
        <>
          <div>
            <div class="flex py-4 justify-around">
              <button
                onClick={() => handleFilterByCategory("All")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <FaListUl className="mr-1" />
                All
              </button>

              <button
                onClick={() => handleFilterByCategory("Phone")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <FaMobile className="mr-1" />
                Phones
              </button>

              <button
                onClick={() => handleFilterByCategory("Laptop")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <IoIosLaptop className="h-5 w-5" /> Laptops
              </button>
              <button
                onClick={() => handleFilterByCategory("Tv")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <FaTv className="h-5 w-5 mr-1" /> TV
              </button>
              <button
                onClick={() => handleFilterByCategory("Electronic")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <FaToolbox className="h-5 w-5 mr-1" /> Electronics
              </button>
              <button
                onClick={() => handleFilterByCategory("Gaming")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <FaXbox className="mr-1" /> Gaming
              </button>
              <button
                onClick={() => handleFilterByCategory("Watch")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <BsSmartwatch className="mr-1" /> Watch
              </button>
              <button
                onClick={() => handleFilterByCategory("Accessory")}
                type="button"
                className="flex items-center text-gray-600 border border-white hover:border-gray-200  focus:ring-1 focus:outline-none focus:ring-gray-600 rounded-full  font-normal px-4 py-1 text-center me-3 mb-3"
              >
                <FaPix className="mr-1" /> Accessories
              </button>
            </div>
          </div>

          <ImageCarousel />

          <div className="mx-3">
            <div className="grid mx-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <Paginate
              page={data.page}
              pages={data.pages}
              isAdmin={false}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
