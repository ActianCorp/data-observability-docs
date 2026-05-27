Ticket Integration API
=======================

This section provides a guide to the API endpoints for managing and integrating ticket templates. These templates allow you to define the structure and content of tickets created in external systems, such as Jira.

***

## Template Management

### Create a Template

Use this endpoint to create a new ticket template.

`POST {{apiUrl}}/{{tenant}}/configuration/integrations/tickets/template`

Request Body Example:

```json
{
    "name": "template-1",
    "description": "Template for new feature stories",
    "type": "JIRA",
    "props": {
        "jira_project_id": "10000",
        "jira_issue_type_id": "10001",
        "custom_fields": {
            "summary": "template desc"
        }
    }
}
```

**Fields:**

* `name` (string): A unique name for the template.
* `description` (string, optional): A brief description of the template's purpose.
* `type` (string): Ticket type (currently only `JIRA` is supported)
* `props` (object): Corresponding properties for ticket based on type

#### Jira Prop Fields

* `jira_project_id` (string): The ID of the Jira project to associate with this template.
* `jira_issue_type_id` (string): The ID of the Jira issue type (e.g., "Story," "Bug") for this template.
* `custom_fields` (object): A key-value pair of custom fields to be included in the ticket.

### Update a Template

Use this endpoint to update an existing template. The template ID is included in the URL path.

`PUT {{apiUrl}}/{{tenant}}/configuration/integrations/tickets/template/1`

Request Body Example:

```json
{
    "name": "template-1",
    "description": "Updated description",
    "type": "JIRA",
    "props": {
        "jira_project_id": "10000",
        "jira_issue_type_id": "10001",
        "custom_fields": {
            "summary": "updated template desc"
        }
    }
}
```

**Fields:**

* `name` (string): The new name for the template.
* `description` (string, optional): The new description for the template.
* `jira_project_id` (string): The new Jira project ID.
* `jira_issue_type_id` (string): The new Jira issue type ID.
* `custom_fields` (object): The updated custom fields.

### Get a Specific Template

Retrieve the details of a single template using its ID.

`GET {{apiUrl}}/{{tenant}}/configuration/integrations/tickets/template/1`

Response Body Example:

```json
{
    "id": 1,
    "name": "template-1",
    "description": "Updated description",
    "type": "JIRA",
    "props": {
        "jira_project_id": "10000",
        "jira_issue_type_id": "10001",
        "custom_fields": {
            "summary": "updated template desc"
        }
    }
}
```

#### Get All Templates

Retrieve a list of all available ticket templates.

`GET {{apiUrl}}/{{tenant}}/configuration/integrations/tickets/template`

Response Body Example:

```json
[
    {
        "id": 2,
        "name": "template-2",
        "description": null,
        "type": "JIRA",
        "props": {
            "jira_project_id": "10000",
            "jira_issue_type_id": "10001",
            "custom_fields": {
                "customfield_10014": "TEL-4825"
            }
        }
    },
    {
        "id": 1,
        "name": "template-1",
        "description": "Updated description",
        "type": "JIRA",
        "props": {
            "jira_project_id": "10000",
            "jira_issue_type_id": "10001",
            "custom_fields": {
                "summary": "updated template desc"
            }
        }
    }
]
```

***
