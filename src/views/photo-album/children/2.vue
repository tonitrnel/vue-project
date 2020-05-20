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
import jpg_5 from '~/assets/images/5.jpg'
import jpg_6 from '~/assets/images/6.jpg'
import jpg_7 from '~/assets/images/7.jpg'
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
          title: 'Carajillo percolator',
          url: jpg_5,
          description: 'White sugar plunger pot half',
        },
        {
          title: 'Cortado organic skinny',
          url: jpg_6,
          description: 'As aromatic, grinder turkish',
        },
        {
          title: 'Qui coffee, americano',
          url: jpg_7,
          description: 'Espresso percolator iced rich',
        },
      ],
      index: 3,
    }
  },
})
</script>

<style scoped lang="less">
@import './common';
.slide {
  &--layout &__figure {
    &:first-child {
      grid-area: ~'4 / 1 / 18 / 10';
    }
    &:nth-child(2) {
      grid-area: ~'2 / 12 / 9 / 18';
    }
    &:nth-child(3) {
      grid-area: ~'10 / 16 / 21 / 21';
    }
  }
}
</style>
