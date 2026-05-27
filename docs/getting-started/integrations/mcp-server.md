# Data Observability MCP Server

## Overview

The Data Observability's Model Context Protocol (MCP) server enables seamless integration with AI assistants like Claude, allowing you to interact with your data quality platform directly through conversational interfaces. This integration provides access to Data Observability's comprehensive set of tools for monitoring, alerting, and data quality management.

### What is MCP?

MCP is a standard that allows AI applications to securely connect to external services and data sources. Data Observability's MCP server exposes your data quality platform's capabilities as tools that can be invoked conversationally through compatible AI assistants.

## Getting Started

#### Prerequisites

Before connecting to Data Observability's MCP server, ensure you have:

* Access to Claude Desktop, Claude.ai, or a compatible MCP client (e.g., VSCode with Cline)
* Valid Data Observability-Okta credentials

Specific MCP Server details:

* OAuth client credentials (Client ID and Client Secret) for your application
* MCP URL for your environment  
 
**Important**:

* You must be added to the associated application in Okta to complete OAuth authentication
* MCP server URL and client credentials must be obtained from your Data Observability deployment owner


### Connecting to Claude

#### Method 1: Claude Desktop or Claude.ai

Claude supports secure OAuth-based authentication, providing the most seamless integration experience.

**Step 1: Access Connector Settings**

1. Open your Claude Desktop application or visit [claude.ai](https://claude.ai/)
2. Click your **Profile Name** or **Avatar** (usually located on the left sidebar or top corner)
3. Navigate to **Settings**
4. Look for the **Connectors** or **Integrations** section

**Step 2: Add the Custom Connector**

1. In the Connectors section, click **Add custom connector**
2. A configuration dialog will appear with the following fields:
   * **Name**: Enter a descriptive name (e.g., "Data Observability MCP")
   * **URL**: Enter your Data Observability MCP server URL (e.g., `https://mcp.yourdomain.Data Observability.dev/yourorg/mcp`)
3. Click **Advanced Details** to expand additional options
4. Enter your OAuth credentials:
   * **Client ID**: Your Data Observability OAuth application client ID
   * **Client Secret**: Your Data Observability OAuth application client secret

**Step 3: Initiate the OAuth Flow**

1. Click **Connect** for the newly added server
2. Claude will recognize that OAuth authentication is required
3. Your default web browser will automatically open to the Data Observability-Okta login screen
4. Enter your **Data Observability-Okta credentials** and sign in
5. Review and approve the requested permissions

**Step 4: Verify the Connection**

1. After successful authorization, your browser will redirect back to Claude
2. Return to the **Connectors** section in Claude settings
3. Your Data Observability MCP server should now display as **Connected** with a green indicator

**Step 5: Start Using Data Observability**

1. Start a new chat in Claude
2. You can now ask questions about your data quality, create monitors, review alerts, and more
3. Claude will automatically use Data Observability's MCP tools when relevant to your queries

**Example prompts to try:**

* "Show me my recent incidents"
* "What assets are available in my production project?"
* "Create a completeness monitor for my customer table"
* "Get the profiling data for my sales dataset"

***

### Connecting with VSCode Cline

Cline is a VSCode extension that supports MCP servers but requires bearer token authentication instead of OAuth.

!!! note
    Bearer tokens expire after a set period (typically 1 hour). You'll need to regenerate and update the token when it expires.
#### Step 1: Generate Bearer Token

Run the following command in your terminal to generate an access token:

```bash
CLIENT_ID="<your_client_id>"
CLIENT_SECRET="<your_client_secret>"

TOKEN_RESPONSE=$(curl -s -X POST "https://<okta_server>/oauth2/default/v1/token" \
    -u "${CLIENT_ID}:${CLIENT_SECRET}" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&scope=mcp:access")

echo $(echo "$TOKEN_RESPONSE" | jq -r '.access_token')
```

**Prerequisites:**

* Replace `<your_client_id>` and `<your_client_secret>` with your actual credentials
* Ensure `curl` and `jq` are installed on your system

The command will output your bearer token. Copy this token for the next step.

#### Step 2: Configure MCP Server in Cline

1. Open VSCode with the Cline extension installed
2. Click the **MCP server settings** button in the Cline interface
3. Select **Remote Servers**
4. Click **Add server details**
5. Provide the following information:
   * **Name**: `Data Observability` (or any descriptive name)
   * **URL**: Your Data Observability MCP server URL (e.g., `https://mcp.dev.telm.ai/yourorg/mcp`)

#### Step 3: Add Authorization Header

1. Click **Edit Configuration** to open the MCP settings JSON file
2. Locate the server configuration you just added
3. Add a `headers` section with your bearer token:

```json
{
  "mcpServers": {
    "Data Observability": {
      "url": "https://mcp.yourexampledomain.com/commonstock/mcp",
      "type": "streamableHttp",
      "disabled": false,
      "autoApprove": [],
      "headers": {
        "Authorization": "Bearer eyJraWQiOiJ..."
      }
    }
  }
}
```
**
Note:** Save the configuration file

#### Step 4: Start Using Data Observability in Cline

1. Start a new Cline conversation in VSCode
2. Cline can now access Data Observability's MCP tools
3. Try asking questions about your data quality or requesting specific operations

**Example prompts:**

* "List all my data assets in Data Observability"
* "Show me open incidents from the last week"
* "What monitors are configured for my warehouse connection?"

#### Token Refresh

When your bearer token expires, you'll need to:

1. Generate a new token using the curl command from Step 1
2. Update the `Authorization` header in your Cline configuration
3. Restart Cline or reload the MCP server connection

***

## Available Tools

Once connected, your AI assistant has access to the following Data Observability capabilities:

* Asset Management
* Connection Management
* Monitors Management
* Incidents & Alerts
* Data Quality Metrics
* Integration & Workflow
* Project & User Management

***

## Security Considerations

#### OAuth Authentication (Recommended)

* Uses industry-standard OAuth 2.0 protocol
* Tokens are securely managed by Claude
* Automatic token refresh
* Immediate revocation through Okta admin console
* Audit trail of access events

#### Bearer Token Authentication

* Tokens expire after a set period (typically 1 hour)
* Tokens should be treated as passwords—never commit them to version control
* Regenerate tokens regularly
* Revoke compromised tokens immediately through Okta

#### Best Practices

1. **Never share your Client Secret or Bearer Tokens**
2. **Use separate OAuth applications** for production and development environments
3. **Regularly audit** connected applications in your Okta dashboard
4. **Revoke access** for applications you no longer use

***

## Troubleshooting

#### OAuth Connection Issues

* **Problem**: Browser doesn't open during OAuth flow  
* **Solution**: Check your default browser settings and ensure pop-ups are allowed for Claude
---
* **Problem**: "User not authorized" error
* **Solution**: Verify that your user account has been added to the Data Observability application in Okta
---
* **Problem**: Connection appears successful but tools don't work
* **Solution**: Restart Claude and try reconnecting. Check that your OAuth client has the correct scopes configured

#### Bearer Token Issues

* **Problem**: "Unauthorized" errors when using tools
* **Solution**: Your token has likely expired. Generate a new bearer token and update your configuration
---
* **Problem**: Token generation command fails
* **Solution**: Verify your Client ID and Client Secret are correct. Ensure `curl` and `jq` are installed

#### General Issues

* **Problem**: Can't see Data Observability's tools in Claude
* **Solution**: Verify the connection shows as "Connected" in settings. Start a new conversation to refresh available tools
---
* **Problem**: Tools return "not found" errors
* **Solution**: Check that you're using the correct MCP server URL for your organization
