FROM mcr.microsoft.com/dotnet/sdk:3.1
COPY . /app
WORKDIR /app
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "run", "--server.urls", "http://0.0.0.0:5000"]
