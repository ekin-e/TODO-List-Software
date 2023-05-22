How to launch:

1) Download and extract the zip file
2) ssh into a UMN lab machine
example command: ssh -L 127.0.0.1:3306:cse-mysql-classes-01.cse.umn.edu:3306 ercet001@csel-kh1250-10.cselabs.umn.edu
3) Install Express.js and all the dependenciesn (node_modules folder):
ex: npm install express 
4) Run the project: node server.js 

Extra features

- User can mark tasks as "done", "almost done", "working", "just started", and "not done". A newly added task will automatically be marked as "not done".
- A progress bar will be displayed depending on the user's task status.

Notes

- If the user tries to add a task when a "done", "almost done", "working", or "just started" filters are on, then they won't be able to see the new task since it'll be automatically marked as "not done". To see it the user will have to simply select "not done" or "all" options.

- The progress bar doesn't update when I don't reload the page. Or for it to work you can just uncomment "location.reload()" part inside the client part (button.js), but then that will also affect the "marking a todo item as done or undone without a page-reload." part of the project.