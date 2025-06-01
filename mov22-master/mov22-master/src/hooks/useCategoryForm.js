import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import handleAction from "../utils/actionHandler";
import { Alert } from "react-native";

const useCategoryForm = (categoryId, navigation) => {
  const [categoryData, setCategoryData] = useState({
    label: "",
    type: "",
  });
  const {
    createCategory,
    updateCategory,
    getOneCategory,
    deleteCategory,
    loading,
    error,
    setError,
  } = useContext(AppContext);

  const handleInputChange = (name, value) => {
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (categoryId !== undefined) {
      handleAction(
        "Update Category",
        "Are you sure you want to overwrite category data?",
        "Changes saved.",
        async () => await updateCategory(categoryData)
      );
    } else {
      const success = await createCategory({
        ...categoryData,
        type: categoryData.label.toLowerCase().replace(/\s+/g, "_"),
      });
      if (!success) {
        return;
      }
      Alert.alert("Success", "Category created successfully.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  const handleDelete = () => {
    if (!categoryData || !categoryData._id) {
      Alert.alert("Error", "Cannot delete: Category ID is missing");
      return;
    }

    handleAction(
      "Delete Category",
      "Are you sure you want to delete this category?",
      "Category deleted successfully.",
      async () => await deleteCategory(categoryData._id),
      () => navigation.goBack()
    );
  };

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId !== undefined) {
        const category = await getOneCategory(categoryId);
        setCategoryData(category);
      }
    };
    fetchCategory();
  }, [categoryId]);

  return {
    categoryData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    setError,
    handleDelete,
  };
};

export default useCategoryForm;
