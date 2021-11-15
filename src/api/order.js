import { API_URL } from '@/utils/constants';

// eslint-disable-next-line consistent-return
export async function createOrderApi(data) {
  try {
    const url = `${API_URL}/orders`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

// eslint-disable-next-line consistent-return
export async function getOrdersApi(userId) {
  try {
    const url = `${API_URL}/orders?_where[user]=${userId}&_sort=created_at:desc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
