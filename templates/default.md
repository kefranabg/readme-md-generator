<h1 align="center">Welcome to <%= projectName %> 👋</h1>
<% if (projectDescription) { -%>

> <%= projectDescription %>
<% } -%>

## Install

```sh
npm i
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```
<% if (authorName || authorTwitterUsername || authorGithubUsername) { -%>

## Author
<% if (authorName) { %>
👤 **<%= authorName %>**
<% } %>
<% if (authorTwitterUsername) { -%>
* Twitter 👉 [@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>)
<% } -%>
<% if (authorGithubUsername) { -%>
* Github 👉 [@<%= authorGithubUsername %>](https://github.com/<%= authorGithubUsername %>)
<% } -%>
<% } -%>

## Show your support

Please ⭐️ this repository if you like it.
<% if (licenseUrl) { -%>

##  License

<% if (authorName && authorGithubUsername) { -%>
Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>).
<% } %>
📜 This project is under [license](<%= licenseUrl %>).
<% } -%>

***
<%- include('footer.md'); -%>