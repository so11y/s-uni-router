<style lang="scss" scoped></style>

<template>
  <!-- <DefaultLayout> -->
  <view class="content">
    333
    <text class="title c-red font-size-32">333</text>
    <wd-button>主要按钮</wd-button>
    <wd-button
      type="success"
      @click="
        router.push({
          url: 'pages/other/index',
          query: {
            aa: '1',
          },
        })
      "
      >成功按钮</wd-button
    >
    <wd-button type="info">信息按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">危险按钮</wd-button>

  </view>
  <!-- </DefaultLayout> -->
</template>

<script setup lang="ts">
import { useRouter } from "s-uni-router";
import { onLoad, onShow, onMounted } from "s-uni-router";

const router = useRouter();

onLoad(() => {
  console.log("onLoad/首次界面加载完成并路由周期走完才执行");
});

onShow(() => {
  console.log("onShow");
});

onMounted(() => {
  console.log("onMounted");
});
</script>
