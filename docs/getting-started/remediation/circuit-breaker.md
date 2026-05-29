# Circuit Breaker


Using Actian Data Observability’s APIs, users can query information about their data health. That is querying any of the health KPIs or checking for ongoing policy violations.

One use case of this is circuit breaker.

Circuit breaker is a case where you want to switch off the ETL operation because bad data has been introduced into your system. This could be because processing costs are very high or because of other factors.

Here’re the steps you can follow to create the circuit breaker:

1. Trigger Actian Data Observability data scan ([api reference](https://docs.telm.ai/telmai/upload-data/upload-data-api))
2. Check for Actian Data Observability job completion
    1. Polling mechanism ([api reference](https://docs.telm.ai/telmai/upload-data/track-job-status))
    2. Using webhooks for job notification
3. Check for alerts ([api reference](https://docs.telm.ai/telmai/upload-data/check-for-alerts))
4. Decide best action

These APIs can be integrated in ETL orchestration tools like Airflow or other.
