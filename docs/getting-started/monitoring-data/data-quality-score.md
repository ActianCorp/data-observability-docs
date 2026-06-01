# Data Quality Score

## Overview

The Data Quality (DQ) Score is a normalized, business-relevant measure of data health that provides a single indicator of a dataset's fitness for use. Expressed as a percentage from 0% to 100%, the DQ Score helps organizations quickly assess and monitor the overall quality of their data assets.

## Purpose

The DQ Score methodology ensures:

* **Consistency** - Standardized measurement across all data assets
* **Normalization** - Comparable scores regardless of data volume or complexity
* **Business Relevance** - Weighted dimensions that reflect organizational priorities
* **Actionability** - Clear identification of data quality issues requiring attention

## Core Dimensions

The DQ Score is calculated as a weighted average of four fundamental data quality dimensions:

### Completeness

Measures the extent to which required data fields are populated.

**Metric**: Percentage of required fields containing values\
**Score Range**: 0-100%

### Validity

Measures compliance with defined business rules and data constraints.

**Metric**: Percentage of records passing validation rules\
**Score Range**: 0-100%

### Freshness (Timeliness)

Measures whether data is up-to-date and meets timeliness requirements.

**Metric**: Binary indicator of freshness incidents\
**Score Range**: 0 or 100

### Integrity (Incident Health)

Measures operational stability through the volume of open data quality incidents.

**Metric**: Count of open incidents relative to threshold\
**Score Range**: 0-100

## Score Calculation

### Normalization Process

All source metrics are normalized to scores between 0 and 100 before being integrated into the final DQ Score calculation.

**Completeness (S\_C)**

```
S_C = Completeness percentage
```

Directly uses the percentage of populated required fields.

**Validity (S\_V)**

```
S_V = Validity percentage
```

Directly uses the percentage of records passing business rules.

**Freshness (S\_F)**

```
If No Freshness Incidents: S_F = 100
If Freshness Incidents Exist: S_F = 0 (or configured penalty score, e.g., 80)
```

**Integrity/Incidents (S\_Inc)**

```
S_Inc = MAX(0, 100 × (1 - (I_current / I_max)))

Where:
- I_current = Number of open incidents
- I_max = Maximum tolerable incident threshold (default: 20)
```

**Constraints**:

* If I\_current ≥ I\_max, then S\_Inc = 0
* If I\_current = 0, then S\_Inc = 100

### Final DQ Score Formula

```
DQ Score = ((S_C × W_C) + (S_V × W_V) + (S_F × W_F) + (S_Inc × W_Inc)) / W_Total

Where:
- S = Normalized dimension score (0-100)
- W = Dimension weight
- W_Total = W_C + W_V + W_F + W_Inc
```

**Output**: Value between 0 and 100

## Default Weights

Data Observability provides industry-standard default weights that prioritize data accuracy and fundamental usability:

| Dimension                 | Default Weight | Rationale                                                               |
| ------------------------- | -------------- | ----------------------------------------------------------------------- |
| **Validity**              | 40%            | Highest priority - measures compliance with critical business rules     |
| **Completeness**          | 30%            | Second priority - measures availability of required information         |
| **Integrity (Incidents)** | 20%            | High priority penalty - reflects operational stability and issue volume |
| **Freshness**             | 10%            | Contextual priority - importance varies by use case                     |
| **TOTAL**                 | **100%**       | Simplifies calculation denominator                                      |

#### Weight Customization

Weights can be adjusted per dataset to reflect specific business requirements:

* **Real-time systems**: Increase Freshness weight (e.g., 25-30%)
* **Analytical systems**: Prioritize Completeness and Validity
* **Mission-critical systems**: Increase Integrity/Incidents weight

## Configuration

### Dimension Weights

The system allows dynamic, per-dataset configuration of dimension weights:

1. Navigate to your dataset settings
2. Select **Data Quality Score Configuration**
3. Adjust weights to match business priorities
4. Document justification for non-default weights

**Note**: All four weights must sum to 100.

### Incident Threshold (I\_max)

Configure the maximum tolerable incident threshold per dataset:

* **Default**: 20 open incidents
* **Low-tolerance assets**: 5-10 incidents
* **High-volume assets**: 30-50 incidents

The threshold should reflect:

* Dataset criticality
* Typical incident volumes
* Business impact tolerance

## Best Practices

#### Interpreting DQ Scores

| Score Range | Quality Level | Recommended Action                                    |
| ----------- | ------------- | ----------------------------------------------------- |
| 90-100      | Excellent     | Maintain current practices                            |
| 75-89       | Good          | Monitor trends, address minor issues                  |
| 60-74       | Fair          | Investigate dimension contributors, plan improvements |
| 0-59        | Poor          | Immediate attention required, escalate issues         |

To start using this feature, please refer to [DQ Score APIs](../../api-reference/dq-score-api.md)
