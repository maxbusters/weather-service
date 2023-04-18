<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    required: true,
    type: Boolean,
  },
})

const emit = defineEmits(['delete', 'cancel'])
const disabled = ref(false)

function confirmDelete() {
  emit('delete')
  disabled.value = true
}
function cancelDelete() {
  emit('cancel')
}
</script>

<template>
  <div v-if="props.show" class="delete-modal">
    <div class="delete-modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this item?</p>
      <div class="delete-modal-buttons">
        <button :disabled="disabled" @click="cancelDelete">
          Cancel
        </button>
        <button @click="confirmDelete">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  &-content {
    max-width: 600px;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    animation: modal-show 0.3s ease-in-out forwards;
  }

  &-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      color: #fff;
      background-color: #000;

      &:hover {
        background-color: #333;
      }

      &:first-child {
        margin-right: 1rem;
        background-color: #ccc;
        color: #333;

        &:hover {
          background-color: #999;
        }
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      transform: scale(0.9);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
