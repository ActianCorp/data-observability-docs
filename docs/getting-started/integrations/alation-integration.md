# Alation Integration

The Actian Data Observability Platform enables you to integrate with [Alation](https://www.alation.com/) data catalog. The integration is a single-direction, and allows you to automatically push Data Observability Platform results to Alation.

## Integration Setup

The integration between Actian and Alation allows for a seamless connection between the two platforms. The setup process involves providing Actian with the necessary credentials to access your Alation data catalog.

### What is Set Up

To establish the connection, you must provide the following information:

* **Alation URL**: The web address of your Alation instance.
* **User ID**: A unique identifier for the Alation user account that Actian will use.
* **Refresh API Token**: A secure key that grants Actian permission to interact with Alation on your behalf.
* **Rich Text Object in Alation:** An [Alation custom field](https://docs.alation.com/en/latest/steward/TemplatesAndCustomFields/AboutTemplatesAndFields.html#rich-text) used to populate Actian's data.

Once this information is sent, Actian confirms the setup by returning your Alation URL and user ID, indicating a successful connection.

Rich Text in Alation must be called "Actian Data Observability"

#### Modifying or Removing Integration

You can easily update the Alation integration by sending new credentials. If you need to remove the connection entirely, you can do so, and Actian will confirm that the integration has been successfully deleted.

## Data Mappings

Data mappings are the links that connect specific data assets in Actian to their corresponding tables in your Alation data catalog. This allows Actian to leverage the rich metadata and governance information from Alation.

### Automatic Mapping

The most common way to create mappings is through an automated process. Actian can start a job that scans both platforms and automatically establishes these links.

* What is Sent: You simply tell Actian to start the automatic mapping job. You can also specify if you want to overwrite any existing mappings for an asset.
* What is Set Up: Actian initiates a background process to create the mappings. It then provides you with a job ID so you can track the progress of the operation.

### Manual Mapping

If you prefer, you can also create mappings one by one.

* What is Sent: You provide the Actian asset ID and the Alation table ID you want to link.
* What is Set Up: Actian creates the mapping and confirms the successful link by providing all the key details: the Actian asset ID and the corresponding Alation data source, schema, and table information.

### Managing Mappings

You can also list all existing mappings or delete a specific mapping by providing its Actian asset ID. This gives you full control over the connections between your Actian assets and Alation tables.

### Checking Job Status

You can check the status of your automatic mapping job using the job ID. The result will tell you if the process is in progress, completed, or failed. If successful, it will list all the new mappings created. For each mapping, the following information is linked:

* Actian Asset ID: The unique identifier of your data asset in Actian.
* Alation Data Source ID and Name: The source of the data in Alation.
* Alation Schema ID and Name: The schema within the data source.
* Alation Table ID and Name: The specific table linked to the Actian asset.



Integration is only supported via APIs. To learn about these APIs please see [Alation Integration APIs](../api-reference/alation-integration-apis.md).
