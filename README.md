# My Spotify 2021 - An app for displaying my music listening from 2021

See the app here: https://my-spotify-2021.herokuapp.com/

Enter or select from the drop down an artist, to see which songs I listened to, and how many times!

### Development

One of my goals for this project was to get more experience using a Node.js/Postgres Backend. The app was created and deployed with:

- React
- Node.js
- Postgres
- Heroku

I populated the backend with data I requested from spotify, which the user can the access through the React build front end.

### Next steps

Currently, the app sucessfully fetches data based on the user entry to show my listens for each artist in 2021. I am currently implementing a feature to use the Spotify API to provide information about and image of the artist, when entered by the user.

15/03/2022 - The app is now connected to the Spotify API, and retrieves pictures and info about artists as well. Next up, making it look good!

17/03/2022 - Sucessfully implemented a bar chart using Recharts. Still need to work on design and UI and some issues with functionality.

21/03/2022 - Used Chakra UI to add styling and formatting. Next step is to make the site responsive, and to resolve some issues around the spotify fetch not working after a band that doesn't exist in the database is entered.

23/03/2022 - I've used Chakra to make the site responsive, so it looks clean on desktop and mobile. Once I can resolve a few lingering issues around the fetch, the main feature should be complete.
