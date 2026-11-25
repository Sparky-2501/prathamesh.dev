# Prathamesh Shelke - Portfolio

React + Vite + Tailwind + GSAP + Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # test the production build locally
```

Needs Node 18+.

## Where to edit things (you rarely need to touch components)

| I want to...                         | Edit this file                  |
| ------------------------------------ | ------------------------------- |
| add / reorder projects               | `src/data/projects.js`          |
| change skills, icons, levels         | `src/data/skills.js`            |
| add / remove certificates            | `src/data/certificates.js`      |
| update DSA numbers, Codolio link     | `src/data/competitive.js`       |
| change the loader text / speed       | top of `src/components/Intro.jsx` |
| contact-form (EmailJS) keys          | `src/config.js` or `.env`       |
| change the button hover effect       | `.btn-fill` in `src/index.css`  |

Images: put them in `src/assets/` and **import** them (`import pic from "../assets/pic.jpg"`).
Never write `"/src/assets/pic.jpg"` as a plain string - it works in dev but breaks after deploy.
Keep file names exactly the same case everywhere (`Pic.jpg` and `pic.jpg` are different on Linux hosts).

## Deploy

Vercel / Netlify / Render static site: build command `npm run build`, output directory `dist`.
For GitHub Pages under `/repo-name/`, set `base: "/repo-name/"` in `vite.config.js`.
