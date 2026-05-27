Actian Data Observability Platform APIs
========================================

Data Observability offers APIs that allows users to:
* Configure connections and assets
* Trigger scan
* Manage users
* Retrieve result data

### Authentication

Authentication can be specified through:
* User name & password
* API Key
* API token

Please refer to [Authentication API](./authentication-api/authentication-api.md) for more details

### Available controllers

Actian provides the following controllers for APIs:

| Controller                                   | Controller Endpoint                              | Purpose                              |
|-----------------------------------------------|---------------------------------------------------|---------------------------------------|
| Authentication API `{auth_endpoint}`          | `https://{Actian_endpoint}/api/auth`              | Authentication and token creation     |
| Configuration API `{config_endpoint}`         | `https://{Actian_endpoint}/api/backend/`          | Configuring connections and assets    |
| Analytics API `{analytics_endpoint}`          | `https://{Actian_endpoint}/api/search`            | Metrics access                        |
| Data API `{data_endpoint}`                    | `https://{Actian_endpoint}/api/data`              | Upload management                     |


These controllers can be used for the corresponding Actian instance:

`https://{Actian_endpoint}/{controller_endpoint}/{function}`

### Headers

The following headers are always required when calling Data Observability APIs

| Name                                             | Type   | Description                                                   |
| ------------------------------------------------ | ------ | ------------------------------------------------------------- |
| Content-type                                     | string | application/json                                              |
| Authentication | string | Bearer \<access\_token>. Access token from Authentication API |

