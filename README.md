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

As of 5/1/22, the coverages are:

```
@lyne/backend: ----------------------|---------|----------|---------|---------|------------------------------------
@lyne/backend: File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
@lyne/backend: ----------------------|---------|----------|---------|---------|------------------------------------
@lyne/backend: All files             |   53.08 |    31.28 |   50.87 |   51.76 |
@lyne/backend:  src                  |     100 |       50 |     100 |     100 |
@lyne/backend:   app.ts              |     100 |       50 |     100 |     100 | 39
@lyne/backend:  src/controllers      |   44.19 |    28.57 |   38.09 |   44.19 |
@lyne/backend:   admin.ts            |   25.64 |        0 |      20 |   25.64 | 21-28,40-52,64-71,83-108
@lyne/backend:   auth.ts             |   72.72 |        0 |      25 |   72.72 | 23-30,35,42-43
@lyne/backend:   index.ts            |     100 |      100 |     100 |     100 |
@lyne/backend:   queue.ts            |   39.04 |       32 |      50 |   39.04 | ...321-346,358-368,380-408,419-440
@lyne/backend:   session.ts          |   83.33 |      100 |      50 |   83.33 | 6
@lyne/backend:  src/lib              |      60 |    28.57 |   36.36 |   55.17 |
@lyne/backend:   errors.ts           |     100 |      100 |     100 |     100 |
@lyne/backend:   log.ts              |     100 |       50 |     100 |     100 | 3-6
@lyne/backend:   parse.ts            |   66.66 |      100 |       0 |      50 | 4
@lyne/backend:   passport.ts         |   42.85 |       20 |      50 |      40 | 21-48,70-98,114
@lyne/backend:   time.ts             |      80 |      100 |       0 |    87.5 | 8
@lyne/backend:  src/lib/db           |   72.72 |       50 |   66.66 |   72.72 |
@lyne/backend:   mongodb.ts          |   72.72 |       50 |   66.66 |   72.72 | 14,21-22
@lyne/backend:  src/lib/models       |     100 |      100 |     100 |     100 |
@lyne/backend:   user.ts             |     100 |      100 |     100 |     100 |
@lyne/backend:  src/lib/models/admin |   66.66 |    36.36 |   33.33 |    64.7 |
@lyne/backend:   admin.model.ts      |     100 |      100 |     100 |     100 |
@lyne/backend:   admin.service.ts    |   56.25 |        0 |       0 |      50 | 9-16,27-29,35-36
@lyne/backend:   index.ts            |   66.66 |       50 |     100 |     100 | 1-2
@lyne/backend:  src/lib/models/queue |   42.45 |     23.8 |   76.92 |   42.26 |
@lyne/backend:   index.ts            |   66.66 |       50 |     100 |     100 | 1-2
@lyne/backend:   queue.model.ts      |     100 |      100 |     100 |     100 |
@lyne/backend:   queue.service.ts    |   37.23 |    17.64 |   72.72 |   38.46 | ...,77-132,151,155,186-190,213-279
@lyne/backend:  src/middlewares      |   90.47 |       75 |     100 |      90 |
@lyne/backend:   cookieValidator.ts  |     100 |      100 |     100 |     100 |
@lyne/backend:   error.ts            |   81.81 |       50 |     100 |   81.81 | 27-28
@lyne/backend: ----------------------|---------|----------|---------|---------|------------------------------------
```

and

```
@lyne/ui: --------------------------------------------|---------|----------|---------|---------|---------------------------------------
@lyne/ui: File                                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
@lyne/ui: --------------------------------------------|---------|----------|---------|---------|---------------------------------------
@lyne/ui: All files                                   |   54.88 |    26.19 |   59.52 |   54.92 |
@lyne/ui:  src                                        |       0 |        0 |       0 |       0 |
@lyne/ui:   index.tsx                                 |       0 |      100 |     100 |       0 | 6-16
@lyne/ui:   reportWebVitals.ts                        |       0 |        0 |       0 |       0 | 3-10
@lyne/ui:  src/components                             |   57.79 |       28 |   69.56 |      57 |
@lyne/ui:   AdminNavBar.tsx                           |   46.15 |       50 |      50 |   46.15 | 18-26,46
@lyne/ui:   BackButton.tsx                            |      75 |      100 |      50 |      75 | 13
@lyne/ui:   Drawer.tsx                                |      75 |      100 |   57.14 |      75 | 36,41,50,80-83
@lyne/ui:   FacebookButton.tsx                        |     100 |      100 |     100 |     100 |
@lyne/ui:   GoogleButton.tsx                          |     100 |      100 |     100 |     100 |
@lyne/ui:   HeroImage.tsx                             |      80 |       50 |      75 |   77.77 | 10,20
@lyne/ui:   UserWaitingStatus.tsx                     |   48.33 |    17.64 |   83.33 |   47.45 | 45,69-129,146-148
@lyne/ui:  src/components/auth                        |       0 |        0 |       0 |       0 |
@lyne/ui:   AuthGuard.tsx                             |       0 |        0 |       0 |       0 | 7-49
@lyne/ui:  src/components/dashboard/analytics         |     100 |       50 |     100 |     100 |
@lyne/ui:   Layout.tsx                                |     100 |      100 |     100 |     100 |
@lyne/ui:   QR.tsx                                    |     100 |       50 |     100 |     100 | 95
@lyne/ui:  src/components/dashboard/analytics/widgets |   35.55 |       12 |      40 |   35.55 |
@lyne/ui:   BanWidget.tsx                             |   72.72 |       50 |      75 |   72.72 | 26,35-47
@lyne/ui:   EditQueueInfo.tsx                         |     3.7 |        0 |       0 |     3.7 | 18-177
@lyne/ui:   QueueInfo.tsx                             |     100 |      100 |     100 |     100 |
@lyne/ui:   QueueInfoWidget.tsx                       |     100 |       50 |     100 |     100 | 16
@lyne/ui:   QueueListWidget.tsx                       |     100 |      100 |     100 |     100 |
@lyne/ui:  src/components/dashboard/landingPage       |      65 |    36.66 |      75 |      65 |
@lyne/ui:   AllQueuesTable.tsx                        |    87.5 |       25 |     100 |    87.5 | 53
@lyne/ui:   CreateQueueModal.tsx                      |   29.16 |        0 |   33.33 |   29.16 | 54-98,127
@lyne/ui:   DeleteQueueModal.tsx                      |    37.5 |        0 |   33.33 |    37.5 | 31-48,79
@lyne/ui:   LandingPageTableRow.tsx                   |     100 |       75 |     100 |     100 | 36-39
@lyne/ui:   QueueTableManager.tsx                     |     100 |      100 |     100 |     100 |
@lyne/ui:   StatusCircle.tsx                          |     100 |       50 |     100 |     100 | 5-6
@lyne/ui:  src/components/dashboard/userManager       |   34.21 |       15 |   26.31 |   34.21 |
@lyne/ui:   AdminAction.tsx                           |    12.5 |        0 |       0 |    12.5 | 11-33
@lyne/ui:   DeleteUserModal.tsx                       |    37.5 |        0 |   33.33 |    37.5 | 36-54,86
@lyne/ui:   UserInfoRow.tsx                           |       0 |        0 |       0 |       0 | 30-58
@lyne/ui:   UserTable.tsx                             |      50 |      100 |      50 |      50 | 47-60
@lyne/ui:   UserTableManager.tsx                      |   44.73 |    14.28 |      30 |   44.73 | 50-53,57-59,71-83,88-91,95-99,139-152
@lyne/ui:  src/components/home                        |     100 |      100 |     100 |     100 |
@lyne/ui:   About.tsx                                 |     100 |      100 |     100 |     100 |
@lyne/ui:   Footer.tsx                                |     100 |      100 |     100 |     100 |
@lyne/ui:   Hero.tsx                                  |     100 |      100 |     100 |     100 |
@lyne/ui:   Navbar.tsx                                |     100 |      100 |     100 |     100 |
@lyne/ui:   Team.tsx                                  |     100 |      100 |     100 |     100 |
@lyne/ui:  src/components/tables                      |     100 |      100 |     100 |     100 |
@lyne/ui:   CenteredTableCell.tsx                     |     100 |      100 |     100 |     100 |
@lyne/ui:   TableHeader.tsx                           |     100 |      100 |     100 |     100 |
@lyne/ui:  src/lib                                    |    62.5 |       50 |      25 |   83.33 |
@lyne/ui:   config.ts                                 |     100 |       50 |     100 |     100 | 5-10
@lyne/ui:   time.ts                                   |   57.14 |      100 |      25 |      80 | 7
@lyne/ui:  src/lib/services                           |      85 |       80 |   83.33 |      85 |
@lyne/ui:   admin.service.ts                          |     100 |      100 |     100 |     100 |
@lyne/ui:   auth.service.ts                           |    87.5 |      100 |     100 |    87.5 | 17
@lyne/ui:   queue.service.ts                          |    91.3 |       75 |     100 |    91.3 | 18,71
@lyne/ui:   user.service.ts                           |   73.91 |      100 |      60 |   73.91 | 57-66,70-80
@lyne/ui:  src/views                                  |       0 |      100 |       0 |       0 |
@lyne/ui:   App.tsx                                   |       0 |      100 |       0 |       0 | 14-31
@lyne/ui:  src/views/auth                             |   66.66 |      100 |   33.33 |   66.66 |
@lyne/ui:   Login.tsx                                 |   66.66 |      100 |   33.33 |   66.66 | 17,21
@lyne/ui:  src/views/dashboard                        |   70.83 |       75 |     100 |   70.83 |
@lyne/ui:   analyticsDashboard.tsx                    |   68.18 |       75 |     100 |   68.18 | 28-31,47-50,60
@lyne/ui:   dashboard.tsx                             |     100 |      100 |     100 |     100 |
@lyne/ui:   queueDashboard.tsx                        |     100 |      100 |     100 |     100 |
@lyne/ui:  src/views/home                             |     100 |      100 |     100 |     100 |
@lyne/ui:   Home.tsx                                  |     100 |      100 |     100 |     100 |
@lyne/ui:  src/views/users                            |   31.81 |     6.25 |      40 |   31.81 |
@lyne/ui:   UserSignupPage.tsx                        |   23.07 |     6.25 |      25 |   23.07 | 52-118,129-136,173-193
@lyne/ui:   UserWaitingPage.tsx                       |     100 |      100 |     100 |     100 |
@lyne/ui: --------------------------------------------|---------|----------|---------|---------|---------------------------------------
@lyne/ui: Test Suites: 13 passed, 13 total
@lyne/ui: Tests:       27 passed, 27 total
@lyne/ui: Snapshots:   0 total
@lyne/ui: Time:        5.27 s
@lyne/ui: Ran all test suites.
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
