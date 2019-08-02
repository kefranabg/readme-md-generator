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
<% if (licenseName && licenseUrl) { -%>
[![License: <%= licenseName %>](https://img.shields.io/badge/License-<%= licenseName %>-yellow.svg)](<%= licenseUrl %>)
<% } -%>
<% if (authorTwitterUsername) { -%>
[![Twitter: <%= authorTwitterUsername %>](https://img.shields.io/twitter/follow/<%= authorTwitterUsername %>.svg?style=social)](https://twitter.com/<%= authorTwitterUsername %>)
<% } -%>
<% if (projectDescription) { -%>

> <%= projectDescription %>
<% } -%>
<% if (projectHomepage) { -%>

### 🏠 [Homepage](<%= projectHomepage %>)
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

## Author
<% if (authorName) { %>
👤 **<%= authorName %>**
<% } %>
<% if (authorTwitterUsername) { -%>
* Twitter: [@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>)
<% } -%>
<% if (authorGithubUsername) { -%>
* Github: [@<%= authorGithubUsername %>](https://github.com/<%= authorGithubUsername %>)
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
Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>).

<% } -%>
This project is [<%= licenseName %>](<%= licenseUrl %>) licensed.
<% } -%>

***
<%- include('footer.md'); -%>
