import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const STORAGE_KEY = 'products';

function loadProducts(): Product[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function useProducts(currentPage?: Ref<number>) {
  const products = ref<Product[]>(loadProducts());
  const loading = ref(false);

  const rowsPerPage = 5;

  watch(products, (val) => saveProducts(val), { deep: true });

  const paginatedProducts = computed(() => {
    const start = (currentPage ? currentPage.value - 1 : 0) * rowsPerPage;
    return products.value.slice(start, start + rowsPerPage);
  });

  const createProduct = async (product: Omit<Product, 'id'>) => {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newProduct = { ...product, id: Date.now() };
      products.value.push(newProduct);
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  };

  const updateProduct = async (product: Product) => {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const idx = products.value.findIndex((p) => p.id === product.id);
      if (idx !== -1) products.value[idx] = product;
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  };

  const deleteProduct = async (id: number) => {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      products.value = products.value.filter((p) => p.id !== id);
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    rowsPerPage,
    paginatedProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
