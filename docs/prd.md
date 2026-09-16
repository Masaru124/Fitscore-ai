# FitScore AI — Product Requirements Document (PRD)

> **Version:** 1.0  
> **Date:** September 2025  
> **Product:** FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Estimation and Deep-Learning  
> **Authors:** Preethi R, Ramyashri Ravikumar, Vaishnavi G N, Vaishnavi S  
> **Stakeholders:** Prof. Yashaswini C D (Guide), Dept. of CSE(DS), AMC Engineering College  
> **Status:** Draft — Awaiting Review

---

## 1. Product Vision

**FitScore AI** transforms any standard webcam into an intelligent fitness coach that provides real-time, medical-grade biomechanical analysis of exercise form — replacing the binary "correct/incorrect" feedback of existing systems with a comprehensive 0–100 quality score, injury risk stratification, and AI-powered personalised coaching.

### 1.1 Problem Statement

> Existing fitness and rehabilitation systems fail to provide accurate, detailed biomechanical analysis in real time using affordable and accessible technologies. Most systems rely on wearable sensors, manual supervision, or expensive motion-capture laboratories. Many fitness applications provide only simple "correct/incorrect" feedback without explaining movement errors or quantifying injury risks. Users continue performing exercises incorrectly, leading to muscle strain, joint pain, and ineffective rehabilitation outcomes.

### 1.2 Solution Summary

A browser-based platform that uses **MediaPipe BlazePose** for edge-side 3D pose extraction and a **CNN-LSTM deep learning model** for exercise classification and quality assessment. The platform introduces the **FitScore metric** (0–100) — a multi-dimensional composite score evaluating joint alignment, range of motion, symmetry, stability, and tempo — accompanied by real-time injury risk detection, adaptive AI coaching, and medical-grade analytical reports.

### 1.3 Target Users

| Persona | Description | Primary Need |
|---|---|---|
| **Home Fitness Enthusiast** | Exercises at home without a trainer; age 18–45 | Accurate form feedback to avoid injury |
| **Physiotherapy Patient** | Recovering from injury; prescribed rehabilitation exercises | Quantitative progress tracking; safety monitoring |
| **Fitness Trainer / Physiotherapist** | Supervises multiple clients remotely | Analytical reports; patient monitoring dashboard |
| **Elderly Wellness User** | Performs low-impact exercises; mobility-limited | Gentle guidance; fall-risk awareness |

---

## 2. Product Goals & Success Metrics

### 2.1 Goals

| # | Goal | Priority |
|---|---|---|
| G1 | Provide real-time biomechanical exercise quality scoring via standard webcam | P0 — Critical |
| G2 | Detect and alert users of injury-prone movement patterns | P0 — Critical |
| G3 | Generate personalised corrective feedback and adaptive coaching | P1 — High |
| G4 | Support longitudinal performance tracking and analytical reporting | P1 — High |
| G5 | Ensure accessibility (browser-based, no special hardware) | P0 — Critical |
| G6 | Enable tele-rehabilitation monitoring and medical-grade reporting | P2 — Medium |

### 2.2 Key Performance Indicators (KPIs)

| KPI | Target | Measurement Method |
|---|---|---|
| **Classification Accuracy** | ≥ 93% F1-score | Holdout test set evaluation |
| **Inference Latency** | < 100 ms pose-to-feedback | End-to-end timing instrumentation |
| **Frame Rate** | 30 FPS sustained | Browser performance monitoring |
| **FitScore Reliability** | < 5% deviation vs. expert manual scoring | Correlation study with physiotherapists |
| **Injury Detection Precision** | ≥ 85% true positive rate | Expert-labelled test scenarios |
| **User Session Completion Rate** | ≥ 80% | Analytics (sessions completed / started) |
| **Report Generation Time** | < 5 seconds per PDF | Server-side timing |
| **Page Load Time (LCP)** | < 2 seconds | Lighthouse audit |

---

## 3. User Stories & Requirements

### 3.1 Epic 1: User Onboarding & Authentication

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-001 | As a user, I want to register with email and password so I can create my account | P0 | Email validation, password strength check, duplicate detection |
| US-002 | As a user, I want to log in securely so I can access my data | P0 | JWT auth, session persistence, logout capability |
| US-003 | As a user, I want to set up my body metrics (height, weight, age) so scoring is personalised | P1 | Profile form with validation; metrics stored |
| US-004 | As a new user, I want a camera setup guide so I know how to position myself | P1 | Distance, lighting, and framing checks with visual feedback |

### 3.2 Epic 2: Real-Time Exercise Session

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-010 | As a user, I want to select an exercise type before starting so the system knows what to evaluate | P0 | Exercise picker with 4+ options (squat, lunge, push-up, bicep curl) |
| US-011 | As a user, I want to see my skeleton overlay on the video feed so I know tracking is working | P0 | 33 keypoints rendered; connections drawn; updates at 30 FPS |
| US-012 | As a user, I want to see my FitScore in real time so I can adjust my form | P0 | Animated gauge updating per rep/inference cycle |
| US-013 | As a user, I want to see my rep count so I can track my workout | P0 | Counter increments only on valid reps (FSM validated) |
| US-014 | As a user, I want colour-coded feedback on my joints (green/amber/red) so I know which body parts need correction | P0 | Joint colours update in real time |
| US-015 | As a user, I want to be warned if I'm at risk of injury so I can correct my form | P0 | Alert banner with risk tier and affected joint |
| US-016 | As a user, I want a "tracking lost" message if I go out of frame so I can reposition | P1 | Overlay message when confidence drops below threshold |

### 3.3 Epic 3: Post-Session Review & Coaching

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-020 | As a user, I want a session summary after finishing so I can review my performance | P0 | Summary with overall score, rep count, duration, sub-scores |
| US-021 | As a user, I want a breakdown of my sub-scores (alignment, ROM, symmetry, stability, tempo) | P1 | Radar chart or table showing 5 sub-dimensions |
| US-022 | As a user, I want personalised AI coaching feedback so I know exactly what to improve | P1 | LLM-generated text with specific corrective suggestions |
| US-023 | As a user, I want an adaptive weekly plan generated by AI so I can improve progressively | P2 | Plan with exercises, sets, and focus areas based on history |
| US-024 | As a user, I want to see a risk log of any injury alerts from my session | P1 | Chronological list of risk events with timestamps |

### 3.4 Epic 4: Dashboard & Analytics

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-030 | As a user, I want to see my FitScore trend over time so I can track improvement | P1 | Line chart with selectable period (7d / 30d / 90d) |
| US-031 | As a user, I want a muscle activation heatmap so I can see which muscle groups I'm working | P2 | Body silhouette with colour-coded activation intensity |
| US-032 | As a user, I want to see my recent sessions with key metrics | P1 | List of last 10 sessions with scores, reps, dates |
| US-033 | As a user, I want an injury risk timeline so I can see patterns in risky movements | P2 | Timeline chart of risk events across sessions |
| US-034 | As a user, I want to see my overall stats (total sessions, avg score, improvement %) | P1 | Summary cards on dashboard |

### 3.5 Epic 5: Reports

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-040 | As a user, I want to generate a PDF report of my performance so I can share with my trainer/doctor | P1 | Downloadable PDF with scores, charts, recommendations |
| US-041 | As a user, I want the report to include FitScore trends and muscle heatmaps | P2 | Visual charts embedded in PDF |
| US-042 | As a user, I want to select a date range for the report | P1 | Date range picker in report generation form |
| US-043 | As a user, I want to see a list of my generated reports | P1 | Report history with download links |

### 3.6 Epic 6: Profile & Settings

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-050 | As a user, I want to update my body metrics so scoring stays accurate | P1 | Editable profile form |
| US-051 | As a user, I want to set my fitness goals (general fitness, rehabilitation, strength) | P2 | Goal selector influencing coaching recommendations |
| US-052 | As a user, I want to toggle dark/light mode | P2 | Theme toggle in settings |

---

## 4. Functional Requirements

### 4.1 Core Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| FR-001 | **Real-Time Video Capture** | Capture webcam video at 30 FPS via browser `getUserMedia` API |
| FR-002 | **Pose Estimation** | Extract 33 × 3D body landmarks using MediaPipe BlazePose in the browser |
| FR-003 | **Coordinate Normalisation** | Hip-centre normalisation for body-type invariance |
| FR-004 | **Joint Angle Computation** | `atan2`-based angle extraction for clinically relevant joints (knee, hip, shoulder, elbow) |
| FR-005 | **Exercise Classification** | CNN-LSTM model classifies exercises from 19 categories with ≥93% accuracy |
| FR-006 | **FitScore Generation** | Weighted composite score (0–100) across 5 biomechanical dimensions |
| FR-007 | **Repetition Counting** | FSM-based counter with geometric heuristic validation |
| FR-008 | **Injury Risk Detection** | Rule-based + ML hybrid engine detecting knee valgus, pelvic tilt, shoulder impingement |
| FR-009 | **Real-Time Feedback** | WebSocket-based feedback loop delivering scores, alerts, and joint colours |
| FR-010 | **AI Coaching** | LLM-powered personalised corrective feedback and adaptive weekly plans |
| FR-011 | **Analytical Reports** | Medical-grade PDF reports with charts, heatmaps, and recommendations |
| FR-012 | **Session History** | Paginated session list with per-rep drill-down capability |
| FR-013 | **Dashboard Analytics** | FitScore trends, muscle heatmaps, risk timeline, summary statistics |
| FR-014 | **User Authentication** | JWT-based auth with registration, login, token refresh, and logout |
| FR-015 | **Profile Management** | CRUD for body metrics, fitness goals, and preferences |

### 4.2 Supported Exercises (Initial Release)

| # | Exercise | Primary Joints Evaluated | Key Injury Risks |
|---|---|---|---|
| 1 | Squat | Knee, hip, ankle | Knee valgus, anterior pelvic tilt, heel lift |
| 2 | Lunge (Left/Right) | Knee, hip | Knee overshoot, trunk lean, balance loss |
| 3 | Push-up | Shoulder, elbow, spine | Shoulder impingement, spinal sag, neck strain |
| 4 | Bicep Curl (Left/Right) | Elbow, shoulder | Elbow flare, shoulder swing, incomplete ROM |
| 5–19 | Extended exercise set | Various | Pending per-exercise risk profiles |

---

## 5. Non-Functional Requirements

| ID | Category | Requirement | Target |
|---|---|---|---|
| NFR-001 | **Performance** | Pose-to-feedback latency | < 100 ms |
| NFR-002 | **Performance** | Sustained frame rate | 30 FPS |
| NFR-003 | **Accuracy** | Exercise classification F1-score | ≥ 0.926 |
| NFR-004 | **Accuracy** | FitScore correlation with expert assessment | ≥ 0.85 Pearson r |
| NFR-005 | **Scalability** | Concurrent WebSocket sessions | 100+ simultaneous |
| NFR-006 | **Availability** | System uptime | 99.5% |
| NFR-007 | **Security** | Transport encryption | TLS 1.3 (HTTPS) |
| NFR-008 | **Security** | Password storage | bcrypt (cost=12) |
| NFR-009 | **Security** | No raw video transmission | Feature vectors only |
| NFR-010 | **Usability** | Page load time (LCP) | < 2 seconds |
| NFR-011 | **Usability** | Responsive design | Desktop + Tablet |
| NFR-012 | **Accessibility** | WCAG compliance | Level AA |
| NFR-013 | **Reliability** | Graceful LLM degradation | Rule-based fallback on API failure |
| NFR-014 | **Portability** | Browser support | Chrome, Firefox, Edge (latest 2 versions) |

---

## 6. Technical Constraints & Dependencies

### 6.1 Constraints

| Constraint | Description |
|---|---|
| **Browser-only deployment** | Must work in modern browsers without native app installation |
| **Standard webcam** | 720p minimum; no depth sensor or special hardware required |
| **Lighting sensitivity** | Requires adequate lighting for reliable pose estimation |
| **Single-user per camera** | System tracks one person at a time |
| **Internet connectivity** | Required for backend API, LLM coaching, and report storage |

### 6.2 External Dependencies

| Dependency | Purpose | Risk Level |
|---|---|---|
| MediaPipe BlazePose | Client-side pose estimation | Low (well-maintained, Google-backed) |
| TensorFlow / Keras | CNN-LSTM model inference | Low (mature framework) |
| GPT-4o API (OpenAI) | LLM coaching assistant | Medium (cost, rate limits, availability) |
| PostgreSQL | Data persistence | Low (industry standard) |
| LangChain | LLM orchestration | Low (widely adopted) |
| ReportLab | PDF report generation | Low (stable library) |

---

## 7. Hardware & Software Requirements

### 7.1 Hardware Requirements (User-Side)

| Component | Minimum | Recommended |
|---|---|---|
| Processor | Intel Core i5 / AMD Ryzen 5 | Intel Core i7 / AMD Ryzen 7 |
| RAM | 8 GB | 16 GB |
| Storage | 20 GB SSD | 50 GB SSD |
| Webcam | 720p HD | 1080p HD |
| GPU | Integrated graphics | Dedicated GPU (WebGL acceleration) |
| Internet | 5 Mbps | 10+ Mbps |

### 7.2 Software Requirements (Development)

| Component | Technology | Version |
|---|---|---|
| OS | Windows 10/11, Linux, macOS | Latest |
| Frontend | React + Vite | 19.x / 6.x |
| Backend | FastAPI (Python) | 0.115+ / 3.11+ |
| Deep Learning | TensorFlow / Keras | 2.x |
| Pose Estimation | MediaPipe | Latest |
| Database | PostgreSQL | 16 |
| IDE | VS Code | Latest |

---

## 8. Out of Scope (v1.0)

The following features are explicitly **not** included in the initial release:

| Feature | Reason | Target Version |
|---|---|---|
| Mobile native app (iOS/Android) | Focus on browser-based MVP | v2.0 |
| Multi-person tracking | Complexity; single-user use case first | v2.0 |
| Voice-guided coaching (TTS) | Additional integration; text feedback sufficient for v1 | v1.5 |
| Wearable sensor integration | Contradicts "webcam-only" accessibility goal | v3.0 |
| Admin dashboard for trainers/physiotherapists | Requires role-based multi-tenant architecture | v2.0 |
| Offline mode | Requires service workers and local DB; backend-dependent features | v2.0 |
| Dietary tracking integration | Secondary to core exercise analysis | v1.5 |
| Video recording and playback | Storage and privacy concerns | v2.0 |

---

## 9. Release Criteria

The product is ready for release when ALL of the following criteria are met:

| # | Criterion | Verification |
|---|---|---|
| 1 | CNN-LSTM accuracy ≥ 93% on holdout set | Model evaluation report |
| 2 | All P0 user stories implemented and tested | Test report |
| 3 | End-to-end latency < 100 ms (95th percentile) | Performance benchmark |
| 4 | 30 FPS sustained on reference hardware | Browser performance test |
| 5 | All P0/P1 API endpoints returning correct responses | Integration test suite (all green) |
| 6 | Zero critical/high severity security vulnerabilities | Security audit report |
| 7 | WCAG AA compliance on all primary views | Accessibility audit |
| 8 | PDF reports generating correctly with accurate data | Manual verification |
| 9 | 80%+ unit test coverage (backend) | Coverage report |
| 10 | Cross-browser testing passed (Chrome, Firefox, Edge) | Browser compatibility report |

---

## 10. Glossary

| Term | Definition |
|---|---|
| **FitScore** | Composite exercise quality metric (0–100) based on 5 biomechanical dimensions |
| **BlazePose** | MediaPipe's pose estimation model extracting 33 3D body landmarks |
| **CNN-LSTM** | Hybrid deep learning architecture: Convolutional Neural Network + Long Short-Term Memory |
| **FSM** | Finite State Machine used for repetition counting |
| **ROM** | Range of Motion — the angular range through which a joint moves during an exercise |
| **Knee Valgus** | Inward collapse of the knee during exercises, associated with ACL injury risk |
| **Anterior Pelvic Tilt** | Excessive forward tilting of the pelvis, causing lower back strain |
| **Compensation Pattern** | Abnormal movement substitution to avoid pain or weakness |
| **Tele-rehabilitation** | Remote physiotherapy and rehabilitation monitoring via digital platforms |

---

*This PRD defines the complete product requirements for FitScore AI v1.0. For technical architecture, see `architecture.md`. For system design details, see `design.md`. For implementation timeline, see `phases.md`.*
