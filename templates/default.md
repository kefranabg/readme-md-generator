<h1 align="center">Welcome to <%= projectName %> 👋</h1>
<p>
<% if (projectVersion) { -%>
  <img src="https://img.shields.io/badge/version-<%= projectVersion %>-blue.svg?cacheSeconds=2592000" />
<% } -%>
</p>
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
<% if (licenseUrl) { -%>

## Contributing

Contributions, issues and feature requests are welcome. Feel free to check [issues page](<%= licenseUrl %>) if you want to contribute.
<% } -%>
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

## License

<% if (authorName && authorGithubUsername) { -%>
Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>).
<% } %>
📜 This project is under [license](<%= licenseUrl %>).
<% } -%>

***
<%- include('footer.md'); -%>