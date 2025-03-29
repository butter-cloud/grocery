import localFont from 'next/font/local'

const mori = localFont({
  src: [
    {
      path: './PPMori-Extralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './PPMori-ExtralightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: './PPMori-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './PPMori-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './PPMori-SemiBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './PPMori-SemiBoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-mori',
  preload: true,
})

export default mori
