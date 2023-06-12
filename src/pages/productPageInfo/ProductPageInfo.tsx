import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductItem } from "../../services/getProductItemById";
import styles from "./ProductPageInfo.module.scss";
import { Productt } from "../../types/product";

import MyButton from "../../components/ui/button/MyButton";
import { getProductsList } from "../../services/getProductsList";

const ProductPageInfo: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Productt>();
  console.log(product);

  //использовать отдельный инпойнт для дитейл, гетпродуктитем
  useEffect(() => {
    if (!id) return;
    getProductItem(Number(id)).then((res) => setProduct(res.data));
  }, [id]);

  //если использовать инпойнт основной гетПродукст, data[0] потому что там массив и айди идёт первым, поэтому с нуля
  // useEffect(() => {
  //   if (!id) return;
  //   getProductCategory({ productId: Number(id) }).then((res) =>
  //     setProduct(res.data[0])
  //   );
  // }, [id]);

  if (!product) return null;

  return (
    <div className={styles.productsList}>
      <div className={styles.item}>
        <img
          src={product.attributes.image.data.attributes.url}
          className={styles.image}
          alt=""
        ></img>
        {
          <div className={styles.info}>
            <small className={styles.article}>
              Article: {product.attributes.article}
            </small>

            <h3 className={styles.title}>{product.attributes.name}</h3>
            <p>{product.attributes.description}</p>
            <p>{product.attributes.price}</p>
            <h4>Description:</h4>
            <p>
              Genre: {product.attributes.daru_category.data.attributes.name},
              {product.attributes.daru_category.data.attributes.createdAt}
            </p>
            <Link to={"/store"}>
              <MyButton>Back</MyButton>
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default ProductPageInfo;
