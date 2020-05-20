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
import jpg_1 from '~/assets/images/1.jpg'
import jpg_2 from '~/assets/images/2.jpg'
import jpg_3 from '~/assets/images/3.jpg'
import jpg_4 from '~/assets/images/4.jpg'
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
          title: 'Black cappuccino sugar',
          url: jpg_1,
          description: 'Plunger pot dripper crema sit coffee',
        },
        {
          title: 'Cup white foam',
          url: jpg_2,
          description: 'Mug that steamed to go',
        },
        {
          title: 'Aroma mocha',
          url: jpg_3,
          description: 'Foam trifecta',
        },
        {
          title: 'Seasonal et dripper',
          url: jpg_4,
          description: 'Trifecta foam, con panna caffeine',
        },
      ],
      index: 1,
    }
  },
})
</script>

<style scoped lang="less">
@import './common';
.slide {
  &--layout &__figure {
    &:first-child {
      grid-area: ~'2 / 2 / 14 / 10';
    }
    &:nth-child(2) {
      grid-area: ~'2 / 17 / 9 / 21';
    }
    &:nth-child(3) {
      grid-area: ~'14 / 6 / 21 / 9';
    }
    &:nth-child(4) {
      grid-area: ~'11 / 12 / 21 / 18';
    }
  }
}
</style>
