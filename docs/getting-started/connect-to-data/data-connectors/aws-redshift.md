##### AWS Redshift

Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud. 
To connect to Redshift provisioned clusters, the following details are required:

* **Endpoint Prefix**:
    * Navigate to **Amazon Redshift Clusters** -> **\<Cluster Name\>** -> **General Information** -> **Endpoint**.
    * Retrieve the value, which will be in the format `[endpoint_prefix].redshift.amazonaws.com:[port]/[database]`.
    * Use the value of **\[endpoint\_prefix]** here.
* **Database**:
    * Navigate to **Amazon Redshift Clusters** -> **\<Cluster Name\>** -> **General Information** -> **Endpoint**.
    * Use the value of **\[database]** from the endpoint.
* **Schema**: The schema where the tables are located.
* **User**: The username to use for the connection (must be created in Redshift).
* **Password**: The password to use for the connection (must be created in Redshift).

!!! note
    In this case, the username and password need to be created inside the Redshift and it's not the IAM user.
