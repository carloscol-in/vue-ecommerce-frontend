// eslint-disable-next-line no-unused-vars
import { uniqBy, countBy } from 'lodash';
import { PRODUCTS } from '@/utils/constants';
import { getProductApi } from '@/api/product';

export function getCartApi() {
  const products = localStorage.getItem(PRODUCTS);

  if (products) return JSON.parse(products);

  return [];
}

export function addProductCartApi(slug) {
  const products = getCartApi();
  products.push(slug);
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

export function removeProductCartApi(slug) {
  let products = getCartApi();
  const idx = products.indexOf(slug);
  if (idx <= -1) return;
  products.splice(idx, 1);
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

export async function getProductsCartApi() {
  const slugs = getCartApi();

  if (slugs.length === 0) return null;

  try {
    const products = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const slug of slugs) {
      const product = await getProductApi(slug);
      products.push(product);
    }

    const productsCount = countBy(products, (product) => product.slug);

    const combined = uniqBy(products, (product) => {
      const productTemp = product;
      productTemp.quantity = productsCount[product.slug];
      return productTemp.slug;
    });

    return combined;
  } catch (error) {
    console.error(error);
    return null;
  }
}
