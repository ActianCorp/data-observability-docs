##### Record Validation Rules

One of the key metrics tracked by Data Observability is the “**Correctness**” metric. It is defined as the percentage of records which are valid based on a corresponding rule or combination of rules. Correctness is - For example, for a table with 1M rows; if 50,000 records are invalid, correctness is then 95%.

The row validity checks (data expectations) are defined by users via **Correctness Rules.**

## Correctness Rules (Record Validation) <a href="#correctness-rules" id="correctness-rules"></a>

Correctness Rules are evaluated at row level. A single rule may validate one or more attribute values (plain or nested object) against a condition.

Rules are created following SQL-like syntax that uses variables and functions to perform the validation. The main key features for rules:

* Eases the process of applying the same rule against multiple tables through templating
* Rules DSL (domain specific language) allows for version control and management in a simple human-readable format
* Optimized algorithms for unlimited number of rules for faster and more efficient processing

## Building a Correctness Rule <a href="#building-a-correctness-rule" id="building-a-correctness-rule"></a>

Creating a correctness rule requires performing the following steps:

1. Define variables that will be used in the rule
   * Variables can be assigned to static lists of values, range, entered manually or uploaded, from files; etc.
2. Map variables to attributes used in the expression
3. Write rule expression

### Define and Map Variables <a href="#define-and-map-variables" id="define-and-map-variables"></a>

Users can define variables to be used in their rule. Supported variable types:

* Array of strings&#x20;
* Constant string value
* Range (date-time or integer)
* Reference to an attribute

Example:

We can define the following two variables (`accepted_country_list, var_1)`:

* `accepted_country_list = [USA, Canada]`
* `var_1 = country_name`

User can then write a rule like following

**`VALIDATE`**` ``var_1`&#x20;

**`EXPECT`**` ``value`` `**`IN`**` ``accepted_country_list`

&#x20;

This rule checks if a value from the attribute _country\_name_ is in the list of accepted values. First it defines an expression _var\_1_, which is a trivial expression, which doesn’t add any transformation to the original value. And after that it sets an expectation that the value of the expression should be in the list to which the previously defined variable is assigned.

#### Writing Rule Expression <a href="#writing-rule-expression" id="writing-rule-expression"></a>

A correctness rule consists of three parts:

&#x20;

<table data-header-hidden><thead><tr><th width="185"></th><th></th></tr></thead><tbody><tr><td><strong><code>WITH &#x3C;transformation></code></strong></td><td><p><strong>Variable transformation:</strong></p><p>Optional section. It allows the user to create a transformation of one or more attributes to be validated and reused within the expression multiple times</p><p> </p><p>Example:</p><p><strong><code>WITH</code></strong><code> concat(country, '|', state) </code><strong><code>AS</code></strong><code> loc</code></p><p> </p><p>This creates a new variable “loc” that can be used in validation</p></td></tr><tr><td><p><strong><code>VALIDATE</code></strong></p><p><strong><code>&#x3C;evaluated_expression></code></strong></p></td><td><p><strong>Validated expression:</strong></p><p>This could be simply validating an attribute as is, or adding transformation or case clause. </p><p> </p><p>Example:</p><p> </p><p><strong><code>VALIDATE</code></strong></p><p>  <strong><code>case</code></strong></p><p>    <strong><code>when</code></strong><code> loc = 'US|CA' </code><strong><code>then</code></strong><code> country </code><strong><code>IN</code></strong><code> ('Alameda', 'Contra-Costa')</code></p><p>    <strong><code>when</code></strong><code> loc = 'UAE|Dubai' </code><strong><code>then</code></strong><code> country </code><strong><code>IS NULL</code></strong> </p><p>  <strong><code>else</code></strong><code> false //default output</code></p><p><strong><code>End</code></strong></p><p> </p></td></tr><tr><td><p><strong><code>EXPECT</code></strong> </p><p><strong><code>&#x3C;expectation></code></strong></p></td><td><p><strong>Expected results</strong></p><p>Expectation for the expression above. After the “EXPECT” keyword, the validation begins.</p><p> </p><p>Example: </p><p><strong><code>EXPECT</code></strong><code> is_true</code></p><p> </p><p>this means the value of validated expression is expected to be true, and anything  else is a violation)</p></td></tr></tbody></table>

### How to get alerted for rule violation? <a href="#how-to-get-alerted-for-rule-violation" id="how-to-get-alerted-for-rule-violation"></a>

Once a rule is created, users can assign the rule to a policy and specify the threshold for alerting.

## Variables transformation <a href="#variables-transformation" id="variables-transformation"></a>

This step allows defining variables from combining existing attributes to be used at a later step of validation. This can simplify writing the evaluated expression specially in case when multiple checks are applied.&#x20;

To define a transformation, you can follow the following syntax:

`WITH <transformation> AS <new_variable_name>`

Data Observability uses standard Spark SQL syntax for those transformations.

## Evaluated expression <a href="#evaluated-expression" id="evaluated-expression"></a>

This is a Spark SQL expression. It allows users to define what will be evaluated, and exposes a wide range of SQL functions to allow for conditional checks.

### Scenario 1: Validate attribute value as is, without transformations <a href="#scenario-1-validate-attribute-value-as-is-without-transformations" id="scenario-1-validate-attribute-value-as-is-without-transformations"></a>

```
VALIDATE my_column// Some code
```

This validates “`my_column`” without any transformation

### Scenario 2: Apply standard functions to attribute value <a href="#scenario-2-apply-standard-functions-to-attribute-value" id="scenario-2-apply-standard-functions-to-attribute-value"></a>

```sql
VALIDATE foo(my_column)
```

This validates “`my_column`” after applying the “`foo`” function to it.

### Scenario 3: Cases <a href="#scenario-3-cases" id="scenario-3-cases"></a>

```sql
VALIDATE case when my_colA <> 0 then my_colB else my_colC end
```

This validates the rule by using `my_colB` when `my_colA` is not 0; otherwise, it uses `my_colC`

## Expectation <a href="#expectation" id="expectation"></a>

Expectation is defined through the context and the expected value.

```
EXPECT <context> [<operator>] <expected_value>
```

### Expectation context <a href="#expectation-context" id="expectation-context"></a>

The expectation context (`<context>`) is how the value gets evaluated. It can be any of the following:

<table data-header-hidden><thead><tr><th width="237"></th><th></th></tr></thead><tbody><tr><td><strong>Context</strong></td><td><strong>Description</strong></td></tr><tr><td><code>COMPRESSED_PATTERN</code></td><td>Compressed pattern of the expression value</td></tr><tr><td><code>DATE_TIME_VALUE</code></td><td>Expression value as Datetime. Refer <a href="https://learn.microsoft.com/en-us/sql/t-sql/functions/date-and-time-data-types-and-functions-transact-sql?view=sql-server-ver16#date-and-time-data-types">here</a> for datetime patterns</td></tr><tr><td><code>EXPANDED_PATTERN</code></td><td>Expanded pattern of the expression value</td></tr><tr><td><code>FREQUENCY</code></td><td>Frequency of the expression value</td></tr><tr><td><code>LENGTH</code></td><td>String length of the expression value</td></tr><tr><td><code>NUMERIC_VALUE</code></td><td>Expression value as number</td></tr><tr><td><code>SPACE_COUNT</code></td><td>Count of spaces in the expression value</td></tr><tr><td><code>SPEC_CHAR_COUNT</code></td><td>Spec characters count of the expression value</td></tr><tr><td><code>VALUE</code></td><td>String representation of the expression value </td></tr></tbody></table>

### Expectation operator <a href="#expectation-operator" id="expectation-operator"></a>

The expectation operator (`<operator>`) is an optional field. It’s the condition operator for the context and the expected value. It can be from the following list:

| **Operator**   | **Description**                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| `IN`           | <p>Value is in the list. </p><p>Expected value must be in the list.</p>             |
| `IN_RANGE`     | <p>Value in range including boundaries.<br>Expected value must be in the range.</p> |
| `NOT`          | Boolean negation operator                                                           |
| `NOT_IN`       | <p>Value is not in the list</p><p>Expected value must not be in the list.</p>       |
| `OUT_OF_RANGE` | <p>Value out of range</p><p>Expected value must be outside of the range.</p>        |

### Expected value <a href="#expected-value" id="expected-value"></a>

Expected value (\<expected\_value>) can be set using a static value or the boolean-functions belo

| **Static value** | **Example**       |
| ---------------- | ----------------- |
| List             | `["a", "b", "c"]` |
| Range            | `(0,100)`         |
| String           | `"abcd"`          |
| Variable         | `var_1`           |

<table data-header-hidden><thead><tr><th width="308"></th><th></th></tr></thead><tbody><tr><td><strong>Boolean function</strong></td><td><strong>Description</strong></td></tr><tr><td><code>CONTAINS_PII</code></td><td>True if expression contains PII data</td></tr><tr><td><code>CONTAINS_PII_CREDIT_CARD</code></td><td>True if expression contains credit card number pattern</td></tr><tr><td><code>CONTAINS_PII_IP_ADDRESS</code></td><td>True if expression contains IP address</td></tr><tr><td><code>CONTAINS_PII_PHONE_NUMBER</code></td><td>True if expression contains phone number pattern</td></tr><tr><td><code>CONTAINS_PII_SSN</code></td><td>True if expression contains social security number pattern</td></tr><tr><td><code>IS_ALPHA</code></td><td>Value is only from alphabetic characters</td></tr><tr><td><code>IS_DATE</code></td><td>Value is UTC date pattern</td></tr><tr><td><code>IS_DATE_TIME</code></td><td>Value is UTC date-time pattern</td></tr><tr><td><code>IS_EMAIL</code></td><td>Value is email</td></tr><tr><td><code>IS_FALSE</code></td><td>Value is false (case insensitive string comparison, and not boolean)</td></tr><tr><td><code>IS_NUMBER</code></td><td>Value is numeric value</td></tr><tr><td><code>IS_TRIMMED_STRING</code></td><td>Value is a trimmed string</td></tr><tr><td><code>IS_TRUE</code></td><td>Value is true (case insensitive string comparison, and not boolean)</td></tr><tr><td><code>REGEX(pattern)</code></td><td>Value satisfy regex pattern</td></tr></tbody></table>

Examples:

```sql
VALIDATE Var_1 expect is_date  
# Check if Var_1 is a valid date.

VALIDATE Var_1 expect contains_pii  
# Check if Var_1 contains Personally Identifiable Information (PII)  

VALIDATE Var_1 expect numeric_value in_range (1, 20)  
# Ensure Var_1 is a number within range 1 to 20  

VALIDATE Var_1 expect numeric_value out_of_range (50, 60)  
# Ensure Var_1’s numeric value is outside a length range  

VALIDATE Var_1 expect expanded_pattern IN ['D', 'DD']  
# Validate Var_1 using an expanded pattern 

VALIDATE Var_1 expect compressed_pattern in ['D', 'L']  
# Validate Var_1 using a compressed pattern  

VALIDATE Var_1 expect value IN ['USA', 'Germany', 'India']  
# Check if Var_1 value is in the accepted country list  

VALIDATE Var_1 expect value='Telm'  
# Ensure Var_1 exactly matches the value Telm

VALIDATE concat(Var_1, '.', Var_2) expect value='Telm.ai'  
# Validate full name format as Telm.ai, where Var_1=Telm and Var_2=ai

VALIDATE Var_1 expect length<>5  
# Ensure Var_1 value is of length not equal to 5  

VALIDATE Var_1 expect frequency=1  
# Ensure Var_1 has exactly one occurrence  

VALIDATE Var_1 expect regex('^[a-zA-Z]+$')  
# Validate Var_1 contains only letters (no numbers/special characters) 
```

### Combining Expectations <a href="#combining-expectations" id="combining-expectations"></a>

User is able to combine multiple expectations using AND/OR operator:

```
EXPECT <expectation_1> AND <expectation_2> OR <expectation_3>
```

Examples:

```robotframework
VALIDATE case when Status='Active' and LastLogin < current_date - 30 then 'Inactive' else 'Valid' end expect value='Valid'  
# Mark users as inactive if they haven't logged in for 30+ days, otherwise expect 'Valid'  

with concat(Country1, ' | ', Country2) AS loc VALIDATE loc expect length<20  
# Ensure concatenated location (Country1 | Country2) has a length less than 20  

VALIDATE Password expect spec_char_count>=1 AND space_count=0 AND length>=8  
# Ensure Password has at least 1 special character, no spaces, and is at least 8 characters long  

VALIDATE Password expect (spec_char_count>=1 AND space_count=0) OR length>=20  
# Ensure Password has at least 1 special character and no spaces, or is at least 20 characters long  
```

## Rule Templates <a href="#rule-templates" id="rule-templates"></a>

Rule Templates is a predefined rule where the expectation is defined, then applied to 1 or more attributes. Users are recommended to use rule templates when the same check is applied on multiple tables. This centralizes the definition of the rule, and allows managing the rule from a single place.

To use a rule template, the user only maps attributes within their table to variables within the rules.

## Creating a Rule <a href="#creating-a-rule" id="creating-a-rule"></a>

The following flow diagram describes the steps to create a new rule or rule template:

1. Define rule info:
   * Rule name
   * Rule description
   * \[Optional] Template being used (this is only if creating a rule)
2. Set static variables:
   * These are variables that are validated against, and are not dynamic in nature; ex: list of allowed countries
3. Set input variables:
   * These are variables that are mapped to attributes in the table
   * In case this is a rule, user will need to map the attributes to variables
4. Write expression

<figure><img src="../assets/create_rule.png"><figcaption>Creating a Rule</figcaption></figure>

**Note:** In case user is using an existing template, only input variables need to be mapped to variables in the table

### Alerting Policies <a href="#alerting-policies" id="alerting-policies"></a>

**Out of box Policy**

Automatically, all created rules are monitored via an out-of-box policy “Correctness Rules Violation”.&#x20;

**User Policy**

Users can add new policies and pick the desired rules and threshold to be alerted on:

1. Navigate to "Alerting Policies" & click "New Policy"
2. Under **Tracked Metrics**, select **Correctness**
3. Select one or more rule from **DQ Rules**
4. Configure threshold, and policy metadata (name, description, etc.)

!!! info
    Threshold will be applied on each rule individually

    If policy is used in DataBinning, all rules are checked when binning the data
