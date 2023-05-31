import React from "react";
import { SearchState } from "../../pages/productsPages/ProductPage";
import MyInput from "../ui/input/MyInput";
type Props = {
  setSearch: (args: SearchState) => void;
  search: SearchState;
};
const FilterSearchInputs: React.FC<Props> = ({ setSearch, search }) => {
  return (
    <div>
      <MyInput
        style={{ width: "50%" }}
        onChange={(e) => setSearch({ ...search, query: e.target.value })}
        value={search.query}
        type="text"
        placeholder="Search by name"
      />
      <MyInput
        style={{ width: "50%", marginTop: "5px" }}
        onChange={(e) => setSearch({ ...search, description: e.target.value })}
        value={search.description}
        type="text"
        placeholder="Search by genre"
      />
    </div>
  );
};

export default FilterSearchInputs;
