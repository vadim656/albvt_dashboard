module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
    theme: {
      extend: {},
      container: {
        padding: '2rem',
        center: true,
      },
      screens: {
        'tablet': '640px',  
        'laptop': '1024px',
        'desktop': '1220px',

      },
    },
    plugins: [],
  }