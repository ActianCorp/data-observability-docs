# AWS S3

## Creating a Connection

Actian Data Observability can be setup to read files directly from your S3 bucket. This requires read access to your S3 bucket. Please add the following permissions to the S3 bucket for the IAM user whose credentials (key and secret) will be used:

1. s3:GetBucketLocation
2. s3:ListBucket
3. s3:GetObject

Once the permissions are granted, proceed to the Actian Data Observability UI and enter the required information:

* **AWS** **Key:** Your AWS access key.
* **AWS** **Secret Key:** Your AWS secret access key.
* **Region:** The AWS region where your S3 bucket is located.
* **Bucket**: The name of your S3 bucket.

![](images/observability-aws-s3-create-connection.png)

## Connecting an Asset

Once a connection is defined, you can start using it to create assets. To create assets, you will need:

* **Path:** The full path to the file in the bucket or the full path of the folder containing all files to be scanned. If specifying a folder, ensure all files have the same extension (e.g., .csv, .json, .parquet).
* **File Type:** Please refer to [Supported File Types](../supported-file-types.md).
* **Delimiter (Optional for CSV type):** Choose the delimiter used in your files (e.g., comma, tab, space).

![](images/observability-aws-s3-connect-asset.png)