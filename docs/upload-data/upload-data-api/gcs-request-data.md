# GCS Request data

## Request Body for Google Cloud Storage

```
{
     "type":string,
     "id_attribute": string,
     "payload": {
         "bucket":string,
         "path":string,
         "read_options": {
           "separator": string
         }
     }
 }
```

| Field         | Type   | Value      |
| ------------- | ------ | ---------- |
| type          | string | Required. "GCS"   |
| id\_attribute | string | Optional. Name of the column in data that represents the identifier of the row. Read more [here](../../api-reference/upload-data-api.md)     |
| bucket        | string | Required. Name of GCS bucket      |
| path          | string | Required. Full path of file inside the bucket. Read more [here](../../api-reference/upload-data-api.md)  |
| read\_options | json   | Provide this only for CSV input if there is a separator like “,” or “\t”. For parquet and json, omit read\_options and separator |
| separator     | string | For CSV only,  <br/>‘,’ for CSV |
