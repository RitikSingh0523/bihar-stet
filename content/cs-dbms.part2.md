## 5. SQL - DDL, DML, DCL, TCL

### Basics
- **SQL = Structured Query Language** (originally SEQUEL, IBM; ANSI/ISO standard). Declarative, not case-sensitive for keywords; statements end with `;`. Strings/dates in single quotes; **numbers are not quoted**.
- Common MySQL data types: INT, FLOAT/DOUBLE, DECIMAL(p,s), **CHAR(n)** fixed length, **VARCHAR(n)** variable length, TEXT, DATE ('YYYY-MM-DD' - MySQL's default date format), DATETIME, TIMESTAMP, BOOLEAN.
- Table names, column names follow identifier rules (no spaces unless quoted).

### DDL
```sql
CREATE DATABASE school;   USE school;
CREATE TABLE student (
  roll   INT PRIMARY KEY,
  name   VARCHAR(30) NOT NULL,
  email  VARCHAR(40) UNIQUE,
  age    INT CHECK (age >= 5),
  city   VARCHAR(20) DEFAULT 'Patna',
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES dept(dept_id) ON DELETE CASCADE
);
ALTER TABLE student ADD phone CHAR(10);          -- add column
ALTER TABLE student MODIFY name VARCHAR(50);     -- change datatype/size
ALTER TABLE student DROP COLUMN phone;           -- remove column
ALTER TABLE student ADD PRIMARY KEY (roll);      -- add constraint
RENAME TABLE student TO pupil;                   -- (or ALTER TABLE .. RENAME TO)
TRUNCATE TABLE student;                          -- delete all rows, keep structure
DROP TABLE student;                              -- remove structure + data
DESCRIBE student;    -- (DESC) shows structure;  SHOW TABLES;  SHOW DATABASES;
```
- **DROP vs TRUNCATE vs DELETE**

| | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Category | DML | DDL | DDL |
| Removes | selected rows (WHERE) | all rows | whole table (structure+data) |
| Rollback | yes (within transaction) | no (auto-commit) | no |
| WHERE allowed | yes | no | no |
| Speed | slower (row logging) | faster | - |
- **Constraints**: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT, (AUTO_INCREMENT in MySQL).

### DML
```sql
INSERT INTO student VALUES (1,'Asha','a@x.com',17,'Gaya',10);
INSERT INTO student(roll,name) VALUES (2,'Ravi');     -- other columns NULL/default
UPDATE student SET city='Patna', age=age+1 WHERE roll=2;   -- without WHERE: ALL rows!
DELETE FROM student WHERE age < 6;                    -- without WHERE: all rows deleted
SELECT name, city FROM student WHERE age > 15;
```
- UPDATE changes existing data, INSERT adds new rows, DELETE removes rows, SELECT retrieves data.

### SELECT clause order
```
SELECT [DISTINCT] columns | * | expressions | aggregates
FROM   tables
[WHERE    row condition]
[GROUP BY columns]
[HAVING   group condition]
[ORDER BY columns [ASC|DESC]]
[LIMIT n];
```
- Logical execution order: **FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT**.
- `SELECT *` = all columns. `DISTINCT` removes duplicates. Aliases: `SELECT salary*12 AS annual`. ORDER BY default = ASC.
- Operators in WHERE: `=  <>  !=  <  >  <=  >=`, `AND OR NOT`, `BETWEEN a AND b` (inclusive), `IN (list)`, `LIKE`, `IS NULL`. **`==` is NOT valid in SQL** (the usual "not a valid relational operator" answer, along with `=>`/`=<`).
- NULL: `x = NULL` is never true; use `x IS NULL` / `IS NOT NULL`. Arithmetic with NULL gives NULL. Aggregates (except COUNT(*)) ignore NULL.

### LIKE pattern matching
- `%` = any number (0 or more) of characters; `_` = exactly one character.

| Pattern | Matches |
|---|---|
| 'A%' | starts with A |
| '%a' | ends with a |
| '%an%' | contains "an" |
| '_a%' | second letter is a |
| '___' | exactly 3 characters |
| 'A__%' | starts with A, at least 3 characters |
- NOT LIKE for negation. LIKE is for strings/patterns; `IN` for set membership; `BETWEEN` for ranges.

### Aggregate (group) functions

| Function | Result |
|---|---|
| COUNT(*) | number of rows (counts NULLs) |
| COUNT(col) | number of **non-NULL** values |
| COUNT(DISTINCT col) | number of distinct non-NULL values |
| SUM, AVG | total / mean of non-NULL numeric values |
| MAX, MIN | largest / smallest |
- Scalar functions (MySQL): UPPER(), LOWER(), LENGTH(), SUBSTR()/SUBSTRING(), CONCAT(), TRIM(), ROUND(x,d), POWER(), MOD(), NOW(), CURDATE(), YEAR(), MONTH().

### Worked data for the examples
```
EMP
eno  name   dept  sal    city
1    Asha   CS    40000  Patna
2    Ravi   CS    30000  Gaya
3    Sita   EE    50000  Patna
4    Amit   EE    NULL   Gaya
5    Neha   ME    20000  Patna
```

| Query | Output |
|---|---|
| `SELECT COUNT(*) FROM EMP;` | 5 |
| `SELECT COUNT(sal) FROM EMP;` | 4 (NULL ignored) |
| `SELECT SUM(sal) FROM EMP;` | 140000 |
| `SELECT AVG(sal) FROM EMP;` | 35000 (140000/4, not /5) |
| `SELECT MAX(sal), MIN(sal) FROM EMP;` | 50000, 20000 |
| `SELECT DISTINCT dept FROM EMP;` | CS, EE, ME |
| `SELECT name FROM EMP WHERE sal BETWEEN 30000 AND 40000;` | Asha, Ravi |
| `SELECT name FROM EMP WHERE sal > 25000;` | Asha, Ravi, Sita (Amit's NULL excluded) |
| `SELECT name FROM EMP WHERE name LIKE '_a%';`  | Ravi (second letters: Asha 's', Ravi 'a', Sita 'i', Amit 'm', Neha 'e') |
| `SELECT name FROM EMP ORDER BY sal DESC;` | Sita, Asha, Ravi, Neha, Amit (NULL is smallest in MySQL, last in DESC) |

### GROUP BY, HAVING vs WHERE
```sql
SELECT dept, COUNT(*) AS n, AVG(sal) AS avg_sal
FROM EMP
GROUP BY dept;
```
```
dept  n  avg_sal
CS    2  35000
EE    2  50000      (AVG over non-NULL only: just 50000)
ME    1  20000
```
```sql
SELECT dept, COUNT(*) FROM EMP WHERE city='Patna' GROUP BY dept HAVING COUNT(*) >= 1;
-- WHERE first keeps Patna rows (Asha CS, Sita EE, Neha ME) -> groups CS 1, EE 1, ME 1
SELECT dept, SUM(sal) FROM EMP GROUP BY dept HAVING SUM(sal) > 60000;   -- CS 70000 only
```

| WHERE | HAVING |
|---|---|
| filters **rows** before grouping | filters **groups** after GROUP BY |
| cannot use aggregate functions | uses aggregate functions |
| can be used without GROUP BY | normally with GROUP BY |
- **"SQL applies conditions on the groups through ........ clause after groups have been formed" -> HAVING.**
- Every non-aggregated column in SELECT must appear in GROUP BY.

### Joins
Tables: `A(id,name)`: (1,X) (2,Y) (3,Z); `B(id,mark)`: (1,80) (2,70) (4,60).

| Join | SQL | Result rows |
|---|---|---|
| Cartesian / CROSS | `SELECT * FROM A, B;` | 3×3 = 9 rows |
| INNER / equi / natural | `FROM A JOIN B ON A.id=B.id` | (1,X,80) (2,Y,70) |
| LEFT OUTER | `FROM A LEFT JOIN B ON A.id=B.id` | above + (3,Z,NULL) |
| RIGHT OUTER | `FROM A RIGHT JOIN B ON ...` | inner + (4,NULL,60) |
| FULL OUTER (UNION of left and right in MySQL) | | 4 rows |
- **Natural join**: `A NATURAL JOIN B` joins on all same-named columns, keeps one copy.
- **Self join**: a table joined with itself using aliases (employee-manager): `SELECT e.name, m.name FROM emp e, emp m WHERE e.mgr = m.eno;`
- Missing join condition in `FROM A, B` -> Cartesian product (rows = n1 × n2).

### Subqueries
```sql
SELECT name FROM EMP WHERE sal > (SELECT AVG(sal) FROM EMP);        -- single-row subquery: Sita (50000>35000), Asha (40000>35000)
SELECT name FROM EMP WHERE dept IN (SELECT dept FROM EMP WHERE city='Gaya');   -- multi-row
SELECT name FROM EMP e WHERE EXISTS (SELECT 1 FROM DEPT d WHERE d.dname=e.dept);  -- correlated
SELECT name FROM EMP WHERE sal > ALL (SELECT sal FROM EMP WHERE dept='CS');
SELECT name FROM EMP WHERE sal > ANY (SELECT sal FROM EMP WHERE dept='CS');
```
- Subquery runs first (inner -> outer) unless correlated (inner re-evaluated per outer row). Subquery in WHERE, FROM (derived table) or SELECT.
- `ALL` = greater than every value; `ANY/SOME` = at least one.
- Comparison operators with subquery need a single-row result; use `IN` for multiple rows.

### Set operations

| Operator | Result | Duplicates |
|---|---|---|
| `UNION` | rows in either query | removed |
| `UNION ALL` | all rows from both | kept |
| `INTERSECT` | common rows (not in older MySQL) | removed |
| `EXCEPT` / `MINUS` | rows in first not in second | removed |
- Both SELECTs need the same number of columns with compatible types. ORDER BY only once, at the end.

### Views
```sql
CREATE VIEW cs_emp AS SELECT eno, name, sal FROM EMP WHERE dept='CS';
SELECT * FROM cs_emp;      DROP VIEW cs_emp;
```
- **View = virtual table** defined by a stored query; no data stored itself (always shows current data). Uses: security (hide columns/rows), simplify complex queries, logical data independence. Simple (single-table) views are usually updatable; those with GROUP BY, DISTINCT, aggregates, joins usually are not.

### Indexes
```sql
CREATE INDEX idx_name ON EMP(name);     CREATE UNIQUE INDEX ...;    DROP INDEX idx_name ON EMP;
```
- Index speeds up SELECT (search/sort/join) but slows INSERT/UPDATE/DELETE and uses space. PRIMARY KEY / UNIQUE auto-create an index.

### DCL and TCL
```sql
GRANT SELECT, INSERT ON student TO 'ravi'@'localhost';
GRANT ALL PRIVILEGES ON school.* TO 'ravi'@'localhost' WITH GRANT OPTION;
REVOKE INSERT ON student FROM 'ravi'@'localhost';

START TRANSACTION;  (or BEGIN)
UPDATE acc SET bal = bal-500 WHERE id=1;
SAVEPOINT s1;
UPDATE acc SET bal = bal+500 WHERE id=2;
ROLLBACK TO s1;     -- undo back to savepoint
COMMIT;             -- make permanent;   ROLLBACK;  -- undo whole transaction
```
- DDL commands auto-commit in MySQL. `SET AUTOCOMMIT=0` turns off auto-commit.
- **DCL = GRANT, REVOKE. TCL = COMMIT, ROLLBACK, SAVEPOINT.** (Past papers ask "COMMIT belongs to ... -> TCL".)

### Other common SQL facts
- `SHOW`, `USE`, `DESC` are MySQL utility commands. `AUTO_INCREMENT` for serial ids.
- Cursor = pointer to the result set row (embedded SQL/PL-SQL). Trigger = automatic action on INSERT/UPDATE/DELETE event. Stored procedure = saved block of SQL code.
- Python-MySQL (connector): `connect()`, `cursor()`, `execute()`, `fetchone()`, `fetchall()`, `commit()`, `rowcount`.

**⚡ Exam tip:** Remember the five trap pairs: WHERE (rows, no aggregates) vs HAVING (groups, aggregates); COUNT(*) vs COUNT(col) (NULLs); DELETE vs TRUNCATE vs DROP; DML vs DDL vs DCL vs TCL; `=` is the equality operator (not `==`) and `<>` is not-equal.
