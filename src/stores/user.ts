import type { User } from "@/types/user";
import { defineStore } from "pinia";

interface State {
  selectedUser?: User;
  isOpen: boolean;
}

export const useViewUserStore = defineStore("selectedUser", {
  state: (): State => {
    return {
      selectedUser: undefined,
      isOpen: false,
    };
  },
  actions: {
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    setSelectedUser(user: User) {
      this.selectedUser = user;
    },
    removeSelectedUser() {
      this.selectedUser = undefined;
    },
  },
});
