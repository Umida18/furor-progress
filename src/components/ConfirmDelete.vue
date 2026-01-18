<template>
  <q-dialog>
    <q-card>
      <q-card-section class="text-h6">Confirm Delete</q-card-section>
      <q-card-section>Are you sure you want to delete this product?</q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" @click="cancel" />
        <q-btn color="negative" label="Delete" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'confirm']);

const cancel = () => emit('update:modelValue', false);
const confirm = () => {
  emit('confirm');
  emit('update:modelValue', false);
};
</script>
