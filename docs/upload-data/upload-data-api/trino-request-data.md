# Trino Request data

## Request Body for Trino

```
{
    "type": "GENERIC_JDBC",
    "payload": {
        "db_or_schema": string,
        "dbtype": string,
        "connection_properties": {
            "UseSSL": "true",
            "port": integer,
            "catalog": "bigquery",
            "server": string,
            "AuthScheme": "true"
        },
        "connection_security": {
            "secure_properties": {
                "user": string,
                "password": string
            }
        },
        "table": "ga_sessions_20160801"
    }
}
```

| Field          | Type    | Value                     |
| -------------- | ------- | ------------------------- |
| type           | string  | Required. "GENERIC\_JDBC" |
| table          | string  | Required. Table Name      |
| db\_or\_schema | string  | Optional. Name of schema  |
| dbtype         | string  | Required. "trio"          |
| UseSSL         | string  | Optional. "true"          |
| port           | integer | Required. port number     |
| catalog        | string  | Required. "bigquery"      |
| server         | string  | Required. Server Name     |
| AuthScheme     | string  | Required. "true"          |
| user           | string  | Required. User name       |
| password       | string  | Required. Password        |
