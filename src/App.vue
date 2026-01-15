<template>
  <nav class="navbar navbar-expand-md navbar-dark" style="background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%); box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/" style="color: #28A745 !important; font-size: 1.5rem; text-shadow: 0 0 10px rgba(40, 167, 69, 0.3);">Valletta Suites Hotel</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" style="color: #A8E6A1 !important; font-weight: 500;">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/listings" style="color: #A8E6A1 !important; font-weight: 500;">Listings</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/add-booking" style="color: #A8E6A1 !important; font-weight: 500;">Add Booking</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="container py-4">
    <RouterView v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>

<style>
body {
  background: linear-gradient(135deg, #1F1F1F 0%, #2C2C2C 100%);
  min-height: 100vh;
}

.navbar-nav .nav-link.router-link-active {
  color: #28A745 !important;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(40, 167, 69, 0.4);
}

.navbar-nav .nav-link:hover {
  color: #28A745 !important;
  text-shadow: 0 0 8px rgba(40, 167, 69, 0.4);
}

/* Page Transitions */
.fade-slide-enter-active {
  transition: all 0.4s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
