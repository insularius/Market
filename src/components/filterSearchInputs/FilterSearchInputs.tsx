import React from "react";
import { SearchState } from "../../pages/productPage/ProductPage";

import MyInput from "../ui/input/MyInput";
type Props = {
  setSearch: (args: SearchState) => void;
  search: SearchState;
};
const FilterSearchInputs: React.FC<Props> = ({ setSearch, search }) => {
  return (
    <div>
      <MyInput
        style={{
          width: "50%",
          marginTop: "5px",
          backgroundColor: "rgb(246,246,246)",
        }}
        onChange={(e) => setSearch({ ...search, query: e.target.value })}
        value={search.query}
        type="text"
        placeholder="Search by name"
      />
    </div>
  );
};

export default FilterSearchInputs;
