import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form className="flex gap-2" onSubmit={submitHandler}>
      <TextInput
        type="text"
        placeholder="Search product..."
        icon={FaSearch}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></TextInput>
    </form>
  );
};

export default SearchBox;
