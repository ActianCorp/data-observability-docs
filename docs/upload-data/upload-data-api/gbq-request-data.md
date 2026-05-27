# GBQ Request data

## Request Body for Google BigQuery

Currently supported values for "method" are listed [here](broken-reference)

```
{
   "type":string,
   "id_attribute": string,
   "payload": {
       "project":string,
       "dataset":string,
       "table":string,
       "method":string
   }
}

```
| Field         | Type   | Value        |
|---------------|--------|--------------|
| type          | string | Required. "BIGQUERY"    |
| id\_attribute | string | Optional. Name of the column in data that represents the identifier of the row. Read more [here](broken-reference) |
| project       | string | Required. Name of GBQ project    |
| dataset       | string | Required. Name of GBQ dataset    |
| table         | string | Required. Name of GBQ table      |
| method        | string | Required. Supported types are described [here](broken-reference)  |
