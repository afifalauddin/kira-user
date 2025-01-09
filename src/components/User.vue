<script lang="ts" setup>
import { Button } from "@components/ui/button";
import { MessageIcon, AddIcon } from "@components/ui/icon";
</script>

<template>
  <div class="profile-bg mb-10">
    <div
      class="flex gap-7 px-4 md:px-12 lg:px-[16.875rem] items-center pb-4 md:pb-0"
    >
      <div class="p-1 rounded-sm">
        <img
          alt="user-picture"
          src="@/assets/avatar.png"
          class="min-w-[9.25rem] min-h-[9.25rem] rounded-md"
          width="148"
          height="148"
        />
      </div>
      <div class="flex flex-col lg:flex-row gap-7">
        <div class="flex flex-col justify-center gap-[0.375rem] text-white">
          <h2 class="font-bold leading-10 text-3xl lg:text-4xl">John Doe</h2>
          <div class="text-sm leading-[18.2px]">Last Online: 2 days ago</div>
        </div>
        <div
          class="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <Button variant="secondary" class="min-w-40">
            <MessageIcon class="h-[0.875rem] w-[0.875rem]" />
            <span> Send Message </span>
          </Button>
          <Button variant="outline" class="min-w-40">
            <AddIcon class="h-[0.875rem] w-[0.875rem]" />
            <span> Add Friend </span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.profile-bg {
  background: hsl(var(--primary));
}

@media only screen and (min-width: 600px) {
  .profile-bg {
    background: linear-gradient(
      180deg,
      hsl(var(--primary)) 80%,
      rgba(255, 0, 0, 0) 20%
    );
  }
}
</style>
