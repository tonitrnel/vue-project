declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.module.less' {
  const styles: {
    [className: string]: string
  }
  export = styles
}
declare module '*.less'
