<template>
  <!-- 公共 icon 组件 -->
  <span class="base-icon"
        :class="iconSize"
        :style="iconStyle">
    <svg v-if="iconType === 'svg'"
         :style="styleObj"
         :class="[iconName, iconSize]"
         aria-hidden="true"
         class="svg">
      <use :xlink:href="iconName"></use>
    </svg>
    <i v-if="iconType === 'font'"
       :style="styleObj"
       :class="[iconName, iconSize]"
       class="icon font"></i>
  </span>
</template>

<script>
import funs from "@/common/js/funs.js";

export default {
  props: {
    iconType: {
      type: String,
      required: false,
      default: "svg"
    },
    iconClass: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "normal"
    },
    width: {
      type: String,
      required: false,
      default: "24px"
    },
    height: {
      type: String,
      required: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    styleObj () {
      if (funs.isUndef(this.height)) {
        return {
          width: this.width,
          height: this.width
        };
      } else {
        return {
          width: this.width,
          height: this.height
        };
      }
    },
    iconStyle () {
      let bgImg, obj = {}
      if (this.iconType === "img") {
        bgImg = require(`@/assets/img/${this.iconClass}.png`)
        obj = {
          "background-image": `url(${bgImg})`
        }
      }

      Object.assign(obj, this.styleObj);
      return obj;
    },
    iconName () {
      return `#icon-${this.iconClass}`;
    },
    iconSize () {
      if (this.iconType !== "img") {
        return `icon-size-${this.size}`;
      }
      else {
        return ""
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-icon {
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .svg {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .font {
    display: inline-block;
  }
}
</style>