# Delta Lake Request

## Request Body for Delta Lake



```
{
  "type": "string",
  "id_attribute": string,
  "payload":{
      "host":"string",
      "port": integer,
      "schema": "string",
      "httppath" : "string",
      "table":"string",
        "security": {
            "token" : "string"
        }
    }
}
```

| Field         | Type   | Value        |
|---------------|--------|--------------|
| type          | string  | Required. DELTALAKE       |
| id\_attribute | String  | Optional. Name of the column in data that represents the identifier of the row. Read more [here](broken-reference) |
| host          | string  | Required. Host name of the cluster      |
| port          | integer | Required. Post number of the cluster    |
| schema        | string  | Required. Name of the Schema            |
| httppath      | string  | Required. Http path of the cluster      |
| table         | string  | Required. Name of the table             |
| token         | string  | Required. API Token                     |
