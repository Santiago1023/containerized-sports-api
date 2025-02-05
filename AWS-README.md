## Setup of AWS

### General steps
1) Create roles and permissions to create the architecture of the application
2) Create the images and upload to ECR
3) Create a cluster
4) Create task definitions
5) Create services
6) Create API Gateway
7) Connect frontend and backend

### Specific Steps
1.1) We first create an specific policy with the Principle of least privilege and attach permissions to the user can interact and use ECS, ECR, API GATEWAY and CLOUDWATCH.
![policy1.png](/images/create-policy1.png)
![policy2.png](/images/create-policy2.png)
![policy3.png](/images/create-policy3.png)
1.2) We create a user to attach that permissions and can interact and create the services needed.
![user1.png](/images/create-user1.png)
![user2.png](/images/create-user2.png)
![user3.png](/images/create-user3.png)
![user4.png](/images/create-user4.png)
1.3) We create an access key in order to access to the aws and create the services by local console.
![create-access-key1.png](/images/create-access-key1.png)
![create-access-key2.png](/images/create-access-key2.png)
![create-access-key3.png](/images/create-access-key3.png)
![create-access-key4.png](/images/create-access-key4.png)
1.4) We create a role to allow us create a cluster
![ecs-role1.png](/images/ecs-role1.png)
![ecs-role2.png](/images/ecs-role2.png)
![ecs-role3.png](/images/ecs-role3.png)

2) We type in local console
- `aws configure` to enter the aws credentials and can interact with the aws console
- `aws ecr create-repository --repository-name sports-api-santi --region us-east-1` to create an ECR
- `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [your_aws_id].dkr.ecr.us-east-1.amazonaws.com` to login to the ECR
- cd backend and type:
	- `docker build --platform linux/amd64 -t sports-api-backend .`
	- `docker tag sports-api-backend:latest [your_aws_id].dkr.ecr.us-east-1.amazonaws.com/sports-api-santi:sports-api-backend-latest`
	- `docker push [your_aws_id].dkr.ecr.us-east-1.amazonaws.com/sports-api-santi:sports-api-frontend-latest`
- cd frontend and type:
	- `docker build --platform linux/amd64 -t sports-api-frontend .`
	- `docker tag sports-api-frontend:latest [your_aws_id].dkr.ecr.us-east-1.amazonaws.com/sports-api-santi:sports-api-frontend-latest`
	- `docker push [your_aws_id].dkr.ecr.us-east-1.amazonaws.com/sports-api-santi:sports-api-frontend-latest`

3) We need to create a cluster
![ecs1.png](/images/ecs1.png)
![ecs2.png](/images/ecs2.png)
4) We need to create a task definition to the backend
![ecs3.png](/images/ecs3.png)
![ecs4.png](/images/ecs4.png)
![ecs5.png](/images/ecs5.png)
5) We need to create a service to the backend
![ecs6.png](/images/ecs6.png)
![ecs7.png](/images/ecs7.png)
![ecs8.png](/images/ecs8.png)
![ecs9.png](/images/ecs9.png)
![ecs10.png](/images/ecs10.png)
We can check the dns name of the ALB created:
![https-dns-back.png](/images/https-dns-back.png)
6) we need to create an api gateway:
	create an api
	in rest api -> build
	name it-> Sports API
	create
	create resource
	/sports
	create a method -> get, http, http proxy integration, get, http://elb-dns/sports  
	create method
	deploy api
	new stage
	dev
	deploy
	copy the path url and test it
![api-gateway.png](/images/api-gateway.png)
7) The frontend configuration is similar to the point 3,4 and 5, follow that steps(create task definition and service) and the frontend has the url of the api gateway endpoint, so with that configuration we can enter to the web interface, and communicate with backend.
![mlb-schedule.png](/images/mlb-schedule.png)
![nba-schedule.png](/images/nba-schedule.png)
![nfl-schedule.png](/images/nfl-schedule.png)

### LINKS of learning
[link1](https://www.youtube.com/watch?app=desktop&v=sF9_YzOrmTs "link1")
[link2](https://www.youtube.com/watch?v=Wh8rmZhekrE "link2")
[github repo](https://github.com/ifeanyiro9/containerized-sports-api "github repo")
[api](https://serpapi.com/ "api")
[github actions](https://www.youtube.com/watch?v=R8_veQiYBjI "github actions")
[github actions doc](https://docs.github.com/en/actions "github actions doc")
[github marketplace](https://github.com/marketplace "github marketplace")
