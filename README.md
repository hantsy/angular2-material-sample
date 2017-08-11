# Angular Material Sample

This demo is based on the original sample, and add more features including Angular Material 2, Covalent UI.


## Run in Local development environment

Enter the root folder of this project, execute the following command line.

```
npm run start
```

And after it is started, open http://localhost:4200. 

**Note**: You have to set up a backend API server, in this demo, I use https://github.com/hantsy/spring-microservice-sample, follow the README.md of this project to run all backend services via Docker Compose.

## Build for production

```
ng build --env=prod 
```

or 

```
ng build --prod --aot=false
```

**NOTE**: `ng build --prod` will fail, it requires aot facilities when building the project. There are serveral issues reported about this in angular cli project.
 