Authentication API
==================

## Authenticate with Actian Data Observability

This API authenticates user credentials and returns an access token
`POST` `/auth/token`

### Parameters

| **Name**        | **Type** | **Description**                                                   |
| --------------- | -------- | ----------------------------------------------------------------- |
| `clientId`      | string   | Client identifier for the application                             |
| `grantType`     | string   | Type of authentication. Use `"password"` or `"refresh_token"`.    |
| `username`      | string   | Username for the user                                             |
| `password`      | string   | Password for the user. Required if grant\_type is "password"      |
| `refreshToken`  | string   | Refresh token string. Required if grant\_type is "refresh\_token" |
| `code`          | string   | Authorization code (used for `authorization_code` grant type)     |
| `redirectUrl`   | string   | URL to redirect to after authorization                            |
| `transactionId` | string   | Unique ID for tracking the request                                |
| `tenant`        | string   | Identifier for the tenant                                         |

### Headers

| Name        | Type   | Description            |
| ----------- | ------ | ---------------------- |
| Content-type* | string | application/x-www-form-urlencoded |

```
curl -X 'POST'
'https://dev.telm.ai/api/auth/auth/token?clientId=string&grantType=password&username=string&password=string&refreshToken=string&code=string&redirectUri=string&transactionId=string&tenant=string'
-H 'accept: */*'
-d ''
```

**200**
```
{
  "expires": 3600,
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "string"
}
```

**401**
```
{"description": "Unauthorized"}
```

**403**
```
{"description": "Forbidden"}
```

**404**
```
{"description": "Not Found"}
```
