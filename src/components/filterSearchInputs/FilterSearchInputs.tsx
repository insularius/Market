import { debounce } from "lodash";
import MyInput from "../ui/input/MyInput";
import { getProductsList } from "../../services/getProductsList";
import { Productt } from "../../types/product";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
type Props = {
  setSearch: (args: string) => void;
  search: string;
  setProductss: (args: Productt[]) => void;
};
const FilterSearchInputs: React.FC<Props> = ({
  setSearch,
  search,
  setProductss,
}) => {
  // const [inputValue, setInputValue] = useState("");

  // variant 1 no delay
  // const deferredInputValue = useDeferredValue(inputValue);
  // useEffect(() => {
  //   if (deferredInputValue.length >= 3) {
  //     getProductsList({ query: deferredInputValue }).then((res) =>
  //       setProductss(res.data)
  //     );
  //   } else if (deferredInputValue.length === 0) {
  //     getProductsList({ query: "" }).then((res) => setProductss(res.data));
  //   }
  // }, [deferredInputValue, setProductss]);

  //variant 2 lodash library
  // const debouncedSetSearch = useCallback(
  //   debounce((query: string) => {
  //     setSearch({ ...search, query });
  //   }, 500),
  //   []
  // );
  // useEffect(() => {
  //   debouncedSetSearch(inputValue);
  //   return () => {
  //     debouncedSetSearch.cancel();
  //   };
  // }, [inputValue, debouncedSetSearch]);

  //variant 3 additional state
  // const [deferredInputValue, setDeferredInputValue] = useState("");

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setDeferredInputValue(inputValue);
  //   }, 500);

  //   return () => clearTimeout(timerId);
  // }, [inputValue]);

  // useEffect(() => {
  //   if (deferredInputValue.length >= 3) {
  //     getProductsList({ query: deferredInputValue }).then((res) =>
  //       setProductss(res.data)
  //     );
  //   } else if (deferredInputValue.length === 0) {
  //     getProductsList({ query: "" }).then((res) => setProductss(res.data));
  //   }
  // }, [deferredInputValue, setProductss]);

  //variant 4 optimized
  // useDebouncedEffect(
  //   () => {
  //     if (inputValue.length >= 3) {
  //       getProductsList({ query: inputValue }).then((res) =>
  //         setProductss(res.data)
  //       );
  //     } else if (inputValue.length === 0) {
  //       getProductsList({ query: "" }).then((res) => setProductss(res.data));
  //     }
  //   },
  //   500,
  //   [inputValue, setProductss]
  // );

  useDebouncedEffect(
    () => {
      if (search.length >= 3) {
        getProductsList({ query: search }).then((res) =>
          setProductss(res.data)
        );
      } else if (search.length === 0) {
        getProductsList({ query: "" }).then((res) => setProductss(res.data));
      }
    },
    1000,
    [search, setProductss]
  );

  return (
    <div>
      <MyInput
        style={{
          width: "50%",
          marginTop: "5px",
          backgroundColor: "rgb(246,246,246)",
        }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search by name"
      />
    </div>
  );
};

export default FilterSearchInputs;
