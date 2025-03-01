const manifestForPlugIn = {
    registerType:'prompt',
    includeAssets:['/lab-image.jpg'],
    manifest:{
      name:"React-vite-app",
      short_name:"react-vite-app",
      description:"I am a simple vite app",
      icons:[{
        src: '/lab-image.jpg',
        sizes:'192x192',
        type:'image/png',
        purpose:'favicon'
      },
      {
        src:'/lab-image.jpg',
        sizes:'512x512',
        type:'image/png',
        purpose:'favicon'
      },
      {
        src: '/lab-image.jpg',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: '/lab-image.jpg',
        sizes:'512x512',
        type:'image/png',
        purpose:'any maskable',
      }
    ],
    theme_color:'#171717',
    background_color:'#f0e7db',
    display:"standalone",
    scope:'/',
    start_url:"/",
    orientation:'portrait'
    }
  }

  export default manifestForPlugIn;