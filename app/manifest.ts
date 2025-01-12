import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SmartPetFeeder',
    short_name: 'PetFeeder',
    description: 'An automated, intelligent pet feeder.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F2F2F2',
    theme_color: '#F7BE7A',
    icons: [
      {
        src: '/icons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
