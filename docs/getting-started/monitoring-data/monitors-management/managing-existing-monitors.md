##### Managing Existing Monitors

## Enabling and Disabling Monitors

Toggle monitors on/off directly from the list view:

* **Green toggle (ON)**: Monitor is active and evaluating data
* **Gray toggle (OFF)**: Monitor is paused and not generating alerts

**Use cases for disabling:**

* Temporary maintenance periods
* Known data issues being resolved
* Testing alternative configurations

## Editing Monitors

To modify an existing monitor:

1. Locate the monitor in the list
2. Click the **edit icon (✏️)** in the Actions column
3. Make your changes in the configuration panel
4. Click **"Save"** to apply changes

**Editable properties:**

* Monitor name
* Description
* Tags
* Impact level
* Threshold configuration
* Notification settings
* Ticketing settings

**Non-editable properties:**

* Monitor type (cannot be changed after creation)
* Asset association

## Deleting Monitors

To remove a monitor:

1. Locate the monitor in the list
2. Click the **delete icon (🗑️)** in the Actions column
3. Confirm the deletion

!!! danger
    **Warning:** Deleting a monitor:

    * Stops all monitoring and alerting immediately
    * Cannot be undone
    * Removes historical alert data associated with this monitor
    * Consider disabling instead if you may need it again

## Download and Upload Monitors

Download or upload monitors configuration directly from Alerting Monitors page for corresponding asset.

* Download button: Downloads monitors configuration in JSON format
* Upload button: Uploads monitors configuration in JSON format.

To learn more about the configuration file format, [please see our APIs reference](../../../api-reference/assets-api/monitors-api.md)

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

***

## Related Documentation

* [Creating a Monitor](creating-a-monitor.md)
* [Configuring Data-Binning](configuring-data-binning.md)
* [Configuring Notification](configuring-notifications.md)
