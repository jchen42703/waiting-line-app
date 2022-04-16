# CSDS 393: Bi-Weekly Progress Report 5

**Current Scrum Master:** David Tang (zxt139@case.edu)

**Other group members:**

- Joseph Chen (jxc1598@case.edu)
- Benson Jin (bxj155@case.edu)
- Daniel Lee (dkl40@case.edu)
- Zhongyuan Tang (zxt139@case.edu)
- Jalen Xu (jalen.xu@case.edu)

## Project Board

We manage the user stories and individual tasks through Jira and the Jira backlog.

![](images/backlog-4-1-22.png)

## Assigned Stories

**Status as of 4/15/22**

- **Jody:** Updated color settings and Enabled data passing when redirecting from user signup page to user waiting page.
  - **Status:** Currently working on getting the user's progress in the queue.
- **Daniel:** Connect the queue dashboard to the backend.
  - **Status:** Worked on deleting user and getting the next user in queue dashboard. Need to test the functionality.
- ~~**Joseph:** finished landing page admin dashboard minus to the fetching
- **Joseph:** Add admin landing page
  - **Status:** Converted frontend to typescript. Currently working on admin landing page.
- **Benson:** Add authentication cookie functionality and Test edge cases for the cookie validator middleware
  - **Status:** Added QR generator, banlist, queue list components.
- **Jalen:** Create an endpoint that gets a list of all users in a queue and an endpoint that gets a list of all queueId's managed by an admin.
  - **Status:** finished the api/admin/queues endpoint
- **David:** An admin should be able to delete user from queue. (Backend only)
  - **Status:** Finish up coding and cookie testing.

# Standup Meetings (3/19, 3/26)

**TLDR; Similar to last time**

| Student | What has been done                                                                                                                                                                                                                                                                                                                                                                | What remains                                                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Joseph  | <ul><li> finished landing page admin dashboard minus to the fetching</li></ul>                                                                                                                                                                                                                                                                                                    | <ul><li>Leading the team to wrap up</li></ul>                                                                                               |
| Benson  | <ul><li>Working on the analytics dashboard. Added QR generator, banlist, queue list components.</li></ul>                                                                                                                                                                                                                                                                         | <ul><li>Test edge cases for the cookie validator middleware</li><li> fix up styling and also add an editable form for queue info.</li></ul> |
| Jody    | <ul><li>The user table also now should refresh automatically when pulling from the queue/all endpoint</li><li>Enabled data passing when redirecting from user signup page to user waiting page.</li></ul> <ul><li>Check if the user is on the ban list before they join the queue</li><li>On user waiting page, check if the user is popped or deleted from the queue. </li></ul> |
| Daniel  | <ul><li>I made a userInfoRow component so the user table will be rendered row-by-row</li><li>The user table also now should refresh automatically when pulling from the queue/all endpoint</li></ul>                                                                                                                                                                              | <ul><li>Connect queue dashboard to backend (delete user, get next user)</li> </ul>                                                          |
| David   | <ul><li>Worked on testing and debugging</li></ul>                                                                                                                                                                                                                                                                                                                                 | <ul><li>Test and debug the deleteUser endpoint</li></ul>                                                                                    |
| Jalen   | <ul><li>I finished the api/admin/queues endpoint</li><li></li></ul>                                                                                                                                                                                                                                                                                                               | <ul><li> </li></ul>                                                                                                                         |

**Problems Faced:**

- Lots of material must be learned outside of class (i.e. Javascript + Express + REST for backend and HTML/CSS/JS/React for frontend).
- Color scheme is not standardized
- Backend is not easily testable
- Authentication is not complete, this causes a block for other developers
- Some endpoints are not finished so some people are blocked

**Risks:**

- Converting JavaScript to TypeScript might introduce some bugs for those who aren't familiar with it.
- No dedicated quality assurance team to integration test, which may introduce bugs to production.
- No CI/CD, which may also introduce bugs to production.
