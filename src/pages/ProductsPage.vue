<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from 'src/composables/useProducts';
import ConfirmDelete from 'src/components/ConfirmDelete.vue';

const route = useRoute();
const router = useRouter();
const page = ref(Number(route.query.page) || 1);

const { products, loading, rowsPerPage, paginatedProducts, deleteProduct } = useProducts(page);

const showDeleteDialog = ref(false);
const deleteId = ref<number | null>(null);

const goToCreate = async () => {
  try {
    await router.push('/products/create');
  } catch (error) {
    console.log(error);
  }
};

const edit = async (id: number) => {
  try {
    await router.push(`/products/${id}/edit`);
  } catch (error) {
    console.log(error);
  }
};

const requestDelete = (id: number) => {
  deleteId.value = id;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  if (deleteId.value !== null) {
    await deleteProduct(deleteId.value);
    deleteId.value = null;
  }
};

watch(
  () => route.query.page,
  (val) => {
    page.value = Number(val) || 1;
  },
);

watch(page, async (p) => {
  try {
    const newQuery = { ...route.query };
    if (p === 1) delete newQuery.page;
    else newQuery.page = p.toString();

    await router.replace({ query: newQuery });
  } catch (err) {
    console.error(err);
  }
});

const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'title', label: 'Product Name', field: 'title', sortable: true },
  { name: 'description', label: 'Details', field: 'description' },
  { name: 'price', label: 'Price', field: 'price', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions' },
];
</script>

<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h5">Products</div>
      <q-btn
        color="primary"
        label="Add Product"
        unelevated
        @click="goToCreate"
        :disable="loading"
      />
    </div>

    <q-card>
      <q-card-section>
        <q-table
          :rows="paginatedProducts"
          :columns="columns"
          :loading="loading"
          :rows-per-page="rowsPerPage"
          :v-model="{ page }"
          row-key="id"
        >
          <template v-slot:body-cell-actions="props">
            <q-td align="right">
              <q-btn
                flat
                color="accent"
                icon="edit"
                @click="edit(props.row.id)"
                :disable="loading"
              />
              <q-btn
                flat
                color="negative"
                icon="delete"
                @click="requestDelete(props.row.id)"
                :disable="loading"
              />
            </q-td>
          </template>
          <template v-slot:no-data>
            <div class="q-pa-md text-grey">No products found.</div>
          </template>
        </q-table>
      </q-card-section>
      <q-card-actions>
        <q-pagination
          v-model="page"
          :max="Math.ceil(products.length / rowsPerPage)"
          :disable="loading"
        />
      </q-card-actions>
    </q-card>

    <ConfirmDelete v-model="showDeleteDialog" @confirm="confirmDelete" />
  </q-page>
</template>
