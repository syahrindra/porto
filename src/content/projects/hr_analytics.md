---
title: "HR Analytics Dashboard in Power BI"
tagline: "Exploring employee attrition and workforce trends for a fictitious software company."
description: "An HR analytics case study built in Power BI where I designed a data model, created DAX measures, and developed interactive reports to help HR understand attrition and workforce composition."
tag:  ["Power BI","DAX","Data Modeling","HR Analytics","Dashboard", "Data Visualization","Business Intelligence", "Exploratory Data Analysis"]

github: ""
featured: true
year: "2025"
coverImage: "/img/project_hr_analytics_img/cover.png"
---

[🔗 View the Power BI report (.pbix)](https://drive.google.com/file/d/1qIFA5g6Yoaur5voo0uOkk1FgJY7mmPrz/view?usp=sharing)


## Project Context

This project started as an interview case study: given an HR dataset for a fictitious software company, I had to explore the data, build a data model in Power BI, and create an interactive HR analytics report.  

The goal was to understand attrition patterns and workforce composition so that HR leaders could make more data-driven decisions about hiring, retention, and employee well‑being. The final report contains multiple pages, including an **Overview** page and an **Attrition** page with role- and behavior-based breakdowns.

## Business Questions I Wanted to Answer

I framed the analysis around questions an HR team would realistically ask, such as:

- What is our **overall attrition rate**, and how many employees are active vs inactive?
- Which **job roles** have the highest attrition, and where are we losing talent we can’t afford to lose?
- Does **business travel** or **overtime** correlate with higher attrition?
- How has the **total number of employees** changed over time?
- How are employees distributed across **departments, roles, and education levels**?
- Are there differences in **headcount and salary** across ethnic groups that HR should pay attention to?

These questions guided how I modeled the data, defined DAX measures, and designed the visuals on each report page.

## Data Model Design

The data model follows a simple star‑schema pattern centered on the `Employee` table.

<div class="media">
    <img src="/img/project_hr_analytics_img/star_schema_pattern.png" alt="a simple star-schema pattern">
</div>

### Core tables

- **Employee (fact table)**  
  Contains one row per employee, with fields like:
  - `EmployeeID`
  - `Age`
  - `Attrition` (Yes/No)
  - `BusinessTravel`
  - `Department`
  - `DistanceFromHome (KM)`
  - `Education` / `EducationField`
  - `Ethnicity`
  - Hire / termination dates (used to link to the date dimension)

- **EducationLevel (dimension)**  
  Stores the mapping between `EducationLevelID` and a descriptive `EducationLevel` (e.g., High School, Bachelor, Master). The `Employee` table connects to this via `EducationLevelID`, turning a numeric code into a readable field.

- **Dates (date dimension)**  
  A standard date table with:
  - `Date`
  - `DayName`, `DayNameShort`
  - `DayNumber`
  - `DayOfWeek`  
  This table is related to the `Employee` table on relevant date fields (for example, hire date or snapshot date), which enables time-series analysis like “Total Employees by Year.”

- **_Measures (measure table)**  
  A dedicated table that only contains DAX measures, such as:
  - `% Attrition Rate`
  - `Active Employees`
  - `Inactive Employees`
  - `Total Employees`  

  Keeping all measures in a single “_Measures” table makes the model cleaner and easier to maintain.

### Relationships

- `Employee` (many) → `EducationLevel` (one) via `EducationLevelID`
- `Employee` (many) → `Dates` (one) via the chosen date key (e.g., hire date or snapshot date)  

This structure gives a flexible star schema where `Employee` acts as the central fact table, and `EducationLevel` plus `Dates` provide descriptive and time-based context for analysis.

## DAX Measures and Calculations

To answer the HR business questions, I created several DAX measures, for example:

- **Total Employees** – counts distinct `EmployeeID`.
- **Active Employees** – counts employees where `Attrition = "No"`.
- **Inactive Employees** – counts employees where `Attrition = "Yes"`.
- **% Attrition Rate** – `Inactive Employees / Total Employees`.  

I also created additional calculated columns and measures as needed to support breakdowns by job role, business travel category, overtime status, and other attributes in the visuals.

## Report Pages and Visuals

### Overview Page

The **Overview** page focuses on the big picture:

<div class="media">
    <img src="/img/project_hr_analytics_img/overview_page.png" alt="Overview Page">
</div>

- **KPI cards** showing:
  - Total Employees
  - Active Employees
  - Inactive Employees
  - % Attrition Rate
- **Line chart** of Total Employees by Year to see workforce growth or decline over time.
- **Treemap** of Total Employees by Department and Job Role to highlight where the workforce is concentrated.
- **Combo chart** of Total Employees and Average Salary by Ethnicity to surface diversity and pay insights.

This page gives HR and leadership an at-a-glance view of workforce size, diversity, and high-level attrition.

### Attrition Page

The **Attrition** page dives deeper into why people leave:

<div class="media">
    <img src="/img/project_hr_analytics_img/attrition_page.png" alt="Attrition Page">
</div>

- **Bar chart** of `% Attrition Rate by JobRole` to pinpoint roles at highest risk—such as sales or highly specialized technical positions.
- **Clustered column + line chart** of `% Attrition Rate and Total Employees by BusinessTravel`, showing whether frequent travel is associated with higher attrition and how many employees are affected.
- **Bar chart** of `% Attrition Rate by OverTime`, revealing whether overtime is a strong driver of turnover.   

With slicers (e.g., by department, education level, or date), stakeholders can interactively slice these visuals and explore patterns across different segments.

## How This Report Helps HR

This dashboard is designed to be more than just “pretty charts”—it’s a decision-support tool for HR:

- **Identify high-risk roles and departments**  
  By surfacing attrition by job role and department, HR can prioritize retention programs where the business impact of turnover is highest.

- **Link working conditions to attrition**  
  Visuals by BusinessTravel and OverTime help test hypotheses like “Are frequent travelers burning out?” or “Is overtime driving resignations?” If the data confirms this, HR can adjust travel policies, staffing levels, or workload distribution.

- **Monitor workforce trends over time**  
  The employees-by-year chart enables HR to see whether hiring is keeping up with attrition and whether workforce size trends align with business strategy.

- **Support diversity and equity discussions**  
  Comparing total employees and average salary by ethnicity gives a starting point to discuss representation and pay equity, and to design more inclusive HR policies.

- **Create a reusable HR analytics layer**  
  Because the data model is clean and the key measures are centralized, HR can easily extend this report with new pages—e.g., promotions, performance ratings, or engagement survey results—without rebuilding everything from scratch.

## Key Takeaways from the Project

Working on this case study gave me hands-on experience with the full Power BI workflow:

- Importing, cleaning, and modeling HR data into a usable star schema.
- Using DAX to define core business measures like attrition rate and active vs inactive headcount.
- Building multi-page, interactive reports that answer real business questions rather than just visualizing numbers.

Most importantly, it showed me how a well-designed Power BI model and dashboard can turn a raw HR dataset into actionable insights for decision makers.