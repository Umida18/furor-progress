<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from 'src/composables/useProducts';
import type { Product } from 'src/composables/useProducts';
import ProductForm from 'src/components/ProductForm.vue';
import { notifyError, notifySuccess } from 'src/utils/notify';

const router = useRouter();
const { createProduct, loading } = useProducts();

const product = ref<Product>({
  id: 0,
  title: '',
  description: '',
  price: 0,
});

const saveProduct = async (data: Product) => {
  try {
    await createProduct(data);
    notifySuccess('Product created successfully');

    await router.push('/products');
  } catch (e) {
    console.log(e);

    notifyError('Failed to create product');
  }
};

const cancel = () => {
  void router.push('products');
};
</script>

<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-card class="q-pa-md q-mx-auto" style="max-width: 500px">
      <ProductForm v-model="product" :loading="loading" @submit="saveProduct" @cancel="cancel" />
    </q-card>
  </q-page>
</template>
