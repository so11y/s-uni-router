import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";

export default {
  presets: [presetWeapp()],
  transformers: [transformerClass()],
};
