# Specs

This will be converted to the SRS down the line.

# API

To be considered fully featured, our API should have:

- input validators
- cors
- authentication (endpoint protection)
- rate limiting
- logging
- analytics

Right now, logging/analytics (prometheus) are low priority before we prepare for our MVP, so they will be on hold. Currently, the dev logging is with `winston` (basically `console.log`).

# Core User Stories

## Admin signs up

A user admin, the queue creator (i.e. a business/clinic), should be able to sign up and login. They should be able to access their own unique dashboard for creating and managing queues.

- The current solution is to use `auth0` and oauth JWTs due to its ease-of-use.

## Admin fills out basic contact on first sign-in

When a user admin first accesses the dashboard, they should need to fill out optional information, such as their business/clinic location, business contact information, and hours.

- Maybe just let them paste a yelp link? or google maps link

## Admin creates queue

A user admin should be able to create a queue that shows up in their dashboard.

1. User admin clicks on a Button, which has a `useEffect` that sends a `POST` request to `/api/queue/create`
2. Server sends back request with the queue information
3. User sees a clickable card button in the UI with the queue information.
   1. Clicking on this card should popup a separate UI with indepth queue information

## Admin views queue contents

A user admin should be able to click on a queue UI element and see the users in the queue.

## Admin wants to get next user in queue (Pops queue)

A user admin lets in the next user in the queue. A UI element pops up with the user's registered information.

## Admin wants to get next N users in queue (Pops multiple users from queue)

A user admin wants to let in multiple users in the queue. A UI elements pops up with the multiple user's registered information in a table.

- Alternatively, we can have a table in the dashboard that displays all of the dequeued user information and their order

## Admin deletes queue

A user admin should be able to delete a queue from its UI. This should notify the users in the queue and pop up with the contact information.

## Admin deletes user from queue

A user admin should be able to delete a user from queue (i.e. if they are a no-show or if they are a rude customer)

- There should a UI element in the user admin dashboard
- When a user admin deletes a user, this should notify the user.

## User scans QR code to join queue

A user should be able to scan a QR code that redirects them to a link to join a queue which redirects them to the "join queue" registration page.

## User sees their queue status after joining queue

After a user finishes registering on the admin's queue registration page, they are redirected to their own dashboard that displays their queue status and ETA (let this be something the admin user sets).

Once it is the user's turn, the website should alert the user and display a popup to display their status.

- Queue statuses:
  - Waiting in line: `x/50`
  - Queue not available
  - Queue deleted
  - Passed!

Should periodically poll `/api/queue/progress`

- Should integrate redis caching for better performance

# Medium Priority User Stories

## Admin can customize the form for information registered users need

A user admin can customize the form for information registered users need.

- We should provide templates (i.e. email address, phone number, address)
- Should limit to non-sensitive information
- Should give user admins to provide a short description like Google Forms
- Should give option to turn on ReCaptcha (optional)

# Low Priority User Stories

## Admin should be able to blacklist certain users.

A user admin should be able to blacklist certain users.

- Blacklist users registered with an email/phone number
- Should alert the queue joining user if they have been blacklisted

## ETA Analytics

The ETA for user waits should be calculated with analytics (i.e. taking the average of the waiting times of the users before the current one or a preset one by the user admin)
