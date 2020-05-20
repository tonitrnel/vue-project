<template>
  <div class="slideshow">
    <component :is="children" />
    <div class="revealer">
      <div class="revealer__item revealer__item--left"></div>
      <div class="revealer__item revealer__item--right"></div>
    </div>
    <nav class="arrow-nav">
      <button
        class="arrow-nav__item arrow-nav__item--prev"
        :style="{ visibility: hasPrev ? 'visible' : 'hidden' }"
        @click="pageThrough('prev')"
      >
        <svg-icon name="nav" custom-class="icon--nav" />
      </button>
      <button
        class="arrow-nav__item arrow-nav__item--next"
        :style="{ visibility: hasNext ? 'visible' : 'hidden' }"
        @click="pageThrough('next')"
      >
        <svg-icon name="nav" custom-class="icon--nav" />
      </button>
    </nav>

    <!-- navigation -->
    <nav :class="{ nav: true, 'nav--open': isTocOpen }" ref="nav">
      <button class="nav__button" @click="toggleToc">
        <span class="nav__button-text">index</span>
      </button>
      <h2 class="nav__chapter">{{ title }}</h2>
      <div class="toc">
        <router-link
          v-for="nav in navs"
          :key="nav.path"
          class="toc__item"
          active-class="toc__item--active"
          :to="`/photo-album/${nav.path}`"
          ref="toc_items"
        >
          <span class="toc__item-page">{{ nav.index }}.</span>
          <span class="toc__item-title">{{ nav.title }}</span>
        </router-link>
      </div>
    </nav>
    <!-- little sides -->
    <div class="slideshow__indicator" ref="indicatorLeft"></div>
    <div class="slideshow__indicator" ref="indicatorRight"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TimelineLite, Expo } from 'gsap'
import { load } from './children'

// const colors = ['#f6f6f6', '#f0f0f0', '#e3e3e3', '#d7d7d7', '#d0d0d0']
interface Nav {
  path: string
  title: string
  index: string
}
// interface Props {}
interface Data {
  isTocOpen: boolean
  navs: Nav[]
  children: Vue | null
  hasNext: boolean
  hasPrev: boolean
  scale: number
}
let isRouteChange = false

const timeline = new TimelineLite({
  autoRemoveChildren: true,
})

interface WinRect {
  width: number
  height: number
}

class FigureItem {
  DOM!: {
    el: Element
    inner: Element
    image: HTMLImageElement
    reveal: Element
    title: Element
    description: Element
  }
  rect!: DOMRect
  constructor(el: Element) {
    const inner = el.querySelector('.slide__figure-inner') as Element
    const image = inner.querySelector('.slide__figure-img')
    const reveal = inner.querySelector('.slide__figure-reveal')
    const title = el.querySelector('.slide__figure-title')
    const description = el.querySelector('.slide__figure-description')
    this.calcRect()
  }
  calcRect = (): void => {
    this.rect = this.DOM.el.getBoundingClientRect()
  }
  getSide(size: WinRect): 'right' | 'left' {
    const rect = this.rect
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top / rect.height / 2,
    }
    return center.x >= size.width / 2 ? 'right' : 'left'
  }
}

class Slide {
  rect!: WinRect
  items: FigureItem[] = []
  direction: 'prev' | 'next' = 'next'
  dispatch = (): void => {
    this.calcRect()
    for (const item of this.items) {
      item.calcRect()
    }
  }
  private calcRect = (): void => {
    this.rect = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  private timeline!: TimelineLite
  constructor(readonly el: Element) {
    this.items = Array.from(el.querySelectorAll('.slide__figure')).map(
      (v) => new FigureItem(v)
    )
  }
  // registerEvents() {
  //   window.addEventListener('resize', this.dispatch)
  // }
  // unregisterEvents() {
  //   window.removeEventListener('resize', this.dispatch)
  // }
  // startAnimation() {
  //   return new Promise((resolve) => {
  //     const duration = 1
  //     const ease = Expo.easeOut
  //     this.timeline = new TimelineLite({ onComplete: resolve }).add('begin')
  //     for (const item of this.items) {
  //       this.timeline.to(
  //         item.DOM.el,
  //         duration,
  //         {
  //           ease,
  //           startAt: { x: this.direction === 'next' ? 60 : -60, opacity: 1 },
  //           x: '0%',
  //         },
  //         'begin'
  //       )
  //     }
  //   })
  // }
}

export default Vue.extend({
  name: 'photo-album',
  data(): Data {
    return {
      isTocOpen: false,
      navs: [
        {
          path: '1',
          index: '01',
          title: 'Riding on a storm',
        },
        {
          path: '2',
          index: '03',
          title: 'Guidelines for happiness',
        },
        {
          path: '3',
          index: '05',
          title: 'Freedom fighter',
        },
        {
          path: '4',
          index: '07',
          title: 'Lost and found',
        },
        {
          path: '5',
          index: '09',
          title: 'Fantasies of Wood',
        },
      ],
      hasPrev: false,
      hasNext: true,
      children: null,
      scale: 0,
    }
  },
  mounted() {
    const { indicatorRight } = this.$refs as {
      indicatorRight: Element
      indicatorLeft: Element
    }
    timeline.set(indicatorRight, { scaleX: 0 })
    this.load()
  },
  beforeRouteUpdate(to, from, next) {
    isRouteChange = true
    // if (to.params.page > from.params.page) {
    //   direction = 'next'
    // } else {
    //   direction = 'prev'
    // }
    next()
  },
  updated() {
    if (isRouteChange) {
      this.isTocOpen = false
      isRouteChange = false
      this.load()
    }
  },
  methods: {
    async toggleToc() {
      this.isTocOpen = !this.isTocOpen
    },
    pageThrough(direction: 'next' | 'prev') {
      const { page } = this.$route.params
      if (direction === 'next' && this.hasNext) {
        this.$router.push({
          params: {
            page: (Number(page) + 1).toString(),
          },
        })
      } else if (this.hasPrev) {
        this.$router.push({
          params: {
            page: (Number(page) - 1).toString(),
          },
        })
      }
    },
    async load() {
      document.title = this.title
      const page = Number(this.$route.params.page)
      this.hasPrev = page > 1
      this.hasNext = page < this.navs.length
      const scale = (page - 1) / this.navs.length
      const { indicatorRight, indicatorLeft } = this.$refs as {
        indicatorRight: Element
        indicatorLeft: Element
      }
      timeline.to(indicatorRight, 0.5, { scaleX: scale, ease: Expo.easeOut })
      timeline.to(indicatorLeft, 0.5, { scaleX: 1 - scale, ease: Expo.easeOut })
      try {
        this.children = await load(page.toString())
      } catch (e) {
        console.error(e)
      }
    },
  },
  computed: {
    title(): string {
      const { page } = this.$route.params
      return this.navs.find((v) => v.path === page)?.title ?? this.navs[0].title
    },
  },
  watch: {
    isTocOpen(v) {
      const { toc_items } = this.$refs as {
        toc_items: Vue[]
      }
      const items = toc_items.map((v) => v.$el)
      if (v) {
        timeline.to(items, 1, {
          ease: Expo.easeOut,
          startAt: { opacity: 0, y: 10 },
          opacity: 1,
          y: 0,
          stagger: 0.02,
        })
      } else {
        // 打开动画可能尚未完成，需要直接清除
        timeline.clear()
        timeline.to(items, 0, { opacity: 0 })
      }
    },
  },
})
</script>

<style scoped lang="less">
@import url('https://use.typekit.net/txt8osa.css');
.slideshow {
  width: 100vw;
  height: 100vh;
  position: relative;
  font-family: Futura, futura-pt, Arial, sans-serif;
  &__indicator {
    width: 10px;
    background-color: #334bf7;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: 100;
    transform-origin: 0 50%;
    &:last-child {
      left: auto;
      right: 0;
      transform-origin: 100% 50%;
    }
  }
}
.revealer {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  left: 0;
  top: 0;
  display: flex;
  z-index: 500;
  &__item {
    width: 50%;
    height: 100%;
    position: relative;
    overflow: hidden;
    &--left {
      border-right: 1px solid#f0f0f0;
    }
    &-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      transform: translate3d(100%, 0, 0);
    }
  }
}
.nav {
  display: block;
  position: absolute;
  top: 1rem;
  left: calc(1rem + 10px);
  z-index: 400;
  &__button {
    border: 0;
    margin: 0 1rem 0.5rem 0;
    padding: 0;
    line-height: 1;
    background: none;
    color: var(--color-link-alt);
    &:focus {
      outline: none;
    }
    &:hover {
      color: var(--color-link-hover);
    }
    &-text {
      position: relative;
      padding-right: 0.75rem;
      display: block;
      &::after,
      &::before {
        content: '';
        position: absolute;
        height: 1px;
        top: 50%;
        width: 7px;
        right: 0;
        background: currentColor;
      }
      &::after {
        transition: opacity 0.2s, transform 0.2s;
      }
      &::before {
        transform: rotate(90deg);
        transition: transform 0.2s;
      }
    }
  }
  &--open &__button-text {
    &::after {
      transform: rotate(90deg);
      opacity: 0;
    }
    &::before {
      transform: rotate(0deg);
    }
  }
  &--open .toc__item {
    pointer-events: auto;
  }
  &__chapter {
    font-size: inherit;
    font-weight: normal;
    margin: 0;
    display: inline-block;
    line-height: 0;
    opacity: 1;
  }
  &--open &__chapter {
    opacity: 0;
  }
}
.toc__item {
  pointer-events: none;
  opacity: 0;
  display: block;
  margin: 0.35rem 0;
  &-page {
    display: inline-block;
    width: 1.5rem;
    pointer-events: none;
    color: var(--color-text-alt);
  }
  &-title {
    pointer-events: none;
    color: var(--color-link-toc);
  }
  &:hover &-title,
  &--active &-title {
    color: var(--color-link-hover);
  }
}
.arrow-nav {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  align-items: center;
  justify-content: space-between;
  z-index: 400;
  padding: 1.15rem;
  box-sizing: border-box;
  &__item {
    pointer-events: auto;
    border: 0;
    padding: 0;
    margin: 0;
    background: none;
    color: var(--color-link-alt);
    &:hover {
      color: var(--color-link-hover);
    }
    &--prev {
      visibility: hidden;
    }
    &--next:hover .icon--nav {
      transform: translate3d(-2px, 0, 0);
    }
    &--prev:hover .icon--nav {
      transform: rotate(180deg) translate3d(-2px, 0, 0);
    }
  }
  .icon--nav {
    pointer-events: none;
    width: 1.5em;
    height: 1.5em;
    transition: transform 0.2s;
  }
}
.bubble {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #60bda4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #fff;
  z-index: 2;
  &-pulse {
    position: absolute;
    height: 120px;
    width: 120px;
    z-index: 0;
    left: 50%;
    top: 50%;
    margin-top: -60px;
    margin-left: -60px;
    background-color: rgba(96, 189, 164, 0.97);
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
  }
}
</style>
<style lang="less">
.arrow-nav {
  &__item--prev .icon {
    transform: rotate(180deg);
  }
}
</style>
