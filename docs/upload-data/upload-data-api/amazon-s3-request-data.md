# Amazon S3 Request data

## Request Body for Amazon S3

```
{
     "type": string,
     "id_attribute": string,
     "payload": {
       "bucket": string,
       "path": string ,
       "security": {
         "aws_key": string,
         "aws_secret": string,
         "region": string
       },
       "read_options": {
           "separator": string
       }
     }
 }
```

| Field         | Type   | Value        |
|---------------|--------|--------------|
| type          | string | Required. "S3"      |
| id\_attribute | string | Optional. Name of the column in data that represents the identifier of the row. Read more [here](../../api-reference/upload-data-api.md)          |
| bucket        | string | Required. Name of S3 bucket       |
| path          | string | Required. Full path of file inside the bucket. Read more [here](../../api-reference/upload-data-api.md)   |
| aws\_key      | string | Required. AWS access key        |
| aws\_secret   | string | Required. AWS secret key        |
| region        | string | Required. AWS region            |
| read\_options | json   | Provide this only for CSV input if there is a separator like “,” or “\t”. For parquet and json, omit read\_options and separator |
| separator     | string | For CSV only,  <br/>‘,’ for CSV |
