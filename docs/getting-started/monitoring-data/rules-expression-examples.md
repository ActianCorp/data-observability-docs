##### Rules Expression Examples

## 1. Expanded / Compressed Pattern Rule

**Example:** Column: **ZipCode** Requirement: ZipCode should have 4 or 5 digits only.

* **Input Variable**: `Var_1` (mapped to column ZipCode)
* **Static Variable**: `valid_zip` (List type: \["DDDD", "DDDDD"])

| **Expression**                                                         | **List Type**       | **Sample Value** | **Expected Result** |
| ---------------------------------------------------------------------- | ------------------- | ---------------- | ------------------- |
| `validate Var_1 expect expanded_pattern IN valid_zip`                  | \["DDDD", "DDDDD"]  | 1234             | True                |
| `validate Var_1 expect expanded_pattern IN valid_age`                  | \["D", "DD", "DDD"] | 1008             | False               |
| `validate Var_1 expect compressed_pattern IN valid_compressed_pattern` | \["DLD"]            | 123ab9           | True                |

## 2. Range Rule

**Example:** Column: **Age** Requirement: Age should be between 18 and 60.

* **Input Variable**: `Var_2` (mapped to column Age)
* **Expression**: `validate Var_2 expect numeric_value in_range (18, 60)`

| **Sample Value** | **Expected Result** |
| ---------------- | ------------------- |
| 25               | True                |
| 17               | False               |

## 3. Regex Pattern Rule

**Example:** Column: **Email** Requirement: Email should be in valid format.

* **Input Variable**: `Var_3` (mapped to column Email)

| **Expressions**                                                                  | **Sample Value**  | **Expected Result** |
| -------------------------------------------------------------------------------- | ----------------- | ------------------- |
| `Validate var_3 expect regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')` | test@example.com  | True                |
| `Validate var_3 expect regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')` | invalid-email.com | False               |
| `validate var_3 expect regex('\d+')`                                             | 123456789         | True                |

## 4. Length Rule

**Example:** Column: **Username** Requirement: Username should be between 5 to 15 characters long.

* **Input Variable**: `Var_4` (mapped to column Username)

| **Expressions**                                | **Sample Value**         | **Expected Result** |
| ---------------------------------------------- | ------------------------ | ------------------- |
| `validate Var_4 expect length in_range(5, 15)` | JohnD                    | True                |
| `validate Var_4 expect length in_range(5, 15)` | JD                       | False               |
| `validate Var_4 expect length=5`               | India                    | True                |
| `validate Var_4 expect length<>5`              | India                    | False               |
| `validate Var_4 expect spec_char_count=1`      | NY 10011, USA            | True                |
| `validate Var_4 expect space_count<=1`         | United States Of America | False               |
| `validate Var_4 expect frequency=1`            | India                    | True                |

## 5. List Rule

**Example:** Column: **Country** Requirement: Country should be either USA, Canada, or UK.

* **Input Variable**: `Var_5` (mapped to column Country)
* **Static Variable**: `valid_countries` (List type: \["USA", "Canada", "UK"])

| **Expressions**                                      | **Sample Value** | **Expected Result** |
| ---------------------------------------------------- | ---------------- | ------------------- |
| `validate Var_5 expect Value IN valid_countries`     | USA              | True                |
| `validate Var_5 expect value IN valid_countries`     | Germany          | False               |
| `validate Var_5 expect value not_in valid_countries` | India            | True                |

## 6. Null Rule

**Example:** Column: `Var_6` Requirement: Validate different null handling scenarios.

* **Input Variable:** `Var_6`

<table data-header-hidden><thead><tr><th width="393.21484375"></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Expressions</strong></td><td><strong>Sample Value</strong></td><td><strong>Expected Result</strong></td></tr><tr><td><code>validate Var_6 expect is_null</code></td><td>None</td><td>False</td></tr><tr><td><code>validate Var_6 expect is_null</code></td><td>__null__</td><td>True</td></tr><tr><td><code>validate Var_6 expect not is_null</code></td><td>__null__</td><td>False</td></tr><tr><td><code>validate Var_6 expect not is_null</code></td><td>12345</td><td>True</td></tr><tr><td><code>validate Var_6 expect not is_null</code></td><td>(Empty)</td><td>(Empty)</td></tr><tr><td><code>validate if(Var_6 is null, true, false) expect is_true</code></td><td>__null__</td><td>True</td></tr></tbody></table>

## 7. Custom Condition Rule

**Example:** Column: **Salary** Requirement: If the job title is "Manager", the salary should be greater than 50,000.

* **Input Variables**: `Var_7` (mapped to column JobTitle), `Var_8` (mapped to column Salary)
* **Expression**:  `validate case when Var_7 == 'Manager' then Var_8> 5000 else false end expect is_true`

| **Job Title** | **Salary** | **Expected Result**   |
| ------------- | ---------- | --------------------- |
| Manager       | 60000      | True                  |
| Developer     | 45000      | True (Not applicable) |
| Manager       | 40000      | False                 |

## 8. Date Format Rule

**Example:** Column: **TransactionDate** Requirement: Date should be in YYYY-MM-DD format.

* **Input Variable**: `Var_8` (mapped to column TransactionDate)

| **Expression**                                                  | **Sample Value**                                                                                                                          | **Expected Result** |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `validate Var_8 expect is_date`                                 | 2024-02-01                                                                                                                                | True                |
| `validate Var_8 expect is_date`                                 | 2021-01-01T00:00:00Z                                                                                                                      | False               |
| `validate Var_8 expect is_date_time`                            | 2011/12/03 10:15:30                                                                                                                       | True                |
| `validate Var_8 expect date_time_value in_range valid_datetime` | <p>Static Variable ⇒ Date Time Range<br><strong>From</strong>=-2d, <strong>To</strong>=@now<br>Sample Value ⇒ 2025-07-16 05:24:36.441</p> | True                |

***

This documentation provides a structured guide for different rule expressions, helping users understand rule syntax, sample values, and expected outcomes.
