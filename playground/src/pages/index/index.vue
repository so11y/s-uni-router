<template>
  <view>
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
      >跳转ohter等待5秒</wd-button
    >
  </view>
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
