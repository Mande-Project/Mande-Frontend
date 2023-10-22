This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Next With Docker: "The best form you get over works on my machine syndrome."

> **Remember :** The Docker file is production ready and Docker compose in this case is designed to be used for development only.

## Run the docker compose for development

- To run the Next.js project with docker-compose you will build the docker image and then run the container. To do this you will run:
  - `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build`
  - You are instructing docker to use Buildkit which will speed up the docker build process.
- To run Next.js with Docker and docker-compose you can then run:
  - `docker-compose up`
  - It will show the same output as running the app without docker when you hit http://localhost:3000 on your favorite browser after docker-compose up runs without any error.

## Run the docker compose for production

- With this commands you can deploy your app to production.
  - `docker build -t mande-production:latest .`
  - `docker-compose -f docker-compose.production.yml up -d`
- With this command you can down the image from production and delete it.
  - `docker-compose -f docker-compose.production.yml down --volumes`