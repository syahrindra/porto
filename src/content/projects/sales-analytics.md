---
title: "Sales Performance & Customer Insights Dashboard in Tableau"
tagline: "Interactive sales analytics for data‑driven decisions."
description: "Interactive Tableau dashboards built on an open-source dataset to help sales managers and executives track key KPIs, compare product performance, and uncover trends across time and customer segments."
tag:  ["Tableau","Sales Analytics","Dashboard", "Data Visualization","Business Intelligence"]

github: ""
featured: true
year: "2025"
coverImage: "/img/project-sales-analytics-img/cover image.png"
---
[🔗 View the Tableau dashboard](https://public.tableau.com/app/profile/mochammad.syahrindra.akbar.suharno/viz/TableauDashboard_17360172811950/SalesDashboard-Final)

## Project Context

In 2025 I built a set of interactive Tableau dashboards using an open-source sales dataset. The goal was to give sales managers and executive a clear, visual way to monitor performance and customer behavior so they could react faster and make better decisions. The main dashboard focuses on sales, profit, and quantity over time, + how different subcategories contribute to overall performance.

## Business Questions

I designed the dashboards around question that a real sales organization would care about, such as:

- What are our **total sales, profit, and quantity** this year, and how do they compare to the previous year?
- which **product subcategories** are driving the most sales and profit, and which ones are underperforming?
- How do **sales and profit trends** evolve over time-are there clear seasonal patterns or perionds of decline?
- Which months are our **highest and lowest** performers?
- Are there specific areas (products, time periods, or regions if available) where margins are consistently weak?

These questions quided the structure of the visuals, the choise of KPIs, and the interactions in the dashboard.

## Data and Approach

- **Data source:** An open-source retail sales dataset containing order, product, and profitabiliy information.
- **Tool:** Tableau Desktop for data connection, modeling, and visualization.
- **Preparation:** Basic cleaning and standardization, + creation of calculated fields for year-over-year comparisons and profit vs loss indicators.
- **Design principles:** Keep the layout simple and executive-friendly-high-level KPIS at the top, followed by deeper breakdows  and time-series views.

## Dashboard Design

<div class="media">
    <img src="/img/project-sales-analytics-img/Sales Dashboard-Final.png" alt="Sales Analytics Dashboard">
</div>


### KPI Summary

At the top of the main dashboard, I highligted three core metrics for the selected year:

- **Total Sales**
- **Total Profit**
- **Total Quantity**

Each KPI includes a small line chart showing monthly performance, plus a **year-over-year comparison** (e.g., “20.4% vs PY”), making it easy to see whether the business is improving or declining at a glance.s

### Product Performance

To understand *what* is driving those KPIs, I added a set of product-focused views:

- **Sales & Profit by Subcategory:**  
  A horizontal bar chart comparing current year vs previous year sales for each subcategory, alongside a profit vs loss visualization. This helps quickly identify:
  - Star categories (high sales and strong profit)
  - Underperformers (good sales but weak or negative profit)
  - Niche categories with growth potential

### Trends Over Time

The bottom-right section focuses on **Sales & Profit Trends Over Time**:

- A line or bar‑plus‑line view of monthly **sales**, with an average line to show whether each month is above or below the yearly average.
- A similar view for **profit**, highlighting months where profit drops even if sales are stable or increasing.

These time‑series views are crucial for spotting seasonality, unusual spikes or drops, and the impact of campaigns or promotions.

## How This Helps Sales Managers and Executives

This Tableau report is designed as a practical decision-support tool:

- **Monitor performance at a glance**  
  Executives can see overall sales, profit, and quantity plus YoY changes in a few seconds, without digging through spreadsheets.

- **Spot problem areas early**  
  If a subcategory shows declining profit or consistently underperforming months, managers can drill down to understand whether discounts, returns, or cost issues are driving the trend.

- **Prioritize high-impact actions**  
  By comparing sales and profit together, leaders can focus on:
  - Protecting high-profit categories
  - Fixing or retiring low-margin products
  - Planning inventory and promotions around seasonal peaks

- **Support data-driven storytelling**  
  The visuals make it easy to walk stakeholders through a narrative (e.g., “Sales are up 20%, but profit only 14% due to subcategory X”), which improves alignment between sales, finance, and operations.

## What I Learned

From this project I solidified my Tableau skills in:

- Designing **executive-level dashboards** that combine KPIs, product breakdowns, and time-series charts in a single coherent view.
- Using **calculated fields** and YoY comparisons to add real analytical value beyond simple charts.
- Turning an open‑source dataset into a realistic sales scenario that answers the kinds of questions leaders actually ask.