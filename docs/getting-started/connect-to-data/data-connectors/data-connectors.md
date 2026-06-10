# Data Connectors

## List of Connectors Available

* [Google Big Query](google-bigquery.md)
* [Google Cloud Storage](google-cloud-storage.md)
* [Hive Metastore](iceberg.md) / [Iceberg REST](iceberg-rest.md)
* [AWS S3](aws-s3.md)
* [AWS Redshift](aws-redshift.md)
* [AWS Athena](aws-athena.md)
* [Azure Blob](azure-blob.md)
* [Databricks Delta](databricks.md)
* [MySQL](mysql.md)
* [Snowflake](snowflake.md)
* [Salesforce](salesforce.md)
* [SAP Hana](sap-hana.md)
* [SQL Server / Azure SQL Database](sql-server.md)
* [Trino](trino.md)

## Supported File Formats

Actian Data Observability supports reading various file formats stored in cloud buckets, including:

* Comma Separated Values (CSV)
* Parquet
* JSON
* Databricks Delta

[Learn more about supported file formats](../supported-file-types.md).

### Unsupported Data Types

Actian Data Observability currently does **not support profiling, monitoring, or rule evaluation** for certain database data types that are non-relational, binary, object-based, or cursor-referenced in nature.

Columns defined with the following data types are excluded from Actian Data Observability’s processing pipeline.

1. BLOB
2. BINARY
3. VARBINARY
4. JAVA_OBJECT
5. DATALINK
6. REF
7. REF_CURSOR
