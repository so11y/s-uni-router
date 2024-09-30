<style lang="scss" scoped></style>

<template>
  <view class="content"
    >---other ---
    {{ route }}
  </view>
</template>

<script setup lang="ts">
import { useRoute } from "s-uni-router";

const route = useRoute();
</script>
