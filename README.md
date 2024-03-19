# .NET Core Pulumi Azure Deployment with Docker

Overview
---------
This project exemplifies the creation of infrastructure as code utilizing Pulumi to deploy a simple .NET Core application (the Weather Controller sample by Microsoft is used here, but steps are essentially same for any API) as a Docker container to Azure Web Service.

Dependencies
-------------

1. .NET Core SDK
2. Pulumi (installed)
3. Azure CLI (for service principles if manually created) 
4. Docker (to run and test locally)

Technical Details
------------------
# Azure Web App Service
The infrastructure deployment encompasses the provisioning of an Azure Web App Service to host API in a Docker container. The project uses pulumi code to create & manage infrastructure & its configuration settings.

For continuous integration and deployment, integration with CI/CD pipelines such as Azure DevOps is used in the project. The "build-pipelines.yml" pipeline automates the build, test, and deployment processes for the application.


Implementation 
----------------

1. Create API: Begin with creating the API, utilizing the sample API provided.
2. Dockerize the API: Containerize the API as a Docker image, which will be deployed to the Azure App Service.
3. Make sure you run the docker image locally to check there isn't any error there. 
3. Next, create an Azure Container Registry (ACR) - this is to store the Docker image for api.
4. Configure Service Principal for ACR: Generate a Service Principal with authority to access and deploy to the ACR.
5. Configure Azure DevOps Pipeline: Create a pipeline in Azure DevOps, utilizing the Service Principal to authenticate and deploy Docker images to the ACR.
6. Create Azure App Service Infrastructure: Use Pulumi to define and create Azure App Service infrastructure for deploying the Docker image.
7. Grant Pipeline Access to Azure Subscription: Establish a Service Connection in Azure DevOps to grant the pipeline access to the Azure subscription that will pay for the resources.
8. Store Pulumi State: Configure Pulumi to store state using a blob. Set up SAS token variables (AZURE_STORAGE_ACCOUNT and AZURE_STORAGE_SAS_TOKEN) for pipeline authentication.
9. Configure Pulumi Access Token and Passphrase: Set up Pulumi access token and passphrase to authenticate Pulumi operations within the pipeline.
10. Deployment: Upon completion of the setup, the API will be Dockerized and deployed to the Azure App Service via the Azure DevOps pipeline.
