import React, { useEffect, useState } from "react";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import { getProductsList } from "../../services/getProductsList";
import { Productt } from "../../types/product";
import { Link } from "react-router-dom";
import styles from "../productListPage/ProductListPage.module.scss";
import { deleteProduct } from "../../services/deleteProduct";
import MyBtn from "../../components/ui/button/MyButton";
import Skeleton from "../../components/skeleton/Skeleton";

const ProductListPage = () => {
  const [productss, setProductss] = useState<Productt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // useDebouncedEffect(
  //   () => {
  //     setIsLoading(true);
  //     getProductsList({})
  //       .then((res) => setProductss(res.data))
  //       .catch((error) => console.error("Error fetching prducts:", error))
  //       .finally(() => setIsLoading(false));
  //   },
  //   500,
  //   []
  // );
  // useEffect(() => {
  //   setIsLoading(true);
  //   getProductsList({})
  //     .then((res) => setProductss(res.data))
  //     .catch((error) => console.error("Error fetching products:", error))
  //     .finally(() => setIsLoading(false));
  // }, []);
  useEffect(() => {
    setIsLoading(true);
    getProductsList({})
      .then((res) => setProductss(res.data))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // задержка в 1000 миллисекунд (1 секунда)
      });
  }, []);

  const deleteProductHandler = (productId: number) => {
    deleteProduct(productId)
      .then(() => {
        getProductsList({}).then((res) => setProductss(res.data));
      })
      .catch((error) => {
        console.error("Failed to delete product: ", error);
      });
  };

  // <div>
  //     {isLoading
  //       ? Array(10) // или любое другое количество
  //           .fill(null)
  //           .map((_, index) => <SkeletonProduct key={index} />)
  //       : products.map((product) => (
  //           <ProductCard key={product.id} product={product} />
  //         ))}
  //     <Link to="/admin/products/create">Create Product</Link>
  //   </div>

  return (
    <div className={styles.container}>
      <div className={styles.list_header}>
        <h2>Product List</h2>
        <Link to={`/admin/products/create`}>
          <MyBtn>Create</MyBtn>
        </Link>
      </div>
      {isLoading
        ? Array(20) // или любое другое количество
            .fill(null)
            .map((_, index) => <Skeleton key={index} />)
        : productss.map((item) => (
            <div key={item.id} className={styles.list_item}>
              <div className={styles.item_name}>{item.attributes.name}</div>
              <div className={styles.buttons}>
                <Link to={`/admin/products/edit/${item.id}`}>
                  <MyBtn>Edit</MyBtn>
                </Link>
                <MyBtn onClick={() => deleteProductHandler(item.id)}>
                  Delete
                </MyBtn>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ProductListPage;
