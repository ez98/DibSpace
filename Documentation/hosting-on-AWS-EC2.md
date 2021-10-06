Serving the front end app
-------------------------

### Option1: Django to serve `react app`

In this option, the Django app will serve your app in a route for e.g `/app/`. Basically the route `/app` will load react app's index.html. it's that simple.

In order for this to work, you need to build your react app using `npm run build` and copy the files to Django's static folder. good so far? One of the benefits option 1 gives, option 2 doesn't is, you can use the same domain for backend and frontend for e.g `www.example.com`.

### Option 2: deploy front end in S3

You still need to build the react app using `npm run build`, but you will not copy that to Django, in other words, you don't want to Django to serve your front end app, you want s3 to serve the static website. this method requires a separate subdomain or domain to host the react app.

Thats is the only difference between the options. Your frontend app will make api calls to the Django api, thats same for both options.My preferred option is option 2 to reduce complexity.


