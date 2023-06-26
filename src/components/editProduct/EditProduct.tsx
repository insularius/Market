import React, { ChangeEvent, useEffect, useState } from "react";
import { CategoryId, ProductFields, Productt } from "../../types/product";
import { updateProduct } from "../../services/updateProduct";
import { Link, useParams } from "react-router-dom";
import { getProductItemById } from "../../services/getProductItemById";
import { PostProductFields } from "../../types/postProductFields";
type Args = {
  productss?: Productt[];
  setProductss?: (args: Productt[]) => void;
  setInitialData?: (args: ProductFields) => void;
};
// type FormState = {
//   name: string;
//   description: string;
//   price: number;
//   daru_category: number;
// };
const EditProduct = ({ productss, setProductss }: Args) => {
  const { id } = useParams();
  const productId = Number(id);
  const [initialData, setInitialData] = useState<ProductFields>();
  //использовать productId как возможность подгрузить данны с бэка, гетпродукт по айди и добавить эти данные в формстейт как дефолт
  //если нет инитиалдэйта, то сетим name: "", если есть initial, то name: initialData.name

  //   const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //     const selectedId = e.target.value;
  //     setProductId(selectedId);
  //   };
  //   if(productId) {
  //     getProductItem(productId).then((res)=> setInitialData(res.data))
  //   }
  const [formState, setFormState] = useState<ProductFields>({
    name: "",
    description: "",
    price: 0,
    daru_category: {
      id: 0,
    },
  });

  useEffect(() => {
    if (productId && productss) {
      const productToEdit = productss.find(
        (product) => product.id === productId
      );
      if (productToEdit) {
        setFormState({
          name: productToEdit.attributes.name,
          description: productToEdit.attributes.description,
          price: productToEdit.attributes.price,
          daru_category: {
            id: productToEdit.attributes.daru_category?.id,
          },
        });
      }
    }
  }, [productId, productss]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct: PostProductFields = {
      data: {
        name: formState.name,
        description: formState.description,
        price: formState.price,
        daru_category: {
          id: Number(formState.daru_category),
        },
      },
      //ProductFields
    };

    // updateProduct(productId, updatedProduct)
    //   .then((updatedProduct) => {
    //     console.log("Product updated successfully:", updatedProduct);
    //     setFormState({
    //       name: "",
    //       description: "",
    //       price: 0,
    //       daru_category: {
    //         id: 0,
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error updating product:", error);
    //   });
  };

  //   const handleSumbit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const updatedProduct: Partial<ProductFields> = {
  //       //   id: +productId,
  //       name: newName,
  //       description: newDescription,
  //       //   daru_category: {
  //       //     id: Number(newCategoryId),
  //       //   },
  //     };

  //     updateProduct(+productId, updatedProduct)
  //       .then((updatedProduct) => {
  //         console.log("Product updated successfully:", updatedProduct);
  //         setNewCategoryId("");
  //         setNewDescription("");
  //         setProductId("");
  //         setNewName("");
  //       })
  //       .catch((error) => {
  //         console.error("Error updating product:", error);
  //       });
  //   };
  //сделать так, чтобы при выборе айди внизу в поля заполнялись initialData
  //кроме того, в Эдит отправляется айди, в апдейт нет, создать стейт edit, SetEdit: ProductFields
  //здесь должно остаться только choose product id
  //   return (
  //     <form onSubmit={handleSumbit}>
  //       <label>
  //         Choose product id:
  //         <select value={productId} onChange={handleSelectChange}>
  //           {productss?.map((product) => (
  //             <option key={product.id} value={product.id}>
  //               ID: {product.id}
  //             </option>
  //           ))}
  //         </select>
  //       </label>
  //       <br />
  //       <label>
  //         Product Name:
  //         <input
  //           type="text"
  //           value={newName}
  //           onChange={(e) => setNewName(e.target.value)}
  //         />
  //       </label>
  //       <br />
  //       {/* <label>
  //         Product Description:
  //         <input
  //           type="text"
  //           value={newDescription}
  //           onChange={(e) => setNewDescription(e.target.value)}
  //         />
  //       </label> */}
  //       <br />
  //       <label>
  //         Category ID:
  //         <input
  //           type="text"
  //           value={newCategoryId}
  //           onChange={(e) => setNewCategoryId(e.target.value)}
  //         />
  //       </label>
  //       <br />
  //       <button type="submit">Update Product</button>
  //     </form>
  //   );
  return (
    <div>
      <form onSubmit={handleSumbit}>
        <br />
        <br />
        <br />
        <br />
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Product Description:
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Product Price:
          <input
            type="text"
            name="price"
            value={formState.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Category ID:
          <input
            type="text"
            name="daru_category"
            value={formState.daru_category?.id}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Edit Product</button>
      </form>
      <Link to={"/admin"}>Back</Link>
    </div>
  );
};

export default EditProduct;
