## Express JS API Example

#### Required
- Node >= 13.*
- npm >= 6.*
- PostgreSQL / MySql

#### Installation steps
- Take clone 
- First run `npm install` command
- Create copy of `env.example` file with `.env` name
- Set credential in `.env` file
- Run project 'npm start'

#### Details of the example
- User can login or registration by using this APIs.
- User modify our details after login.
- User can add or modify our projects after login.

#### List of APIs
- Authentication APIs(Token is not required)
    - Registration
    - Login
    - Forgot Password
    
- Users APIs(Token is required)
    - Update User
    - Change Password
    - Change Status
    - Delete User
    
- Project APIs(Token is required)
    - Create Project
    - Update Project    
    - Change Project Status
    - Delete Project