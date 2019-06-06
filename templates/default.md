<h1 align="center">Welcome to <%= projectName %> 👋</h1>
<% if (projectDescription) { -%>

> <%= projectDescription %>
<% } -%>
<% if (authorName || authorTwitterUsername || authorGithubUsername) { -%>

## 👤 Author
<% if (authorName) { %>
**<%= authorName %>**
<% } %>
<% if (authorTwitterUsername) { -%>
* Twitter 👉[@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>)
<% } -%>
<% if (authorGithubUsername) { -%>
* Github 👉[@<%= authorGithubUsername %>](https://github.com/<%= authorGithubUsername %>)
<% } -%>
<% } -%>

## 🙏 Show your support

⭐️ this repository
<% if (licenseUrl) { -%>

## 📜 License

<% if (authorName && authorGithubUsername) { -%>
Copyright © <%= currentYear %> [<%= authorName %>](<%= authorGithubUsername %>).
<% } -%>
This project is under [license](<%= licenseUrl %>).
<% } -%>

***
<%- include('footer.md'); -%>