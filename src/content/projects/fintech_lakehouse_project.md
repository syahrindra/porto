---
title: "Fintech Transaction Pipeline & Data Quality Suite"
tagline: "A data engineering project built with DuckDB, dbt, Docker Compose, and Python to handle transaction ingestion, transformation models, and pipeline health summaries."
description: "A lightweight local data engineering project demonstrating end-to-end payment transaction processing: raw Parquet ingestion, dbt models with DuckDB, 15 automated data quality tests, and log summarization."
tag: ["DuckDB", "dbt", "Docker", "Python", "Parquet", "Data Quality", "SQL", "Data Engineering"]
github: ""
featured: true
year: "2026"
coverImage: "../img/fintech_lakehouse/cover.jpg"
---

## Project Overview

This is a focused **~2 hour hands-on data engineering project** I put together to showcase how modern, lightweight tooling (**DuckDB**, **dbt**, **Python**, and **Docker Compose**) can be combined to build a fast, reliable analytical pipeline without setting up heavy cloud infrastructure.

### The Goal
The objective was simple: simulate a realistic fintech payment pipeline that ingests raw transaction payloads, cleanses the data, runs aggregate transformations to detect merchant chargeback spikes, calculates daily payout settlements, and verifies data quality before emitting a pipeline run summary.

---

## Architecture & Data Flow

The project follows a simple 4-stage pipeline structure:

<div class="media">
    <img src="../img/fintech_lakehouse/data_architecture.svg" alt="Fintech Pipeline Architecture Diagram">
</div>

### Stage Breakdown

1. **Python Ingestion (`ingest_transactions.py`)**:
   - Generates 500,000 synthetic transaction records.
   - Writes directly to columnar **Parquet format** (`data/raw_lake/transactions.parquet`) using DuckDB's vectorized `COPY` command.

2. **Staging Model (`models/staging/stg_transactions.sql`)**:
   - Reads directly from local Parquet files via DuckDB (`read_parquet`).
   - Typecasts attributes (`VARCHAR`, `INTEGER`, `DOUBLE`, `TIMESTAMP`) and filters out invalid non-positive amounts (`amount_usd > 0.0`).

3. **Intermediate Metrics Model (`models/intermediate/int_merchant_fraud_spikes.sql`)**:
   - Aggregates daily transaction volume and chargebacks per merchant.
   - Uses a SQL window function to calculate a **7-day rolling average chargeback baseline**:
     $$\text{Rolling Avg} = \text{AVG}(\text{chargeback\_count}) \text{ OVER (PARTITION BY merchant\_id ORDER BY txn\_date ROWS 7 PRECEDING)}$$
   - Flags an anomaly (`is_anomaly_spike = TRUE`) if a merchant's daily chargebacks exceed 3x their 7-day average.

4. **Gold Mart (`models/marts/fct_daily_merchant_settlement.sql`)**:
   - Calculates daily net payouts after deducting a standard **1.5% platform fee**:
     $$\text{net\_settlement\_amount\_usd} = \text{ROUND}(\text{total\_volume\_usd} \times 0.985, 2)$$

5. **Monitoring & Log Summary (`monitor_and_ai.py`)**:
   - Reads the final DuckDB table state, logs execution metrics into structured JSON (`pipeline_execution.log`), and prints a clean operational status summary.

---

##  End-to-End Execution Flow

The entire workflow is orchestrated via `orchestrator.py` inside a single Docker container:

```mermaid
graph TD
    A["ingest_transactions.py"] -->|Generate 500k Parquet Records| B["data/raw_lake/transactions.parquet"]
    B -->|dbt run (DuckDB Engine)| C["stg_transactions (View)"]
    C -->|dbt run| D["int_merchant_fraud_spikes (Table)"]
    D -->|dbt run| E["fct_daily_merchant_settlement (Table)"]
    E -->|dbt test| F["15 Schema Data Quality Tests"]
    F -->|monitor_and_ai.py| G["JSON Logs & Terminal Status Summary"]
```

---

## Data Quality & Testing

To ensure the transformations produce reliable data, I defined **15 automated dbt schema assertions** in `models/schema.yml`:

- **Primary Key Integrity**: `unique` and `not_null` assertions on POS UUIDs (`transaction_id`).
- **Required Fields**: `not_null` constraints across `merchant_id`, `customer_id`, `amount_usd`, `country_code`, and `txn_date`.
- **Domain Values**: `accepted_values` validation restricting status values strictly to `['COMPLETED', 'CHARGEBACK']`.

Running `dbt test --profiles-dir .` verifies all 15 test assertions pass cleanly during execution.

---

##  Pipeline Monitoring Output

When the pipeline finishes, `monitor_and_ai.py` inspects the analytics warehouse and prints a summary log:

```text
 [AI OPS SUMMARY] Daily Settlement Pipeline Succeeded.
• Total Records Processed: 500,000
• Merchant Fraud Spikes Triggered: 63
• Execution Time: 4.2 seconds.
• Operational Action Required: Review high-chargeback merchants flagged in 'fct_daily_merchant_settlement'.
```

Structured metrics are simultaneously saved to `pipeline_execution.log` for downstream auditability.

---

## How to Run Locally

### Prerequisites
- Docker & Docker Compose installed.

### Execution
Clone the repository and run:

```bash
# Build and execute the full pipeline stack
docker-compose up --build

# Or using Makefile shortcuts:
make run      # Run pipeline container
make test     # Run dbt test suite
make query    # Inspect top 10 rows from the settlement mart
```

---

## What I Learned & Key Takeaways

- **DuckDB + Parquet Efficiency**: Processing 500,000 rows locally in DuckDB takes under 1 second without needing dedicated database server background processes.
- **dbt for Local Modeling**: Combining `dbt-duckdb` allows writing production-style SQL models and schema tests locally with zero setup overhead.
- **Reproducible Pipeline Delivery**: Wrapping the execution logic in Docker Compose ensures anyone can clone and run the exact same pipeline reliably.
