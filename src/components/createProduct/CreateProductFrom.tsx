import React, { useEffect, useState } from "react";
import { ProductFields, Productt } from "../../types/product";
import { createProduct } from "../../services/createProduct";
import { PostProductFields } from "../../types/postProductFields";
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
// import { FormState } from "../../pages/productListPage/ProductListPage";
type Args = {
  categories?: Category[];
  setCategories?: (args: Category[]) => void;
  productss?: Productt[];
  setProductss?: (args: Productt[]) => void;
  //   initialData?: ProductFields;
  //   formState?: {
  //     name: string;
  //     description: string;
  //     price: string;
  //     daru_category: string;
  //   };
  //   setFormState?: (args: FormState) => void;
};
type FormState = {};
const CreateProductForm = ({
  categories,
  setCategories,
}: //   initialData,
Args) => {
  const [formState, setFormState] = useState<ProductFields>({
    name: "",
    description: "",
    price: 0,
    daru_category: {
      id: 0,
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: ProductFields = {
      name: formState.name,
      description: formState.description,
      price: formState.price,
      daru_category: {
        id: Number(formState.daru_category),
      },
    };

    try {
      // await createProduct(newProduct); //const createdProduct =
      setFormState({
        name: "",
        description: "",
        price: 0,
        daru_category: {
          id: 0,
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  //if(productId) ? EditPage : Create
  return (
    <form onSubmit={handleSubmit}>
      <br />
      <br />
      <br />
      <br />
      <label>
        Product Name:
        <input
          type="text"
          value={formState.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Product Description:
        <input
          type="text"
          value={formState.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Product Price:
        <input
          type="text"
          value={formState?.price}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Category ID:
        <input
          type="text"
          value={formState.daru_category?.id}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Create Product</button>
      <Link to={"/admin"}>Back</Link>
    </form>
  );
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Product Name:
  //         <input
  //           type="text"
  //           value={productName}
  //           onChange={(e) => setProductName(e.target.value)}
  //         />
  //       </label>
  //       <br />
  //       {/* <label>
  //           Product Price:
  //           <input
  //             type="number"
  //             value={productPrice}
  //             onChange={(e) => setProductPrice(+e.target.value)}
  //           />
  //         </label> */}
  //       <br />
  //       <label>
  //         Category:
  //         <select value={selectedCategory?.id} onChange={handleSelectChange}>
  //           {categories.map((category) => (
  //             <option key={category.id} value={category.id}>
  //               {category.attributes.name}
  //             </option>
  //           ))}
  //         </select>
  //       </label>
  //       <br />
  //       <button type="submit">Create Product</button>
  //     </form>
  //   );
};

export default CreateProductForm;
