# Overview

Choose where Data Observability runs relative to your data

Data Observability offers three deployment models. All three deliver the same product — profiling, monitors, incidents, and integrations — and differ only in where Data Observability's services run and where your data is read.

| Model   | Where the services run  | Does raw data leave your environment? | What you operate    |
| ------- | ----------------------- | ------------------------------------- | ------------------- |
| Data Observability Cloud (SaaS) | Data Observability's cloud | Yes — Data Observability reads your sources | Nothing |
| [Hybrid](hybrid-deployment.md) | Control plane in Data Observability's cloud, data plane in yours | No | One agent host, your own Spark engine, and cloud storage  |
| [VPC](virtual-private-cloud-vpc-deployment.md) | Entirely in your cloud | No | The full Data Observability stack, deployed with Helm and Terraform |

## Which Model Fits

**Data Observability Cloud (SaaS)** is the default. Data Observability hosts everything and connects to your data sources over the network. Nothing is deployed in your environment.

**[Hybrid](hybrid-deployment.md)** keeps data processing in your environment while Data Observability continues to host the application. You run a single lightweight agent, scans execute on your own Spark engine, and scan output lands in your own cloud storage, so no row-level data crosses the boundary. This is the smallest footprint that keeps data in place — there is no Data Observability service tier, database, message broker, or search cluster to operate.

**[VPC](virtual-private-cloud-vpc-deployment.md)** runs every Data Observability service inside your own cloud account, including the application tier and its datastores. Choose this when policy requires that Data Observability's application and metadata also stay within your environment.

!!! note
    To discuss which model fits your requirements, or to begin a Hybrid or VPC deployment, contact your Data Observability account manager.
