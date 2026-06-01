##### Monitors Troubleshooting

## Monitor Not Generating Alerts

**Possible causes:**

* Monitor is disabled (check toggle)
* Thresholds are too lenient
* Data isn't violating conditions
* Asset isn't receiving new data

**Solutions:**

1. Verify monitor is enabled
2. Review threshold configuration
3. Check asset data freshness
4. Test with known violation scenario

## Too Many False Positives

**Possible causes:**

* Thresholds too strict
* Not accounting for normal variance
* Using Absolute when Automatic would be better

**Solutions:**

1. Switch to Automatic thresholds
2. Widen Acceptable Range
3. Increase Acceptable Drift %
4. Review historical data patterns

## Monitor Configuration Errors

**Common issues:**

* Invalid expression syntax
* SQL query errors
* Unsupported aggregations
* Attribute not found

**Solutions:**

1. Verify syntax follows documentation
2. Test SQL queries in your data warehouse first
3. Confirm attributes exist in asset
4. Check for typos in attribute names

## Cannot Edit Monitor Type

**Issue:** Monitor type cannot be changed after creation

**Solution:**

1. Create a new monitor with desired type
2. Copy configuration settings
3. Disable or delete old monitor
4. Enable new monitor
