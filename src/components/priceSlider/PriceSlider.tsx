import React, { useEffect, useState } from "react";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import { Productt } from "../../types/product";
import MySlider from "../ui/slider/MySlider";

type Props = {
  productss: Productt[];
  setProductss: (args: Productt[]) => void;
};

const PriceSlider: React.FC<Props> = ({ productss, setProductss }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sliderValue, setSliderValue] = useState(minPrice);

  useEffect(() => {
    if (productss.length > 0) {
      let initialMinPrice = productss[0].attributes.price;
      let initialMaxPrice = productss[0].attributes.price;

      productss.forEach((product) => {
        const price = product.attributes.price;
        if (price < initialMinPrice) {
          initialMinPrice = price;
        }
        if (price > initialMaxPrice) {
          initialMaxPrice = price;
        }
      });

      setMinPrice(initialMinPrice);
      setMaxPrice(initialMaxPrice);
    }
  }, [productss]);

  const filterProductsByPrice = () => {
    const filteredProductss = productss.filter((product) => {
      return product.attributes.price <= sliderValue;
    });
    setProductss(filteredProductss);
  };

  useDebouncedEffect(
    () => {
      filterProductsByPrice();
    },
    500,
    [sliderValue]
  );

  return (
    <MySlider
      min={minPrice}
      max={maxPrice}
      value={sliderValue}
      onChange={(value) => {
        setSliderValue(value);
      }}
    />
  );
};

export default PriceSlider;
