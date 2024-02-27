import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import Message from "./Message";
import Loader from "./Loader";

const ImageCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader msg="Getting top products..." />
  ) : error ? (
    <Message color="failure">{error}</Message>
  ) : (
    <div className="mx-20 mb-8 bg-gray-600 sm:h-60 xl:h-80 rounded-md">
      <Carousel pauseOnHover>
        {products.map((product) => (
          <Link to={`/products/${product._id}`}>
            <img
              className="h-auto mx-auto max-w-lg"
              src={product.image}
              alt={product.name}
            />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
