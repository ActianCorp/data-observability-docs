# Okta SSO Setup


There's currently no APIs exposed for enabling SSO. To setup SSO, you will need to do the followinng

## Create Okta Group

1. Navigate to Directory Groups, and click button to Add Group
2. Specify the group name appropriately. E.g - “Actian Data Observability App Users Group”
3. Assign users who will need access to Actian Data Observability to this group

## Create Okta Application

1. Under Okta Applications, Select "Create App Integration"
2. Select the following options
   * Sign-in Method OIDC: OpenID Connect 
   * Application Type: Web Application
3. Fill in the App Integration Details as follows:
   * Application Name: Name of the Application. E.g Actian Data Observability Integration App
   * Sign-in redirect URIs (provided by Actian Data Observability):  Ex: `https://data-observability-actian.okta.com/oauth2/v1/authorize/callback`
     * Scenario 1 : If the okta tenant name is `dev123456.okta.com`, the URL would be `https://dev123456.okta.com/oauth2/v1/authorize/callback`
     * Scenario 2 : If the okta tenant is mapped to a domain (ex: `acmecompany.okta.com`), the url would be `https://acmecompany.okta.com/oauth2/v1/authorize/callback`
   * Assignments: Controlled access "Limit access to selected groups"
     * Select the group created previously
4. Save application

## Setup Application

Setup your Okta application and retrieve the following details

* Client ID
* Client Secret
* Open-Id configuration (`https://\<okta-tenant-id/domain>/.well-known/openid-configuration`)

!!! note
    You will need to share details with Actian Data Observability team to retrieve IDP ID.
    Actian Data Observability team will enable SSO accordingly.
