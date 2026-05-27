# User Management

APIs to manage users

## Get all users assigned to this tenant

`GET` `https://data-observability.actian.com/api/auth/auth/{tenant}/users`

### Path Parameters

| Name    | Type   | Description    |
| ------- | ------ | -------------- |
| tenant* | string | Name of Tenant |

### Headers

| Name          | Type   | Description                                     |
| ------------- | ------ | ----------------------------------------------- |
| Content-type    | string | application/json                                |
| Authentication* | string | Bearer \<access\_token from authentication api> |

**200 List of users**
```json
[
  {
    "email": "string",
    "first_name": "string",
    "id": "string",
    "last_name": "string",
    "role": "string"
  }
]
```

## Get a user's details

`GET` `https://data-observability.actian.com/api/auth/auth/{tenant}/users/{user_email}`

### Path Parameters

| Name         | Type   | Description    |
| ------------ | ------ | -------------- |
| tenant*      | string | Name of Tenant |
| user\_email* | String | User email     |

### Headers

| Name            | Type   | Description                                     |
| --------------- | ------ | ----------------------------------------------- |
| Content-type    | string | application/json                                |
| Authentication* | string | Bearer \<access\_token from authentication api> |

**200 User details**
```json
{
    "email": "string",
    "first_name": "string",
    "id": "string",
    "last_name": "string",
    "role": "string"
 }
```

## Create User

`POST` `https://data-observability.actian.com/api/auth/auth/{tenant}/users`

### Path Parameters

| Name    | Type   | Description    |
| ------- | ------ | -------------- |
| tenant* | string | Name of Tenant |

### Query Parameters

| Name             | Type   | Description      |
| ---------------- | ------ | ---------------- |
| password         | string | Optional. If not provided, user will received an email to activate account and set a password |
| last\_name*      | string | Last name                                                                                     |
| first\_name*     | string | First name                                                                                    |
| email*           | string | Email of the new user                                                                         |
| role*            | string | "admin" / "user"                                                                              |

### Headers

| Name               | Type   | Description      |
| ------------------ | ------ | ---------------- |
| Content-type       | string | application/json |
| Authentication*    | string | Bearer {token}   |

**200 Success message**
```json
{    
    "message": "User was added successfully"
}
```

## Update User details

`PUT` `https://data-observability.actian.com/api/auth/auth/<tenant>/user/<user_email>`

This endpoint allows you to update user details

### Path Parameters

| Name         | Type   | Description                                   |
| ------------ | ------ | --------------------------------------------- |
| user\_email* | string | Email of user whose details are to be updated |
| tenant*      | string | Name of tenant                                |

### Query Parameters

| Name         | Type   | Description         |
| ------------ | ------ | ------------------- |
| last\_name*  | string | Updated last name                                                                                      |
| role*        | string | “admin” / “user” Currently mandatory. Even if there are no updates to this field, it must be provided. |
| first\_name* | string | Updated first name                                                                                     |

### Headers

| Name            | Type   | Description      |
| --------------- | ------ | ---------------- |
| Content-type    | string | application/json |
| Authentication* | string | Bearer {token}   |

**200 Success message**
```json
{    
    "message": "User was updated successfully"
}
```

## Delete user

`DELETE` `https://data-observability.actian.com/api/auth/auth/{tenant}/users/{user_email}`

### Path Parameters

| Name         | Type   | Description    |
| ------------ | ------ | -------------- |
| tenant*      | string | Name of Tenant |
| user\_email/ | String | User email     |

### Headers

| Name            | Type   | Description      |
| --------------- | ------ | ---------------- |
| Content-type    | string | application/json |
| Authentication* | string | Bearer {token}   |

**200 Success message**
```json
{
    "message":string
}
```

## Assign user to tenant

`PUT` `https://data-observability.actian.com/api/auth/auth/{tenant}/users/{user_email}/assign`

### Path Parameters

| Name         | Type   | Description    |
| ------------ | ------ | -------------- |
| tenant*      | string | Name of Tenant |
| user\_email* | String | User email     |

### Headers

| Name            | Type   | Description                                     |
| --------------- | ------ | ----------------------------------------------- |
| Content-type    | string | application/json                                |
| Authentication* | string | Bearer \<access\_token from authentication api> |

### Request Body

| Name  | Type   | Description            |
| ----- | ------ | ---------------------- |
| role* | String | Role "user" or "admin" |

**200 Success message**
```json
{
    "message":string
}
```

## Change Password for a specific user email

`PUT` `https://data-observability.actian.com/api/auth/auth/<tenant>/user/<user_email>/password`

### Path Parameters

| Name         | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| user\_email* | string | Email of user whose password needs to be changed |
| tenant*      | string | Name of tenant                                   |

### Query Parameters

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| old-password* | string | Current password |
| new-password* | string | New password     |

### Headers

| Name            | Type   | Description                                    |
| --------------- | ------ | ---------------------------------------------- |
| Content-type    | string | application/json                               |
| Authentication* | string | Bearer \<access\_toke from Authentication API> |

**200 Successful message**
```json
{    
    "message": "User was updated successfully"}
```

## Reset Password

`DELETE` `https://data-observability.actian.com/api/auth/auth/<tenant>/user/<user_email>/password`

This api will trigger an email being sent to reset their password

### Path Parameters

| Name         | Type   | Description                                    |
| ------------ | ------ | ---------------------------------------------- |
| user\_email* | string | Email of user whose password needs to be reset |
| tenant*      | string | Name of tenant                                 |

### Headers

| Name            | Type   | Description                                    |
| --------------- | ------ | ---------------------------------------------- |
| Content-type    | string | application/json                               |
| Authentication* | string | Bearer \<access\_toke from Authentication API> |

**200 Successful message**
```json
{    
    "message": string
}
```
