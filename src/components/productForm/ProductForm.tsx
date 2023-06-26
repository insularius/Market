import React, { useEffect, useState } from "react";
import { ProductFields } from "../../types/product";
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
import { getCategoriesList } from "../../services/getCategoriesList";
import MyInput from "../ui/input/MyInput";
import styles from "../productForm/ProductForm.module.scss";
import MyTextarea from "../ui/textArea/MyTextarea";
import { uploadProductImage } from "../../services/ uploadProductImage";
type Args = {
  // onSubmit: (data: ProductFields) => void;
  onSubmit: (data: ProductFields) => void;
  initialValue?: ProductFields;
};

const ProductForm = ({ onSubmit, initialValue }: Args) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategoriesList().then((res) => setCategories(res.data));
  }, []);

  const [formState, setFormState] = useState<ProductFields>({
    name: "",
    description: "",
    price: 0,
    daru_category: {
      id: 0,
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: ProductFields = {
      name: formState.name,
      description: formState.description,
      price: formState.price ? Number(formState.price) : 0,
      daru_category: {
        id: formState.daru_category?.id,
      },
    };
    if (selectedFile) {
      data.image = await uploadProductImage(selectedFile);
    }
    onSubmit(data);
    //let imageId;
    //if(selectedFile){
    //   const imageId = await uploadProductImage(selectedFile);
    //   data.image = imageId;
    // }
    //onSubmit(data, selectedFile);
  };

  useEffect(() => {
    setFormState({
      name: initialValue?.name ?? "",
      price: initialValue?.price ?? 0,
      description: initialValue?.description ?? "",
      daru_category: {
        id: initialValue?.daru_category?.id ?? 0,
      },
    });
  }, [initialValue]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setFormState((prevState) => ({
      ...prevState,
      daru_category: { id: categoryId },
    }));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSumbit}>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Name:</label>
          <MyInput
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Description:</label>
          <MyTextarea
            className={styles.textarea}
            name="description"
            value={formState.description}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Price:</label>
          <MyInput
            type="text"
            name="price"
            value={formState.price}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Category:</label>
          <select
            className={styles.categorySelect}
            name="daru_category"
            value={formState.daru_category?.id}
            onChange={handleSelectChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.attributes.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Upload image</label>
          <MyInput
            type="file"
            name="files"
            onChange={handleFileChange}
          ></MyInput>
        </div>
        {initialValue ? (
          <button className={styles.submitButton} type="submit">
            Edit Product
          </button>
        ) : (
          <button className={styles.submitButton} type="submit">
            Create Product
          </button>
        )}
      </form>
      <Link to={"/admin/products"} className={styles.backButton}>
        Back
      </Link>
    </div>
  );
};

export { ProductForm };
