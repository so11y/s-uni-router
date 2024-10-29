<template>
  <slot v-if="readyRouter" />
</template>
<script setup>
import { onShow } from "s-uni-router";
import { useGuardsReady, useGuardsImpl } from "s-uni-router";

const readyRouter = useGuardsReady();


onShow(() => useGuardsImpl().fixRouterPath())
</script>
