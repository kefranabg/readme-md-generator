<h1 align="center">Welcome to <%= projectName %> 👋</h1>
<p>
<% if (projectVersion) { -%>
  <img src="https://img.shields.io/badge/version-<%= projectVersion %>-blue.svg?cacheSeconds=2592000" />
<% } -%>
<% if (projectDocumentationUrl) { -%>
  <a href="<%= projectDocumentationUrl %>">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
<% } -%>
<% if (isGithubRepos) { -%>
  <a href="<%= repositoryUrl %>/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
<% } -%>
<% if (licenseName && licenseUrl) { -%>
  <a href="<%= licenseUrl %>">
    <img alt="License: <%= licenseName %>" src="https://img.shields.io/badge/License-<%= licenseName %>-yellow.svg" target="_blank" />
  </a>
<% } -%>
</p>
<% if (projectDescription) { -%>

> <%= projectDescription %>
<% } -%>
<% if (projectPrerequisites) { -%>

## ⚠️ Prerequisites

- <%= projectPrerequisites.join("\n- "); %>
<% } -%>

## 📦 Install

```sh
npm i
```

## 🚀 Usage

```sh
npm run start
```

## ✅ Run tests

```sh
npm run test
```
<% if (contributingUrl) { -%>

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to check [issues page](<%= contributingUrl %>) if you want to contribute.
<% } -%>
<% if (authorName || authorTwitterUsername || authorGithubUsername) { -%>

## 👤 Author
<% if (authorName) { %>
**<%= authorName %>**
<% } %>
<% if (authorTwitterUsername) { -%>
* Twitter: [@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>)
<% } -%>
<% if (authorGithubUsername) { -%>
* Github: [@<%= authorGithubUsername %>](https://github.com/<%= authorGithubUsername %>)
<% } -%>
<% } -%>

## 🙏 Show your support

Please ⭐️ this repository if you like it.
<% if (licenseName && licenseUrl) { -%>

## 📝 License

<% if (authorName && authorGithubUsername) { -%>
Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>).
<% } %>
This project is [<%= licenseName %>](<%= licenseUrl %>) licensed.
<% } -%>

***
<%- include('footer.md'); -%>