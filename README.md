# Cars

Simple CRUD (adding, browsing, updating, deleting) app for cars. Functionality also includes pagination, filtering, favorites and very basic new car data validation.

* git clone [repo]
* cd [repo]
* npm install (--legacy-peer-deps)
* npx json-server --watch db.json --port 4000  // json-server@0.17.4 or lower
* npm run dev
* browser:  http://localhost:3000/

# Notes

1. **State management: Pinia**
   Pinia has better DX than Vuex, due to lack of mutations and including individual stores by default. It is also recommended for Vue 3 by Vue core team
2. **CSS: Tailwind**
   I write much faster in it than in (s)css. Moreover, it's faster both during development (jit compiler) and in the resulting application (dead code elimination).
3. **Layout and responsiveness**
   GridCSS and Flexbox
4. **e2e tests**
   Playwright - way faster and more reliable than Cypress. It is also the official e2e testing tool for Electron apps
5. **Node.js version**
   20.10
6. **Lack of semicolons**
   For aesthetic reasons :)
