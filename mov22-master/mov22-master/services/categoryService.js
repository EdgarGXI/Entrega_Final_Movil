import axios from 'axios';

class CategoryService {
  constructor(baseURL = "https://api-puntog-nfmr.onrender.com") {
    this.api = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get all categories from the API
   * @returns {Promise<Array>} Promise that resolves to an array of categories
   */
  async getAllCategories() {
    try {
      const response = await this.api.get('/categories');
      if (response.status !== 200) {
        throw new Error(`Failed fetching categories: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error fetching categories:', error.message);
      throw error;
    }
  }

  /**
   * Get one categry from the API from its id
   * @returns {Promise<Object>} Promise that resolves to a category
   */
  async getCategory(id) {
    try {
      const response = await this.api.get(`/categories/${id}`);
      if (response.status !== 200) {
        throw new Error(`Failed to get category: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error getting category:', error.message);
      throw error;
    }
  }

  /**
   * Adds a new category
   * @param {Object} data – category data
   * @returns {Promise<boolean>} true on success, false otherwise
   */
  async createCategory(data) {
    try {
      const response = await this.api.post('/categories', data);
      return response.status === 200;
    } catch (error) {
      console.log('Error creating categories:', error.message);
      throw error;
    }
  }
    
  /**
   * Updates an existing category.
   * @param {Object} category – updated category data
   * @returns {Promise<Object>} updated category on success
   */
  async updateCategory(category) {
    const { _id, ...updatedCategory } = category;
    try {
      const response = await this.api.put(`/categories/${_id}`, updatedCategory);
      if (response.status !== 200) {
        throw new Error(`Failed to update category: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error updating category:', error.message);
      throw error;
    }
  }

  /**
   * Deletes a category by id.
   * @param {string} categoryId - The ID of the category to delete
   * @returns {Promise<Object>} response data on success
   */
  async deleteCategory(categoryId) {
    try {
      const response = await this.api.delete(`/categories/${categoryId}`);
      if (response.status !== 200) {
        throw new Error(`Failed to delete category: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error deleting category:', error.message);
      throw error;
    }
  }
}

const categoryService = new CategoryService();

export default categoryService;