import React from "react";
import { ProductFields } from "../../types/product";
import { createProduct } from "../../services/createProduct";
import { ProductForm } from "../../components/productForm/ProductForm";
import { useNavigate } from "react-router-dom";

const ProductCreatePage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: ProductFields) => {
    try {
      await createProduct(data);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  return (
    <div>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export { ProductCreatePage };
