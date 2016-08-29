#Retail Tech Test
####Sections:
1. How to run the app: [here](#how-to-run-the-app).
2. File Structure: [here](#file-structure).
2. Explanation of my approach: [here](#explanation-of-my-approach).

## How to run the app:
Clone it:
```
$ git clone https://github.com/eripheebs/retail_tech_test.git
$ cd retail_tech_test
```
Install dependencies:
```
$ bower install
$ npm install
```
Run the backend:
```
$ npm run start-backend
```
Run the frontend:
```
$ npm run start-frontend
```
Open the app:
```
$ open http://localhost:8080
```
## How to run my tests:
Install dependencies:
```
$ bower install
$ npm install
```
Run frontend Karma tests:
```
$ npm run test-frontend
```
Run backend Mocha test of the mongodb API: (close backend server if it is running)
```
$ npm run test-backend
```
Run integration tests:
```
$ npm run start-frontend
```
- In a different console:
```
$ npm run start-backend
```
- In a different console:
```
$ npm run webdriver-manager start
```
- In a different console:
```
$ npm run test-integraton
```

-(The voucher codes are: FIVE, TEN, FIFTEEN)

## File structure:
```
.
+-- backend
|   +-- config
|   |   +-- db.js
|   +-- routes
|   |   +-- stock.js
|   +-- server.js
+-- frontend
|   +-- bower_components
|   +-- js
|   |   +-- controllers
|   |   |   +-- RetailController.js
|   |   +-- factories
|   |   |   +-- ItemFactory.js
|   |   |   +-- ItemLoggerFactory.js
|   |   |   +-- VoucherFactory.js
|   |   +-- services
|   |   |   +-- GetStockService.js
|   |   +-- app.js
|   +-- index.html
+-- node_modules
+-- test
|   +-- backend
|   |   +-- api.spec.js
|   +-- e2e
|   |   +-- retailTestApp.spec.js
|   +-- unit
|   |   +-- GetStockService.spec.js
|   |   +-- ItemFactory.spec.js
|   |   +-- ItemLoggerFactory.spec.js
|   |   +-- RetailController.spec.js
|   |   +-- VoucherFactory.spec.js
|   +-- karma.conf.js
|   +-- protractor.conf.js
+-- .bowercc
+-- .gitignore
+-- bower.json
+-- package.json
+-- README.md
```

## Explanation of my approach

- I decided to build a MEAN stack app because I thought the majority of the user stories would be well-addressed with an AngularJS frontend which deals with the shopping cart. So I began by stubbing out the backend API which I built towards the end.
- I built everything test-first, using karma for the frontend unit testing, then protractor for integration testing, and mocha for the backend.
- Because this is a tech test, I tried to balance keeping things clear while also trying to show techniques I have learned (from e.g. makers academy or my favourite JS learning resource secrets of the javascript ninja). For example:
1. We were taught to try make our apps easily extendable/modifiable and to try make methods easy to reuse around the app. In this app, for example, instead of making an "addItem" method that could only push a single item into an array, I wrote a method that could accept several different kinds of arguments e.g. (addItems(item) or addItems(item1, item2...), or addItems([item1, item2])), as shown below:
```
addItems: function(items){
  this.items = [].concat.apply(this.items, arguments);
}
```
- I thought that there was a worthwhile tradeoff, as a little bit of extra coding resulted in a method that was easily reusable and easier for another person to use in the future.

- Here is a rough outline of the steps I took while building this app:
1. I began by making a shopping cart with the add/delete method. I saw a pattern that there were more than one item loggers (shopping cart, a log of the stock) present in the user stories, so I decided to make an item logger factory so that I could reduce replicated code in the future. I also felt that this was a good place to use object-oriented design.
2. I then made a controller which contains the main logic of my app, that would talk to my factories and services and present my html files with the data the user would interact with.  
3. I implemented the user stories for vouchers, which I also thought would work nicely as factories. This made them easily extendable, as anyone can add a voucher easily. Furthermore, if we wanted to keep a database of vouchers in the future, this would be very easily to implement from my code.
4. I made the backend api which served the static data. I used mongodb because I didn't need anything relational. This makes it easily extendable: we can use mongoose in the future to add/modify data.
5. I then made the service that gets data from the backend API.
6. In between these steps, I gradually built the view as well, based on my protractor tests.
7. (I added a little bootstrap so it looks a tiny bit better)

## Things I would want to change in the future:
- I think my RetailController is rather long. I tried really hard to refactor it as clearly as possible so it is obvious what my code is doing. But ideally, I would like to make the controller more modular.
- I would like to add es6 polyfills (e.g. array.includes) to make some methods a bit neater.

## What it looks like:
![Screenshot of the tech test](https://cloud.githubusercontent.com/assets/16217360/18030845/add03c72-6cbf-11e6-89e2-1638ab70fbad.png)
-And when you apply a voucher:
![Screenshot of applying voucher](https://cloud.githubusercontent.com/assets/16217360/18030846/ae9fde28-6cbf-11e6-9c19-c66c7b3f6429.png)
