<h1 align="center">
  <br>
  a href="https://mande-frontend-r26hnwsuj-mandeuv.vercel.app/"><img src="./assets/logo.svg" alt="MANDE" width="200"></a>
  <br>
  MANDE
  <br>
</h1>

<div style="display:flex; justify-content: center; gap: 20px;">

[![forthebadge](./assets/made-with-next.svg)](https://forthebadge.com) 

[![forthebadge](./assets/built-with-love.svg)](https://forthebadge.com)

</div>

<h4 align="center">A web application that brings workers and customers together <strong style="color: yellow;">in one place</strong></h4>

<div style="display:flex; justify-content: center; gap: 20px;">


  [![Deployment Pipeline](https://github.com/Carlosher007/Mande-Frontend/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Carlosher007/Mande-Frontend/actions/workflows/pipeline.yml)

  [![Vercel Preview Deployment](https://github.com/Mande-Project/Mande-Frontend/actions/workflows/preview.yaml/badge.svg)](https://github.com/Mande-Project/Mande-Frontend/actions/workflows/preview.yaml)

</div>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#docker">Docker and docker compose</a> •
  <a href="#members">Project Members</a> •
</p>


## Installation and usage

First, go to the **client folder** and install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

#### Run the docker compose for development

- To run the Next.js project with docker-compose you will build the docker image and then run the container. To do this you will run:
  - `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build`
  - You are instructing docker to use Buildkit which will speed up the docker build process.
- To run Next.js with Docker and docker-compose you can then run:
  - `docker-compose up`
  - It will show the same output as running the app without docker when you hit http://localhost:3000 on your favorite browser after docker-compose up runs without any error.

#### Run the docker compose for production

- With this commands you can deploy your app to production.
  - `docker build -t mande-production:latest .`
  - `docker-compose -f docker-compose.production.yml up -d`
- With this command you can down the image from production and delete it.
  - `docker-compose -f docker-compose.production.yml down --volumes`

#### Run the docker image from Docker Hub
- You have to run the following command:
  - `sudo docker run --name mande-project -d -p 3000:3000 carlosher07/mande-react-app:latest`
- Then, you can see the container running with the following command:
  - `docker ps`
- To stop the container you have to run the following command:
  - `docker stop mande-project`

## Members
