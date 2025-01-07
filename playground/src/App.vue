<script setup lang="ts">
import { onRouterReady } from "s-uni-router";
import { onLoad } from "@dcloudio/uni-app";
import {} from "vue";
onRouterReady("/pages/other/index");
console.log(getCurrentInstance() , "--");
</script>
