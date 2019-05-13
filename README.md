In this project we are lading reddit page for the most popular 100 sebreddits, with the ability to reload latest posts every minute as well as keep the user current scroll to the record user is reading.


Link to the application : https://elmirabm.github.io/reddProject/


Please get the code from this repositry and run the "npm install" then "npm start"
to run the application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.




### Deployment
the github pages is used to deploy the application, you can find the deployed branch under(gh-pages is set to be the default branch.)
https://github.com/elmirabm/reddProject


link to the deployed applciation :
https://elmirabm.github.io/reddProject/


# How does it work :

### Load new data:
#### Solution:
1. Add the interval that will be run every one minuetes to get new data.
we ar emaking sure there is always only one interval on.
2. Interval is only active if :
a. We are in page 0. That is the most recent page with most recent data, as if user id in the older pages , there is no pont to reload new feeds.
b. If User is not in the buttom of the page, if user is reading last record, there is no more room for us to scroll data down, so it means if new data is added , user is already in the older page. In this case user an see "most recent" buttom available that can click on it. It will load new data , turn on interval , and also st scroll to the top of the page. 

#### Calculate Scroll:
We need to keep the user current record top, in the sam page in the same possition, so we find the upper record user can see in the current view, if this current view is not in last scroll position, when we load more data we will add to the top of this page and shift the scroll down by the number if the new record added multiply each record height . 


When we load new feeds there are some possibilites:
1.  There are 25 new records or more added to the page since last time update, 
In this case we can just add amount of records that are possible to fit in the current page , without loosing any record user are reading now.

2. lest that 25 record are loaded: depends on the room for more records we will add them all or less same as condition 1.

3. No new record is added, we dont change anything and we wait for the next minute.




#### Reddit Before/After Challenge:
In reddint we have before and after record in each load with all items we can get between them, they are the first and last record of they data we got. They are used to get the data that happend after the first record , and before the last record.

The problem with that is, these record's id are valid till 1000 record in each subreddit, so if we hare in categoty "All" that we might have more than 50 new records in second. If it took us long time to read or reload the page , if we have more than 1000 new record in reddit server memorym the before and after id are not valid anymore, so ww will get the data with 0 children in it.
In this case we have no other choice rather that loading last feeds.
We have 2 reducer state to control that :

`addNew`: Is when we are in page 0 and adding new feeds are returning 0 items.

`relaod`: we clicked on next or previouse but they are expired.

There is a condition here that might make an overlap :
If we call the interval to get new records, and it return 0 records, there is 2 possibilities :
1-no new record is availble -> we are fine 
2-our last before id is expired -> we can never get the new feed as our Id is not exist anymore


`solution :`
The solution I have for this is : instead of getting 25 record , I call the link with 26 record, that the 26th record is the same first feed I have currently in the page.
when I get the result:I compare the lists
-if they dont have any same records and lenght of the items loaded are 0 -> it is expired and we need to call new link
-if we have 1 record same (we are good it is not expired) we ahve right records we can add them if they are any. 



### Button "Most Recent": 
There is new interval call (was not in assignment), Every 5 second we call the reddit link, to get last record , and with the reducer action 'SET_AVAILABLE_MORE' we check: if the last record, is not same as our last record added in the newest feed loaded, we make the button "Most Recent" availble on th etop of the page.

-This will help the user in case they are in older pages, then they know there are new data availble.
-If we are in the middle of the 1 minutes to the call to get new data , user will know there are  more available.
-As we dont call 1 minute update any more if user be in the button of th epage and reading the last records,user will know the current oage now is the older page , and there are more oages to see. 

If user click on this: It will load new data , turn on interval , and also st scroll to the top of the page.

### Button "Category Change": 
if we change the category we call page 0 with new category and set the interval

### Button "Pagination": 
This will move th euser to the older or newer pages, with calling before and after append to the reddit api url


## Folder structure:
/src
    /action
        action file 
        -call reddit api url , to get last data
        -call reddit api url to get the most recent  25 record 
        -call reddit api url to get next . and previouse page's records
        -call reddit api url to get categories list(the most popular 100 subreddit)

    /types
    action types , 
    initial state of the reducer 

    /components
        /limit : handle the ui for categories 
        /Logo: handle reddit logo
        /Pagination: handle the button for Next, Previouse and Most Recent
        /Subreddit: for each post it will handle, the image, link to image, post title, author, commment link, and th etime posted 
    /reducer 
        reducer file
    /styles  
        App.css: very simple styling
    /Tests:
        test files for reducer and application
        utils.js : we have some functions that we need to use in most of the tests/ test store and middleware is here to be used in the integration tests
        we have reducer test based on action , and also integration test to teststore state

    /App.js
        the main file that load all data , and handle scroll position  , and intervals 
    /index.js 
        laod app.js with the store for redux and provider 
    /store.js
        redux store and middle ware



## Redux states:

    isLoaded :false             -> if page is loaded 
    items:[]                    ->  all 25 posts in current page
    category:"/r/All/"          -> the subreddit category on current load
    limit:25                    ->number of items we load
    intervalTime:60000          ->interval reload time
    before:null                 ->child[0] or first record we have in page 
    after:null,                 ->last child
    availableMore:false         ->if we have more feeds availble that didnt fit in current page
    addNew:false                ->the Current before/after are expired so we need to load latest data
    page:0                      ->page we are in =>0 is a page we continue reload unless we are at the buttom of the page/ -1 newer feeds / 1 older feeds
    categories:[]               ->all categories we have in list
    scrollBy:0,                 ->how many new record added to the page and we need to scroll down by this number
    reload:false                ->the before is expired and we need to call page 0 /latest data
    page0Top:""                 ->we keep the newest record loaded , to make sure we know when we have more 




