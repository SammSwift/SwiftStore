import { Button, ListGroup, Textarea, Avatar } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import DynamicRating from "../components/DynamicRating";
import { Select } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailQuery,
  useCreateProductReviewMutation,
} from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Progress } from "flowbite-react";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  const [createReview, { isLoading: LoadingProductReview }] =
    useCreateProductReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
    toast.success(`${product.name} added to cart!`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Assuming product.reviews is an array of review objects, each having a 'rating' property.

  const calculatePercentageRating = (reviews) => {
    const ratingCounts = {};
    const totalReviews = reviews.length;

    // Count occurrences of each rating
    reviews.forEach((review) => {
      const rating = review.rating;
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    // Calculate percentage for each rating
    const percentageRatings = [];
    for (let rating in ratingCounts) {
      const count = ratingCounts[rating];
      const percentage = ((count / totalReviews) * 100).toFixed(2);
      percentageRatings.push({ rating, percentage });
    }
    // Sort ratings in descending order
    percentageRatings.sort((a, b) => b.rating - a.rating);
    return percentageRatings;
  };

  return (
    <>
      {isLoading || error ? (
        <>
          {isLoading && <Loader msg="Retrieving product  details..." />}
          {error && <Message color="failure">{error.data.message}</Message>}
        </>
      ) : (
        <>
          <div className="md:flex gap-10 justify-center mt-10">
            <div>
              <img
                className="max-w-sm md:max-w-xl rounded-md"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div>
              <ListGroup className="max-w-sm mt-5 md:max-w-md border-none">
                <ListGroup.Item className="font-serif font-normal md:text-xl">
                  {product.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="text-left">
                    <span className="text-lg font-bold">${product.price}</span>
                    <p>
                      <DynamicRating numberOfStars={product.rating} />
                      {product.numReviews} review(s)
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className="text-left">
                    <span className="text-lg font-bold">Description: </span>
                    <span className="font-normal">{product.description}</span>
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="text-left">
                    <span className="font-bold">Brand: </span>
                    <span className="font-normal"> {product.brand}</span>
                    <p>
                      <span className="font-bold">Category: </span>
                      <span className="font-normal"> {product.category}</span>
                    </p>
                    <strong className="font-bold text-cyan-500">
                      In Stock:
                    </strong>
                    <span className="ml-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                      {product.countInStock}
                    </span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity:
                  <div className="ml-2 max-w-sm ">
                    <Select
                      required
                      onChange={(e) => setQty(e.target.value)}
                      value={qty}
                    >
                      {Array.from(
                        { length: product.countInStock },
                        (_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        )
                      )}
                    </Select>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="flex gap-5">
                    <Button
                      gradientDuoTone="tealToLime"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      <HiShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Link to="/">
                      <Button color="light">
                        <FaArrowLeft className="mr-2 h-5 w-5" /> Go Back
                      </Button>
                    </Link>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <div className="grid grid-cols-3 px-20 gap-20 mt-10">
            <div className="col-span-1">
              <h2 className="font-bold text-lg mb-3">Customer Reviews</h2>
              <div className="flex mb-3">
                <DynamicRating
                  numberOfStars={product.rating}
                  showText={false}
                />

                <p className="tracking-tight">
                  <span className="font-bold">{product.rating} </span>rating
                  based on{" "}
                  <span className="font-bold">{product.numReviews} </span>
                  reivew(s)
                </p>
              </div>
              {
                // Loop through and display ratings and percentages
                calculatePercentageRating(product.reviews).map(
                  ({ rating, percentage }) => (
                    <Progress
                      className="mb-3"
                      key={rating}
                      progress={parseFloat(percentage)}
                      size="lg"
                      labelProgress
                      labelText
                      textLabelPosition="outside"
                      textLabel={`${rating} ⭐`}
                      color="yellow"
                    />
                  )
                )
              }

              {userInfo ? (
                <div className="">
                  <h2 className="mt-6 font-bold text-lg text-gray-700">
                    Share your thoughts
                  </h2>
                  <p className="text-gray-500 tracking-tight mb-3">
                    If you’ve used this product, share your thoughts with other
                    customers
                  </p>
                  <form onSubmit={submitHandler} className="space-y-3">
                    <Select
                      onChange={(e) => setRating(Number(e.target.value))}
                      value={rating}
                    >
                      <option value="">Select a Rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Select>
                    <Textarea
                      id="description"
                      placeholder="Leave a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                    />
                    <Button
                      type="submit"
                      gradientDuoTone="tealToLime"
                      onClick={() =>
                        toast("Submitting Review...", {
                          position: toast.POSITION.TOP_CENTER,
                        })
                      }
                      isProcessing={LoadingProductReview}
                    >
                      Submit Review
                    </Button>
                  </form>
                </div>
              ) : (
                <Message>Please login to submit a review</Message>
              )}
            </div>
            <div className="col-span-2 ">
              <h2 className="font-normal text-lg mb-3"> Recent Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup className="border-none">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <div className="space-y-5">
                      <div className="flex items-center">
                        <Avatar
                          alt="profile image"
                          className="mr-3"
                          img={review.profileImage}
                          rounded
                        />
                        {console.log(review.user)}
                        <div className="flex flex-col">
                          <span className="font-bold text-lg text-start ml-1">
                            {review.name}
                          </span>

                          <DynamicRating
                            numberOfStars={review.rating}
                            showText={false}
                          />
                          <p className="text-start ml-1 font-normal tracking-tight">
                            Reviewed on {review.createdAt.substring(0, 10)}
                          </p>
                        </div>
                      </div>
                      <p className="text-start italic text-gray-600 text-lg font-normal py-5">
                        {review.comment}
                      </p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
