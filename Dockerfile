# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files first
COPY *.sln ./
COPY src/eShop.AppHost/*.csproj ./src/eShop.AppHost/

# Restore dependencies
RUN dotnet restore

# Copy everything
COPY . .

# Publish the AppHost project
RUN dotnet publish src/eShop.AppHost/eShop.AppHost.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Expose the port the app listens on
EXPOSE 80

# Configure ASP.NET to listen on port 80
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Start the application
ENTRYPOINT ["dotnet","eShop.AppHost.dll"]
