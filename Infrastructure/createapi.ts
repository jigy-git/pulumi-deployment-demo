import * as pulumi from "@pulumi/pulumi";
import * as web from "@pulumi/azure-native/web";
import { ResourceGroup } from "@pulumi/azure-native/resources";

export function CreateDemoAPI(resourceGroup: ResourceGroup) {  
      
const config = new pulumi.Config();

const apiAcrRegistry = config.require("apiAcrRegistry");
const apiAcrRegistryUser = config.require("apiAcrRegistryUser");
//const apiAcrRegistryPwd = config.require("apiAcrRegistryPwd");

const apiDockerImage = config.require("apiDockerImage");
const apiDockerImageTag = config.require("apiDockerImageTag");

const apiServicePlan = "aspdemoapi";
const servicePlan = new web.AppServicePlan(apiServicePlan, {
    name: apiServicePlan,
    resourceGroupName: resourceGroup.name,
    kind: "Linux",
    reserved: true,
    sku: {
        name: "F1",
        tier: "Free",
        size: "F1",
        family: "F",
        capacity: 1
    },
}, { dependsOn: [ resourceGroup ]});
  
  
const apiName = "apidemo";


const api = new web.WebApp(apiName, {
      resourceGroupName: resourceGroup.name,
      name: apiName,
      serverFarmId: servicePlan.id,   
      siteConfig: {
          appSettings: [ {
              "name": "DOCKER_CUSTOM_IMAGE_NAME",
              "value": `${apiAcrRegistry}/${apiDockerImage}:${apiDockerImageTag}`,
            },
            {
              "name": "DOCKER_REGISTRY_SERVER_PASSWORD",
              "value": 'G/MtMVvt7fwmGBa9XDP2LOa2IaZLGsDNcB02SK51SQ+ACRD38aX9',
            },
            {
              "name": "DOCKER_REGISTRY_SERVER_URL",
              "value": "https://mcr.microsoft.com",
            },
            {
              "name": "DOCKER_REGISTRY_SERVER_USERNAME",
              "value":apiAcrRegistryUser,
            },
            {
              "name": "WEBSITE_ENABLE_SYNC_UPDATE_SITE",
              "value": "true"
            },
            {
              "name": "WEBSITES_ENABLE_APP_SERVICE_STORAGE",
              "value": "false"
            },
            {
              "name": "WEBSITES_PORT",
              "value": "5000"
            },
            {
                name: "EnableAppInsights",
                value: "false",
            }          
          ],
          alwaysOn: false,
          numberOfWorkers: 1,
          linuxFxVersion: `DOCKER|${apiAcrRegistry}/${apiDockerImage}:${apiDockerImageTag}`
      },
      httpsOnly: true,
  }, { dependsOn: [ resourceGroup, servicePlan ]});  
}