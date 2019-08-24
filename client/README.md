# React Client

Purpose  - The purpose of this application is to provide a client for a REST API which allows users to
create, read, update, and delete courses. Users can create accounts and are authenticated before performing
protected actions that modify courses and the course list.

Implementation - The project is implemented by providing components and routes that act on
courses stored provided by the REST API. The components include:
1. Courses : represents a list of all of the courses provided by the REST API
2. CourseDetail : represents a single course from the REST API, contains state to manage the course title, description, estimated
time and materials needed
3. CreateCourse : provides users a means of creating courses by displaying a form that allows users to set state for a course
title and description (both are required fields) as well as estimated time and materials needed (neither required)
4. UpdateCourse : provides users a means of updated courses by displaying a form that allows users to modify state for a course
(the title and description must be present as they are required fields)
5. Header : provides users with links to either sign up for the site or sign in to the site, when signed in, users will see a
link to sign out as well as a customized greeting message
6. UserSignUp : provides users a means of signing up to the site by displaying a form which allows users to set state for a user
name (first and last name fields), email address, and password, all of these fields are required, the password must be confirmed and the email address must be unique within the site
7. UserSignIn : provides users a means of signing in to the site by displaying a form which allows users to enter their account's email address and password, this process authenticates the user and allows them to perform protected actions (course creation, deletion and update)
8. UserSignOut : provides users a means of signing out of the form, doesn't render any visual information but removes users' authenticated status and prevents them from performing protected actions
9. UnhandledError : provides error handling for unhandled errors and server errors by displaying an error message to the user
10. Forbidden : provides error handling for forbidden actions when the user attempts to perform a protected action when they aren't authenticated or aren't the owner of the requested resource
11. NotFound : provides error handling when the user attempts to navigate to a route that doesn't exist
12. PrivateRoute : a higher-order component that protects certain routes by forcing users to be authenticated before the route can be accessed
13. Context : a directory providing an index file which allows components to be subscribed to the application context, allowing them to access the global state

How To Run the Client - To run the client, download the project files, and then navigate the 'client' directory from the root
directory of the project and run the command 'npm install' to install the project dependencies. Once the dependencies are
installed, run the command 'npm start' to run the client.
