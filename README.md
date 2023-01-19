# Description

On week 8 of General Assembly’s Software Engineering bootcamp, we were assigned the following project: building a full stack application in one week in groups of 3, using React and MongoDB.

# Deployment link

gael-p4-sprout.herokuapp.com

# Getting Started/Code Installation

The project is hosted on GitHub you can find the link below:

github.com/gael37/project4-ga-sprout.git

# Timeframe & Working Team

The timeframe for the completion of the project was one week. And we worked in groups of 3. Below is the link to my partner’s GitHub repositories:

Shawn Fladager:
https://github.com/sfladager/sproutanywhereblog-SEIp3

Lok Sze Chung:
https://github.com/lokszechung/sprout-anywhere.git

# Technologies Used

HTML
Node.js
Javascript
React
Sass
Bootstrap
Chakra UI
Axios
Express
VScode
Figma
MongoDB
Mongoose
Cloudinary
-bcrypt

# Brief
Build a full stack application
Use an express API
Consume your API with a separate front-end
Implement thoughtful user stories/wireframes
Have a visually impressive design
Be deployed online

# Planning

<ins>Day 1:</ins>

We started by brainstorming each one's ideas/suggestions about the theme of our application. We agreed on building a website about plants that would be a platform to both:
visualise and post blogs 
visualise, post and buy plant products. 
We simultaneously worked on the wireframe using Figma. It was composed of 3 main divisions: 

-plants (index page and single product pages)
-blogs (index page and single product pages)
-user functionalities (login, register and profile page)

You can see our wireframe components below:

1- The home page which would contain an original filter designed to make the user navigation intuitive and  smooth:

The idea of the filter is described below:
When the user selects ‘I want to buy’ the filters that follow are related to plant products.
When the user selects ‘I want to learn about plants’ the filters that follow are related to blogs.
We would also have a navigation bar common to the website that contains a hamburger menu with all the links to our application previously described  pages, and a link to the profile page. 
Note: On the wireframe above you can see phone-sized components but we agreed from the to render our whole application in a responsive way so that the user can have a smooth navigation both on mobiles and desktops.

2- The blogs pages:


The blogs index would consist of blog cards with an image and a short description/title.
The blog’s single pages would contain all the descriptive components, images, authors, as well as share links.

3- The plants pages:

You can see here a similar design as the blogs’s one:


4- The log in, register and profile pages:


The users should have the possibility to view their profile page, their details and their posts.
They should have the possibility to edit their details and to post content from there as well without having to navigate through the website.
At this point we started having a sense of what our MVP and extras would be:
MVP:
A home page with the original filter system.
Navigation bar common to the website with a hamburger menu linking to the differents main pages (plants, blogs, login, register)
An about us section
A login page 
A register page
A profile page
Blogs pages (index and single pages)
Plants pages (index and single pages)

Extras:
A comments system where logged-in users have the possibility to share their thoughts on products or blogs.

At this point we presented our wireframe to our instructors and got signed off.
We splitted the initial tasks as follows:

Step 1: back-end

-Shawn: in charge of everything related to blogs
-Lok Sze: in charge of everything related to plants
-Me: in charge of login, register, authentication, error handling

Step 2: front-end

-Shawn: continuation of his work with blogs 
-Lok Sze: continuation of his work with plants + navigation bar
-Me: everything else (error pages, login , register, profile page and eventually if I have time, the comments system)

Note: we splitted the task according to our confidence on the tasks and personal preference. For example, I noticed that Shawn had a very clear idea of how he wanted the blog pages to look so naturally he took that task over, same for Lok Sze and the plant products. I was happy with my task as I wanted to review the user authentication part from what we had practised in class.

# Build/Code Process

Day 2:

Before jumping right into coding, the first thing that I did was spending some time reviewing thoroughly what we had studied in class for the past week and a half. During that time, we discovered how to code the back-end of an application and in particular how to use Mongoose which is a data modelling library for MongoDB. I also practised Git commands with my teammates to make sure we would be able to work stress freely on our own and merge our work progressively.

I started working on the authorization controllers, i.e. login and register.

Both of these controllers require a User model:

Mongoose makes it easier to work with MongoDB.
Note: the password confirmation will be asked to the user but will not be saved into the database as it would be a duplicate of password and would need to be hashed as well which would consume useless extra resources.
PasswordConfirmation is a virtual field in our schema. It exists but is not saved.
We set it to be virtual using the schema method ‘virtual’.
We set its value using the method ‘set’ and passing as an argument the callback function that will set its value to the value of the field filled by the user (the value of this field is the first parameter of this function).
Note: we use an ‘_’ to tell the set function to run only once once the field updates. Otherwise it would loop infinitely (because the field updates when it is set, and the set method is triggered when the field updates):

We made sure that the request invalidates if password and password confirmation don’t match:


Note: this validation happens just before the default validation. So we set it to be a pre-validation using the method ‘pre’.
The function next() passes all the parameters to the next piece of middleware.
Then we save the modified or created password in a hashed form using bcrypt which is a password hashing function:
Then we set a custom mongoose method that validates the password. We will reuse that method when the user sends a request where passing the password is necessary, such as logging in:


Register is a straight forward controller as it is just about using the req.body (the request object) and creating a new document instance of the User model and passing in req.body:

The method ‘create’ returns a promise so we await using an asynchronous function.
In the catch-all we send ‘err.message’ instead of ‘message’ as it is shorter and easier to read.
422 means unprocessable entity and means the user has not typed the fields correctly.

The login controller is a bit more complicated as we need to send the token back to the client side:


We use the method findOne, passing in the email as the argument to search for a matching record in our database.
If the user is not found or if the password doesn’t match the stored password (via our custom validation method), we throw unauthorised which is an extension of the class error:

If the user is successfully verified, we move on to the next step. We extract the sub (unique user identifier) and username from the user payload and we construct a token containing these pieces of information as well as the ‘secret’.
Then we return the token.
In the catch, SendErrors is a function that sorts out what message to return depending on the type of error:

I proceeded to some checks using Insomnia to make sure my controllers were working as intended.
Finally, I set the routes and their endpoints using the relevant request methods:


At that point we were already reaching day 3, so we decided to make a first merge of our work. We didn't have any conflicts as we had made sure to work on distinct parts.
After checking the request-response processes using Insomnia, we made sure that all were working as intended and we agreed that our minimum back-end structure was successfully built.

Day 3:

Using the same approach as on day 2, I started by reviewing in depth the client side processes.
Once I felt confident enough, I started coding my react components.

1- Register

The user has to submit a form which fields have to match our user’s schema fields on the back-end. The React useState hook allows us to track the state of the form fields and the error:
I set them to an empty string using useState, as well as the error:

Then I set each section of the form as follows in JSX:

The name is the same as the associated formField key, and the value tracks its state.
When typing, we trigger the callback function handleChange():

That function creates a shallow version of the form fields object in order to not mutate the state of the variable, and spreads the form fields inside of it, with the updated key-value pair ‘name: value’ corresponding to what we previously set as attributes for the input.
We repeat the same process for the other fields and on submission of the form, we trigger a callback on the vent ‘onSubmit’:

This function posts a request using axios to our API, passing in the form fields object as the request body.
Then we navigate the user to the login page.
Note: axios.post returns a promise so we use an asynchronous callback function.
In the catch we set the error state to be the message of the error.
In case of an error, we display it in JSX:


2- Login

For the login component we use the same method, but we also have to save the token received from the response in the local storage, in order to have access to it even when we navigate through the application as a logged-in user:

We navigate the user to the home page in case of successful request.
You can see the function setToken() below:



Day 4:

3- Profile page component:

I started by setting the state of my variables and then used a useEffect on the first page render, sending a get request to the appropriate endpoint in order to retrieve the data for the specific user. The endpoint passes through a secure route which enables gathering useful information about the request i.e. the headers (containing the token). If authenticated, the response is sent with the user data. We also use a referenced relationship in our back-end to return plants and blogs that a user owns, as you can see with the following User’s schema virtual fields:

These fields are referenced automatically when we access the User schema. But they are virtual so not saved within this model. They are only saved in their initial own model as you can see below:



In the same fashion, the owner is referenced in both models above.
In the ‘profile’ react component, I return in the JSX wrapper the following:
If profileData object is truthy, I display the appropriate data from the response object:
username
email
every plant and every blog via a map method.

In the screenshot above you can see that I mapped through profileData.createdplants to display all the plants. Each one of them will be displayed within a card containing an image and a description, each card being a link to the relevant plant/blog (see screenshot below). I used Sass for the design.


Note: I used a conditional to display a different message if the plant/blog array is empty or not, for more comfort of navigation for the user.
I also set a link ‘edit details’ which navigates to the ‘edit profile’ component page.

Day 5:

4- edit profile component 

This form is very similar to the register form. But I used a ‘put’ method instead of a post, as just the relevant modification should be taken into account.


The callback function on submission of the form is the following:

As a third argument in the put request, I pass in the ‘config’, containing the headers object, itself containing the token stored as the ‘Authorization’ value. On success, the user is redirected to his profile page, where his details are updated and displayed.
The getToken() function retrieves the token from the local storage:

For editing the profile, my request is sent through a secure route that allows to collect information of which user is currently logged in. We use that piece of information in the relevant controller:

You can see above that we set req.currentUser to userToVerify.
Thanks to the next() function, that piece of information is sent to the next piece of middleware as a parameter.
That same parameter is then reused in the updateUser controller:

Note: After testing that functionality, I realised that I had to add a conditional statement to make sure we assign the req.body to the user variable ONLY if the password matches the passwordConfirmation and if the fields are not empty, as otherwise it could lead to the crash of the server.

Day 6 and day 7:

On day 6 I carried on with some design and I worked on the AboutUs page which simply displays some links. I also set a ‘wrong route’ page which uses the catch all path ‘*’ and displays some helpful information to the user in order to help him navigate back to the application functional pages.
I realised that I had some extra time at that point and that my teammates were in control of their own part and that they didn’t need any major assistance, so I decided to implement a ‘comments’ functionality to the app: every logged in user would be able to type a comment on each blog/plant and that would be stored in the database as an embedded relationship in the schemas as you can see below:


Note: we ended up not using the rating key and you can see that I set the username of the current user within the schema in order to access it later on when I will return information in the relevant JSX wrapper.
Unfortunately, this might be a duplicate of some of the data already present in the database (among the user data). So there should be a better way to retrieve that information as a reference from the User schema instead. It is something that I mention in the ‘future improvements’ section.
I use the same schema type for the plant reviews.
Here is how I set the review fields in the relevant react components (the example below is for the plants single page and I use the same approach for the blogs single page):

Only text and owner are required keys.

When sending the post request using the specific id that I collect from the useParams method, I add the review field collected from the handleChange function (as I did for the previous components register and login). The owner is added automatically as it is a referenced relationship in the reviewSchema.

In the JSX you can see that I set the name and the value of the field accordingly to track the state:

I return the ‘review’ information using a map function , as ‘reviews’ is an array (each review is an object and reviews is the array composed of all these objects).

I also display the date in a readable format using JavaScript string and array methods.
You can see the ‘Any comments?’ section created below at the bottom of the screenshot.

# Challenges

The first challenge I faced was using Git properly. It was the first time for me working with several people on the same project with a file sharing system. It took me a while to get used to it, thankfully we practised committing and merging beforehand as it would have been stressful to do that for the first time in the middle of the project.
The second challenge was to manage errors when coding the user functionalities as many things could go wrong (passwords not matching, empty fields, token not valid etc). When I proceeded to the test on the ‘edit profile’ functionality, I was surprised at first to see the server crashing when the passwords was not matching the password confirmation, I had to search what error handling was missing and I noticed that it is important to face every scenario in the code, using conditional logic, to have a solid fallback and make sure the user is not getting a bit lost.
Finally, the review system was the biggest challenge, I couldn’t figure out what to send to the endpoint, so I had to follow the line of the process of the request-response circuit to finally find that the data in the request body should just be the text (the required field) and then our controller simply pushes that object in the reviews array.

# Wins

There are at least 3 big wins from that project:

-The biggest win for me is working as a team of 3 and managing to find my place and understanding how to interact in an efficient manner with my teammates. It was new to me and a bit scary at first because we all had our own ambitions and personal preferences for that project, but I was able to express my opinions quite well and I dared admitting when I was not really fancying someone else’s idea for example. I realised that it is important to communicate early, and even when you think you can’t help, actually you can, as sometimes your teammates could just be stuck on something you already bumped into. I found it really satisfying the way we split the tasks to make sure we worked as efficiently as we could on our own in what we were confident working on, and seeing the project getting more complex at each merge was quite exciting.
-I reviewed a lot of concepts for that project and I’m happy having figured out some points that I stumbled into such as the embedded review schema and the referenced relationships. I also got to review the authentication and the manipulation of the token which is a point on which I struggled a bit in class, but now feel confident on.
-Also concerning CSS I’m getting more confident and I learn a bit more everyday, especially during these projects.

# Key learnings/takeaways:

It was a bit of a rush at the end concerning the final mergings and it led to some stress. I definitely learnt my lesson, and for my next team projects I will try to set a clear deadline, but also synchronising as well with my teammates to make sure that they’re on the same page, as anything could go wrong, so planning some extra time (literally one full day) in case of an emergency is necessary.

# Future improvements:

There are a lot of things that can be added to the project to improve its functionality and design. Using a tool like Cloudinary to upload pictures for the profile components (photo of the user for example) is something I would work on and definitely add to the project. There is some more pseudo code to be implemented to improve the readability by other developers. The Sass file would need some formatting (not very DRY). The design of the register/login/profile pages could be improved to match the rest of the website making the overall design more consistent.
