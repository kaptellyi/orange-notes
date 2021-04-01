<p align="center">
  <img height="500" src="https://i.ibb.co/n8277hg/Orange-Notes.webp" />
</p>

<b><h1 align="center">Orange Notes</h1></b>

**Orange Notes** is an app that allows you to create notes and checkboxes and sort them in all kinds of categories with a dozen of interactions. Both notes and categories are customizable!
## Table of Content
  - [**Features**](#features)
  - [**Stack**](#stack)
  - [**Caveats**](#caveats)
  - [**Acknowledgments**](#acknowledgments)
  - [**Setup**](#setup)
___
## **Features**
- **Guide** - a new user will have to complete the initial guide that shows key features of the app
- **Categories** - categories are lists for keeping data. You can specify one of icons to it, change its name or look whenever you want or delete it with the whole data
- **Notes and Checkboxes** - create notes and checkboxes and store them within a category
- **Search notes** - easily search all notes, or notes within a category
- **Selected Notes** - you can select notes and then remove them or copy to another category
- **Trash** - removed notes are stored in the trash that's connected to a specific category. You can view data from here, restore it or remove it forever
- **Editor** - custom rich editor brings opportunities to to adjust content for your needs, style notes and pin them
- **UI** - completely unique and responsive UI adjusted to all mobile devices and laptops
___
## **Stack**
- **React**
- **React Router**
- **Typescript**
- **Redux toolkit** - state management solution (1)
- **Context API** - state management solution (2)
- **CSS/SASS** - styling solution (1)
- **Styled Components** - styling solution (2)
- **React Testing Library** - testing components solution
- **Firebase** - database solution
- **Draft.js** - building custom rich editor solution
- **Font Awesome** - icons
- **Eslint & Prettier** - for code analyze
___
## **Caveats**
1. Because of authentication is implemented without user's awareness, based on firebase, it uses [anonymous authentication](https://firebase.google.com/docs/auth/web/anonymous-auth)  and stores data in browsers. For this reason, cleaning cache or accessing the app in incognito mode will remove the data.
2. Don't forget to add your firebase config in [./api/firebase](src/api/firebase.ts) to run the APP properly!
___
## **Acknowledgments**
> A big thank you to [Ira Naumova](https://www.instagram.com/nirense/) for the orange design
___
## **Setup**
You need to have [Node.js](https://nodejs.org/en) installed.
1. Clone this repository or download the zip
2. Install dependencies with `npm install`
3. Run in any mode you want:
     - live: `npm start`
     - production: `npm run build`
     - tests: `npm run test`
     - live tests: `npm run test:watch`
     - bundle analyze: `node scripts/analyzer`
