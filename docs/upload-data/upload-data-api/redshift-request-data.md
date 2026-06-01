# RedShift Request data

## Request Body for Red Shift

```
{
     "type":string,
     "id_attribute": string,
     "payload": {
         "endpoint_prefix": string,
         "database": string,
         "schema": string,
         "table": string,
         "security": {
             "user": string,
             "password": string
         }
         "read_options": {
           "separator": string
         }
     }
 }
```

| Field            | Type   | Value         |
| ---------------- | ------ | ------------- |
| type             | string | Required. "REDSHIFT"    |
| id\_attribute    | string | Optional. Name of the column in data that represents the identifier of the row. Read more [here](../../api-reference/upload-data-api.md) |
| endpoint\_prefix | string | Required. Name of the endpoint\_prefix  |
| database         | string | Required. Name of database  |
| schema           | string | Optional. Name of schema    |
| table            | string | Required. Name of table     |
| user             | string | Required. User name         |
| password         | string | Required. Password          |
