import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductItemById } from "../../services/getProductItemById";
import styles from "./ProductPageInfo.module.scss";
import { Productt } from "../../types/product";
import MyButton from "../../components/ui/button/MyButton";
import Loader from "../../components/loader/Loader";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import MyBtn from "../../components/ui/button/MyButton";

const ProductPageInfo: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Productt>();
  const [isLoading, setIsLoading] = useState(true);

  useDebouncedEffect(
    () => {
      getProductItemById(Number(id)).then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      });
    },
    500,
    []
  );

  if (!product) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Loader />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className={styles.container}>
      <div className={styles.product_showcase_column}>
        <div className={styles.image_container}>
          <img
            src={product.attributes?.image?.data?.attributes?.url}
            alt={product.attributes.name}
          />
        </div>
      </div>

      <div className={styles.product_showcase_column}>
        <div className={styles.info_container}>
          <strong>
            <p className={styles.info_title}>{product.attributes.name}</p>
          </strong>
          <p className={styles.info_text}>Price: {product.attributes.price}</p>
          <p className={styles.info_text}>{product.attributes.description}</p>
          <MyBtn>Add to cart</MyBtn>
        </div>
      </div>
    </div>
  );
};

export default ProductPageInfo;
