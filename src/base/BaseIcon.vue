<script setup>

const {backdrop, type, color, size} = defineProps(
    {
      size: {
        type: Number,
        default: 16
      },
      type: {
        type: String,
        required: true,
      },
      backdrop: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
      },
    }
)

const emit = defineEmits(['btnClick'])

const handleBtnClick = () => {
  emit('btnClick')
}

const getIconCls = () => {
  let cls = `icon-${this.type}`
  cls += ' iconfont icon-component '
  if (this.color) {
    cls += `icon-color-${this.color}`
  }
  return cls
}


const getIconStyle = () => {
  const chromeMinSize = 12;
  // 支持小于12px
  const retStyle = {fontSize: toRem(size)};
  if (size < chromeMinSize) {
    const ratio = size / chromeMinSize;
    retStyle.transform = `scale(${ratio})`;
  }
  return retStyle;
}
const [classes,styles] = [getIconCls(),getIconStyle()]
</script>

<template>

  <div
      :class='classes'
      :style='styles'
      @click="emit('btnClick')"
  />
</template>


<style lang="scss" scoped>
.backdrop {
  display: inline-block;
  @include flex-center;
  border-radius: 50%;

  &:hover {
    background: var(--round-hover-bgcolor);
  }
}

.icon-component {
  cursor: pointer;
}

.icon-color {
  // 通过prop传入这几个字段
  // 可以使用默认的几个颜色
  &-theme {
    color: $theme-color;
  }

  &-white {
    color: $white;
  }

  &-shallow {
    color: var(--font-color-shallow-grey);
  }
}
</style>
