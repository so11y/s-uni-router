<style lang="scss" scoped></style>

<template>
  <view>
    <view class="content">---pppp ---{{ router.route }}</view>
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
      >成功按钮</wd-button
    >
  </view>
</template>

<script setup lang="ts">
import { useRouter } from "s-uni-router";

const router = useRouter();
</script>
