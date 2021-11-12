import { API_URL } from '@/utils/constants';

export async function getProducts(limit = 5, start = 0) {
  const next = limit + start;
  try {
    const response = await fetch(
      `${API_URL}/products?_sort=created_at:desc&_limit=${limit}&_start=${start}`,
    );
    let result = await response.json();
    result = {
      ...result,
      next,
    };
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
