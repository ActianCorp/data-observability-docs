# Jobs Status Notification

This page describes a way to listen for updates happening with your connected datasets through setting up webhooks.

Actian Data Observability allows you to setup webhooks that get triggered when processing job status changes. If defined, the callback gets triggered when:

* Job is running
* Intermediate job state changes
* Job is completed

## Definition

The following params are sent as part of the body

| Param | Description |
|---|---|
| `tenant` | Associated tenant ID where the callback happened |
| `source` | Associated dataset source ID |
| `jobId` | Associated job ID |
| `status` | Job status (`IN_PROGRESS, FINISHED, FAILED, PREPARING, BATCH_WAIT`) |
| `details` | Description of job status |

## Example Payload

When Data Observability triggers a webhook, it sends a `POST` request to your URL with a JSON body similar to:

```json
{
  "tenant": "your-tenant-id",
  "source": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "jobId": "job-20260417-001",
  "status": "FINISHED",
  "details": "Job completed successfully"
}
```

## Usage

To use this feature, you will need to:

1. Navigate to the configuration page
2. Open the settings for the associated dataset
3. Click on **Job Notifications Settings**
4. In the **Webhook URL** field, enter the endpoint URL where Data Observability should send callbacks
5. Click **Save** to apply the configuration

!!! note
    Your webhook endpoint must be publicly accessible and respond with an HTTP `2xx` status code. Data Observability retries delivery on failure.
