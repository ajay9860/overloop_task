<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Movie App</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Search</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/favorites">Favorites</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Center the routed page -->
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>
