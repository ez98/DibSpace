Serving the front end app
-------------------------

### Option1: Django to serve `react app`

In this option, the Django app will serve our app in a route for e.g `/app/`. Basically the route `/app` will load react app's index.html.

In order for this to work, we need to build our react app using `npm run build` and copy the files to Django's static folder. One of the benefits option 1 gives, option 2 doesn't is, we can use the same domain for backend and frontend for e.g `www.example.com`.

### Option 2: deploy front end in S3

We still need to build the react app using `npm run build`, but we will not copy that to Django, in other words, we don't want Django to serve our front end app, you want s3 to serve the static website. This method requires a separate subdomain or domain to host the react app.

Thats is the only difference between the options. Our frontend app will make api calls to the Django api, thats same for both options. A preferred option is option 2 to reduce complexity.

### Only Issue is...
Creating our own domain will cost us money..
