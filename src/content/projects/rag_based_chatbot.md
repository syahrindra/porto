---
title: "Development of a Large Language Model-Based Chatbot with Retrieval-Augmented Generation (RAG) to Enhance Student Information Services at Universitas Widyatama"
tagline: "Building an Indonesian RAG chatbot to make campus information actually accessible, 24/7."
description: "How I designed, built, and evaluated a Large Language Model-based chatbot with Retrieval-Augmented Generation (RAG) to support student information services at Universitas Widyatama."
tag:  ["Python","Streamlit","LangFlow","Large Language Model","Retrieval-Augmented Generation","Chatbot","AstraDB"]

github: ""
featured: true
year: "2025"
coverImage: "/img/project_rag_chatbot_img/cover.png"
---

## Why I Built This Chatbot


At Universitas Widyatama, many students struggle to get basic academic information quickly-things like activity guidelines, academic forms, or scholarship info are scattered across different source, and the helpdesk is limited by working hours and staff capacity.

In a survey of 24 students, around 79% said they had difficulty obtaining academic information rapidly, which can directly impact their academic process and development.

<div class="media">
    <img src="/img/project_rag_chatbot_img/rag_illustration.png" alt="RAG Illustration">
</div>   

I wanted to see whether a modern Large Langauge Model (LLM) combined with Retrieval-Augmented Generation (RAG) could act as a 24/7 "virtual helpdesk" that answers these questions in Indonesia, grounded on official university documents instead of hallucinating answers.

## From Idea to Research Design

To keep this project rigorous (and not just “build something cool”), I used the Design Science Research (DSR) methodology from Hevner et al. and Peffers et al.  

<div class="media">
    <img src="/img/project_rag_chatbot_img/research_process.png" alt="DSR Methodology">
</div>

I followed six main phases:

1. Problem identification  
2. Defining solution objectives  
3. Design and development  
4. Demonstration  
5. Evaluation  
6. Communication  

The practical problem: students cannot easily access up‑to‑date academic and student affairs information in a centralized, always-available way. The objective: design a RAG-based chatbot that can answer these questions using verified campus sources, reduce hallucinations, and be realistically deployable with my available hardware.

## Building the Knowledge Base

The first step was turning scattered campus information into a structured knowledge base the chatbot could understand.  

- I collected data from **52 official university URLs** plus **five documents** such as academic regulations and scholarship guidebooks.  
- The text was split into chunks of **500 characters with 100-character overlap** so that each retrieval unit was not too short or too long.  
- For some URL-based content, instead of fixed-size chunking, I split based on logical sections or URL structure to keep related content together.  
- Each chunk was tagged with metadata like file title and modification date to make attribution and filtering easier.  

These chunks were embedded using **all-indo-e5-small-v4**, a 384-dimensional embedding model for Indonesian and multilingual text, and stored inside an **AstraDB vector database**. This allowed the system to later perform similarity search when a student asks a question.

## System Architecture: My RAG Pipeline

The core system is a Retrieval-Augmented Generation pipeline orchestrated with **LangFlow**.  

Here’s the high-level flow when a student asks a question:

<div class="media">
    <img src="/img/project_rag_chatbot_img/chatbot_system_arch_and_workflow.png" alt="chatbot system arch and workflow">
</div>

1. **Query optimizer**  
   The raw question is first cleaned to remove noise and keep only the essential keywords.  

2. **Embedding & retrieval**  
   - The optimized query is embedded using **all-indo-e5-small-v4** into a 384-dimensional vector.  
   - AstraDB performs a vector similarity search to find the most relevant chunks from the knowledge base.  

3. **LLM with context (the “G” in RAG)**  
   - Retrieved chunks are passed as context into **Sahabat-AI V1 9B**, a Gemma 2–based Indonesian LLM hosted locally via **LM Studio**.  
   - The **temperature is set to 0.1** to keep answers deterministic and factual rather than overly creative, which is important for academic information.  
   - The **context window is 8,192 tokens**, enough to hold student queries plus several relevant chunks from the knowledge base.  

4. **User interface**  
   - I built a simple web UI using **Streamlit**, so students can type questions naturally and get answers as if chatting with a helpdesk assistant.  

In short: the LLM never answers from “memory” alone—it always tries to ground its response on retrieved campus documents.

## How I Evaluated the Chatbot

Instead of only testing a few cherry-picked questions, I prepared a **dataset of 188 Indonesian questions** designed to simulate realistic use.  

I split them into three categories:

- **Happy Path (94 questions)**  
  Straightforward questions where relevant information clearly exists in the knowledge base (e.g., “What are the requirements for scholarship X?”).  

- **Edge Cases (38 questions)**  
  Inputs with typos, slang, multi-hop reasoning, or slightly messy phrasing.  

- **Negative Rejection (56 questions)**  
  Questions that are out of scope, unrelated to campus, or where there should be no confident answer.  

To avoid relying on “LLM as a judge”, I used **human evaluation** with **four annotators** who are students or alumni of Universitas Widyatama, so they understand the academic context.  

Each answer was scored in a **binary 0/1** fashion across three RAG metrics:  

- **Context Relevance** – Did the retrieved chunks actually contain the information needed?  
- **Faithfulness** – Does the answer stay faithful to the retrieved context (no hallucinations)?  
- **Answer Relevance** – Does the answer directly and correctly address the user’s intent?  

To check whether the annotators were consistent, I calculated **Fleiss’ Kappa**, and obtained:

- 0.92 for Context Relevance  
- 0.88 for Faithfulness  
- 0.94 for Answer Relevance  

These values fall in the **“strong” to “almost perfect” agreement** range, which means the evaluation is reliable and not just random subjective opinions.

## What the Numbers Say

Across all 188 questions, the overall performance was:

- **Faithfulness:** 83.6% – the chatbot is generally very good at not hallucinating when it has the right context.  
- **Answer Relevance:** 54.4% – only about half of the answers are directly helpful from a user’s perspective.  
- **Context Relevance:** 35.8% – in many cases, the retriever fails to fetch the right pieces of information.  

By scenario:

- **Happy Path:** Answer Relevance ≈ 43.9%, Context Relevance ≈ 38.6%. Even for “easy” questions, the retriever sometimes brings the wrong chunks, so the LLM cannot assemble a perfect answer.  
- **Edge Cases:** Answer Relevance drops to around 32.2%, showing that noisy inputs are still challenging.  
- **Negative Rejection:** Answer Relevance reaches 87.5% and Faithfulness 91.1%—the system is surprisingly strong at *refusing* to answer when it should, instead of hallucinating.  

I also tested adding **new data** (e.g., a midterm exam schedule) and evaluated 15 questions related to that update. The system achieved **60% Answer Relevance** and **80% Faithfulness**, which shows the RAG pipeline can index and use new documents, even though the retriever limitations are still there.

## Where the System Struggles

The main bottleneck is clearly the **retriever**, not the LLM. From my analysis, there are three main issues:  

1. **Embedding limitations**  
   The 384-dimensional **all-indo-e5-small-v4** model is strong for its size, but too coarse for dense, formal Indonesian academic text with complex terms, course codes, and abbreviations.  

2. **Chunking strategy**  
   Fixed 500-character chunks frequently split logical paragraphs, procedures, or rules across segments, so important context gets separated and retrieval becomes noisy.  

3. **Pure dense retrieval**  
   The current system relies fully on vector similarity. For things like course codes or rigid academic terms, a combination of **keyword search (BM25)** plus dense retrieval would likely work better.  

These factors explain why Faithfulness is high (the LLM is honest with whatever you give it) but Answer Relevance and Context Relevance lag behind.

## What I Would Improve Next

Based on the findings in my paper, there are three main directions for future work:  

- **Stronger embedding model**  
  Replace all-indo-e5-small-v4 with a higher-dimensional, more expressive model such as **multilingual-e5-large** or **text-embedding-3-large**, which can better handle nuanced academic language.  

- **Hybrid search**  
  Combine **vector search** with **BM25 keyword search**, especially for queries involving course codes, regulation numbers, or specific terms that semantic similarity alone might miss.  

- **Smarter chunking**  
  Move from fixed-length chunking to **semantic or recursive character splitting** so that paragraphs and procedures stay intact, and the retriever works on meaningful units instead of arbitrary slices.  

The conclusion from the research is that the **RAG architecture works well to reduce hallucinations**, but **this prototype is not yet ready for full-scale deployment as the primary student service channel** without improving the retrieval layer.

## What I Learned from This Project

Personally, this project was my way of connecting the theory of LLMs and RAG with a real problem on my own campus. I learned how tricky it is to move from “the model works” to “the system is genuinely useful for students.”  

A few key takeaways for me:  

- Good RAG is not just “LLM + vector DB”. Design choices around chunking, embedding, and hybrid search matter as much as the model.  
- Human evaluation with clear metrics (Context Relevance, Faithfulness, Answer Relevance) and inter-rater agreement is essential to understand what is actually failing.  
- Even a “not yet production-ready” prototype can give strong insights into where to invest effort next—especially in retrieval.
