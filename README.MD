1. Describe a large-scale system you’ve worked on with Node.js. What architectural choices did you make and why?

At Advantage AI Engineering, I worked on a large SaaS platform serving over 100,000 active users. We used a Node.js + TypeScript microservices architecture to ensure scalability and independent deployments. RESTful APIs and message queues helped keep communication efficient and reliable. The use of WebSockets enabled real-time updates, improving the user experience and reducing server load by offloading repeated polling.

2. How do you structure collaboration between frontend and backend teams?

I prioritize clearly defined API contracts using Swagger/OpenAPI to ensure both sides understand data flow and expected responses. Weekly stand-ups and Slack-based communication helped keep development aligned. Using tools like Git, Jira, and CI pipelines, we ensured smooth integration and early detection of issues, helping both teams ship features consistently.

3. What’s your approach to authentication and authorization?

I typically implement JWT authentication for stateless sessions and RBAC (role-based access control) for authorization. The backend enforces middleware-based permission checks, while the frontend also conditionally renders UI based on user roles. Security layers like token expiration, refresh handling, and encrypted storage help maintain a safe environment.

4. Have you worked with different types of databases? When do you choose each type?

Yes, relational (PostgreSQL, Oracle), document stores (MongoDB), and some exposure to graph databases (Neo4j).

I choose relational DBs when the data has strong relationships and requires ACID consistency.

Document stores work well for flexible schema or event logs.

Graph DBs are useful for relationship-heavy products like recommendations or social networks.

5. How do you ensure applications remain secure and maintainable?

Security is ensured using input validation, rate limiting, encryption, and prevention of XSS/SQL injection. For maintainability, I enforce clean architecture, modular services, and meaningful code reviews. CI pipelines with automated testing also help catch issues early and ensure long-term reliability.

6. What’s your approach to testing?

For backend, I use Jest + Supertest for unit and integration testing. For frontend, I use Jest and React Testing Library plus Cypress for end-to-end tests. Each feature includes unit tests and is verified on CI before merging to the main branch.

7. Share a challenging performance or scalability issue you solved.

We faced WebSocket bottlenecks during peak usage. I implemented Redis Pub/Sub to distribute events and offload broadcast pressure from the main Node.js thread. This increased concurrency capacity and improved overall response times.

8. Have you worked with cloud or container platforms? Serverless vs containers?

I’ve worked with AWS, Docker, ECS, Lambda. I prefer serverless for event-driven, lightweight API tasks that scale automatically. Containerized services are preferred when we need fine control over environment, long-running tasks, or high customization of runtime.

9. How do you keep a large codebase healthy with many contributors?

We enforce strict coding guidelines, conduct mandatory code reviews, and maintain strong CI pipelines. Scheduled refactoring, modular architecture, and clear documentation all ensure long-term health and reduce merge conflicts.

10. A technical decision you introduced with long-term impact?

I pushed for adopting microservices over a growing monolith at Advantage AI Engineering. It enabled independent deployments, easier scaling, and faster onboarding for new engineers — which significantly improved engineering velocity and uptime.

11. How do you work with product managers, QA, and designers?

I maintain clear communication, ensuring technical feasibility aligns with product goals. I work closely with QA to ensure test cases cover key functionality and with designers to confirm user flows are realistically implementable. Transparency and early feedback help prevent last-minute surprises.

12. What are you most proud of in your career?

I’m proud of scaling backend systems for apps serving over 100,000 users and delivering impactful features that improved customer satisfaction by 20%. I'm also proud of mentoring junior developers and helping teams adopt better engineering practices.



## Base URL

http://localhost:3000/users

## Endpoints
1. POST /users

Create a new user (requires CREATE permission)

Request Body
{
  "name": "Test User",
  "roles": ["PERSONAL"],
  "groups": ["GROUP_1"]
}

Response
201 Created

2. GET /users

Retrieve all users (requires VIEW permission)

3. PATCH /users/:id

Update partial user data (requires EDIT permission)

4. DELETE /users/:id

Delete a user (requires DELETE permission)

5. GET /users/managed/:id

Get users managed by ADMIN based on shared groups.

Example:

GET /users/managed/5

## Permissions Mapping
Permission	Endpoint
CREATE	POST /users
VIEW	GET /users
EDIT	PATCH /users/:id
DELETE	DELETE /users/:id

## Authorization Header

Authorization is sent as:

Authorization: <userId>


Example:

Authorization: 1


User 1 is ADMIN → full permissions.

User 6 is VIEWER → only VIEW allowed.

## cURL Examples
### Allowed (Admin user)
curl --location --request POST 'http://localhost:3000/users' \
--header 'Authorization: 1' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Test User",
    "roles": ["PERSONAL"],
    "groups": ["GROUP_1"]
}'

## Forbidden (Viewer user)
curl --location --request POST 'http://localhost:3000/users' \
--header 'Authorization: 6' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Test User",
    "roles": ["PERSONAL"],
    "groups": ["GROUP_1"]
}'

## How to Run the Project
1. Install dependencies
npm install

2. Start in development mode
npm run start:dev

3. Server will run at
http://localhost:3000