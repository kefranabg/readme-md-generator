<h1 align="center"><%= projectName %></h1>
<% if (projectDescription) { %>
> <%= projectDescription %><% } %>
<% if (authorName) { %>
## 👤 Author
**<%= authorName %>**
<% if (authorTwitterUsername) { %>- Twitter 👉[@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>) <% } %>
<% if (authorGithubUsername) { %>- Github 👉[@<%= authorGithubUsername %>](https://twitter.com/<%= authorGithubUsername %>) <% } %>
<% } %>