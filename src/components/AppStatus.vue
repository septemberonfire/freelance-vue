<template>
  <span class="badge" :class="type">{{ text }}</span>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "warning",
      validator(val: string) {
        return ["primary", "warning", "danger"].includes(val);
      },
    },
  },
  setup(props) {
    const text = computed(() => {
      if (props.type === "primary") {
        return "Завершена";
      } else if (props.type === "warning") {
        return "В процессе";
      } else if (props.type === "danger") {
        return "Отменена";
      }
    });
    return { text };
  },
});
</script>
