import React from "react";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Productt } from "../../types/product";
import styles from "./Slider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
type Props = {
  productss: Productt[];
};
SwiperCore.use([Navigation, Pagination, Autoplay]);
const Slider: React.FC<Props> = ({ productss }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={2}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      style={{ marginTop: "80px" }}
    >
      {productss.map((product) => (
        <SwiperSlide key={product.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={product.attributes.image?.data?.attributes.url}
              alt={product.attributes.name}
              style={{ width: "400px", height: "auto" }}
            />
          </div>
          <div>
            <p className={styles.name}>{product.attributes.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
