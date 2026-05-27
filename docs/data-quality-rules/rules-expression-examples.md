# Rules Expression Examples

## 1. Expanded Pattern Rule

**Example:** Column: **ZipCode** Requirement: ZipCode should have 4 or 5 digits only.

* **Input Variable**: `Var_1` (mapped to column ZipCode)
* **Static Variable**: `valid_zip` (List type: \["DDDD", "DDDDD"])
* **Expression**: `validate Var_1 expect expanded_pattern IN valid_zip`

| **Sample Value** | **Expected Result** |
| ---------------- | ------------------- |
| 1234             | True                |
| 123              | False               |

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
* **Expression**: `Validate var_3 expect regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')`

| **Sample Value**  | **Expected Result** |
| ----------------- | ------------------- |
| test@example.com  | True                |
| user123@mail.net  | True                |
| invalid-email.com | False               |

## 4. Length Rule

**Example:** Column: **Username** Requirement: Username should be between 5 to 15 characters long.

* **Input Variable**: `Var_4` (mapped to column Username)
* **Expression**: `validate Var_4 expect length in_range( 5 , 15)`

| **Sample Value** | **Expected Result** |
| ---------------- | ------------------- |
| JohnD            | True                |
| AliceWonder      | True                |
| JD               | False               |

## 5. List Rule

**Example:** Column: **Country** Requirement: Country should be either USA, Canada, or UK.

* **Input Variable**: `Var_5` (mapped to column Country)
* **Static Variable**: `valid_countries` (List type: \["USA", "Canada", "UK"])
* **Expression**: `validate Var_5 expect IN valid_countries`

| **Sample Value** | **Expected Result** |
| ---------------- | ------------------- |
| USA              | True                |
| Canada           | True                |
| Germany          | False               |

## 6. Not Null Rule

**Example:** Column: **OrderID** Requirement: OrderID should not be null.

* **Input Variable**: `Var_6` (mapped to column OrderID)
* **Expression**: `validate Var_6 expect NOT NULL`

| **Sample Value** | **Expected Result** |
| ---------------- | ------------------- |
| 12345            | True                |
| 98765            | True                |
| (Empty)          | False               |

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

* **Input Variable**: `Var_9` (mapped to column TransactionDate)
* **Expression**: `validate Var_9 expect regex('[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}')`

| **Sample Value** | **Expected Result** |
| ---------------- | ------------------- |
| 2024-02-01       | True                |
| 01/02/2024       | False               |

This documentation provides a structured guide for different rule expressions, helping users understand rule syntax, sample values, and expected outcomes.
