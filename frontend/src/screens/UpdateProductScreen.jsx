import { Button, TextInput, Textarea, FileInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { toast } from "react-toastify";
import { FaMobile, FaTv } from "react-icons/fa";
import { FaPix, FaSteam } from "react-icons/fa6";
import { IoIosLaptop } from "react-icons/io";
import { BsSmartwatch } from "react-icons/bs";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [updateProduct, { isLoading: LoadingUpdateProduct }] =
    useUpdateProductMutation();

  const {
    data: product,
    isLoadingProduct,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  const [uploadProductImage] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const updateProductHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        image,
        price,
        brand,
        category,
        countInStock,
        description,
      });
      toast.success("Product Updated Succesfully!");
      refetch();
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleFilterByCategory = (category) => {
    setCategory(category);
  };

  return (
    <>
      {isLoadingProduct ? (
        <Loader msg="Retrieving Product..." />
      ) : error ? (
        <Message color={"red"}>{error}</Message>
      ) : (
        <>
          <h1 className="font-serif font-semibold tracking-tight text-center text-xl mt-8">
            Update Product
          </h1>
          <div className="flex justify-center">
            <Card className="w-80">
              <form
                className="flex flex-col gap-4"
                onSubmit={updateProductHandler}
              >
                <div className="space-y-3">
                  <TextInput
                    id="name"
                    value={name}
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <TextInput
                    id="price"
                    value={price}
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />

                  <TextInput
                    id="count in stock"
                    value={countInStock}
                    type="number"
                    placeholder="Count In Stock"
                    onChange={(e) => setCountInStock(Number(e.target.value))}
                    required
                  />

                  <TextInput
                    id="brand"
                    type="text"
                    value={brand}
                    placeholder="Brand"
                    required
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  <Textarea
                    id="description"
                    placeholder="Leave a description..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                  <FileInput onChange={uploadFileHandler} />

                  <p className="text-xs font-bold tracking-tight">
                    <span>Select a Category: </span>
                    <span className=" text-cyan-800 bg-cyan-100 px-2 py-1  rounded-md">
                      {category}
                    </span>
                  </p>

                  <div class="grid grid-cols-3 justify-items-center">
                    <div>
                      <button
                        onClick={() => handleFilterByCategory("Phones")}
                        type="button"
                        className="flex flex-col items-center hover:outline outline-1 rounded-md py-1 px-3"
                      >
                        <FaMobile />
                        <span className="text-xs mt-1">Phone</span>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleFilterByCategory("Laptop")}
                        type="button"
                        className="flex flex-col items-center hover:outline outline-1 rounded-md py-1 px-3"
                      >
                        <IoIosLaptop />
                        <span className="text-xs mt-1">Laptop</span>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleFilterByCategory("Gaming")}
                        type="button"
                        className="flex flex-col items-center hover:outline outline-1 rounded-md py-1 px-3"
                      >
                        <FaSteam />
                        <span className="text-xs mt-1">Gaming</span>
                      </button>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => handleFilterByCategory("Watch")}
                        type="button"
                        className="flex flex-col items-center hover:outline outline-1 rounded-md py-1 px-3"
                      >
                        <BsSmartwatch />
                        <span className="text-xs mt-1">Watch</span>
                      </button>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => handleFilterByCategory("Tv")}
                        type="button"
                        className="flex flex-col items-center hover:outline outline-1 rounded-md py-1 px-3"
                      >
                        <FaTv />
                        <span className="text-xs mt-1">Tv</span>
                      </button>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => handleFilterByCategory("Accessories")}
                        type="button"
                        className="flex flex-col items-center hover:outline outline-1 rounded-md py-1 px-3"
                      >
                        <FaPix />
                        <span className="text-xs mt-1">Accessories</span>
                      </button>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  color="dark"
                  onClick={() =>
                    toast("Updating Product...", {
                      position: toast.POSITION.TOP_CENTER,
                    })
                  }
                  isProcessing={LoadingUpdateProduct}
                >
                  Update Product
                </Button>
              </form>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default CreateProductScreen;
