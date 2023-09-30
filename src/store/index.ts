import { defineStore } from "pinia";
import axios from "axios";

export interface Task {
  appStatus: string,
  caption: string,
  date: string,
  name: string,
  id: string,
  key?: string
}

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async fill() {
      const res = await axios.get("https://freelance-bourse-vue-ts-default-rtdb.firebaseio.com/Tasks.json");
      this.tasks = Object.values(res.data)
    },
  }
});
