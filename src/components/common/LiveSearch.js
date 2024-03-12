import React, { useEffect, useState } from "react";

const LiveSearch = ({ onKeySearch }) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onKeySearch(keyword);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const handleTyping = (event) => {
    const target = event.target;
    setKeyword(target.value);
  };

  return (
    <input
      value={keyword}
      onChange={handleTyping}
      type="search"
      className="form-control form-control-sm ms-1"
      placeholder="Email or Name"
    />
  );
};

export default LiveSearch;
