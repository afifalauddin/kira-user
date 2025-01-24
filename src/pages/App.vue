<script setup lang="ts">
import UserHeader from "@/components/UserHeader.vue";
import UserList from "@components/UserList.vue";
</script>

<template>
  <router-view name="TopNavBar" />
  <UserHeader />
  <main>
    <UserList />
  </main>
</template>
