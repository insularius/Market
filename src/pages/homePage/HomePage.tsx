import { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import { getProductsList } from "../../services/getProductsList";
import { Productt } from "../../types/product";

const Home = () => {
  const [products, setProducts] = useState<Productt[]>([]);
  useEffect(() => {
    getProductsList({}).then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <Slider productss={products} />
    </div>
  );
};

export default Home;
