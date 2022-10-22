## Alex Godard notes

- I used Tailwindcss as it allows me to do styling quicker than with Styled-Components.
- I've also added `lodash`, `react-query` and `classnames` as dependencies
- The website is responsive/works on mobile
- The search bar is functional
- I've artificially slowed downed the queries to the server so that we could see the loading states
---------------------
# Planned Interview Test

For this test, you will need to retrieve users from 3 different api endpoints. You will then need to order those users by name (firstName + lastName) *ascending* and if multiple people have the same name, order them by age *descending*.

So you would have a list like this one:

```
Alex B - 32
Marc C - 55
Marc C - 12
Tony Z - 21
```

The design of your project should match the below image. You will find the necessary assets in the public folder of the project.

![alt text](https://github.com/entr-engineering/interview-test/blob/master/public/design.png)

## Run the project

Make sure you have node 12+ installed

`npm i && npm start`

## Endpoints

- http://localhost/users/kids
- http://localhost/users/adults
- http://localhost/users/seniors

**(do not modify those endpoints)

## Tasks

- Retrieve users from the 3 endpoints when clicking the "Retrieve Users" button
- Order the users from the 3 collections by name ascending followed by the age descending
- Implement a filter for the age based on the min and max values of the inputs
- We recommend using the `styled-components` library to style your components

### Happy coding!
