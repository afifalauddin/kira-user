<script lang="ts" setup>
import type { User } from "@/types/user";
import dayjs from "dayjs";
import { Primitive } from "radix-vue";

import { useViewUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

interface Props {
  users: User[];
}
const selectedUserStore = useViewUserStore();

const { selectedUser } = storeToRefs(selectedUserStore);
withDefaults(defineProps<Props>(), {});
</script>

<template>
  <Primitive
    v-for="user in users"
    :key="user.email"
    class="grid min-w-full cursor-pointer grid-cols-user gap-4 overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md px-[1.875rem] py-[1.9375rem] shadow-md drop-shadow-sm hover:outline hover:outline-primary"
    :class="{ 'outline outline-primary': selectedUser?.email === user.email }"
    as="div"
    @click="
      () => {
        selectedUserStore.setSelectedUser(user);
        selectedUserStore.open();
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
  </Primitive>
</template>
