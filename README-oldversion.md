## DevOps Challenge: Day 4 (Sports API Management System)

### Project Overview
This is a project based on a serie of devops challenges, the teacher explained how to run a containerized backend in Flask with python in ECS with fargate, create and use AWS ALB(Application Load Balancer) and AWS API Gateway. I complement the solution with the creation and deploy of a containerized frontend in Nextjs, in order to have a Web Interface to view the games schedule of NBA, NFL and MLB.

**Tools:**
- External API (Serapi)
- Cloud service (AWS Fargate, ECR, ECS, API Gateway, ALB)
- Flask (Python)
- NextJS

### Architecture
The architecture of the application is described below:
- The users can type on browser http://dns-alb  and can view the application. (Note: the application is not running for costs).
- Underneath the application has a load balancer that can balance the load in 2 containers where the frontend application was deployed.
- The frontend has internally an environment variable that it is the URL of the Api Gateway, the Api Gateway has endpoints that enroute the request to other Application Load Balancer that balance the load between 2 containers where the backend application was deployed.
- The backend has internally an environment variable to fetch the data of a SERPAPI.

![architecture.png](/images/architecture.png)

### Project Structure
```
containerized-sports-api/ # Main directory
├── backend/ # Flask app
│ ├── .dockerignore # Not necessary files when containers are created
│ ├── app.py # Contains route and app creation
│ ├── Dockerfile # The container specification
│ ├── requirements.txt # Dependencies
│ └── CHALLENGE-README.md # Explanation of the challenge
├── frontend/ # Next.js app
│ ├── src/ # App core
│ │ ├── layout.js # Layout for all pages
│ │ ├── page.js # Homepage js
│ │ ├── page.module.css # Homepage css
│ │ ├── global.css # Global styles
│ ├── Dockerfile # The container specification
│ └── README.md # Steps to run the frontend
├──AWS-README.md # Steps to manually set up AWS configuration
└── README.md # Overview of the project
```

### What I Learned
- Containerize a Flask and Nextjs application.
- Create an ECR, and upload images to the aws cloud.
- Create clusters, task definitions and services using Fargate and ELB.
- Create an API Gateway and interact with it.
- Troubleshooting with two specific errors:
1) I was not able to create cluster because I do not have permissions, and I do not know how to fix it, so I search this solution, and create the role:
[first link](https://repost.aws/questions/QUBrlvoHEbQ1qj9V403xinWw/unable-to-create-ecs-cluster-in-fargate-getting-service-unavailable "first link")
[second link](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateServiceLinkedRole.html "second link")
[third link](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using-service-linked-roles.html#create-slr "third link")
2) I am also had this problem: Resource handler returned message: "Error occurred during operation ECS Deployment Circuit Breaker was triggered."
Basically I had to debug the image, the container, and I noticed that I had errors with the environment variable of the image and container, so I fixed it.
[first link](https://stackoverflow.com/questions/76952325/resource-handler-returned-message-error-occurred-during-operation-ecs-deploym "first link")
3) Lastly, I had some problems with the interaction between the frontend and backend, and I noticed in the little but necessary configurations, I had to deal with CORS problems, proxy problems, http and https URLS.

### The beatiful results of my learning:
![front-deployed.png](/images/front-deployed.png)
![mlb-deployed.png](/images/mlb-deployed.png)
![nba-deployed.png](/images/nba-deployed.png)
![nfl-deployed.png](/images/nfl-deployed.png)

### With love and grateful to people who creates these projects:
[Day 4 explanation](https://www.youtube.com/watch?v=sF9_YzOrmTs&t=760s "Day 4")

[Original code](https://github.com/ifeanyiro9/containerized-sports-api "original code")

[DevOps Challenges info](https://www.linkedin.com/posts/ifeanyi-otuonye_week-2-day-1-of-the-30-day-devops-challenge-activity-7287533706443907072-Ykra?utm_source=share&utm_medium=member_desktop "DevOps Challenges info")
