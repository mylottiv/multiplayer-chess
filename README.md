# multiplayer-chess

## App Description

Web Application for playing Chess Online with others. With an engine built on top of algorithmic notation, the client can both generate and display moves from live player choices as well as play/replay games from logs. The backend will handle matchmaking, both unranked and ranked with Elo, persistent game logs and Elo rank storage with User registration/login, and host the main game engine, managing matches through socket subscriptions.

## Dependencies/Libraries

### Frontend

- **React**:
Front End Javascript Component Framework.
- **Apollo-Client**:
State Management and GraphQL Queries.
- **Twin with Styled Components**
Babel Macro to use Tailwind utility classes inside a CSS-in-JS library, here using Styled Components.
- **Tailwind with PostCSS**:
Low level utility class oriented CSS framework. Included with postprocessor alongside Twin for use of global base classes.


### Backend

- **Next**:
Lightweight React backend Framework with Static Page Generation, Server Side Rendering, and API routing.
- **Apollo-Server**:
GraphQL Schemas and Queries and Websocket Subscriptions.
- **Auth0**:
Painless JWT based Identity Management with Single Sign On and Multifactor Authentication.
- **bcrypt**:
Hashing and Decrypting solutions allowing non-Facebook/Google/Etc. Registration and login.
- **ObjectionJS**:
Object Relational Mapping for SQL Database.
    
## Chess Engine

### Fundamentals

### Notation

## Chess Client

## Server Backend