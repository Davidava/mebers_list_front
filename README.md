# members_list_front

This application is a list of members of any organization.
Here are following functions organized in this app.

#### Home page: 
- Search for a member by name, surname, patronymic, date of birth, membership.
- When you click on a member from the list, you will be route to his page.

#### Import member page:
- Adding a member to the list.

#### Member page:
- Viewing member data,
- Editing member data,
- Removing a member from the list,



### Project setup

#### Auth0 login
To run this app you need to configure Auth0
Know more about Auth0: https://auth0.com/docs/quickstart/spa/vuejs.

##### Configuration
The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this find file called auth_config.json and replace the values within with your own Auth0 application credentials:

{
  "domain": "<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>"
  "audience": "<YOUR AUDIENCE>"
}

#### Auth0 managment
Yau need to create MACHINE TO MACHINE aplication in your auth0 profile and configure it.
This is needed to get user role.

##### Auth0 managment Configuration

find file .env in , and replace the values within with your own Auth0 application credentials:

VUE_APP_CLIENT=yourClient.

VUE_APP_CLIENT_SECRET=yourClientSecret.

VUE_APP_AUDIENCE=yourAudience.

VUE_APP_GRANT_TYPE=yourGranrType.


#### Api
This app use mongodb base located here: https://github.com/Davidava/members_list_back.

#####  Api Configuration

find file .env in , and replace the value:

VUE_APP_MONGO_URI = youUri


```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
