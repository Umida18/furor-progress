<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Product } from 'src/composables/useProducts';

const props = defineProps<{ modelValue: Product | Omit<Product, 'id'>; loading: boolean }>();
const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);

const form = ref({ ...props.modelValue });

watch(
  () => props.modelValue,
  (val) => {
    console.log('val', val);

    form.value = { ...val };
  },
  { immediate: true },
);

const formRef = ref();

const rules = {
  required: (val: string) => !!val || 'Required',
  price: (val: number) => val > 0 || 'Price must be positive',
};

const onSubmit = async () => {
  if (!(await formRef.value.validate())) return;
  console.log('Submitting form:', form.value);

  emit('submit', form.value);
};
const onCancel = () => emit('cancel');
</script>

<template>
  <q-form @submit.prevent="onSubmit" ref="formRef">
    <q-input
      v-model="form.title"
      label="Title"
      :rules="[rules.required]"
      dense
      outlined
      class="q-mb-md"
      :disable="loading"
    />
    <q-input
      v-model="form.description"
      label="Description"
      type="textarea"
      :rules="[rules.required]"
      dense
      outlined
      class="q-mb-md"
      :disable="loading"
    />
    <q-input
      v-model.number="form.price"
      label="Price"
      type="number"
      :rules="[rules.required, rules.price]"
      dense
      outlined
      class="q-mb-md"
      :disable="loading"
    />
    <div class="row justify-end q-gutter-sm q-mt-md">
      <q-btn label="Cancel" flat @click="onCancel" :disable="loading" />
      <q-btn
        label="Save"
        color="primary"
        unelevated
        type="submit"
        :loading="loading"
        :disable="loading"
      />
    </div>
  </q-form>
</template>
