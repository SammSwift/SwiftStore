import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import DynamicRating from "../components/DynamicRating";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const addToCartHandler = () => {
    // dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <Card className="max-w-xs" imgAlt={product.name} imgSrc={product.image}>
      <Link to={`/products/${product._id}`}>
        <h5 className="text-xl truncate font-semibold tracking-tight text-gray-900">
          {product.name}
        </h5>
      </Link>
      <div className="flex items-center">
        <DynamicRating numberOfStars={product.rating} showText={false} />
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {product.rating}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ${product.price}
        </span>
        <Button
          size="sm"
          color="light"
          // gradientDuoTone="cyanToBlue"
          disabled={product.countInStock === 0}
          onClick={addToCartHandler}
        >
          <HiShoppingCart className="mr-1 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
