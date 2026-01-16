<template>
  <!-- Back button -->
  <button class="btn mb-3 back-btn" style="background-color: #1A1A1A; color: #28A745; border: 2px solid #28A745; border-radius: 8px; font-weight: 600; padding: 8px 20px; box-shadow: 0 0 10px rgba(40, 167, 69, 0.2); transition: all 0.3s ease;" @click="$router.back()">
    ⬅ Back
  </button>
</template>

<style scoped>
/* Hover effect */
.back-btn:hover {
  background-color: #2C2C2C !important;
  transform: translateX(-5px);
  box-shadow: 0 0 15px rgba(40, 167, 69, 0.4) !important;
}

/* Click effect */
.back-btn:active {
  transform: translateX(-3px) scale(0.98);
}
</style>
