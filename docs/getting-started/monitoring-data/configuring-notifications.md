##### Configuring Notifications

Data Observability notifications are used to notify users about new or ongoing alerts. Data Observability supports different notification channel types.

## Supported Notification Types

* Microsoft Teams
* Slack
* Webhooks
* Emails

## Notification Modes

Notifications can be set at tenant level based on 3 modes:

* **Priority summary:** In this setting, detections are summarized by count and priority before being sent to the specified channel(s). The notification interval acts as a grace period, during which all alerts are grouped into a single notification.
* **Monitors overview:** In this setting, detections from configured monitors are consolidated into one notification. Only the most significant detections are included.
* **Monitors insights**: In this setting, each detection triggers an individual notification. If applicable, historical charts are included in the notification.

To select the notification mode, tenant admins can select it from the "Administration" page

## Add or Modify Notification Channels

Notification channels are the destinations that can be used for alerting. To create a notification channel, navigate to "Alerting Policies" page and follow below steps:

1. Click "Manage Alert Channels"
2. Click "+Alert Channel"
3. Select channel type, and specify channel name
4. You will need to add one or more item for the selected type
5. Test and Save accordingly

## Related Documentation

* [Creating a Monitor](creating-a-monitor.md)
* [Managing Existing Monitors](managing-existing-monitors.md)
