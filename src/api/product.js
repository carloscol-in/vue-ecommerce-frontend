import { API_URL } from '@/utils/constants';

export async function getProducts(limit = 5, start = 0) {
  try {
    const response = await fetch(
      `${API_URL}/products?_sort=created_at:desc&_limit=${limit}&_start=${start}`,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductCategory(category, limit = 5, start = 0) {
  try {
    const response = await fetch(
      `${API_URL}/products?_where[category.slug]=${category}&_sort=created_at:desc&_limit=${limit}&_start=${start}`,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductApi(slug) {
  try {
    const response = await fetch(`${API_URL}/products/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
