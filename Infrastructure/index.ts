import * as azure from "@pulumi/azure-native";
import { CreateDemoAPI } from "./createapi";

const resourceGroupName = "rgdeplymentexample"
// Creating an Azure Resource Group
const resourceGroup = new azure.resources.ResourceGroup(resourceGroupName, {
    resourceGroupName: resourceGroupName,
});

CreateDemoAPI(resourceGroup)