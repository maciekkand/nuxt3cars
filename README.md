# Cars

Simple CRUD (adding, browsing, updating, deleting) app for cars. Functionality includes also column sorting, pagination, filtering, favorites and very basic new car data validation.

Installation

1. With Docker

* git clone [repo]
* cd [repo]
* npm install
* docker compose up --build
* browser:  http://localhost:3000/

2. Without Docker

* npm install -g json-server
* git clone [repo]
* cd [repo]
* npm install --legacy-peer-deps
* json-server --watch db.json --port 4000
* npm run dev
* browser:  http://localhost:3000/

# Notes for the Code Reviewer

![Lighthouse results](/public/lighthouse.png "Chrome Devtools Lighthouse results")

There are 5 video files illustrating main functionalities of the app, located in /public/video folder

1. **Pinia rather than Vuex**
   Pinia has better DX than Vuex, due to lack of mutations and including individual stores by default. It is also recommended for Vue 3 by Vue core team
2. **Tailwind**
   I write several times faster in it than in (s)css. Moreover, it's faster both during development (jit compiler) and in the resulting application (dead code elimination).
3. **Layout and responsiveness**
   Based on GridCSS and Flexbox.
4. **Validation**
   Vuelidate was throwing an error during installation, and Vee-Validate's validation-observer was not cooperative, within the assumed short timeframe. That is why, I wrote my own (primitive, but likely sufficient for this use case) validation, sanitizing by the way the input text string.
5. **Node.js version**
   I was using 18.17 (LTS), however as I did not really use any new syntax, there should not be any issues with older versions
6. **Lack of semicolons**
   For aesthetic reasons :)


Thank you for reading and have a nice day
