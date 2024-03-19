FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy the solution and project files
COPY Src Src

# Add thia in when you have tests
#RUN dotnet test src/Test || exit 1


# Publish the application
WORKDIR /app
RUN dotnet publish Src/DeploymentExample.API/DeploymentExample.API.csproj -c Release -o out

# Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./

# Set the environment variable for the URL and port
ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "DeploymentExample.API.dll"]