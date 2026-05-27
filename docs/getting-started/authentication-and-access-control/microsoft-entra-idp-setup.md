# Microsoft Entra IDP Setup


This page describes how to setup Microsoft Entra ID as IDP.

## Register an OIDC App in Microsoft Entra ID

Here's how to register an application in Microsoft Entra ID for OpenID Connect (OIDC):

1. **Log in to Azure Portal:** Navigate to [https://portal.azure.com](https://portal.azure.com) and sign in with your Azure account.
2. **Navigate to App Registrations:** 
   Go to **Microsoft Entra ID** > **App registrations** > **+ New registration**.
3. **Register the Application:**
   * **Name:** Enter a descriptive name for your application (e.g., `Actian Data Observability-OIDC-App`).
   * **Supported account types:** Choose the option that aligns with your organization's policies. Typically, **"Accounts in this organizational directory only"** is selected.
   * **Redirect URI:** Enter the redirect URI provided by Actian Data Observability. This will likely follow the format: `https://https://data-observability-actian.okta.com/oauth2/v1/authorize/callback`. **Please confirm the exact redirect URL with Actian Data Observability.**
4. **Post Registration Configuration:** Once the app is created, open its overview page.
   * **Retrieve Application (client) ID and Directory (tenant) ID:** Copy and securely store these IDs. You will need them later.
   * **Create a Client Secret:**
     * Go to **Certificates & Secrets** > **+ New client secret**.
     * Add a description for the secret and choose an expiration timeframe.
     * Click **Add**.
     * **Copy the Value** of the newly created client secret immediately. This value will not be shown again.
5.  **Construct the Well-known Configuration URL:** Use the following format, replacing `<TENANT_ID>` with the Directory (tenant) ID you copied earlier:
    ```
    https://login.microsoftonline.com/<TENANT_ID>/v2.0/.well-known/openid-configuration
    ```
6. **Assign API Permissions to the App:**
   * Under **API permissions**, click **+ Add a permission**.
   * Select **Microsoft Graph** > **Delegated permissions**.
   * Search for and add the following permissions:
     * `openid`
     * `profile`
     * `offline_access`
   * Click **Add permissions**.
   * Finally, click **Grant admin consent for your tenant**.

