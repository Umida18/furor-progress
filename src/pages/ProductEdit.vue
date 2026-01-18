<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from 'src/composables/useProducts';
import { useProducts } from 'src/composables/useProducts';
import ProductForm from 'src/components/ProductForm.vue';
import { notifyError, notifySuccess } from 'src/utils/notify';

const route = useRoute();
const router = useRouter();
const { products, updateProduct, loading } = useProducts();

const product = computed(() => products.value.find((p) => p.id === Number(route.params.id)));

const submit = async (data: Product) => {
  try {
    await updateProduct({ ...data, id: product.value!.id });

    notifySuccess('Product updated successfully');

    await router.push('/products');
  } catch (error) {
    notifyError('Failed to update product');

    console.log(error);
  }
};

const cancel = () => {
  void router.push('/products');
};
</script>

<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-card v-if="product" class="q-pa-md q-mx-auto" style="max-width: 500px">
      <ProductForm :model-value="product" :loading="loading" @submit="submit" @cancel="cancel" />
    </q-card>

    <div v-else class="text-grey q-pa-md">Product not found</div>
  </q-page>
</template>
