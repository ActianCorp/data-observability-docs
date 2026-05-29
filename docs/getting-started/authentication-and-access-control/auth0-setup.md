# Auth0 Setup


This guide outlines the steps to register an application in Auth0 for use as an OpenID Connect (OIDC) provider.

## Register an OIDC App in Auth0

### 1. Log in to Auth0 Dashboard

Go to [https://manage.auth0.com](https://manage.auth0.com/) and sign in to your Auth0 tenant.

### 2. Navigate to Applications

From the dashboard, go to **Applications > Applications** and click **+ Create Application**.

### 3. Register the Application

Complete the following fields in the "Create Application" dialog:

* **Name:** Enter a descriptive name for your application (e.g., `Actian Data Observability-OIDC-App`).
* **Application Type:** Choose `Regular Web Applications`.

Click **Create**.

### 4. Configure the Application

After creating the application, configure its settings:

* **Callback URL:** Enter the redirect URI provided by Actian Data Observability. This will likely follow the format: `https://data-observability-actian.okta.com/oauth2/v1/authorize/callback`. **Please confirm the exact redirect URL with Actian Data Observability.**
* Under **Advanced Settings -> OAuth**:
    * **JSON Web Token (JWT) Signature Algorithm:** Choose `RS256`.
    * **Grant Types:** Select `Implicit`, `Authorization Code`, `Refresh Token`, and `Client Credentials`.

Click **Save Changes**.

### 5. Enable Supported Connections

Under the **Connections** tab of the application:

* Enable the appropriate database, enterprise, or social login providers that your users will utilize.
* Ensure users are provisioned or available under the selected connection.

Click **Save Changes**.

### 6. Post-Registration Configuration

Once saved, copy the following details from your application's settings, as you will need them for Actian Data Observability's configuration:

* **Client ID**
* **Client Secret**
* **Endpoints -> OAuth -> All the OAuth Endpoints**
