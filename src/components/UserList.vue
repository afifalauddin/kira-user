<script setup lang="ts">
import { onMounted, ref } from "vue";

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

import { useRouter } from "vue-router";

import { useUserQuery } from "@/data/user";
import UserCard from "./UserCard.vue";
import UserModal from "./UserModal.vue";

const { currentRoute, push, isReady } = useRouter();
const currentPage = ref<number>(1);

const changePage = (num: number) => {
  currentPage.value = num;
  push({
    query: {
      ...currentRoute.value.query,
      page: num,
    },
  });
};

// Navigates to the previous page
const prevPage = () => {
  changePage(Math.max(currentPage.value - 1, 1));
};

// Navigates to the next page
const nextPage = () => {
  if (!isPlaceholderData.value) {
    changePage(currentPage.value + 1);
  }
};

onMounted(async () => {
  await isReady();
  if (currentRoute.value?.query.page) {
    try {
      const page = Number(currentRoute.value.query.page);

      if (page > 0 && !isNaN(page)) {
        currentPage.value = page;
      }
    } catch {
      currentPage.value = 1;
    }
  }
});

const enableQuery = ref<boolean>(true);

const {
  data,
  error,
  isPending,
  isFetching,
  refetch,
  isPlaceholderData,
  isError,
} = useUserQuery({ page: currentPage, enabled: enableQuery });
</script>

<template>
  <UserModal />
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
      v-else-if="data?.results"
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
        <UserCard :users="data.results" />
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
          class="font-normal text-black"
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
              class="h-10 w-10 p-0 font-normal text-black"
              :variant="item.value === currentPage ? 'default' : 'outline'"
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
          class="font-normal text-black"
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
