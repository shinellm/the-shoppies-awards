# the-shoppies-awards

### If you want to see the project in action, [visit the delpoyed project on Heroku](https://the-shoppies-awards.herokuapp.com/)!

This project is my submission for the UX Developer Intern & Web Developer Intern Challenge created by [Shopify](https://www.shopify.com/careers/developer-internships-data-science-internships-winter-2021-826aeb). The project was built using my [boilerplate-cra-nodejs](https://github.com/shinellm/boilerplate-cra-nodejs) project, which has a [React](https://github.com/facebook/create-react-app) frontend and a custom Node backend (server for API, proxy, & routing).

In this project you are presented with a webpage that can search OMDB for movies. It allows users to save their favorite films they feel should be up for nomination in The Shoppies: Movie awards for entrepreneurs.

* ✨ [Project Features](#user-content-project-features)
* 👾 [Web Demo](#user-content-web-demo)
* 🗂 [File Layout](#user-content-file-layout)
* 💻 [Local Development](#user-content-local-development)

## Project features
The minimal requirement for this project were to create a user interface that does the following:
* The webpage searches OMDB and displays movies only
* Users can add a movie from the search results to their nomination list
* Users can view the list of films already nominated
* Users can Remove a nominee from their nomination list
* Users can nominate up to 5 of their favorite films

Some technical requirements mentioned:
* Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).
* Each search result should list at least its title, year of release and a button to nominate that film.
* Updates to the search terms should update the result list
* Movies in search results can be added and removed from the nomination list.
* If a search result has already been nominated, disable its nominate button.
* Display a banner when the user has 5 nominations.

Additional features that I added:
* Created a simple landing page to give users some information about the site and instructions on how to use it
* Emulated the [Popdog Beta](https://popdog.com/games) game card hover effect
* Users can trigger a modal that displays movie details just by clicking on a movie title's image
* A load more button, which loads in more movies that fit the movie title a user has searched for
* Integrated notifications, which popup in the bottom right hand corner when the user has added/removed a movie from their nominations list
* Added a confirmation page, which the user is navigated to after successfully submitting their list of 5 movie nominations
* Added an error page, which appears if a user's list of 5 movie nominations was not successfully submitted
* Added a 404 page if the user navigates to a page that doesn't exist
* Created a nominees page to display all of the movies that have been nominated so far and how many nominations each has received
* Highlighted the nominated movies which rank in the top 3 for most nominations
* Integrated the ability to quickly create/share posts about the site on social media
* Created scroll button to quickly navigate to the top of the page
* Added various usability enhancements, animations, and styling (the website is not currently mobile ready, but is desktop ready)

## Web Demo

A small demo of the website is shown below:



## File Layout

This project consists of a client folder, which contains the React frontend UI, and a server folder, which contains the Node backend server. The boilerplate is a combination of two npm projects, so there are two `package.json` configs and therefore two places to run `npm` commands:

  1. [**Node server**](server/): [`./package.json`](package.json)
      * contains express starter code in the [`server/app.js`](server/app.js) file
      * contains example api routing in the [`server/api/index.js`](server/api/index.js) file
  2. [**React client**](client/): [`client/package.json`](client/package.json)
      * generated by [create-react-app](https://github.com/facebook/create-react-app)
      * production build generated via `build` script in the Node server's [`./package.json`](package.json)

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API Server** at the root `./`
2. **React Frontend UI** in `client/` directory.

* 📝 **Note:** To simplify this process, `"npm-run-all"` was added to the devDependencies. Local development can instead be started at the root `./` via [`"dev"` script](/package.json):
```bash
# Initial setup
npm install

# Start the backend and frontend servers
npm run dev
```

### Run the Node API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server at http://localhost:8080/
npm start
```

Install new npm packages for Node:

```bash
npm install package-name --save
```


### Run the React Frontend UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](client/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd client/

# Initial setup
npm install

# Start the server http://localhost:3000/
npm start
```

Install new npm packages for React Frontend UI:

```bash
# Always change directory, first
cd client/

npm install package-name --save
```
