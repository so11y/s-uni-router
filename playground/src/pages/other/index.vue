<template>
  <view
    >---other ---
    {{ route }}

    <wd-button
      type="success"
      @click="
        router.push({
          url: 'pages/ppp/index',
          query: {
            aa: '5',
          },
        })
      "
      >跳转ppp等待5秒</wd-button
    >
  </view>
</template>

<script setup lang="ts">
import { useRoute } from "s-uni-router";

const route = useRoute();
</script>
