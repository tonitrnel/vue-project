import Vue from 'vue'
import SvgIcon from './svg-icon.vue'

Vue.component('svg-icon', SvgIcon)

const req = require.context('~/assets/icons', false, /\.svg$/)

type RequireContext = typeof req

const requireAll = (requireContext: RequireContext): RequireContext[] =>
  requireContext.keys().map<RequireContext>(requireContext)

requireAll(req)
