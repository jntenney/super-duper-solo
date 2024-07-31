# Overview

Codesmith solo project used to reinforce learning MongoDB, Express, React, Node, Redux, JWT and various other technologies. Using Amazon Products Dataset 2023 (1.4M Products) from https://www.kaggle.com/datasets/asaniczka/amazon-products-dataset-2023-1-4m-products.

## Learning Goals

- [ ] Use ES modules in Node rather than CommonJS in the backend
- [ ] Use Vite for packaging on the frontend
- [ ] Use .env file for environment variables
- [ ] Define application error types (extend from Error)
- [ ] Deeper understanding of Express routing and error handling
- [ ] Deeper understanding of Mongoose and managing MongoDB clusters
- [ ] Reinforcement of using bcrypt, JWT and http only cookies for authentication
- [ ] Reinforcement of implementing authorized middleware routes within Express

## Minimum Viable Product

In no particular order:

- ✅ Allow user to register with the site
- ✅ Allow user to login to the site
- ✅ Allow user to logout of the site
- ✅ loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile

### Backend

- npm install express dotenv mongoose bcryptjs jsonwebtoken cookie-parser express-async-handler colors
- npm install -D nodemon
- registerUser
  - Check if user email already exists
    - If user email unique then hash password and store as password in user model
    - Send user client JWT httpOnly cookie containing user id
- loginUser
  - Get user by user email from DB
    - If user is valid, then compare sent password to hashed password
      - If password match, send user client JWT httpOnly cookie containing user id
- logoutUser
  - If user client has JWT httpOnly cookie then remove it
- getUserProfile
  - If the user has valid JWT httpOnly cookie
    - Load their user profile by id from DB and send in response body
- updateUserProfile
  - If the user has valid JWT httpOnly cookie
    - Allow them to update their name, email address, or password
