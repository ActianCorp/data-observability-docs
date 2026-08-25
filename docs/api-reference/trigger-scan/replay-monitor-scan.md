# Replay Monitor Scan

This endpoint allows you to programmatically initiate a replay for a specific SQL monitor.

`POST` `https://{actian_endpoint}/api/data/{tenant}/assets/{asset_id}/batch_data/replay`

#### Request Body

The request supports the following parameters in the JSON body:

| Parameter    | Type      | Description                                         | Example |
| ------------ | --------- | --------------------------------------------------- | ------- |
| `monitor_id` | `Integer` | Unique ID of the SQL monitor to replay.             | `5225`  |
| `depth`      | `Integer` | Number of historical scans to replay (Range: 1–20). | `5`     |

**Example Request:**

```json
{
    "monitor_id": 5225,
    "depth": 5
}
```

