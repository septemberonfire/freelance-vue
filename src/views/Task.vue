<template>
  <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <a-card v-else>
    <h2>{{ currentTask?.name }}</h2>
    <p>Статус: <AppStatus :type="currentTask?.appStatus" /></p>
    <p>Дэдлайн: {{ currentTask?.date }}</p>
    <p>Описание: {{ currentTask?.caption }}</p>
    <div class="status-wrap">
      <p>Изменить статус:</p>
      <a-select
        ref="select"
        v-model:value="chosenStatus"
        style="width: 160px"
        @change="changeHandler"
      >
        <a-select-option value="warning">Взять в работу</a-select-option>
        <a-select-option value="primary">Завершить</a-select-option>
        <a-select-option value="danger">Отменить</a-select-option>
      </a-select>
    </div>
    <a-button @click="changeStatusHandler" class="btn-confirm"
      >Подтвердить</a-button
    >
  </a-card>
</template>

<script lang="ts">
import AppStatus from "../components/AppStatus.vue";
import { useRoute } from "vue-router";
import { ref, defineComponent, onMounted, Ref } from "vue";
import axios from "axios";
import { Task } from "@/store";

export default defineComponent({
  setup() {
    onMounted(async () => {
      loading.value = true;
      const res = await axios.get(
        "https://freelance-bourse-vue-ts-default-rtdb.firebaseio.com/Tasks.json"
      );
      loading.value = false;
      if (res.status === 200) {
        const data = (Object.entries(res.data) as Array<[string, Task]>).map(
          ([key, val]) => ({ ...val, key })
        );
        const currentDataTask = data.find((el) => el.id === taskid);
        if (currentDataTask) {
          currentTask.value = currentDataTask;
        }
      }
    });

    const route = useRoute();
    const taskid = route.params.id;

    const loading = ref(false);
    const currentTask = ref() as unknown as Ref<Task>;
    const chosenStatus = ref("Взять в работу");

    const changeHandler = (value: string) => {
      return value;
    };

    const changeStatusHandler = async () => {
      loading.value = true;
      const status = { appStatus: chosenStatus.value };
      const response = await axios.patch(
        `https://freelance-bourse-vue-ts-default-rtdb.firebaseio.com/Tasks/${currentTask.value.key}.json`,
        status
      );
      loading.value = false;
      if (response.status === 200) {
        currentTask.value.appStatus = chosenStatus.value;
      }
    };
    return {
      currentTask,
      loading,
      chosenStatus,
      changeHandler,
      changeStatusHandler,
    };
  },
  components: { AppStatus },
});
</script>

<style scoped>
.loader {
  width: 100px;
  height: 100px;
}

.btn-confirm {
  margin: 16px;
  display: flex;
  justify-content: flex-end;
}

.status-wrap {
  display: flex;
  gap: 16px;
}
</style>
