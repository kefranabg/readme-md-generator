# Welcome to <%= projectName %> 👋
<% if (isProjectOnNpm) { -%>
[![Version](https://img.shields.io/npm/v/<%= projectName %>.svg)](https://www.npmjs.com/package/<%= projectName %>)
<% } -%>
<% if (projectVersion && !isProjectOnNpm) { -%>
![Version](https://img.shields.io/badge/version-<%= projectVersion %>-blue.svg?cacheSeconds=2592000)
<% } -%>
<% if (projectPrerequisites) { -%>
<% projectPrerequisites.map(({ name, value }) => { -%>
![Prerequisite](https://img.shields.io/badge/<%= name %>-<%= encodeURIComponent(value) %>-blue.svg)
<% }) -%>
<% } -%>
<% if (projectDocumentationUrl) { -%>
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](<%= projectDocumentationUrl %>)
<% } -%>
<% if (isGithubRepos) { -%>
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](<%= repositoryUrl %>/graphs/commit-activity)
<% } -%>
<% if (licenseName) { -%>
[![License: <%= licenseName %>](https://img.shields.io/<%= isGithubRepos ? `github/license/${authorGithubUsername.split(',')[0]}/${projectName}` : `badge/License-${licenseName}-yellow.svg` %>)](<%= licenseUrl ? licenseUrl : '#' %>)
<% } -%>
<% if (authorTwitterUsername) { -%>
<% authorTwitterUsername.split(',').forEach(e => { -%>
[![Twitter: <%= e.trim() %>](https://img.shields.io/twitter/follow/<%= e.trim() %>.svg?style=social)](https://twitter.com/<%= e.trim() %>)
<% }) -%>
<% } -%>
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

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](<%= contributingUrl %>).
<% } -%>

## Show your support

Give a ⭐️ if this project helped you!
<% if (authorPatreonUsername) { -%>

[![support us](https://img.shields.io/badge/become-a patreon%20us-orange.svg?cacheSeconds=2592000)](https://www.patreon.com/<%= authorPatreonUsername %>)
<% } -%>

<% if (licenseName && licenseUrl) { -%>

## 📝 License

<% if (authorName && authorGithubUsername) { -%>
<% const authors = authorName.split(',') -%>
<% const githubs = authorGithubUsername.split(',') -%>
Copyright © <%= currentYear %> [<%= authors[0].trim() %>](https://github.com/<%= githubs[0].trim() %>)<% for (var i = 1; i < authors.length; i++) { if (authors[i] && githubs[i]) { -%>, [<%= authors[i].trim() %>](https://github.com/<%= githubs[i].trim() %>)<%_ }} _%>.
<% } -%>
This project is [<%= licenseName %>](<%= licenseUrl %>) licensed.
<% } -%>

***
<%- include('footer.md'); -%>
