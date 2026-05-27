# Azure Request data

## Request Body  for Azure

```
{
     "type":string,
      "id_attribute": string,
     "payload": {
         "bucket":string,
         "path":string,
         "read_options": {
           "separator": string
         },
         "security": {
           "sas_key": "string",
          "storage_account": "string"
         }
     }
 }
```

| Field         | Type   | Value        |
|---------------|--------|--------------|
| type             | string | Required. "azure"  |
| id\_attribute    | string | Optional. Name of the column in data that represents the identifier of the row. Read more [here](broken-reference)   |
| bucket           | string | Required. Name of the bucket    |
| path             | string | Required. Full path of file inside the bucket. Read more [here](broken-reference)   |
| read\_options    | json   | Provide this only for CSV input if there is a separator like “,” or “\t”. For parquet and json, omit read\_options and separator |
| separator        | string | For CSV only,  <br/>‘,’ for CSV |
| sas\_key         | string | Required. Shared Access Signature access key   |
| storage\_account | string | Required. Storage Account |
