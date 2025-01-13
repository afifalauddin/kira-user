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

const focusedRow = ref<number | null>(null);
const selectedUser = ref<User | null>(null);

// Handles row selection and opens the modal
const rowSelected = (user: User) => {
  selectedUser.value = user;
  openModal();
};

// Sets the focused row index
const setFocusedRow = (index: number) => {
  focusedRow.value = index;
};

// Fetches user data from the API
const fetcher = (page: Ref<number>) =>
  fetch(
    `https://randomuser.me/api/?page=${page.value}&results=20&seed=kira`,
  ).then((response) => response.json());

const page = ref(1);

const {
  isPending,
  isFetching,
  isError,
  data,
  error,
  isPlaceholderData,
  refetch,
} = useQuery({
  queryKey: ["users", page],
  queryFn: () => fetcher(page),
  placeholderData: keepPreviousData,
  retry: 5,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60, //stale for 1 minute
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

  selectedUser.value = null;
  setFocusedRow(-1);
};
</script>

<template>
  <Modal
    name="user-modal"
    :is-open="isModalOpened"
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
  </Modal>

  <div class="px-4 md:px-12 lg:px-[16.875rem]">
    <div
      v-if="isPending || isFetching"
      class="flex w-full flex-col gap-4"
    >
      <Skeleton
        v-for="(_, sIndex) in Array(10)"
        :key="sIndex"
        class="h-20 w-full"
      />
    </div>

    <div v-else-if="isError">An error has occurred: {{ error }}</div>

    <div
      v-else-if="data.results"
      class="flex w-full flex-col gap-[1.125rem]"
    >
      <div
        class="grid min-w-full grid-cols-user gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap px-[1.875rem] text-[#BCBCBC]"
      >
        <div class="text-left">Date</div>
        <div class="text-left">Name</div>
        <div class="text-left">Gender</div>
        <div class="text-left">Country</div>
        <div class="text-right">Email</div>
      </div>
      <div class="flex flex-col gap-[0.625rem]">
        <div
          v-for="(user, index) in data?.results"
          :key="index"
          class="grid min-w-full cursor-pointer grid-cols-user gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md px-[1.875rem] py-[1.9375rem] shadow-md drop-shadow-sm hover:outline hover:outline-primary"
          :class="{ 'outline outline-primary': focusedRow === index }"
          @click="
            () => {
              rowSelected(user);
              setFocusedRow(index);
            }
          "
        >
          <div class="overflow-hidden text-ellipsis text-left text-[#BCBCBC]">
            {{ dayjs(user.registered.date).format("DD MMM YYYY") }}
          </div>
          <div class="overflow-hidden text-ellipsis text-left font-semibold">
            {{ `${user.name.first} ${user.name.last}` }}
          </div>
          <div
            class="overflow-hidden text-ellipsis text-left capitalize text-[#BCBCBC]"
          >
            {{ user.gender }}
          </div>
          <div class="overflow-hidden text-ellipsis text-left">
            {{ user.location.country }}
          </div>
          <div class="overflow-hidden text-ellipsis text-right text-[#BCBCBC]">
            {{ user.email }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="m-4 flex items-center justify-center px-4 md:px-12 lg:px-[16.875rem]"
  >
    <Pagination
      :total="500"
      :sibling-count="1"
      show-edges
      :default-page="1"
    >
      <PaginationList
        v-slot="{ items }"
        class="flex items-center gap-1"
      >
        <PaginationPrev
          class="text-black"
          @click="prevPage"
        />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="h-10 w-10 p-0 text-black"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="changePage(item.value)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :key="item.type"
            :index="index"
          />
        </template>

        <PaginationNext
          class="text-black"
          @click="nextPage"
        />
      </PaginationList>
    </Pagination>
  </div>

  <div class="px-4 md:px-12 lg:px-[16.875rem]">
    <div class="flex w-full items-center justify-center">
      <Button @click="refetch"><RefreshIcon />Refresh </Button>
    </div>
  </div>
</template>
