import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Productt } from "../../types/product";
import styles from "./Slider.module.scss";

type Props = {
  productss: Productt[];
};

const Slider: React.FC<Props> = ({ productss }) => {
  return (
    <div className={styles.slider}>
      <Carousel infiniteLoop useKeyboardArrows autoPlay>
        {productss.map((product) => (
          <div className={styles.slide} key={product.id}>
            <img
              className={styles.image}
              src={product.attributes.image?.data?.attributes.url}
              alt={product.attributes.name}
              style={{ marginBottom: "100px" }}
            />
            <p className="legend">{product.attributes.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
