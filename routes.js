import HomePage from './pages/HomePage.vue'

export const routes = [
  { path: '/', name: 'Home', component: Homepage },
  { path: '/favorites', name: 'Favorites', component: () => import('./pages/FavoritesPage.vue') },
]
