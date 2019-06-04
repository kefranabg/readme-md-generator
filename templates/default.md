<h1 align="center"><%= projectName %></h1>
<% if (projectDescription) { %>
> <%= projectDescription %><% } %>
<% if (authorName || authorTwitterUsername || authorGithubUsername) { %>
## 👤 Author
<% if (authorName) { %>**<%= authorName %>**<% } %>
<% if (authorTwitterUsername) { %>- Twitter 👉[@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>) <% } %>
<% if (authorGithubUsername) { %>- Github 👉[@<%= authorGithubUsername %>](https://github.com/<%= authorGithubUsername %>) <% } %>
<% } %>