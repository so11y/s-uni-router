<template>
  <slot v-if="readyRouter" />
</template>
<script setup>
import { onShow } from "s-uni-router";
import { useGuardsReady, useGuardsImpl } from "s-uni-router";

const readyRouter = useGuardsReady();

function getCurrentPageParams() {
  const page = getCurrentPages().slice(-1);
  if (page.length) {
    useGuardsImpl().fixRouterPath(page.route);
  }
}

onShow(getCurrentPageParams);
</script>
