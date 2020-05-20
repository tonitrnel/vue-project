<template>
  <div class="slide slide--layout">
    <figure v-for="image in images" :key="image.title" class="slide__figure">
      <div class="slide__figure-inner">
        <div
          class="slide__figure-img"
          :style="{ backgroundImage: `url(${image.url})` }"
        ></div>
        <div class="slide__figure-reveal" />
      </div>
      <figcaption>
        <h3 class="slide__figure-title">{{ image.title }}</h3>
        <p class="slide__figure-description">{{ image.description }}</p>
      </figcaption>
    </figure>
    <span class="slide__number slide__number--left">{{ index }}</span>
    <span class="slide__number slide__number--right">{{ index + 1 }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import jpg_12 from '~/assets/images/12.jpg'
import jpg_13 from '~/assets/images/13.jpg'
import jpg_14 from '~/assets/images/14.jpg'
import jpg_15 from '~/assets/images/15.jpg'
interface Figure {
  url: string
  title: string
  description: string
}
interface Data {
  images: Figure[]
  index: number
}
export default Vue.extend({
  name: 'photo-album-children',
  data(): Data {
    return {
      images: [
        {
          title: 'Kopi-luwak body',
          url: jpg_12,
          description: 'Affogato steamed single shot',
        },
        {
          title: 'Ut crema eu cultivar',
          url: jpg_13,
          description: 'Black flavour qui robusta',
        },
        {
          title: 'Sit, in americano iced acerbic',
          url: jpg_14,
          description: 'Macchiato whipped, chicory mug',
        },
        {
          title: 'At redeye, white foam extra',
          url: jpg_15,
          description: 'Variety black grounds espresso',
        },
      ],
      index: 7,
    }
  },
})
</script>

<style scoped lang="less">
@import './common';
.slide {
  &--layout &__figure {
    &:first-child {
      grid-area: ~'1 / 6 / 8 / 10';
    }
    &:nth-child(2) {
      grid-area: ~'3 / 12 / 10 / 18';
    }
    &:nth-child(3) {
      grid-area: ~'11 / 4 / 21 / 9';
    }
    &:nth-child(4) {
      grid-area: ~'13 / 12 / 21 / 18';
    }
  }
}
</style>
