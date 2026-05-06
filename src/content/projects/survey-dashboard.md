---
title: "Data Professional Survey Breakdown in Power BI"
tagline: "Exploring the lives, salaries, and preferences of data professionals."
description: "An interactive Power BI report built on an open‑source survey dataset to analyze where data professionals work, how much they earn, which tools they use, and how satisfied they feel with their careers."
tag: ["Power BI","EDA","Survey Analytics","Dashboard","Data Visualization"]

github: "https://github.com/syahrindra/data_professional_survey_dashboard"
featured: true
year: "2024"
coverImage: "/img/project-survey-dashboard-img/cover image.png"
---

## Project Context

This project uses an open‑source survey dataset about data professionals to explore demographics, salaries, tool preferences, and satisfaction levels. I built a single‑page Power BI dashboard that lets users quickly understand who took the survey, where they work, what they earn, and how happy they are with their work–life balance and salary.  


The primary audience is anyone interested in the data career landscape—students considering data roles, hiring managers, or analysts who want to benchmark themselves against the broader community.

## Business Questions

I designed the analysis around questions such as:

- From which **countries** did most survey responses come?
- What is the **average salary** for each **job title** (e.g., Data Scientist, Data Engineer, Data Analyst)?
- Which **programming languages** are most popular among data professionals?
- How do **salaries differ by gender**?
- On average, how happy are respondents with their **work–life balance** and **salary**?
- What is the **overall profile** of the survey group (number of respondents and average age)?

These questions guided the choice of visuals and calculated measures in the report.

## Data and Modeling

- **Source:** Open‑source survey CSV containing one row per respondent, with fields such as country, age, job title, salary, gender, favorite programming language, and satisfaction scores.
- **Preparation:**  
  - Cleaned country names and job titles.  
  - Converted salary and age to numeric formats.  
  - Created measures for **Count of Survey Takers**, **Average Age**, and **Average Salary**.
- **Tooling:** All exploration, transformation, and visualization were completed in **Power BI Desktop**, focusing on building a clean model that supports slicing by country, role, and other attributes.

## Dashboard Design

The dashboard is structured to tell the story of the survey at a glance:


<div class="media">
    <img src="/img/project-survey-dashboard-img/dashboard.png" alt="Survey Dashboard">
</div>

### 1. High-Level KPIs

On the right side, I display:

- **Count of Survey Takers** (e.g., 630)
- **Average Age of Survey Takers**  

Below those KPIs are **gauge charts** showing:

- **Happiness with Work/Life Balance**
- **Happiness with Salary**

These gauges summarize sentiment on a 0–10 scale, making it easy to see whether respondents feel generally satisfied or not.

### 2. Where Respondents Are From

A **treemap** shows the **Country of Survey Takers**, giving a quick visual of which countries dominate the dataset (e.g., Canada, India, United States, United Kingdom, and “Other”). This helps users understand the geographic bias of the survey.

### 3. Roles and Compensation

Two visuals focus on job roles and pay:

- **Average Salary by Job Title** – a horizontal bar chart comparing salaries for roles like Data Scientist, Data Engineer, Data Architect, Data Analyst, Database Developer, and Student/Looking for Job.
- **Average Salary by Gender** – a bar chart comparing average salaries for male vs female respondents.

Together, these views help answer questions about how pay varies across roles and between genders.

### 4. Tools and Preferences

A **bar chart of Favorite Programming Language** shows how many respondents selected Python, R, SQL, C/C++, JavaScript, and other languages as their primary tool. This is useful for understanding the tech stack preferences of the community.

## How This Dashboard Is Useful

This Power BI report turns a raw survey file into an interactive overview of the data profession:

- **For aspiring data professionals:** It provides realistic expectations about salary and popular programming languages.
- **For hiring managers:** It highlights which roles typically command higher pay and which tools are most commonly used, informing hiring and training plans.
- **For educators and bootcamps:** It helps align curricula with the tools and skills that are actually in demand.
- **For analysts and practitioners:** It offers a quick benchmark against peers in similar roles or locations.

## What I Learned

Through this project I practiced:

- Turning a messy survey dataset into a clean, analyzable model in Power BI.
- Designing a **single-page executive-style dashboard** that combines demographics, compensation, and satisfaction metrics.
- Using a mix of **treemaps, bar charts, KPIs, and gauges** to communicate different aspects of the same story.
- Thinking from the end-user’s perspective—structuring the layout so a viewer can understand the landscape of data professionals in just a few seconds.