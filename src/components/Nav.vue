<script setup lang="ts">
import { Button } from "@components/ui/button";
import {
  NotificationIcon,
  SettingsIcon,
  LogoutIcon,
} from "@components/ui/icon";
</script>

<template>
  <header
    class="flex justify-between h-[5.625rem] items-center px-4 md:px-12 lg:px-[16.875rem]"
  >
    <a href="https://kiratech.com.au/" rel="nofollow" target="_blank">
      <img alt="KiraTech" src="@/assets/logo.svg" class="w-[10.625rem] h-14" />
    </a>

    <nav>
      <ul class="flex list-none gap-[0.625rem] justify-end items-center">
        <li>
          <Button variant="ghost" size="icon">
            <NotificationIcon />
          </Button>
        </li>

        <li>
          <Button variant="ghost" size="icon">
            <SettingsIcon />
          </Button>
        </li>

        <li>
          <Button variant="ghost" size="icon">
            <LogoutIcon />
          </Button>
        </li>
      </ul>
    </nav>
  </header>
</template>
