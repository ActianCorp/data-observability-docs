# Configuring Data-Binning

Data binning enables you to automatically separate valid data from problematic data at the source, ensuring that only high-quality records flow through your data pipelines. By routing bad or suspicious data to a separate location for review, you can prevent costly downstream processing of invalid records and maintain pipeline efficiency.

Data Observability's data binning feature monitors data correctness and categorizes records into two bins:

* **Valid Data**: Records that meet all [defined data quality rules](../user-defined-monitors/record-validation-rules.md) and continue through your pipeline
* **Invalid Data**: Records that violate quality rules and are flagged for review

This automated quality gate helps you maintain data integrity while reducing the cost of processing bad data through expensive transformation and analytics pipelines.

### Prerequisites

Before configuring data binning, ensure you have:

1. A connected data source in Data Observability
2. Defined [record validation rules](../user-defined-monitors/record-validation-rules.md) for your dataset
3. A cloud storage destination (AWS S3, GCP Cloud Storage, or Azure Blob Storage) with appropriate permissions

## Configuration Steps

### Step 1: Configure ID Attribute

Set the ID attribute for your data source to enable record-level tracking. This unique identifier allows Data Observability to categorize individual records into valid or invalid bins.

**To configure:**

1. Navigate to your connected asset settings
2. Locate the **ID Attribute** configuration
3. Select the column that uniquely identifies each record (e.g., `record_id`, `transaction_id`, `user_id`)

### Step 2: Define Data Quality Monitors

Create one or more validation monitors that determine whether data is valid or invalid as defined in [Record Validation Monitors](../user-defined-monitors/record-validation-rules.md).

### Step 3: Enable Data Binning

Now you're ready to configure and activate data binning.

**To enable:**

1. Click the **Configure Data Binning** button\
   ![](<../../../assets/assets/image (8).png>)
2. Select Correctness Monitor:\
   Choose one or more correctness monitors you created in Step 2. These are the monitors/rules that defines which records are considered valid vs. invalid.
3. Choose Storage Destination:\
   Select your cloud storage type:
    * **AWS S3**
    * **GCP Cloud Storage**
    * **Azure Blob Storage**
4. Enter Storage Credentials: Provide the authentication credentials for your chosen storage destination. See [Storage Permissions](configuring-data-binning.md#storage-permissions) below for required access levels.
5. Define Storage Paths
    1. **Valid Data Path**: The destination path for records that pass all quality rules (e.g., `s3://my-bucket/valid-data/`)
    2. **Invalid Data Path**: The destination path for records that fail quality rules (e.g., `s3://my-bucket/invalid-data/`)
6. Click **Save** to activate data binning

### Step 4: Verify Binning Activation

Once enabled, data binning automatically takes effect during your next data scan job. Data Observability will begin routing records to the appropriate storage paths based on your correctness policy.

**To verify:**

1. Wait for the next scheduled scan or trigger a manual scan
2. Check both the valid and invalid data paths in your cloud storage
3. Review the binning results in the Data Observability monitoring dashboard

### Storage Permissions

#### AWS S3

Ensure your AWS credentials have the following permissions:

* `s3:PutObject` - Write objects to buckets
* `s3:DeleteObject` - Remove objects from buckets
* `s3:ListBucket` - List bucket contents

#### GCP Cloud Storage

Your service account must have the following IAM roles:

* **Storage Legacy Bucket Writer** - Write access to buckets
* **Storage Legacy Object Owner** - Full control over objects

#### Azure Blob Storage

Your SAS token or service principal must have:

* **Write** permissions - Create and write blobs
* **Delete** permissions - Remove blobs (required for data binning operations)

## Feature Limitation

* **Group Assets**: Data binning is not currently supported for assets belonging to a group. Configure binning at the individual asset level.
* **Data Diff Compatibility**: The Data Diff feature is not available for assets with data binning enabled.
* **Scan Frequency**: Binning operates during scheduled scans. Ensure your scan frequency aligns with your data freshness requirements.



## Related Documentation

* [Creating a Monitor](creating-a-monitor.md)
* [Managing Existing Monitors](managing-existing-monitors.md)
* [Configuring Notification](configuring-notifications.md)

