# Hybrid Deployment (Control Plane & Data Plane)

Data Observability hosts the control plane; scans run on your own Spark engine, in your environment.

The Hybrid deployment model splits Data Observability into two planes. Data Observability continues to host the **control plane** — the UI, APIs, scheduling, learning, and incident management. A lightweight **data plane** runs in your own cloud environment: a single agent process that receives scan instructions and submits Spark jobs to your own Spark engine.

**Raw data never leaves your environment.** The agent returns aggregated metrics, alert signals, and job status only.

Hybrid is the smallest footprint that keeps data processing in place. Unlike a [VPC deployment](virtual-private-cloud-vpc-deployment.md), there is no Data Observability service tier, database, message broker, or search cluster running in your environment — only the agent and the Spark engine you already operate.

## What You Provision

* A **VM** to host the agent (or a Kubernetes cluster — see [Agent hosting options](#agent-hosting-options))
* A **Spark workspace** — your own Dataproc or Databricks environment
* **Cloud storage** in your own account, for scan output and generated job configuration
* A **secret store** for the agent's credentials
* Supporting cloud resources created by the Data Observability Terraform installer: networking, and the identity and role assignments the agent needs

The Terraform installer creates the storage and secret store for you, but both live in your own cloud account and remain under your control — including their retention, encryption, and access policies.

## Data Residency

This is the central guarantee of the Hybrid model.

| Stays in your environment                                                                  | Sent to the control plane |
| -------------------------------------------------------------------------------------------- | ------------------------- |
| Row-level and column-level source data                                                       | Aggregated metrics        |
| Scan output written to your own bucket or container                                          | Alert signals             |
| Each scan's generated job configuration — this carries job parameters only, never row data   | Job status                |

## Supported Spark Engines

| Cloud | Spark engine     |
| ----- | ---------------- |
| GCP   | Dataproc         |
| Azure | Azure Databricks |
| AWS   | Databricks       |

!!! note
    Support for additional Spark engines is planned. Contact your Data Observability account manager for the current roadmap.

## Agent Hosting Options

| Option     | The agent runs as                              | Choose when                    | Available on    |
| ---------- | ---------------------------------------------- | ------------------------------ | --------------- |
| VM         | A container under systemd on a virtual machine | You want no cluster to operate | GCP, Azure, AWS |
| Kubernetes | A Helm release on GKE                          | You already run Kubernetes     | GCP             |

## Network Requirements

The agent's connection to the control plane is **outbound only**. Nothing inbound from Data Observability is required, and the installer needs no inbound SSH — it reaches the host over your cloud provider's native run-command channel.

### Inbound (Within Your Network)

| From                | To        | Port     | Why                                        |
| ------------------- | --------- | -------- | ------------------------------------------ |
| Spark scan clusters | The agent | TCP 8081 | Spark posts scan results back to the agent |

!!! warning
    This rule is required. Without it a scan starts and then stalls — the agent looks healthy and nothing reports an error. The agent must sit in the same virtual network as your Spark workspace, or one peered with it.

### Outbound (All TCP 443)

| To                                            | Why                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| Data Observability control plane              | The agent's WebSocket connection — scan instructions in, aggregated results out  |
| The registry holding the agent image          | Image pull, at install and at every restart                                     |
| Your cloud storage                            | Scan output, metrics, and each scan's generated job configuration               |
| Your secret store                             | The agent re-fetches its secrets on every start                                 |
| Your Spark workspace API                      | Cluster creation and job submission                                             |
| Your cloud provider's resource management API | The channel the remote installer uses to reach the agent host                   |

An agent host with no public IP reaches these through a NAT gateway, or through private endpoints for the cloud services with NAT for the control plane and Spark workspace.

!!! note
    Ensure your environment has allowlisted the [Actian Data Observability IP list](../api-reference/data-observe-ip-list.md).

## Sizing the Agent

The agent scales with how many scans run concurrently, not with the size of your data — the data is read on the Spark cluster, so table size makes no difference to the agent host.

| Assets monitored                                   | Concurrent scans | Agent host     | Disk (GB) |
| -------------------------------------------------- | ---------------- | -------------- | --------- |
| Up to ~500                                         | Up to 8          | 2 vCPU / 8 GB  | 30        |
| Up to ~5,000                                       | 9–16             | 2 vCPU / 8 GB  | 50        |
| More than ~5,000, or many scans scheduled together | Up to 25         | 4 vCPU / 16 GB | 100       |

Beyond 16 concurrent scans a larger host stops helping: the agent runs scans on a fixed pool of that size, and the control plane caps a tenant at 25 concurrent scans regardless.

The disk holds the agent image and the outbound message queue. That queue is what allows a scan to survive a period where the control plane is unreachable — raise the disk size if you scan heavily or want to tolerate a longer outage.

!!! warning
    On AWS, avoid burstable instance types for an agent that scans on a schedule. Burstable instances earn CPU credits while idle and spend them under load; an agent that exhausts its credits throttles to a fraction of its vCPUs. Nothing reports this — scans simply take longer.

## Installation Overview

Data Observability provides Terraform-based installers for each cloud. Contact your Data Observability account manager for access to the deployment repository, the agent image tag, and your Data Observability release version.

1. **Generate a provisioning bundle.** In Data Observability, go to **Administration > Hybrid Deployment** and select **regenerate install bundle**. Save the JSON file.
2. **Run the prerequisite check.** The installer validates what Terraform cannot see for itself — that the agent image reference resolves, your Spark workspace is reachable and correctly networked, and the control plane answers from the install machine. This step creates nothing.
3. **Create the infrastructure.** Terraform provisions the agent host, object storage, secret store, networking, the Spark-to-agent firewall rule, and the identity and role assignments the agent needs.
4. **Seed secrets and stage the Spark JARs.** The installer writes the agent's secrets into your secret store and stages Data Observability's Spark JARs where your Spark engine can install them.
5. **Install the agent.** The installer deploys onto the host over your cloud provider's run-command channel — no public IP and no inbound SSH required.
6. **Point Data Observability at the agent.** In **Administration > Hybrid Deployment**, set **Hybrid agent endpoint** to `http://<agent-private-ip>:8081`.
7. **Verify.** The agent shows as online in the Data Observability UI within a minute. Run **Test Connection** against a source before your first scan.

!!! warning
    Regenerating the provisioning bundle revokes the currently deployed agent. Generate it once, and only regenerate when you intend to replace the agent.

!!! note
    Set the **Hybrid agent endpoint** to the agent's **private** IP address, not a public address or a hostname. Your Spark clusters reach the agent from inside your own network.

## Cloud-Specific Prerequisites

Requirements vary by cloud and are covered in full by the installer documentation. The items below are hard requirements that cannot be corrected without redeploying, so confirm them before you begin.

### Azure

* An Azure Databricks workspace deployed into a **virtual network you own**, containing or peered with the agent's subnet. A workspace on a Databricks-managed network cannot reach the agent.
* A **Unity Catalog metastore** attached to that workspace, and a **volume** to hold the Spark JARs. Library installs from the DBFS root are not permitted, so the JARs must live in a Unity Catalog volume.
* An **Azure Container Registry you own**. The agent image must be imported into it, because the agent host authenticates as a managed identity, which cannot be granted a role on a registry in another tenant.

### AWS

* A Databricks workspace and a personal access token for the agent.
* An **instance profile registered in your Databricks account console**, whose role can read and write the scan-output S3 bucket.

### GCP

* A project with billing enabled, and permissions to create networks, buckets, service accounts, IAM roles, and either a GKE cluster or a GCE VM.
* The Dataproc subnet must be in the agent's VPC, or executors cannot reach the agent regardless of firewall rules.
* An agent VM with no external IP needs egress to the control plane, which is not a Google API — this requires Cloud NAT.

## Related Pages

* [Deployment Models overview](README.md)
* [Virtual Private Cloud (VPC) deployment](virtual-private-cloud-vpc-deployment.md)
* [Actian Data Observability IP list](../api-reference/data-observe-ip-list.md)
