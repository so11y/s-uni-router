<template>
  <slot v-if="readyRouter" />
</template>
<script setup>
import { onShow } from "s-uni-router";
import { useGuardsReady, useGuardsImpl } from "s-uni-router";
import { last } from "lodash-es";

const readyRouter = useGuardsReady();

function getCurrentPageParams() {
  const page = last(getCurrentPages());
  useGuardsImpl().fixRouterPath(page.route);
}

onShow(getCurrentPageParams);
</script>
