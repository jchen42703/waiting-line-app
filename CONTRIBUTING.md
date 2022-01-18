# Contributing

This doc goes over coding standards, the PR process, and other miscellaneous things for setting up the repository.

The stack consists of:

- `node 16.13.2` LTS

  - https://nodejs.org/en/

- React (JS)

  - SCSS & Bootstrap for styling
  - `axios` for requests
  - `jest` for testing

- Express (JS)
  - `jest` and `supertest` for testing

# Code Formatting

If you're using VSCode, please use the `Prettier` extension with `ESLint`.

See the `.vscode` repo for the specific settings.

# Pull Request Process

The flow consists of:

1. Make a separate branch for whatever feature you are working on.
2. Once you have finished, ask someone for a code review.
   1. The code review should be mainly to make sure that the code actually works as intended, is tested, and is properly formatted.
3. Once the reviewer gives the okay, the reviewer should merge the pull request.
