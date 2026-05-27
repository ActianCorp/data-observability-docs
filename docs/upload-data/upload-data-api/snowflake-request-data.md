# Snowflake Request data

## Request Body for Snowflake

```
  {
     "type":string,
      "id_attribute": string,
      
      "payload": {
        "account": "string",
        "database": "string",
        "schema": "string",
        "table": "string",
        "warehouse": "string",
      
        "security": {
          "private_key": "string",
          "role": "string",
          "user": "string"
        }
      }
  }

```

| Field         | Type   | Value        |
|---------------|--------|--------------|
| type          | string | Required. "SNOWFLAKE"     |
| id\_attribute | string | Optional. Name of the column in data that represents the identifier of the row. Read more [here](broken-reference) |
| account       | string | Required. Name of the account    |
| database      | string | Required. Name of database       |
| schema        | string | Optional. Name of schema         |
| table         | string | Required. Name of table          |
| warehouse     | string | Optional. Name of warehouse      |
| private\_key  | string | Required. Private key for access   |
| user          | string | Required. User name              |
| role          | string | Optional. Role                   |
