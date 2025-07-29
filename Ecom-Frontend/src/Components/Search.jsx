import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchProducts } from '../Slices/productSlices';
import { useDispatch } from "react-redux";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams(); 

  useEffect(() => {
    dispatch(fetchProducts(searchParams.toString())); 
  }, [dispatch, searchParams]); 

  function handleSearch() {
    navigate('/search?keyword=' + keyword);
  }
// hello
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setKeyword(e.target.value.trim())}
          onBlur={handleSearch}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
    </>
  );
}

export default Search;
