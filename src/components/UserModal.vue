<script setup lang="ts">
import dayjs from "dayjs";
import { storeToRefs } from "pinia";

import { useViewUserStore } from "@/stores/user";
import CustomModal from "./ui/CustomModal.vue";
const selectedUserStore = useViewUserStore();

const { selectedUser, isOpen } = storeToRefs(selectedUserStore);

const closeModal = () => {
  selectedUserStore.removeSelectedUser();
  selectedUserStore.close();
};
</script>

<template>
  <CustomModal
    name="user-modal"
    :is-open="isOpen"
    @modal-close="closeModal"
  >
    <template #header>
      <h2 class="text-3xl font-bold">
        {{ selectedUser?.name.first }} {{ selectedUser?.name.last }}
      </h2>
    </template>
    <template #content>
      <div class="flex flex-row gap-4">
        <div class="rounded-sm p-1">
          <img
            alt="user-picture"
            :src="selectedUser?.picture.large"
            class="min-h-[9.25rem] min-w-[9.25rem] rounded-md border border-black"
            width="148"
            height="148"
          />
        </div>
        <div class="grid grid-cols-info gap-1">
          <div class="text-[#BCBCBC]">Date:</div>
          <div>
            {{ dayjs(selectedUser?.registered.date).format("DD MMM YYYY") }}
          </div>

          <div class="text-[#BCBCBC]">State:</div>
          <div>
            {{ selectedUser?.location.state }}
          </div>

          <div class="text-[#BCBCBC]">Gender:</div>
          <div>
            {{ selectedUser?.gender }}
          </div>

          <div class="text-[#BCBCBC]">Country:</div>
          <div>
            {{ selectedUser?.location.country }}
          </div>

          <div
            class="overflow-hidden text-ellipsis whitespace-nowrap text-[#BCBCBC]"
          >
            Email:
          </div>
          <div>
            {{ selectedUser?.email }}
          </div>
        </div>
      </div>
    </template>
  </CustomModal>
</template>
