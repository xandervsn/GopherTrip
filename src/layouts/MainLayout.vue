<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Top Header Bar -->
    <q-header elevated>
      <q-toolbar class="bg-red-10">
        <!-- Button to toggle the bottom drawer -->
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleBottomDrawer" />

        <!-- Website Name -->
        <q-toolbar-title> GopherTrip </q-toolbar-title>

        <!-- Additional Content -->
        <div>siruno.dev</div>
      </q-toolbar>
    </q-header>

    <!-- Custom Bottom Drawer -->
    <div class="bottom-drawer" :class="{ open: bottomDrawerOpen }">
      <!-- Toggle Button Above the Drawer -->
      <q-btn
        class="drawer-toggle-btn"
        flat
        dense
        round
        :icon="bottomDrawerOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
        @click="toggleBottomDrawer"
      />

      <!-- Tabs for Sections -->
      <q-tabs v-model="selectedTab" class="bg-white">
        <q-tab name="routes" label="Routes" />
        <q-tab name="stops" label="Stops" />
      </q-tabs>

      <!-- Horizontal Line for Active Tab Indicator -->
      <div class="tab-indicator" :style="indicatorStyle"></div>

      <!-- Tab Panels for Sections -->
      <q-tab-panels v-model="selectedTab" animated>
        <!-- Routes Section -->
        <q-tab-panel name="routes" class="q-px-sm">
          <q-list class="q-px-none">
            <!-- Active Routes Button with Checkbox -->
            <q-item class="q-px-none q-pt-none">
              <div class="active-routes-button row items-center" @click="toggleRoutesVisibility">
                <q-checkbox
                  v-model="allRoutesSelected"
                  size="sm"
                  @update:model-value="toggleAllRoutes"
                />
                <span class="q-ml-sm">Active Routes</span>
                <q-icon
                  :name="showRoutes ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  class="q-ml-auto"
                />
              </div>
            </q-item>

            <q-item v-if="showRoutes" class="q-py-xs" style="padding-left: 25px">
              <q-checkbox v-model="selectedRoutes" val="Route 2" label="Route 2" size="sm" />
            </q-item>

            <q-item v-if="showRoutes" class="q-py-xs" style="padding-left: 25px">
              <q-checkbox v-model="selectedRoutes" val="Route 6" label="Route 6" size="sm" />
            </q-item>
          </q-list>
        </q-tab-panel>

        <!-- Stops Section -->
        <q-tab-panel name="stops">
          <q-list>
            <q-item-label header> Stops Content </q-item-label>
            <q-item>Stop A</q-item>
            <q-item>Stop B</q-item>
            <q-item>Stop C</q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { drawRoute, clearRoute } from '../../script.js' // Import the functions

// Controls the visibility of the bottom drawer
const bottomDrawerOpen = ref(false)

// Controls the selected tab (Routes or Stops)
const selectedTab = ref('routes') // Default to "Routes"

// Controls the selected routes (Route 2 and Route 6)
const selectedRoutes = ref([])

// Controls the state of the "Select All" checkbox
const allRoutesSelected = ref(false)

// Controls the visibility of Route 2 and Route 6
const showRoutes = ref(false)

// Function to toggle the bottom drawer
function toggleBottomDrawer() {
  bottomDrawerOpen.value = !bottomDrawerOpen.value
}

// Function to toggle the visibility of Route 2 and Route 6
function toggleRoutesVisibility() {
  showRoutes.value = !showRoutes.value
}

// Function to toggle all routes
function toggleAllRoutes(value) {
  if (value === true) {
    selectedRoutes.value = ['Route 2', 'Route 6']
  } else if (value === false) {
    selectedRoutes.value = []
  }
}

// Watch for changes in selectedRoutes to update the "Select All" checkbox
watch(selectedRoutes, (newVal) => {
  if (newVal.length === 2) {
    allRoutesSelected.value = true
  } else if (newVal.length === 0) {
    allRoutesSelected.value = false
  }
})

// Watch for changes in selectedRoutes to call drawRoute or clearRoute
watch(selectedRoutes, (newVal, oldVal) => {
  // Determine which routes were added or removed
  const addedRoutes = newVal.filter((route) => !oldVal.includes(route))
  const removedRoutes = oldVal.filter((route) => !newVal.includes(route))

  // Call drawRoute for added routes
  addedRoutes.forEach((route) => {
    drawRoute(route)
  })

  // Call clearRoute for removed routes
  removedRoutes.forEach((route) => {
    clearRoute(route)
  })
})

// Compute the style for the active tab indicator
const indicatorStyle = computed(() => {
  const tabWidth = 100 / 2 // Two tabs, so each tab is 50% width
  const offset = selectedTab.value === 'routes' ? 0 : tabWidth
  return {
    width: `${tabWidth}%`,
    left: `${offset}%`,
  }
})
</script>

<style scoped>
/* Custom Bottom Drawer */
.bottom-drawer {
  position: fixed;
  bottom: -200px; /* Peek out by 20px when closed (height is 300px) */
  left: 0;
  width: 100%;
  height: 300px; /* Set a fixed height */
  background-color: white;
  border-top: 1px solid #ddd;
  border-radius: 20px 20px 0 0; /* Rounded top edges */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: bottom 0.3s ease;
  z-index: 2000; /* Ensure it appears above other content */
}

.bottom-drawer.open {
  bottom: 0; /* Slide into view */
}

/* Toggle Button Above the Drawer */
.drawer-toggle-btn {
  position: absolute;
  bottom: 280px; /* Position above the drawer's peek area */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2001; /* Ensure it appears above the drawer */
}

/* Style for Tabs */
.q-tabs {
  background-color: white;
  border-bottom: 1px solid #ddd;
}

/* Style for Individual Tabs */
.q-tab {
  background-color: white;
  color: #333;
  font-weight: bold;
}

/* Horizontal Line for Active Tab Indicator */
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: teal;
  transition: left 0.3s ease;
}

/* Smaller Checkboxes and Reduced Spacing */
.q-checkbox {
  font-size: 0.875rem; /* Smaller font size */
}

.q-item {
  min-height: 24px; /* Reduced vertical spacing */
  padding: 0; /* Remove padding */
}

/* Remove padding from expansion item header */
.q-expansion-item__header {
  padding-left: 0;
  padding-right: 0;
}

/* Active Routes Button Styling */
.active-routes-button {
  width: 100%;
  padding: 8px 0;
  cursor: pointer;
}

.active-routes-button:hover {
  background-color: #f5f5f5;
}
</style>
