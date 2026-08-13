---
title: "Enterprise Sales Data Warehouse with SQL Server & Medallion Architecture"
tagline: "End-to-end SQL Data Warehouse consolidating ERP & CRM data streams using Bronze, Silver, and Gold Medallion layers."
description: "An enterprise-grade SQL Data Warehouse designed and built using T-SQL, SQL Server, Medallion Architecture, and Dimensional Modeling (Star Schema) to unify siloed sales operations."
tag: ["Data Warehousing", "SQL Server", "T-SQL", "ETL / ELT", "Medallion Architecture", "Data Modeling", "Star Schema", "Data Quality", "Data Engineering"]
github: "https://github.com/syahrindra/sql-data-warehouse-project"
featured: true
year: "2026"
coverImage: "/img/data_warehouse/cover.jpg"
---

## 📌 Executive Summary & Business Context

In many growth-stage enterprises, critical business data remains trapped in disparate operational systems—such as **ERP (Enterprise Resource Planning)** systems for inventory/logistics and **CRM (Customer Relationship Management)** systems for customer demographics and interactions. 

Without a centralized data warehouse:
- **Metrics Discrepancies**: Sales and customer metrics clash due to different definitions across systems.
- **Performance Overhead**: Running complex analytical queries directly against transactional databases causes server locking and slow response times.
- **Lack of Unified Reporting**: Executive decision-makers lack a 360-degree view of customer lifetime value, product performance, and global sales trends.

### The Solution
This project establishes an **end-to-end, enterprise sales data warehouse** hosted on **SQL Server**. Utilizing the modern **Medallion Architecture (Bronze, Silver, Gold layers)**, raw transactional CSV files are ingested, cleansed, standardized, and modeled into a business-ready **Star Schema** optimized for analytical reporting and BI dashboards.

---

## 🏗️ Enterprise Data Architecture

The architecture enforces a strict separation of concerns across three distinct layers to ensure traceability, data quality, and high query performance:

<div class="media">
    <img src="/img/data_warehouse/data_architecture.png" alt="Data Warehouse Architecture Diagram">
</div>

### Architectural Layers

1. **🥉 Bronze Layer (Raw Storage / Staging)**:
   - Ingests raw data from external ERP and CRM CSV files directly into SQL Server staging tables.
   - Retains original source data structure without modification or type casting to preserve auditability.
   - Truncates and reloads historical raw batches during ingestion runs.

2. **🥈 Silver Layer (Cleansing & Conforming)**:
   - Performs data cleansing, whitespace stripping, and NULL handling.
   - Standardizes domain values (e.g., unifying gender codes `'M'`/`'F'` to `'Male'`/`'Female'`).
   - Resolves entity resolution issues across CRM and ERP systems.
   - Formats dates into unified `YYYY-MM-DD` standard types.

3. **🥇 Gold Layer (Analytical / Business Model)**:
   - Houses conformed **Dimension** and **Fact** tables structured in a **Star Schema**.
   - Generates integer **Surrogate Keys** (`customer_key`, `product_key`) to decouple analytics from volatile source system keys.
   - Optimized for OLAP query performance and direct connection to BI tools (Power BI, Tableau).

---

## 🔄 Data Integration & ETL Pipeline Flow

<div class="media">
    <img src="/img/data_warehouse/data_flow.png" alt="Data Integration and Pipeline Flow Diagram">
</div>

The ETL process is executed via modular **T-SQL Stored Procedures** designed for efficiency and idempotency:

```
[ ERP CSV Files ]  ──┐
                     ├─►  [ Bronze Schema ]  ──► [ Silver Transformations ] ──► [ Gold Star Schema ]
[ CRM CSV Files ]  ──┘    (Raw Ingestion)       (Cleansing & Union)            (Facts & Dims)
```

### Key Engineering Transformations:
- **Entity Resolution & Cross-System Deduplication**: Merged CRM customer demographics with ERP purchase histories using primary email and natural business keys.
- **Handling Data Anomalies**: Out-of-range dates, missing addresses, and invalid currency amounts are filtered or replaced with default fallback values (e.g., `N/A` or `-1` surrogate keys) to prevent broken join pipelines.
- **Idempotent Loads**: Pipeline scripts use table truncation and dynamic insertion patterns to enable seamless re-runs without data duplication.

---

## 📐 Data Model (Star Schema)

<div class="media">
    <img src="/img/data_warehouse/data_model.png" alt="Star Schema Data Model Diagram">
</div>

The Gold layer uses a **Star Schema** centered around transactional sales orders, supported by conformed customer and product dimensions.

### Design Principles:
- **Grain**: Each row in `gold.fact_sales` represents an individual line item within a customer's sales order.
- **Surrogate Keys**: Integer surrogate keys are indexed for fast JOIN operations between facts and dimensions.
- **Conformed Dimensions**: Attributes such as `country`, `marital_status`, `category`, and `subcategory` are standardized to serve across multiple business domains.

---

## 📖 Data Catalog (Gold Layer)

Below is the technical specification for all production-ready tables exposed in the Gold analytical layer:

### 1. `gold.dim_customers`
- **Purpose**: Centralized dimension storing customer master data enriched with demographic and geographic attributes.

| Column Name | Data Type | Key Type | Description |
| :--- | :--- | :--- | :--- |
| `customer_key` | `INT` | Primary Key | Surrogate key uniquely identifying each customer record. |
| `customer_id` | `INT` | Business Key | Unique numerical identifier assigned to the customer in source system. |
| `customer_number` | `NVARCHAR(50)` | Alternate Key | Alphanumeric tracking code for customer identification across ERP/CRM. |
| `first_name` | `NVARCHAR(50)` | Attribute | Customer's first name as recorded in the system. |
| `last_name` | `NVARCHAR(50)` | Attribute | Customer's last or family name. |
| `country` | `NVARCHAR(50)` | Attribute | Country of residence (e.g., `'Australia'`). |
| `marital_status` | `NVARCHAR(50)` | Attribute | Marital status (e.g., `'Married'`, `'Single'`). |
| `gender` | `NVARCHAR(50)` | Attribute | Standardized gender indicator (e.g., `'Male'`, `'Female'`, `'n/a'`). |
| `birthdate` | `DATE` | Attribute | Date of birth formatted as `YYYY-MM-DD`. |
| `create_date` | `DATE` | Audit | Timestamp when the customer record was created in the warehouse. |

---

### 2. `gold.dim_products`
- **Purpose**: Comprehensive catalog of all enterprise products, hierarchies, and inventory classifications.

| Column Name | Data Type | Key Type | Description |
| :--- | :--- | :--- | :--- |
| `product_key` | `INT` | Primary Key | Surrogate key uniquely identifying each product record. |
| `product_id` | `INT` | Business Key | Internal product tracking ID from operational systems. |
| `product_number` | `NVARCHAR(50)` | Alternate Key | Structured alphanumeric SKU code for inventory categorization. |
| `product_name` | `NVARCHAR(50)` | Attribute | Descriptive name of the product including model, color, and size. |
| `category_id` | `NVARCHAR(50)` | Foreign Key | High-level category identifier. |
| `category` | `NVARCHAR(50)` | Attribute | Top-level product category (e.g., `'Bikes'`, `'Components'`). |
| `subcategory` | `NVARCHAR(50)` | Attribute | Detailed sub-classification (e.g., `'Mountain Bikes'`, `'Road Frames'`). |
| `maintenance_required` | `NVARCHAR(50)` | Attribute | Maintenance status flag (`'Yes'`, `'No'`). |
| `cost` | `INT` | Attribute | Base cost price of the product in local monetary units. |
| `product_line` | `NVARCHAR(50)` | Attribute | Specific product series or line (e.g., `'Road'`, `'Mountain'`). |
| `start_date` | `DATE` | Attribute | Effective date when the product became active for sales. |

---

### 3. `gold.fact_sales`
- **Purpose**: High-volume transactional fact table capturing sales orders, shipping metrics, and revenue amounts.

| Column Name | Data Type | Key Type | Description |
| :--- | :--- | :--- | :--- |
| `order_number` | `NVARCHAR(50)` | Degenerate Key | Unique sales order identifier (e.g., `'SO54496'`). |
| `product_key` | `INT` | Foreign Key | Surrogate key linking order line item to `gold.dim_products`. |
| `customer_key` | `INT` | Foreign Key | Surrogate key linking order line item to `gold.dim_customers`. |
| `order_date` | `DATE` | Foreign Key / Date | Date when the order was submitted by the customer. |
| `shipping_date` | `DATE` | Date | Date when the order was shipped from the warehouse. |
| `due_date` | `DATE` | Date | Payment due date for the sales transaction. |
| `sales_amount` | `INT` | Measure | Total monetary value generated by the line item sale. |
| `quantity` | `INT` | Measure | Number of units purchased in the order line item. |
| `price` | `INT` | Measure | Unit selling price of the product at time of transaction. |

---

## 🛡️ Data Quality & Governance Framework

To guarantee that the warehouse remains enterprise-grade, automated validation checks are embedded into the T-SQL scripts:

- **Uniqueness Tests**: Verified zero duplicate surrogate keys in dimension tables.
- **Referential Integrity**: Ensured 100% of `product_key` and `customer_key` entries in `fact_sales` resolve to existing records in respective dimension tables.
- **Null Checks**: Mandatory non-null constraints enforced on business keys and primary dates.
- **Reconciliation Audit**: Row count checks comparing source CSV records vs. Bronze ingestion vs. Silver transformed counts to catch lost or dropped records.

---

## 📈 Analytics & Business Value Delivered

With the Gold layer established, stakeholders can run high-performance analytical queries without affecting operational databases:

1. **Customer Segmentation & CLV**: Tracking spend per customer demographic (e.g., marital status vs country vs lifetime sales volume).
2. **Product Profitability Analysis**: Analyzing product lines (`Road` vs `Mountain`) by margin (`sales_amount` vs `cost * quantity`).
3. **Fulfillment Cycle Time**: Calculating latency between `order_date` and `shipping_date` across international destinations.