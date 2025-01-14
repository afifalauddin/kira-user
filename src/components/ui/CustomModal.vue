<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Button } from "@components/ui/button";
import { CloseIcon } from "@components/ui/icon";

/**
 * Interface for the modal properties.
 * @property {boolean} isOpen - Determines if the modal is open.
 */
interface Props {
  isOpen: boolean;
}

/**
 * Defining the emit event for closing the modal.
 */
const emit = defineEmits(["modal-close"]);

/**
 * Reference to the modal container element.
 */
const target = ref(null);
onClickOutside(target, () => emit("modal-close")); // Close the modal when clicking outside of it.

/**
 * Setting default properties for the modal.
 */
withDefaults(defineProps<Props>(), {
  isOpen: false,
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed z-10 top-0 left-0 w-full h-full bg-gray-800/50 no-bg-scroll"
  >
    <div class="flex justify-between items-center h-full">
      <div
        class="p-4 md:px-16 w-[24rem] md:w-[42rem] h-fit m-auto bg-white rounded-md overflow-hidden whitespace-nowrap"
        ref="target"
      >
        <div class="flex justify-between items-center">
          <slot name="header"></slot>
          <Button variant="ghost" @click.stop="emit('modal-close')"
            ><CloseIcon
          /></Button>
        </div>
        <div class="pb-4">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
