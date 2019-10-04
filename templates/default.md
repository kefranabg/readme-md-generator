<h1 align="center">Welcome to <%= projectName %> 👋</h1>
<p>
<% if (isProjectOnNpm) { -%>
  <a href="https://www.npmjs.com/package/<%= projectName %>" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/<%= projectName %>.svg">
  </a>
<% } -%>
<% if (projectVersion && !isProjectOnNpm) { -%>
  <img alt="Version" src="https://img.shields.io/badge/version-<%= projectVersion %>-blue.svg?cacheSeconds=2592000" />
<% } -%>
<% if (projectPrerequisites) { -%>
<% projectPrerequisites.map(({ name, value }) => { -%>
  <img src="https://img.shields.io/badge/<%= name %>-<%= encodeURIComponent(value) %>-blue.svg" />
<% }) -%>
<% } -%>
<% if (projectDocumentationUrl) { -%>
  <a href="<%= projectDocumentationUrl %>" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
<% } -%>
<% if (isGithubRepos) { -%>
  <a href="<%= repositoryUrl %>/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
<% } -%>
<% if (licenseName) { -%>
  <a href="<%= licenseUrl ? licenseUrl : '#' %>" target="_blank">
    <img alt="License: <%= licenseName %>" src="https://img.shields.io/<%= isGithubRepos ? `github/license/${authorGithubUsername.split(',')[0]}/${projectName}` : `badge/License-${licenseName}-yellow.svg` %>" />
  </a>
<% } -%>
<% if (authorTwitterUsername) { -%>
<% authorTwitterUsername.split(',').forEach(e => { -%>
  <a href="https://twitter.com/<%= e.trim() %>" target="_blank">
    <img alt="Twitter: <%= e.trim() %>" src="https://img.shields.io/twitter/follow/<%= e.trim() %>.svg?style=social" />
  </a>
<% }) -%>
<% } -%>
</p>
<% if (projectDescription) { -%>

> <%= projectDescription %>
<% } -%>
<% if (projectHomepage) { -%>

### 🏠 [Homepage](<%= projectHomepage %>)
<% } -%>
<% if (projectDemoUrl) { -%>

### ✨ [Demo](<%= projectDemoUrl %>)
<% } -%>
<% if (projectPrerequisites && projectPrerequisites.length) { -%>

## Prerequisites

<% projectPrerequisites.map(({ name, value }) => { -%>
- <%= name %> <%= value %>
<% }) -%>
<% } -%>
<% if (installCommand) { -%>

## Install

```sh
<%= installCommand %>
```
<% } -%>
<% if (usage) { -%>

## Usage

```sh
<%= usage %>
```
<% } -%>
<% if (testCommand) { -%>

## Run tests

```sh
<%= testCommand %>
```
<% } -%>
<% if (authorName || authorTwitterUsername || authorGithubUsername) { -%>
<% if (authorName.split(',').length > 1) { -%>

## Authors
<% } else { -%>
## Author
<% } -%>

<% const names = authorName.split(',') -%>
<% const twitters = authorTwitterUsername.split(',') -%>
<% const githubs = authorGithubUsername.split(',') -%>
<% for (var i = 0; i < names.length; i++) { -%>

<% if (names[i]) { %>
👤 **<%= names[i].trim() %>**
<% } %>
<% if (twitters[i]) { -%>
* Twitter: [@<%= twitters[i].trim() %>](https://twitter.com/<%= twitters[i].trim() %>)
<% } -%>
<% if (githubs[i]) { -%>
* Github: [@<%= githubs[i].trim() %>](https://github.com/<%= githubs[i].trim() %>)
<% } -%>
<% } -%>
<% } -%>
<% if (contributingUrl) { -%>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](<%= contributingUrl %>).
<% } -%>

## Show your support

Give a ⭐️ if this project helped you!
<% if (authorPatreonUsername) { -%>

<a href="https://www.patreon.com/<%= authorPatreonUsername %>">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
<% } -%>
<% if (licenseName && licenseUrl) { -%>

## 📝 License

<% if (authorName && authorGithubUsername) { -%>
<% const authors = authorName.split(',') -%>
<% const githubs = authorGithubUsername.split(',') -%>
Copyright © <%= currentYear %> [<%= authors[0].trim() %>](https://github.com/<%= githubs[0].trim() %>)<% for (var i = 1; i < authors.length; i++) { if (authors[i] && githubs[i]) { -%>, [<%= authors[i].trim() %>](https://github.com/<%= githubs[i].trim() %>)<%_ }} _%>.<br />
<% } -%>
This project is [<%= licenseName %>](<%= licenseUrl %>) licensed.
<% } -%>

***
<%- include('footer.md'); -%>
