## DevOps Challenge: Day 4 (Sports API Management System)

### Project Overview
This is a project based on a serie of devops challenges, the explanation was how to run a containerized backend in Flask with python, and I complement the exercise with the creation of a CI/CD with Github Actions.
The project allows you to interact with a backend that extract data from an API call.

**Tools:**
- External API (Serapi)
- Cloud service (AWS Fargate, ECR, ECS, API Gateway)
- Flask (Python)

### General steps
1) Create an specific user to apply the least minimum privilige
2) Attach to the user a policy

### Specific Steps
1) We first create an specific policy with the Principle of least privilege and attach permissions to the user can interact and use ECS, ECR, API GATEWAY and CLOUDWATCH.
![policy1.png](/images/create-policy1.png)
![policy2.png](/images/create-policy2.png)
![policy3.png](/images/create-policy3.png)
2) We create a user to attach that permissions and can interact and create the services needed.
![user1.png](/images/create-user1.png)
![user2.png](/images/create-user2.png)
![user3.png](/images/create-user3.png)
![user4.png](/images/create-user4.png)
3) We create an access key in order to access to the aws and create the services by local console.
![create-access-key1.png](/images/create-access-key1.png)
![create-access-key2.png](/images/create-access-key2.png)
![create-access-key3.png](/images/create-access-key3.png)
![create-access-key4.png](/images/create-access-key4.png)

### What I Learned



### With love and grateful to people who creates these projects:
[Day 4 explanation](https://www.youtube.com/watch?v=sF9_YzOrmTs&t=760s "Day 4")

[Original code](https://github.com/ifeanyiro9/containerized-sports-api "original code")

[DevOps Challenges info](https://www.linkedin.com/posts/ifeanyi-otuonye_week-2-day-1-of-the-30-day-devops-challenge-activity-7287533706443907072-Ykra?utm_source=share&utm_medium=member_desktop "DevOps Challenges info")
