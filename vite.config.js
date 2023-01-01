// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'site/index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        shopPage: resolve(__dirname, 'site/shop.html'),
        singleProduct: resolve(__dirname, 'site/single-product.html'),
        checkoutPage: resolve(__dirname, 'site/checkout.html'),
        cartPage: resolve(__dirname, 'site/cart.html'),
      },
    },
  },
})