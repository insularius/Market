import React, { useEffect, useState } from "react";
import { ProductFields } from "../../types/product";
import { updateProduct } from "../../services/updateProduct";
import { useParams } from "react-router-dom";
import { getProductItemById } from "../../services/getProductItemById";
import { ProductForm } from "../../components/productForm/ProductForm";

const ProductEditPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const [formState, setFormState] = useState<ProductFields>({});

  useEffect(() => {
    getProductItemById(productId).then((res) => {
      setFormState({
        name: res.data.attributes.name,
        description: res.data.attributes.description,
        price: res.data.attributes.price,
        daru_category: {
          id: res.data.attributes.daru_category.data.id,
        },
      });
    });
  }, [productId]);

  // const handleSubmit = (data: ProductFields, image: File | null) => {
  //   updateProduct(productId, data, image)
  //     .then((updatedProduct) => {
  //       console.log("Product updated successfully:", updatedProduct);
  //       setFormState({
  //         name: "",
  //         description: "",
  //         price: 0,
  //         daru_category: {
  //           id: 0,
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error updating product:", error);
  //     });
  // };

  const handleSubmit = async (data: ProductFields) => {
    updateProduct(productId, data)
      .then((updatedProduct) => {
        console.log("Product updated successfully:", updatedProduct);
        setFormState({
          name: "",
          description: "",
          price: 0,
          daru_category: {
            id: 0,
          },
        });
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div>
      <ProductForm initialValue={formState} onSubmit={handleSubmit} />
    </div>
  );
};

export { ProductEditPage };
