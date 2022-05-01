# Lyne

Web app for queuing users with a simple scan of a QR code

# Getting Started

We recommend that you use Node 16.13.2 and Yarn 1.22.17.

```bash
yarn install
```

To run the entire application, do:

```bash
yarn start
```

This will start both the backend and frontend.

To run tests, do:

```bash
yarn test
```

To run with coverage, do:

```bash
yarn test:coverage
```

## Migrating from the Previous Repository

Start off by installing lerna and nuking your old code:

```
npx lerna clean -y
```

(`npx lerna` will automatically prompt you to install lerna.)

Then, check that you have `yarn` installed by running:

```
yarn -v
```

If it shows a version (i.e. 1.22.17 (must be < 2)), then you're good! Otherwise, run:

```
npm install -g yarn
```

to install `yarn`.

Then, simply run:

```
yarn install
```

Then,

```
yarn start
```

When you run `yarn start` in the root directory, this starts BOTH the frontend and backend.

**But, if you want to only start one of them, do:**

```
cd packages/backend
yarn install
yarn start
```

OR

```
cd packages/frontend
yarn install
yarn start
```

## Installing New Packages

In root:

```
# Install packageName into packages/backend
npx lerna add packageName packages/backend

# Install packageName into packages/frontend
npx lerna add packageName packages/frontend

# To install into everything (including shared-dto)
npx lerna add packageName packages/*

# For devDependencies
npx lerna add --dev packageName packages/*
```

OR you can just do regular `yarn add packageName`:

```
# Install packageName into backend
cd packages/backend
yarn add packageName

# Install packageName into frontend
cd packages/frontend
yarn add packageName
```

A quick way to refresh your node_modules is to run `npx lerna clean -y`.
