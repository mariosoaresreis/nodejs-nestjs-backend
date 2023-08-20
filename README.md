REST API

REQUIREMENTS

    This coding exercise consists in implementing a little backend micro-service which aims to serve the
    games data.

    FIRST SECTION
    This component will expose a REST api providing CRUD operations to fetch one or several games,
    create, update and delete a game. Though this api, it will also be possible:
    - Fetch only the publisher data for a given game (without any publishers dedicated API – i.e. only by
    using the game API)

    SECOND SECTION
    - To trigger a process which will automatically remove the games having a release date older than 18
    months and apply a discount of 20% to all games having a release date between 12 and 18 months.


ASSUMPTIONS
- The SECOND SECTION of the requirements were implemented in another application. Here, we have only the first SECTION (REST API).
- As the second section is a cron job, it will be implemented separated from REST API, once we want a SINGLE instance for running the jobs, while the REST API may run under MULTIPLE pods.
- In real world applications, records are deleted logically most of the time. This applications is for demonstration purposes, therefore records will be deleted physically.

IMPLEMENTATION
A Logger class was implemented in folder /middleware

TO RUN Integrated Tests:
npm run test:e2e

TO RUN Unit Tests:
npm run test publisher.controller.spec.ts
npm run test publisher.service.spec.ts
npm run test game.controller.spec.ts
npm run test game.service.spec.ts


TO RUN THE APPLICATION:
Go to project's root, in the same level where the file Dockerfile is located:

Open the terminal. Type:
  sudo docker build -t ultra-rest-api .

Then type:  
  sudo docker run -dp 127.0.0.1:3001:3001 ultra-rest-api


Open your browser and type http://localhost:3000/api#/ to access Swagger documentation

A logger to all requests was added in the folder /middleware.  





