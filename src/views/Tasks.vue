<template>
  <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div v-else>
    <h1 class="text-white center" v-if="store.tasks.length === 0">
      Задач пока нет
    </h1>
    <h3 class="text-white" v-else>
      Всего активных задач: {{ store.tasks.length }}
    </h3>
    <div class="filters-wrap">
      <a-radio-group v-model:value="activeKey" style="margin-bottom: 16px">
        <a-radio-button value="all">Все</a-radio-button>
        <a-radio-button value="primary">Выполненные</a-radio-button>
        <a-radio-button value="warning">В процессе</a-radio-button>
        <a-radio-button value="danger">Отменённые</a-radio-button>
      </a-radio-group>
      <a-input-search
        v-model:value="searchValue"
        placeholder="input search text"
        class="filter-search"
      />
    </div>
    <template v-if="filterTasks.length" v-for="task in filterTasks">
      <a-card class="card" :title="task.name">
        <template #extra>
          <AppStatus :type="task.appStatus"></AppStatus>
        </template>
        <div class="card-content">
          <p>{{ task.caption }}</p>
          <div class="card-date">
            <p>Дедлайн: {{ task.date }}</p>
          </div>
        </div>
        <a-button @click="openTask(task.id)"> Посмотреть </a-button>
      </a-card>
    </template>
    <a-card v-else>
      <h3>Таких задач нет</h3>
    </a-card>
  </div>
</template>

<script lang="ts">
import AppStatus from "../components/AppStatus.vue";
import { useTasksStore } from "@/store";
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    onMounted(async () => {
      if (store.tasks.length === 0) {
        loading.value = true;
        await store.fill();
        loading.value = false;
      }
    });

    const router = useRouter();
    const store = useTasksStore();

    const loading = ref(false);
    const searchValue = ref("");
    const activeKey = ref("all");

    const openTask = (id: string) => {
      router.push(`/task/${id}`);
    };

    const filterTasks = computed(() => {
      const filterFn = (activeTab?: string) => {
        return store.tasks.filter(
          (task) =>
            (activeTab ? task.appStatus === activeTab : true) &&
            task.name.toLowerCase().includes(searchValue.value.toLowerCase())
        );
      };
      switch (true) {
        case activeKey.value === "primary":
        case activeKey.value === "warning":
        case activeKey.value === "danger":
          return filterFn(activeKey.value);
        default:
          return filterFn();
      }
    });

    return {
      store,
      loading,
      openTask,
      activeKey,
      filterTasks,
      searchValue,
    };
  },
  components: { AppStatus },
});
</script>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card-date {
  padding-bottom: 16px;
}
.loader {
  width: 100px;
  height: 100px;
}
.filters-wrap {
  display: flex;
  gap: 16px;
}
.filter-search {
  width: 300px;
}
</style>
