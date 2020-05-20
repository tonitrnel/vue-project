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
import jpg_16 from '~/assets/images/16.jpg'
import jpg_17 from '~/assets/images/17.jpg'
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
          title: 'Aftertaste roast',
          url: jpg_16,
          description: 'Instant extra beans decaffeinated',
        },
        {
          title: 'Brewed sit in instant shop',
          url: jpg_17,
          description: 'Blue mountain, java crema',
        },
      ],
      index: 9,
    }
  },
})
</script>

<style scoped lang="less">
@import './common';
.slide {
  &--layout &__figure {
    &:first-child {
      grid-area: ~'5 / 1 / 18 / 10';
    }
    &:nth-child(2) {
      grid-area: ~'5 / 12 / 18 / 21';
    }
  }
}
</style>
