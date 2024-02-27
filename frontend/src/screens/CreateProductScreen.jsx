import AdminNav from "../components/AdminNav";
import { Button, TextInput, Textarea, FileInput } from "flowbite-react";
import { useState } from "react";
import { Card } from "flowbite-react";
import { toast } from "react-toastify";
import { FaMobile, FaToolbox, FaTv } from "react-icons/fa";
import { FaPix, FaSteam } from "react-icons/fa6";
import { IoIosLaptop } from "react-icons/io";
import { BsSmartwatch } from "react-icons/bs";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productApiSlice";
import { useNavigate } from "react-router-dom";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [createProduct, { isLoading: LoadingCreateProduct }] =
    useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const createProductHandler = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name,
        price,
        brand,
        image,
        category,
        countInStock,
        description,
      });
      toast.success("Product Created Succesfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleFilterByCategory = (category) => {
    setCategory(category);
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

  return (
    <>
      <AdminNav />
      <h1 className="font-serif font-semibold tracking-tight text-center text-xl mt-8">
        Add Product
      </h1>
      <div className="flex justify-center">
        <Card className="w-80">
          <form className="flex flex-col gap-4" onSubmit={createProductHandler}>
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
                {category && (
                  <span className="text-cyan-800 bg-cyan-100 px-1.5 py-1 rounded-md">
                    {category}
                  </span>
                )}
              </p>

              <div class="grid grid-cols-3 justify-items-center">
                <div>
                  <button
                    onClick={() => handleFilterByCategory("Phone")}
                    type="button"
                    className="flex flex-col items-center hover:outline outline-1 focus:ring-1  focus:ring-gray-600 rounded-md py-1 px-3"
                  >
                    <FaMobile />
                    <span className="text-xs mt-1">Phone</span>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleFilterByCategory("Laptop")}
                    type="button"
                    className="flex flex-col items-center hover:outline outline-1 focus:ring-1  focus:ring-gray-600 rounded-md py-1 px-3"
                  >
                    <IoIosLaptop />
                    <span className="text-xs mt-1">Laptop</span>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleFilterByCategory("Gaming")}
                    type="button"
                    className="flex flex-col items-center hover:outline outline-1 focus:ring-1  focus:ring-gray-600 rounded-md py-1 px-3"
                  >
                    <FaSteam />
                    <span className="text-xs mt-1">Gaming</span>
                  </button>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => handleFilterByCategory("Watch")}
                    type="button"
                    className="flex flex-col items-center hover:outline outline-1 focus:ring-1  focus:ring-gray-600 rounded-md py-1 px-3"
                  >
                    <BsSmartwatch />
                    <span className="text-xs mt-1">Watch</span>
                  </button>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => handleFilterByCategory("Electronic")}
                    type="button"
                    className="flex flex-col items-center hover:outline outline-1 focus:ring-1  focus:ring-gray-600 rounded-md py-1 px-3"
                  >
                    <FaToolbox />
                    <span className="text-xs mt-1">Electronic</span>
                  </button>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => handleFilterByCategory("Accessory")}
                    type="button"
                    className="flex flex-col items-center hover:outline outline-1 focus:ring-1  focus:ring-gray-600 rounded-md py-1 px-3"
                  >
                    <FaPix />
                    <span className="text-xs mt-1">Accessory</span>
                  </button>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              color="dark"
              isProcessing={LoadingCreateProduct}
              onClick={() =>
                toast("Adding Product...", {
                  position: toast.POSITION.TOP_CENTER,
                })
              }
            >
              Add Product
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateProductScreen;
