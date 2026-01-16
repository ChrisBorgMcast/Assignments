// Import Vue and dependencies
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./style.css"

// Start the app
createApp(App).use(router).mount("#app")
