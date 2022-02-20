# waiting-line-app

App for queuing users with a simple scan of a QR code

# Migrating from the Previous Repository

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
