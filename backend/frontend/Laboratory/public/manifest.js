const manifestForPlugIn = {
    registerType:'prompt',
    includeAssets:['/lab-image.jpg'],
    manifest:{
      name: "Sri lab",
      short_name: "Sri lab",
      description:"I am a simple vite app",
      icons:[{
        src: '/lab-image.jpg',
        sizes:'512x512',
        type:'image/jpeg',
        purpose:'any maskable'
      },
      {
        src:'/lab-image.jpg',
        sizes:'1024x1024',
        type:'image/jpeg',
        purpose:'any maskable'
      },
      {
        src: '/lab-image.jpg',
        sizes:'1920x1920',
        type:'image/jpeg',
        purpose:'any maskable',
      },
      {
        src: '/lab-image.jpg',
        sizes:'256x256',
        type:'image/jpeg',
        purpose:'any maskable'
      },
      {
        src: '/lab-image.jpg',
        sizes:'384x384',
        type:'image/jpeg',
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