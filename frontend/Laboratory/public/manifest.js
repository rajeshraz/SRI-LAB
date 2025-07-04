const manifestForPlugIn = {
    registerType:'prompt',
    includeAssets:['/lab-image.jpg'],
    manifest:{
      name: "Sri lab",
      short_name: "Sri lab",
      description:"I am a simple vite app",
      icons:[{
        src: '/app-icon.jpg',
        sizes:'192x192',
        type:'image/jpeg',
        purpose:'any maskable'
      },
      {
        src:'/app-icon.jpg',
        sizes:'512x512',
        type:'image/jpeg',
        purpose:'any maskable'
      },
      {
        src: '/app-icon.jpg',
        sizes:'180x180',
        type:'image/jpeg',
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