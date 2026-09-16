# FitScore AI — System Architecture Document

> **Version:** 1.0  
> **Date:** September 2025  
> **Project:** FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Estimation and Deep-Learning  
> **Authors:** Preethi R, Ramyashri Ravikumar, Vaishnavi G N, Vaishnavi S  
> **Guide:** Prof. Yashaswini C D, Dept. of CSE(DS), AMC Engineering College

---

## 1. Architecture Overview

FitScore AI employs a **three-tier client–server architecture** with edge-accelerated pose inference, a Python-based analytics backend, and a relational persistence layer. The design prioritises sub-100 ms real-time feedback, user privacy (no raw video leaves the browser), and modular extensibility for future exercise and platform expansions.

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION TIER                           │
│  React 19 + Vite  │  MediaPipe Tasks Vision (WASM/WebGL)       │
│  Recharts Dashboards  │  WebSocket Client                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │  REST API / WebSocket (JSON)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION TIER                             │
│  FastAPI (Python 3.11+)                                         │
│  ├── Auth Module (JWT + bcrypt)                                 │
│  ├── Pose Processing Pipeline                                   │
│  ├── CNN-LSTM Exercise Classifier                               │
│  ├── FitScore Metric Engine                                     │
│  ├── Injury Risk Stratification Engine                          │
│  ├── LLM Coaching Assistant (GPT-4o via LangChain)              │
│  ├── Analytics & Reporting (ReportLab PDF)                      │
│  └── WebSocket Manager (real-time feedback push)                │
└──────────────────────────┬──────────────────────────────────────┘
                           │  SQLAlchemy ORM / asyncpg
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATA TIER                                    │
│  PostgreSQL 16                                                  │
│  ├── Users, Profiles, Auth Tokens                               │
│  ├── Exercise Sessions & Repetition Logs                        │
│  ├── FitScore History & Sub-scores                              │
│  ├── Injury Risk Records                                        │
│  └── Analytical Reports & Coach Logs                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Tier Descriptions

### 2.1 Presentation Tier (Frontend)

| Aspect | Detail |
|---|---|
| **Framework** | React 19 (Vite build tooling) |
| **Pose Engine** | MediaPipe BlazePose via `@mediapipe/tasks-vision` (in-browser, WASM + WebGL) |
| **State Management** | Zustand for global state; React Query for server-state cache |
| **Charting** | Recharts (line, bar, radar, heatmap) |
| **Styling** | CSS Modules / Vanilla CSS with a custom design-token system |
| **Real-time Comm** | Native WebSocket API for live feedback channel |
| **Auth UI** | JWT-based login/register forms; token stored in HttpOnly cookies |

**Key Responsibilities:**
1. Capture webcam frames at 30 FPS via `getUserMedia`.
2. Run MediaPipe BlazePose **on-device** to extract 33 × 3D keypoints per frame.
3. Perform hip-centre normalisation and `atan2` joint-angle computation client-side.
4. Stream normalised feature vectors (not raw video) to the backend via WebSocket.
5. Render real-time skeletal overlay, colour-coded joint feedback (green/amber/red), rep counter, and FitScore gauge.
6. Display dashboards: FitScore trends, muscle activation heatmaps, session history, and injury risk timeline.

### 2.2 Application Tier (Backend)

| Aspect | Detail |
|---|---|
| **Framework** | FastAPI (Python 3.11+, uvicorn ASGI) |
| **ML Runtime** | TensorFlow 2.x / Keras (CNN-LSTM model served via `tf.keras.models.load_model`) |
| **Pose Processing** | MediaPipe Python SDK (server-side fallback for video uploads) |
| **LLM Integration** | GPT-4o via LangChain (context-aware prompting) |
| **PDF Reports** | ReportLab |
| **Auth** | OAuth2 password flow, JWT access + refresh tokens, bcrypt hashing |
| **Task Queue** | Celery + Redis (for heavy analytics, report generation, model re-training jobs) |

**Module Breakdown:**

#### 2.2.1 Pose Processing Pipeline
- Receives normalised 33-keypoint coordinate sequences from the frontend WebSocket.
- For video-upload mode: uses MediaPipe Python SDK to extract landmarks server-side.
- Applies **Kalman filtering** for temporal smoothing of jittery coordinates.
- Builds **30-frame sliding windows** (stride 5) as input tensors for the CNN-LSTM model.

#### 2.2.2 CNN-LSTM Exercise Classifier
- **Architecture:** 1D-CNN (spatial feature extraction) → LSTM (temporal pattern learning) → Dense softmax (19 exercise classes).
- **Input shape:** `(batch, 30 frames, 132 features)` — 33 keypoints × 4 values (x, y, z, visibility).
- **Output:** Exercise label + confidence score (threshold ≥ 75%).
- **Training config (deployed):** Stride-5 sliding window + BatchNorm + Dropout 0.3, 100 epochs, Adam optimiser → **93.6% accuracy, 0.926 F1-score**.

#### 2.2.3 FitScore Metric Engine
Computes a weighted composite score (0–100) from five biomechanical dimensions:

| Dimension | Weight | Computation Method |
|---|---|---|
| Joint Alignment | 30% | Deviation of key angles from exercise-specific ideal templates |
| Range of Motion (ROM) | 25% | Ratio of achieved ROM to exercise-specific target ROM |
| Movement Symmetry | 20% | L/R angular deviation comparison |
| Posture Stability | 15% | Variance of hip-centre displacement across the repetition |
| Exercise Tempo | 10% | Deviation from target cadence (seconds per rep) |

**Formula:**
```
FitScore = Σ (wᵢ × sub_scoreᵢ)   where Σwᵢ = 1.0
```

#### 2.2.4 FSM Repetition Counter
- **Finite State Machine** with states: `START → DOWN → UP → COMPLETE`.
- Transitions triggered by geometric heuristics on primary joint angles (e.g., knee angle for squats).
- Rejects partial or incorrect movements to eliminate false-positive rep counts.

#### 2.2.5 Injury Risk Stratification Engine
- **Hybrid approach:** Rule-based thresholds (knee valgus angle > 15°, anterior pelvic tilt detection) + ML-based compensation pattern detector.
- **Output:** Risk tier (`Low` / `Moderate` / `High`) + flagged joints with explanations.
- Continuously monitors per-frame; triggers alerts when risk persists for ≥ 3 consecutive frames.

#### 2.2.6 LLM Coaching Assistant
- Uses GPT-4o via LangChain with context-aware prompting.
- **Context window:** Current FitScore, risk tier, injury profile, user history, dietary data (optional).
- Generates: personalised corrective text, adaptive weekly rehabilitation plans, encouragement messaging.

#### 2.2.7 Analytics & Reporting Module
- Aggregates session metrics: FitScore trends, rep counts, muscle activation distribution.
- Generates downloadable **medical-grade PDF reports** via ReportLab.
- Includes: FitScore trend charts, muscle activation heatmaps, injury risk timeline, session summaries.

### 2.3 Data Tier (Database)

| Aspect | Detail |
|---|---|
| **RDBMS** | PostgreSQL 16 |
| **ORM** | SQLAlchemy 2.0 (async sessions via asyncpg) |
| **Migrations** | Alembic |

**Core Schema (ERD):**

```
┌──────────────┐     ┌──────────────────────┐     ┌─────────────────────┐
│   users      │     │   exercise_sessions  │     │   repetitions       │
│──────────────│     │──────────────────────│     │─────────────────────│
│ id (PK)      │──┐  │ id (PK)              │──┐  │ id (PK)             │
│ email        │  │  │ user_id (FK)         │  │  │ session_id (FK)     │
│ password_hash│  │  │ exercise_type        │  │  │ rep_number          │
│ full_name    │  └──│ started_at           │  └──│ fit_score           │
│ body_metrics │     │ ended_at             │     │ alignment_score     │
│ created_at   │     │ overall_fit_score    │     │ rom_score           │
└──────────────┘     │ total_reps           │     │ symmetry_score      │
                     │ avg_risk_tier        │     │ stability_score     │
                     └──────────────────────┘     │ tempo_score         │
                                                  │ risk_tier           │
                     ┌──────────────────────┐     │ flagged_joints      │
                     │   injury_records     │     │ landmark_snapshot   │
                     │──────────────────────│     └─────────────────────┘
                     │ id (PK)              │
                     │ session_id (FK)      │     ┌─────────────────────┐
                     │ risk_tier            │     │   coaching_logs     │
                     │ flagged_joint        │     │─────────────────────│
                     │ deviation_angle      │     │ id (PK)             │
                     │ recommendation       │     │ session_id (FK)     │
                     │ timestamp            │     │ prompt_context      │
                     └──────────────────────┘     │ llm_response        │
                                                  │ created_at          │
                     ┌──────────────────────┐     └─────────────────────┘
                     │   reports            │
                     │──────────────────────│
                     │ id (PK)              │
                     │ user_id (FK)         │
                     │ report_type          │
                     │ file_path            │
                     │ generated_at         │
                     └──────────────────────┘
```

---

## 3. Data Flow Architecture

```
User → Webcam → [Browser: MediaPipe BlazePose]
                        │
                  33 × 3D keypoints
                        │
               [Browser: Normalisation + Angle Computation]
                        │
                  Feature Vector (132 dims)
                        │
               ┌────────┴────────┐
               │   WebSocket     │
               ▼                 │
        [FastAPI Server]         │
               │                 │
    ┌──────────┼──────────┐      │
    ▼          ▼          ▼      │
 CNN-LSTM   FitScore   Injury    │
 Classifier  Engine    Risk      │
    │          │       Engine     │
    ▼          ▼          ▼      │
 Exercise   Score      Risk      │
 Label     (0-100)     Tier      │
    │          │          │      │
    └──────────┼──────────┘      │
               ▼                 │
        [LLM Coaching]           │
               │                 │
               ▼                 │
    ┌──────────┴──────────┐      │
    │  JSON Response      │      │
    │  (score, feedback,  │◄─────┘
    │   risk, coaching)   │  WebSocket push
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │  PostgreSQL          │
    │  (persist session)   │
    └─────────────────────┘
```

---

## 4. Deployment Architecture

### 4.1 Development Environment

| Component | Tool |
|---|---|
| Frontend Dev Server | Vite (`npm run dev` on port 5173) |
| Backend Dev Server | Uvicorn (`uvicorn main:app --reload` on port 8000) |
| Database | Local PostgreSQL instance (Docker recommended) |
| Task Queue | Redis (Docker) + Celery worker |

### 4.2 Production Environment (Recommended)

```
┌───────────────────────────────────────────────────────┐
│                    NGINX Reverse Proxy                 │
│         (SSL termination, static file serving)        │
│                port 443 (HTTPS)                       │
└──────────┬────────────────────┬───────────────────────┘
           │                    │
    /api/* → port 8000   /* → port 5173 (or static build)
           │                    │
    ┌──────┴──────┐    ┌───────┴────────┐
    │  FastAPI     │    │  React (Vite   │
    │  (Uvicorn    │    │   static build)│
    │   + Gunicorn)│    └────────────────┘
    └──────┬──────┘
           │
    ┌──────┴──────┐    ┌──────────────┐
    │ PostgreSQL  │    │ Redis +      │
    │   16        │    │ Celery Worker│
    └─────────────┘    └──────────────┘
```

### 4.3 Scalability Considerations

| Concern | Strategy |
|---|---|
| **Concurrent WebSocket connections** | Horizontal scaling with multiple Uvicorn workers behind NGINX |
| **ML Inference load** | Model served via TensorFlow Serving or batched inference; GPU optional |
| **Report generation** | Offloaded to Celery workers (async PDF generation) |
| **Database scaling** | Connection pooling via asyncpg; read replicas for analytics queries |
| **CDN for static assets** | Vite production build served via CDN or NGINX |

---

## 5. Security Architecture

| Layer | Mechanism |
|---|---|
| **Transport** | TLS 1.3 (HTTPS) for all client–server communication |
| **Authentication** | JWT (access token: 15 min, refresh token: 7 days); bcrypt password hashing |
| **Authorisation** | Role-based: `user`, `admin`; middleware guards on FastAPI routes |
| **Input Validation** | Pydantic v2 models on all API endpoints |
| **CORS** | Strict origin whitelist |
| **Data Privacy** | No raw video transmitted to server; only derived feature vectors |
| **Rate Limiting** | Token-bucket rate limiter on auth endpoints (10 req/min) |
| **SQL Injection** | Parameterised queries via SQLAlchemy ORM |
| **XSS** | React's built-in escaping + Content-Security-Policy headers |

---

## 6. Technology Stack Summary

| Layer | Technology | Version |
|---|---|---|
| **Frontend Framework** | React | 19.x |
| **Build Tool** | Vite | 6.x |
| **Pose Estimation (Client)** | MediaPipe Tasks Vision | Latest |
| **State Management** | Zustand | 5.x |
| **Server-State** | React Query (TanStack Query) | 5.x |
| **Charts** | Recharts | 2.x |
| **Backend Framework** | FastAPI | 0.115+ |
| **ASGI Server** | Uvicorn | Latest |
| **Deep Learning** | TensorFlow / Keras | 2.x |
| **Pose Estimation (Server)** | MediaPipe Python | Latest |
| **LLM Integration** | LangChain + GPT-4o API | Latest |
| **PDF Generation** | ReportLab | Latest |
| **ORM** | SQLAlchemy | 2.x |
| **Database** | PostgreSQL | 16 |
| **Migrations** | Alembic | Latest |
| **Task Queue** | Celery + Redis | 5.x |
| **Language** | Python | 3.11+ |
| **Dev Environment** | VS Code | Latest |

---

## 7. Module Interaction Matrix

| Module | Depends On | Produces |
|---|---|---|
| Webcam Capture (FE) | Browser `getUserMedia` | Raw video frames |
| MediaPipe BlazePose (FE) | Raw video frames | 33 × 3D keypoints |
| Normalisation (FE) | 3D keypoints | Normalised angle vectors (132 features) |
| WebSocket Transport | Feature vectors | Streaming data to backend |
| CNN-LSTM Classifier (BE) | 30-frame feature windows | Exercise label + confidence |
| FitScore Engine (BE) | Angle vectors, rep timing | FitScore (0–100) + sub-scores |
| FSM Rep Counter (BE) | Joint angle time series | Rep count + phase state |
| Injury Risk Engine (BE) | FitScore + angle deviations | Risk tier + flagged joints |
| LLM Coach (BE) | FitScore, risk tier, history | Coaching text + weekly plans |
| Analytics/Reports (BE) | Session history, trends | PDF reports + dashboard JSON |
| PostgreSQL (Data) | All backend modules | Persistent storage |

---

## 8. Non-Functional Architecture Targets

| Attribute | Target |
|---|---|
| **Latency (pose → feedback)** | < 100 ms end-to-end |
| **Frame Rate** | 30 FPS sustained |
| **Classification Accuracy** | ≥ 93% F1-score |
| **Concurrent Users** | 100+ simultaneous sessions |
| **Page Load Time** | < 2 seconds (LCP) |
| **Report Generation** | < 5 seconds per PDF |
| **Availability** | 99.5% uptime |
| **Browser Support** | Chrome, Firefox, Edge (latest 2 versions) |

---

*This architecture document provides the technical blueprint for the FitScore AI system. For implementation phasing, see `phases.md`. For detailed feature specifications, see `spec.md`.*
