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
import jpg_8 from '~/assets/images/8.jpg'
import jpg_9 from '~/assets/images/9.jpg'
import jpg_10 from '~/assets/images/10.jpg'
import jpg_11 from '~/assets/images/11.jpg'
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
          title: 'White filter',
          url: jpg_8,
          description: 'Breve, brewed ristretto rich arabica',
        },
        {
          title: 'Java half and half',
          url: jpg_9,
          description: 'Et aged so, sweet cup',
        },
        {
          title: 'Steamed et mazagran',
          url: jpg_10,
          description: 'As cultivar froth fair trade',
        },
        {
          title: 'Coffee mazagran eu',
          url: jpg_11,
          description: 'Breve seasonal frappuccino',
        },
      ],
      index: 5,
    }
  },
})
</script>

<style scoped lang="less">
@import './common';
.slide {
  &--layout &__figure {
    &:first-child {
      grid-area: ~'3 / 6 / 8 / 10';
    }
    &:nth-child(2) {
      grid-area: ~'2 / 14 / 9 / 21';
    }
    &:nth-child(3) {
      grid-area: ~'10 / 2 / 18 / 10';
    }
    &:nth-child(4) {
      grid-area: ~'11 / 12 / 21 / 18';
    }
  }
}
</style>
