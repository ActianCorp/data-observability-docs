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

## Usage

To use this feature, you will need to:

1. Navigate to the configuration page
2. Open the settings for associated dataset
3. Click on `Job Notifications Settings`
4. In the field for `Webhook URL`, specify your API URL
