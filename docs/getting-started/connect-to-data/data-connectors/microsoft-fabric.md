# Microsoft Fabric

Connect Actian Data Observability to a Microsoft Fabric Warehouse or Lakehouse SQL analytics endpoint

Data Observability connects to [Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview) over the SQL analytics endpoint. Both **Warehouse** and **Lakehouse** items are supported, and assets can be defined either by selecting a table or by running a SQL query.

The Fabric portal never exposes a server, port, or database name — only a workspace GUID and a warehouse/lakehouse GUID, both readable from the portal URL. The connection form therefore collects those identifiers, and Data Observability resolves the actual SQL endpoint through the Fabric REST API when the connection is opened.

!!! note
    Fabric SQL endpoints accept **Microsoft Entra authentication only**. There is no SQL username-and-password option.

## Prerequisites

### Register an Application in Microsoft Entra

For the default Service Principal scheme, Data Observability authenticates with a client ID and secret from a registered Entra application. Follow Microsoft's [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) guide, then collect:

* **Application (client) ID**
* **Client secret** — generated under **Certificates & secrets**
* **Directory (tenant) ID** of the Entra tenant that owns the Fabric workspace

### Grant the Principal Access to Fabric

!!! warning
    Your Fabric tenant administrator must enable **"Service principals can use Fabric APIs"**, and the principal must have read access to the warehouse or lakehouse. Without both, the Fabric API answers `401`/`403` and the connection test reports it.

    A managed identity is a service principal in Entra, so the same tenant setting and the same workspace and item grants apply to it.

If your tenant cannot enable that setting, use the SQL connection string override described [below](#when-your-tenant-blocks-service-principals).

### Capture the Identifiers from the Portal URL

Open the warehouse or lakehouse in the Fabric portal and read both GUIDs from the address bar:

* **Workspace ID** — the GUID in `.../groups/<workspaceId>/...`
* **Warehouse / Lakehouse ID** — the item GUID in the same URL

## Creating the Connection

Navigate to the **Connections** page, click **+ Add Connection**, and select **Microsoft Fabric SQL**. Provide the following:

| Field                                     | Description                                                                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Authentication Scheme                     | **Service Principal** (default), or **Managed Identity (connection)** on Azure-based deployments                             |
| Managed Identity                          | The registry identity to authenticate as. Appears only for the Managed Identity scheme                                       |
| Microsoft Entra Tenant ID                 | Directory (tenant) ID of the Entra tenant that owns the Fabric workspace. Service Principal scheme only                      |
| Workspace ID                              | Workspace GUID from the Fabric portal URL                                                                                    |
| Item Type                                 | **Warehouse** (default) or **Lakehouse**                                                                                     |
| Warehouse / Lakehouse ID                  | Item GUID of the warehouse or lakehouse from the Fabric portal URL                                                           |
| Schema                                    | The schema to connect to                                                                                                     |
| SQL connection string (optional override) | Leave empty to resolve the endpoint automatically. See [below](#when-your-tenant-blocks-service-principals)                   |
| Client ID                                 | Application (client) ID of the Entra service principal. Service Principal scheme only                                        |
| Client Secret                             | Client secret of that service principal. Service Principal scheme only                                                       |

Select **Test Connection** to validate the details. The connection can only be created once a test succeeds.

!!! note
    There are no **Server**, **Port**, or **Database** fields. Data Observability looks the endpoint host up through the Fabric API from the workspace and item IDs, and the port is always 1433.

### When Your Tenant Blocks Service Principals

If your Fabric tenant does not allow service principals to call the Fabric APIs, paste the host shown under the item's **Settings > SQL connection string** into the **SQL connection string (optional override)** field. This path makes no Fabric API call at all and uses the **Warehouse / Lakehouse ID** field verbatim as the database name.

!!! warning
    This changes what the ID field must contain for lakehouses. A warehouse GUID is accepted as a Fabric database name, so warehouses work unchanged. A **lakehouse** SQL endpoint only answers to the lakehouse **display name** — so when using the override with a lakehouse, put the display name in the **Warehouse / Lakehouse ID** field instead of the GUID.

### Managed Identity and Long-Running Scans

!!! warning
    A managed-identity token is minted once, when a Spark job's parameters are generated at submit time, and Entra SQL tokens last about an hour. SQL monitors run after the data write and open new connections with the same token, so a scan that is long-running or heavily queued can fail on an expired token. Prefer the **Service Principal** scheme for those sources.

## Connecting an Asset

Once a connection is defined, you can start using it to create assets. To create an asset, either select an existing table or run a custom SQL query.

The SQL query option is useful for monitoring a filtered subset of a table, a join across tables, or a derived result set that is not materialized as a table.

## Metadata Scans

Metadata scans are supported for Microsoft Fabric connections. A metadata scan profiles the asset using table statistics rather than reading every record, which is faster and cheaper than a full scan.

!!! note
    Ensure that your environment has allowlisted the [Actian Data Observability IP list](../../../api-reference/data-observe-ip-list.md).

## Related Pages

* [Azure OneLake](azure-onelake.md) — for connecting to OneLake storage paths directly rather than over a SQL endpoint
* [Connection Modes](../connection-modes.md)
* [Configuring a Data Source](../configuring-a-data-source.md)
