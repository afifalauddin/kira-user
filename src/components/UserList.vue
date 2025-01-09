<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import dayjs from "dayjs";
import Modal from "@components/ui/Modal.vue";
import type { User } from "@/types/user";

import { Button } from "@components/ui/button";

import { RefreshIcon } from "@components/ui/icon";

import { Skeleton } from "@components/ui/skeleton";

import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

// Emits an event when a row is selected
const emit = defineEmits(["row-selected"]);

const focusedRow = ref<number | null>(null);
const selectedUser = ref<User | null>(null);

// Handles row selection and opens the modal
const rowSelected = (user: User) => {
  emit("row-selected", user);
  selectedUser.value = user;
  openModal();
};

// Sets the focused row index
const setFocusedRow = (index: number) => {
  focusedRow.value = index;
};

// Fetches user data from the API
const fetcher = (page: Ref<number>) =>
  fetch(`https://randomuser.me/api/?page=${page.value}&results=20`).then(
    (response) => response.json(),
  );

const page = ref(1);

const {
  isPending,
  isError,
  data,
  error,
  isFetching,
  isPlaceholderData,
  refetch,
} = useQuery({
  queryKey: ["users", page],
  queryFn: () => fetcher(page),
  placeholderData: keepPreviousData,
  retry: 5,
});

// Navigates to the previous page
const prevPage = () => {
  page.value = Math.max(page.value - 1, 1);
};

// Navigates to the next page
const nextPage = () => {
  if (!isPlaceholderData.value) {
    page.value = page.value + 1;
  }
};

// Changes the current page to the specified number
const changePage = (num: number) => {
  if (!isPlaceholderData.value) {
    page.value = num;
  }
};

const isModalOpened = ref(false);

// Opens the modal
const openModal = () => {
  isModalOpened.value = true;
};

// Closes the modal
const closeModal = () => {
  isModalOpened.value = false;
};
</script>

<template>
  <Modal :isOpen="isModalOpened" @modal-close="closeModal" name="user-modal">
    <template #header>
      <h2 class="font-bold text-3xl">
        {{ selectedUser?.name.first }} {{ selectedUser?.name.last }}
      </h2>
    </template>
    <template #content>
      <div class="flex flex-row gap-4">
        <div class="p-1 rounded-sm">
          <img
            alt="user-picture"
            :src="selectedUser?.picture.large"
            class="min-w-[9.25rem] min-h-[9.25rem] rounded-md border-black border"
            width="148"
            height="148"
          />
        </div>
        <div class="grid grid-cols-info gap-y-1">
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

          <div class="text-[#BCBCBC]">Email:</div>
          <div>
            {{ selectedUser?.email }}
          </div>
        </div>
      </div>
    </template>
  </Modal>

  <div class="px-4 md:px-12 lg:px-[16.875rem]">
    <div v-if="isPending || isFetching" class="flex flex-col gap-4 w-full">
      <Skeleton class="w-full h-20" v-for="(_, s) in Array(10)" :key="s" />
    </div>

    <div v-else-if="isError">An error has occurred: {{ error }}</div>

    <div class="flex flex-col gap-[1.125rem] w-full" v-else-if="data.results">
      <div
        class="grid gap-4 min-w-full grid-cols-user px-[1.875rem] overflow-hidden whitespace-nowrap overflow-ellipsis text-[#BCBCBC]"
      >
        <div class="text-left">Date</div>
        <div class="text-left">Name</div>
        <div class="text-left">Gender</div>
        <div class="text-left">Country</div>
        <div class="text-right">Email</div>
      </div>
      <div class="flex flex-col gap-[0.625rem]">
        <!-- box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1); -->
        <div
          class="grid gap-4 min-w-full grid-cols-user drop-shadow-sm shadow-md px-[1.875rem] py-[1.9375rem] rounded-md cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis"
          v-for="(user, index) in data?.results"
          :key="index"
          @click="
            () => {
              rowSelected(user);
              setFocusedRow(index);
            }
          "
          :class="{ 'outline outline-primary': focusedRow === index }"
        >
          <div class="text-left">
            {{ dayjs(user.registered.date).format("DD MMM YYYY") }}
          </div>
          <div class="text-left">
            {{ `${user.name.first} ${user.name.last}` }}
          </div>
          <div class="text-left text-[#BCBCBC]">{{ user.gender }}</div>
          <div class="text-left">{{ user.location.country }}</div>
          <div class="text-right text-[#BCBCBC]">{{ user.email }}</div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="px-4 md:px-12 lg:px-[16.875rem] flex items-center justify-center m-4"
  >
    <Pagination
      v-slot="{ page }"
      :total="500"
      :sibling-count="1"
      show-edges
      :default-page="1"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationPrev class="text-black" @click="prevPage" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0 text-black"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="changePage(item.value)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="nextPage" class="text-black" />
      </PaginationList>
    </Pagination>
  </div>

  <div class="px-4 md:px-12 lg:px-[16.875rem]">
    <div class="flex w-full justify-between items-center">
      <p>Current Page: {{ page }}</p>
      <div>
        <Button @click="refetch"><RefreshIcon />Refresh </Button>
      </div>
    </div>
  </div>
</template>
