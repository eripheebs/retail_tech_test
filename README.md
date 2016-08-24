## How to run the app:


## My approach

- I want to build a MEAN stack app. I thought the majority of the user stories would be well-addressed with an AngularJS frontend which deals with the shopping cart, stubbing out the backend API which I will build last.
- I will build it test-driven, using karma for the frontend unit testing, then protractor when I want to make the user experience, and mocha for the backend.
###### Here is my rough plan: (I realise it may change a lot while building so this is by no means strict ATM)
1. Begin by making a shopping cart factory with the add/delete method. (unit test)
2. Then make a controller that has a shopping cart and talks to it (add/delete method) and can add up prices. (unit test)
3. Make the html file (protractor test)
4. Make a method that adds voucher to the price displayed to the user (unit/protractor)
5. The controller should be able to return an alert (unit/protractor)
- Then to get items from backend API:
6. Create service that talks to backend database
7. Create factory for item and then put these items in our "stock"(I can use the 'shopping cart' factory I made earlier which is basically an item logger!)
8. Method to add item to shopping cart
9. Display items on page
10. Make it so that when you add an item to a shopping cart you remove it from the stock!
###### Database:
11. Then create the backend using node, express and mongodb because it doesnt have to be relational
12. seed the database
###### UX:
13. make sure everything flows nicely
14. add bootstrap
15. add ng-cookies (^ this should be higher up)
######Nice to haves:
16. add es6 polyfills e.g. array.includes method
17. load scripts / controllers etc more neatly on index.html
