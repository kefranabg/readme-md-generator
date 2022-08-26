<h1 align="center">Welcome to <%= project.ben %> 👋</h1>


<% project.badges.map(({ name, type, badge, link }) => { -%>
<% if(badge) {%>[![](<%= badge %>)](<%= link %>) <% } else { %> [<img src="https://img.shields.io/badge/<%= type%>-<%= name%>-brightgreen.svg">](<%= link %>)<% } %>
<% }) -%>



|               |                                                                                                                          |
|---------------|--------------------------------------------------------------------------------------------------------------------------|
| Team          | 👤👤  **<%= project.team.name %>**                                                                                       |
| Support       | [<img src="https://img.shields.io/badge/slack-%23<%= project.team.contact%>-brightgreen.svg">](<%= project.team.link %>) |
| Repository    | [Service Repository](<%= project.repository.link %>)                                                                     |
| Deployment    | [Deployment Repository](<%= project.repository.deployment %>)                                                            | 
| Runbook       | []                                                                                                                       |   
| API Docs      |                                                                                                                          |
| Documentation |                                                                                                                          |

<p>

## Table of contents

- Overview
- Getting Started
  - Pre requisites
  - How wo Start and Run in 5 minutes
  - How to Test
  - How to use
- Contributing
- Authors

</p>

## Overview

<%= project.overview %>


## Getting Started

### Prerequisites

<%= project.gettingStarted.prerequisites.description %>



<% project.gettingStarted.prerequisites.dependencies.forEach(function(item) { -%>
<%for (const [key, value] of Object.entries(item)) { -%>
- <%=key%> <%=value%>
<% } %>
<% }) %>

### How to start and run in 5 minutes

<%= project.gettingStarted.setup.description %>

```
<%= project.gettingStarted.setup.command%>
```

## How to test

<%= project.gettingStarted.test.description %>

```
<%= project.gettingStarted.test.command%>
```

## How to use

<%= project.gettingStarted.usage.description %>

## 🤝 Contributing

<%= project.contributing.description %>


##  Authors

<% project.team.members.forEach(function(memberName) { -%>
👤 **<%= memberName %>**</br>
<% }) -%>