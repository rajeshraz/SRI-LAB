const manifestForPlugIn = {
    registerType:'prompt',
    includeAssets:['/maskable_icon.png'],
    manifest:{
      name: "Sri lab",
      short_name: "Sri lab",
      description:"I am a simple vite app",
      icons:[{
        src: '/maskable_icon.png',
        sizes:'192x192',
        type:'image/png',
        purpose:'any maskable'
      },
      {
        src: '/maskable_icon.png',
        sizes:'512x512',
        type:'image/png',
        purpose:'any maskable'
      },
      {
        src:'/maskable_icon.png',
        sizes:'1024x1024',
        type:'image/png',
        purpose:'any maskable'
      },
      {
        src: '/maskable_icon.png',
        sizes:'144x144',
        type:'image/png',
        purpose:'any maskable',
      },
      {
        src: '/maskable_icon.png',
        sizes:'256x256',
        type:'image/png',
        purpose:'any maskable'
      },
      {
        src: '/maskable_icon.png',
        sizes:'384x384',
        type:'image/png',
        purpose:'any maskable'
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