<template>
  <view>
    <view>---pppp ---{{ router.route }}</view>
    <wd-button
      type="success"
      @click="
        router.push({
          url: 'pages/other/index',
          query: {
            aa: '5',
          },
        })
      "
      >跳转ohter等待5秒</wd-button
    >
  </view>
</template>

<script setup lang="ts">
import { useRouter } from "s-uni-router";

const router = useRouter();
</script>
