# FitScore AI — System Design Document

> **Version:** 1.0  
> **Date:** September 2025  
> **Project:** FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Estimation and Deep-Learning  
> **Authors:** Preethi R, Ramyashri Ravikumar, Vaishnavi G N, Vaishnavi S

---

## 1. Design Philosophy

The FitScore AI system design follows these guiding principles:

1. **Edge-first processing** — Pose estimation runs in the browser; only derived features travel to the server.
2. **Modularity** — Each analytical capability (classification, scoring, risk detection, coaching) is a self-contained module with clean interfaces.
3. **Privacy by design** — Raw video never leaves the user's device.
4. **Progressive disclosure** — The UI reveals complexity gradually: simple score first, detailed breakdown on demand.

---

## 2. Component Architecture Diagram

```
┌─────────────────────────── BROWSER ───────────────────────────┐
│                                                                │
│  ┌──────────────┐   ┌─────────────┐   ┌──────────────────┐   │
│  │  Webcam       │──▶│  MediaPipe   │──▶│  Feature         │   │
│  │  Capture      │   │  BlazePose   │   │  Extractor       │   │
│  │  Component    │   │  (WASM)      │   │  (Normalise +    │   │
│  └──────────────┘   └─────────────┘   │   Angle Compute) │   │
│                                        └────────┬─────────┘   │
│                                                 │              │
│  ┌──────────────────────────────────────────────┼────────┐    │
│  │              React Application               │        │    │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────▼──────┐ │    │
│  │  │ Dashboard   │  │ Session    │  │ Real-time       │ │    │
│  │  │ View        │  │ History    │  │ Feedback View   │ │    │
│  │  └────────────┘  └────────────┘  └────────┬────────┘ │    │
│  │                                           │          │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────▼────────┐ │    │
│  │  │ Report     │  │ Profile    │  │ Skeletal        │ │    │
│  │  │ Viewer     │  │ Settings   │  │ Overlay Canvas  │ │    │
│  │  └────────────┘  └────────────┘  └─────────────────┘ │    │
│  └──────────────────────────────────────────────────────┘    │
└────────────────────────────┬──────────────────────────────────┘
                             │ WebSocket + REST API
                             ▼
┌─────────────────────── FASTAPI SERVER ────────────────────────┐
│                                                                │
│  ┌────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │ Auth Module    │  │ Session Manager │  │ WebSocket      │  │
│  │ (JWT + RBAC)   │  │ (Create/Track)  │  │ Handler        │  │
│  └────────────────┘  └─────────────────┘  └──────┬─────────┘  │
│                                                   │            │
│  ┌────────────────────────────────────────────────▼──────────┐ │
│  │              AI Processing Pipeline                       │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │ │
│  │  │ CNN-LSTM │  │ FitScore │  │ FSM Rep  │  │ Injury   │ │ │
│  │  │Classifier│  │ Engine   │  │ Counter  │  │ Risk     │ │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │ LLM Coaching   │  │ Analytics &     │  │ Report         │  │
│  │ Assistant      │  │ Aggregation     │  │ Generator      │  │
│  └────────────────┘  └─────────────────┘  └────────────────┘  │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  PostgreSQL 16  │
                    └─────────────────┘
```

---

## 3. Use-Case Design

### 3.1 Use-Case Diagram (Textual)

**Primary Actor:** User  
**Secondary Actor:** Admin, LLM API (GPT-4o)

| # | Use Case | Actor | Description |
|---|---|---|---|
| UC-01 | Register / Login | User | Create account or authenticate with email/password |
| UC-02 | Setup Camera | User | Calibrate webcam position, lighting, and distance check |
| UC-03 | Start Exercise Session | User | Begin live exercise monitoring with webcam |
| UC-04 | View Real-time FitScore | User | See live FitScore gauge, rep count, and colour-coded joint feedback |
| UC-05 | Receive Injury Alerts | User | Get real-time warnings for risky movement patterns |
| UC-06 | End Session & Review | User | Stop session; view summary with scores, reps, and risk log |
| UC-07 | Get AI Coaching | User | Request personalised corrective feedback and rehabilitation plans |
| UC-08 | View Dashboard | User | See FitScore trends, muscle heatmaps, session history |
| UC-09 | Download Report | User | Generate and download PDF medical-grade report |
| UC-10 | Manage Profile | User | Update body metrics, dietary preferences, goals |
| UC-11 | Admin — View All Users | Admin | Access aggregated analytics across all users |
| UC-12 | Admin — Manage Exercises | Admin | Add/edit exercise templates and ideal angle configurations |

### 3.2 Use-Case Relationships

```
                                ┌──────────┐
                          ┌────▶│ UC-02    │
                          │     │ Setup Cam│
                          │     └──────────┘
┌──────┐   ┌──────────┐  │     ┌──────────┐     ┌──────────┐
│ User │──▶│ UC-01    │──┼────▶│ UC-03    │────▶│ UC-04    │
└──────┘   │ Register/│  │     │ Start    │     │ View     │
           │ Login    │  │     │ Session  │     │ FitScore │
           └──────────┘  │     └────┬─────┘     └──────────┘
                          │          │           ┌──────────┐
                          │          ├──────────▶│ UC-05    │
                          │          │           │ Injury   │
                          │          │           │ Alerts   │
                          │          │           └──────────┘
                          │          ▼
                          │     ┌──────────┐     ┌──────────┐
                          │     │ UC-06    │────▶│ UC-07    │
                          │     │ End &    │     │ AI Coach │
                          │     │ Review   │     └──────────┘
                          │     └────┬─────┘
                          │          │
                          │     ┌────▼─────┐     ┌──────────┐
                          └────▶│ UC-08    │────▶│ UC-09    │
                                │ Dashboard│     │ Download │
                                └──────────┘     │ Report   │
                                                 └──────────┘
```

---

## 4. Sequence Design

### 4.1 Exercise Session Flow (Main Scenario)

```
  User          Browser/React      FastAPI         CNN-LSTM      FitScore     Injury      PostgreSQL
   │                │                 │               │           Engine      Risk Engine     │
   │  Click Start   │                 │               │             │            │            │
   │───────────────▶│                 │               │             │            │            │
   │                │ Activate Webcam │               │             │            │            │
   │                │─────────────────│               │             │            │            │
   │                │                 │               │             │            │            │
   │                │ MediaPipe Extract 33 Keypoints  │             │            │            │
   │                │◀────────────────│               │             │            │            │
   │                │                 │               │             │            │            │
   │                │ Normalise + Compute Angles      │             │            │            │
   │                │                 │               │             │            │            │
   │                │ Send Feature Vector (WS)        │             │            │            │
   │                │────────────────▶│               │             │            │            │
   │                │                 │ Build 30-frame│             │            │            │
   │                │                 │ window        │             │            │            │
   │                │                 │──────────────▶│             │            │            │
   │                │                 │               │             │            │            │
   │                │                 │ Exercise Label│             │            │            │
   │                │                 │◀──────────────│             │            │            │
   │                │                 │                             │            │            │
   │                │                 │ Compute FitScore            │            │            │
   │                │                 │────────────────────────────▶│            │            │
   │                │                 │                             │            │            │
   │                │                 │ Score (0-100) + Sub-scores  │            │            │
   │                │                 │◀────────────────────────────│            │            │
   │                │                 │                                          │            │
   │                │                 │ Analyse Injury Risk                      │            │
   │                │                 │─────────────────────────────────────────▶│            │
   │                │                 │                                          │            │
   │                │                 │ Risk Tier + Flagged Joints               │            │
   │                │                 │◀─────────────────────────────────────────│            │
   │                │                 │                                                       │
   │                │ WS Response     │                                                       │
   │                │ (score, label,  │                                                       │
   │                │  risk, feedback)│                                                       │
   │                │◀────────────────│                                                       │
   │                │                 │                                                       │
   │  See Real-time │                 │ Persist Session Data                                  │
   │  Feedback      │                 │──────────────────────────────────────────────────────▶│
   │◀───────────────│                 │                                                       │
   │                │                 │                                                       │
```

### 4.2 Report Generation Flow

```
  User         React          FastAPI        Celery Worker     ReportLab      PostgreSQL
   │              │               │               │               │              │
   │ Click Report │               │               │               │              │
   │─────────────▶│               │               │               │              │
   │              │ POST /reports │               │               │              │
   │              │──────────────▶│               │               │              │
   │              │               │ Enqueue task  │               │              │
   │              │               │──────────────▶│               │              │
   │              │               │               │ Fetch data    │              │
   │              │ 202 Accepted  │               │──────────────────────────────▶│
   │              │◀──────────────│               │               │              │
   │              │               │               │ Data          │              │
   │              │               │               │◀──────────────────────────────│
   │              │               │               │               │              │
   │              │               │               │ Generate PDF  │              │
   │              │               │               │──────────────▶│              │
   │              │               │               │               │              │
   │              │               │               │ PDF file path │              │
   │              │               │               │◀──────────────│              │
   │              │               │               │               │              │
   │              │               │               │ Save record   │              │
   │              │               │               │──────────────────────────────▶│
   │              │               │               │               │              │
   │              │ WS Notify: ready              │               │              │
   │              │◀──────────────────────────────│               │              │
   │ Download PDF │               │               │               │              │
   │◀─────────────│               │               │               │              │
```

---

## 5. Class Design

### 5.1 Backend Domain Models

```
┌────────────────────────┐
│        User            │
│────────────────────────│
│ - id: UUID             │
│ - email: str           │
│ - password_hash: str   │
│ - full_name: str       │
│ - height_cm: float     │
│ - weight_kg: float     │
│ - age: int             │
│ - role: UserRole       │
│ - created_at: datetime │
│────────────────────────│
│ + verify_password()    │
│ + update_profile()     │
└────────┬───────────────┘
         │ 1:N
         ▼
┌────────────────────────┐
│   ExerciseSession      │
│────────────────────────│
│ - id: UUID             │
│ - user_id: FK          │
│ - exercise_type: str   │
│ - started_at: datetime │
│ - ended_at: datetime   │
│ - overall_fit_score: f │
│ - total_reps: int      │
│ - avg_risk_tier: str   │
│────────────────────────│
│ + start()              │
│ + end()                │
│ + compute_summary()    │
└────────┬───────────────┘
         │ 1:N
         ▼
┌────────────────────────┐
│     Repetition         │
│────────────────────────│
│ - id: UUID             │
│ - session_id: FK       │
│ - rep_number: int      │
│ - fit_score: float     │
│ - alignment_score: f   │
│ - rom_score: float     │
│ - symmetry_score: f    │
│ - stability_score: f   │
│ - tempo_score: float   │
│ - risk_tier: str       │
│ - flagged_joints: json │
│ - landmark_snapshot: j │
│────────────────────────│
│ + compute_sub_scores() │
│ + detect_risk()        │
└────────────────────────┘

┌────────────────────────┐     ┌────────────────────────┐
│   InjuryRecord         │     │   CoachingLog          │
│────────────────────────│     │────────────────────────│
│ - id: UUID             │     │ - id: UUID             │
│ - session_id: FK       │     │ - session_id: FK       │
│ - risk_tier: str       │     │ - prompt_context: json │
│ - flagged_joint: str   │     │ - llm_response: text   │
│ - deviation_angle: f   │     │ - created_at: datetime │
│ - recommendation: str  │     └────────────────────────┘
│ - timestamp: datetime  │
└────────────────────────┘

┌────────────────────────┐
│   Report               │
│────────────────────────│
│ - id: UUID             │
│ - user_id: FK          │
│ - report_type: str     │
│ - file_path: str       │
│ - generated_at: dt     │
│────────────────────────│
│ + generate_pdf()       │
└────────────────────────┘
```

### 5.2 AI Pipeline Classes

```
┌────────────────────────────┐
│   PoseProcessor            │
│────────────────────────────│
│ - kalman_filter: Filter    │
│ - window_size: int = 30    │
│ - stride: int = 5          │
│────────────────────────────│
│ + normalise(landmarks)     │
│ + compute_angles(kpts)     │
│ + build_window(frames)     │
│ + smooth(coordinates)      │
└────────┬───────────────────┘
         │ uses
         ▼
┌────────────────────────────┐
│   ExerciseClassifier       │
│────────────────────────────│
│ - model: tf.keras.Model   │
│ - labels: List[str]       │
│ - confidence_threshold: f │
│────────────────────────────│
│ + predict(window) → label │
│ + load_model(path)        │
└────────────────────────────┘

┌────────────────────────────┐
│   FitScoreCalculator       │
│────────────────────────────│
│ - weights: Dict[str, f]   │
│ - ideal_templates: Dict   │
│────────────────────────────│
│ + compute(angles, timing)  │
│ + get_sub_scores()         │
│ + get_composite_score()    │
└────────────────────────────┘

┌────────────────────────────┐
│   RepetitionCounter        │
│────────────────────────────│
│ - state: FSMState          │
│ - count: int               │
│ - angle_thresholds: Dict   │
│────────────────────────────│
│ + update(angles)           │
│ + get_count() → int        │
│ + get_phase() → str        │
│ + reset()                  │
└────────────────────────────┘

┌────────────────────────────┐
│   InjuryRiskAnalyser       │
│────────────────────────────│
│ - rule_thresholds: Dict    │
│ - ml_detector: Model       │
│ - alert_persistence: int   │
│────────────────────────────│
│ + analyse(angles, scores)  │
│ + get_risk_tier() → str    │
│ + get_flagged_joints()     │
└────────────────────────────┘

┌────────────────────────────┐
│   CoachingAssistant        │
│────────────────────────────│
│ - llm_chain: LangChain    │
│ - system_prompt: str       │
│────────────────────────────│
│ + generate_feedback(ctx)   │
│ + generate_plan(history)   │
└────────────────────────────┘
```

---

## 6. API Design

### 6.1 REST API Endpoints

#### Authentication

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | `{ email, password, full_name }` | `{ user_id, token }` | Create new user account |
| `POST` | `/api/auth/login` | `{ email, password }` | `{ access_token, refresh_token }` | Authenticate user |
| `POST` | `/api/auth/refresh` | `{ refresh_token }` | `{ access_token }` | Refresh access token |
| `POST` | `/api/auth/logout` | — | `204 No Content` | Invalidate tokens |

#### User Profile

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| `GET` | `/api/users/me` | — | `UserProfile` | Get current user profile |
| `PUT` | `/api/users/me` | `{ height_cm, weight_kg, age, goals }` | `UserProfile` | Update profile |

#### Exercise Sessions

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| `POST` | `/api/sessions` | `{ exercise_type }` | `{ session_id }` | Start new session |
| `PUT` | `/api/sessions/{id}/end` | — | `SessionSummary` | End session and get summary |
| `GET` | `/api/sessions` | Query: `?page=1&limit=20` | `List[SessionSummary]` | List user sessions |
| `GET` | `/api/sessions/{id}` | — | `SessionDetail` | Get session with all reps |

#### Dashboard & Analytics

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| `GET` | `/api/analytics/fitscore-trend` | Query: `?period=30d` | `List[DateScore]` | FitScore trend data |
| `GET` | `/api/analytics/muscle-heatmap` | Query: `?period=30d` | `HeatmapData` | Muscle activation distribution |
| `GET` | `/api/analytics/summary` | — | `DashboardSummary` | Overall stats |

#### Reports

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| `POST` | `/api/reports` | `{ report_type, date_range }` | `{ report_id, status }` | Generate report (async) |
| `GET` | `/api/reports/{id}` | — | `ReportMeta` | Get report status |
| `GET` | `/api/reports/{id}/download` | — | PDF file | Download generated report |

#### AI Coaching

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| `POST` | `/api/coaching/feedback` | `{ session_id }` | `{ feedback_text }` | Get post-session coaching |
| `POST` | `/api/coaching/plan` | `{ goals, history_days }` | `{ weekly_plan }` | Generate adaptive plan |

### 6.2 WebSocket API

**Endpoint:** `ws://host/api/ws/session/{session_id}`

#### Client → Server Messages

```json
{
  "type": "frame_data",
  "timestamp": 1695000000.123,
  "landmarks": {
    "keypoints": [[x, y, z, visibility], ...],  // 33 keypoints
    "angles": {
      "left_knee": 95.2,
      "right_knee": 93.8,
      "left_hip": 78.4,
      ...
    }
  }
}
```

#### Server → Client Messages

```json
{
  "type": "feedback",
  "exercise_label": "squat",
  "confidence": 0.96,
  "rep_count": 5,
  "rep_phase": "complete",
  "fit_score": 82.5,
  "sub_scores": {
    "alignment": 85.0,
    "rom": 78.0,
    "symmetry": 88.0,
    "stability": 80.0,
    "tempo": 82.0
  },
  "risk": {
    "tier": "low",
    "flagged_joints": [],
    "message": null
  },
  "joint_feedback": {
    "left_knee": "green",
    "right_knee": "green",
    "spine": "amber"
  }
}
```

---

## 7. Data Flow Design

### 7.1 Level-0 DFD (Context Diagram)

```
┌──────────┐                                          ┌──────────────┐
│          │  Webcam Frames / Exercise Commands        │              │
│   User   │─────────────────────────────────────────▶│  FitScore AI │
│          │◀─────────────────────────────────────────│  System      │
│          │  FitScore, Feedback, Alerts, Reports      │              │
└──────────┘                                          └──────┬───────┘
                                                             │
                                                      ┌──────▼───────┐
                                                      │  GPT-4o API  │
                                                      │  (External)  │
                                                      └──────────────┘
```

### 7.2 Level-1 DFD

```
                                 ┌──────────────────┐
  User ──── Webcam Frames ────▶ │ 1.0 Pose         │
                                 │    Extraction     │
                                 └────────┬─────────┘
                                          │ 3D Keypoints
                                          ▼
                                 ┌──────────────────┐
                                 │ 2.0 Normalisation│
                                 │    & Angles       │
                                 └────────┬─────────┘
                                          │ Feature Vectors
                              ┌───────────┼───────────┐
                              ▼           ▼           ▼
                     ┌──────────┐ ┌──────────┐ ┌──────────┐
                     │ 3.0      │ │ 4.0      │ │ 5.0      │
                     │ Exercise │ │ FitScore │ │ Injury   │
                     │ Classify │ │ Compute  │ │ Risk     │
                     └────┬─────┘ └────┬─────┘ └────┬─────┘
                          │           │           │
                          ▼           ▼           ▼
                     ┌────────────────────────────────────┐
                     │ 6.0 Feedback Aggregation           │
                     └──────────┬──────┬─────────────────┘
                                │      │
                    ┌───────────▼──┐   │
                    │ 7.0 LLM     │   │
                    │ Coaching     │   │
                    └──────┬──────┘   │
                           │          │
                    ┌──────▼──────────▼──────────┐
                    │ 8.0 Display & Persist       │
                    └──────────┬─────────────────┘
                               │
                          ┌────▼────┐
                          │  D1     │
                          │ Database│
                          └─────────┘
```

---

## 8. Database Design

### 8.1 Entity-Relationship Diagram

```
┌─────────────┐       ┌──────────────────┐       ┌────────────────┐
│   users     │       │ exercise_sessions│       │  repetitions   │
│─────────────│       │──────────────────│       │────────────────│
│ PK id       │◀──┐   │ PK id            │◀──┐   │ PK id          │
│    email    │   │   │ FK user_id       │   │   │ FK session_id  │
│    pass_hash│   └───│    exercise_type  │   └───│    rep_number  │
│    full_name│       │    started_at     │       │    fit_score   │
│    height   │       │    ended_at       │       │    alignment   │
│    weight   │       │    fit_score_avg  │       │    rom_score   │
│    age      │       │    total_reps     │       │    symmetry    │
│    role     │       │    risk_tier_avg  │       │    stability   │
│    created  │       └──────────────────┘       │    tempo       │
└─────────────┘                                  │    risk_tier   │
                                                  │    flags (JSON)│
       ┌──────────────────┐                       │    landmarks   │
       │  injury_records  │                       └────────────────┘
       │──────────────────│
       │ PK id            │       ┌──────────────────┐
       │ FK session_id    │       │  coaching_logs   │
       │    risk_tier     │       │──────────────────│
       │    joint         │       │ PK id            │
       │    deviation_deg │       │ FK session_id    │
       │    recommendation│       │    prompt_ctx    │
       │    timestamp     │       │    llm_response  │
       └──────────────────┘       │    created_at    │
                                  └──────────────────┘
       ┌──────────────────┐
       │    reports       │
       │──────────────────│
       │ PK id            │
       │ FK user_id       │
       │    report_type   │
       │    file_path     │
       │    generated_at  │
       └──────────────────┘
```

### 8.2 Key Indexes

| Table | Index | Purpose |
|---|---|---|
| `users` | `UNIQUE(email)` | Fast login lookup |
| `exercise_sessions` | `(user_id, started_at DESC)` | Dashboard session list |
| `repetitions` | `(session_id, rep_number)` | Sequential rep access |
| `injury_records` | `(session_id, timestamp)` | Chronological risk events |
| `reports` | `(user_id, generated_at DESC)` | Report listing |

---

## 9. Frontend Component Design

### 9.1 Component Tree

```
App
├── AuthProvider (Context)
│   ├── LoginPage
│   └── RegisterPage
├── ProtectedRoute (HOC)
│   ├── Layout
│   │   ├── Sidebar
│   │   │   ├── NavItem (Dashboard)
│   │   │   ├── NavItem (Workout)
│   │   │   ├── NavItem (History)
│   │   │   ├── NavItem (Reports)
│   │   │   └── NavItem (Profile)
│   │   └── MainContent
│   │       ├── DashboardPage
│   │       │   ├── FitScoreGauge
│   │       │   ├── TrendChart
│   │       │   ├── MuscleHeatmap
│   │       │   ├── RecentSessions
│   │       │   └── RiskTimeline
│   │       ├── WorkoutPage
│   │       │   ├── CameraSetup
│   │       │   ├── ExerciseSelector
│   │       │   ├── LiveSession
│   │       │   │   ├── VideoCanvas
│   │       │   │   ├── SkeletalOverlay
│   │       │   │   ├── ScoreGauge
│   │       │   │   ├── RepCounter
│   │       │   │   ├── JointFeedback
│   │       │   │   └── InjuryAlertBanner
│   │       │   └── SessionSummary
│   │       │       ├── ScoreBreakdown
│   │       │       ├── RiskLog
│   │       │       └── CoachingPanel
│   │       ├── HistoryPage
│   │       │   ├── SessionList
│   │       │   └── SessionDetail
│   │       ├── ReportsPage
│   │       │   ├── ReportGenerator
│   │       │   └── ReportList
│   │       └── ProfilePage
│   │           ├── BodyMetricsForm
│   │           └── GoalsSettings
│   └── NotFoundPage
```

### 9.2 Key Component Specifications

| Component | Props | State | Responsibility |
|---|---|---|---|
| `VideoCanvas` | `stream: MediaStream` | `isActive` | Renders live webcam feed on `<canvas>` |
| `SkeletalOverlay` | `keypoints: Keypoint[]` | — | Draws skeletal connections with colour-coded joints |
| `ScoreGauge` | `score: number, subScores: obj` | — | Animated circular gauge (0–100) |
| `RepCounter` | `count: number, phase: string` | — | Displays current rep and phase indicator |
| `JointFeedback` | `jointColors: Map<string, string>` | — | Body silhouette with green/amber/red highlights |
| `MuscleHeatmap` | `activationData: HeatmapData` | — | Canvas-based body heatmap |
| `TrendChart` | `data: DateScore[]` | `period` | Recharts line chart with period selector |
| `InjuryAlertBanner` | `risk: RiskInfo` | `visible` | Slide-in warning banner |
| `CoachingPanel` | `sessionId: string` | `loading, text` | LLM-generated feedback display |

---

## 10. Error Handling Design

### 10.1 Frontend Error Handling

| Scenario | UI Response |
|---|---|
| Camera permission denied | Modal: "FitScore AI needs camera access to analyse your exercises" |
| Camera not available | Modal with troubleshooting steps |
| Tracking lost (user out of frame) | Overlay: "Step back — align your full body in the frame" |
| Low lighting detected | Warning toast: "Improve lighting for accurate tracking" |
| WebSocket disconnected | Reconnect with exponential backoff; show "Reconnecting..." banner |
| API error (500) | Toast notification with retry option |

### 10.2 Backend Error Handling

| Error | HTTP Code | Response |
|---|---|---|
| Invalid credentials | 401 | `{ "detail": "Invalid email or password" }` |
| Token expired | 401 | `{ "detail": "Token expired" }` |
| Validation error | 422 | Pydantic error detail |
| Session not found | 404 | `{ "detail": "Session not found" }` |
| Model inference failure | 500 | `{ "detail": "Analysis temporarily unavailable" }` |
| LLM API timeout | 503 | Fallback to rule-based feedback |
| Rate limit exceeded | 429 | `{ "detail": "Too many requests" }` |

---

## 11. CNN-LSTM Model Design

### 11.1 Architecture Layers

```
Input: (batch, 30, 132)
         │
    ┌────▼─────────────────┐
    │ Conv1D(64, kernel=3)  │  ← Spatial feature extraction
    │ BatchNorm + ReLU      │
    │ MaxPool1D(2)          │
    ├───────────────────────┤
    │ Conv1D(128, kernel=3) │
    │ BatchNorm + ReLU      │
    │ MaxPool1D(2)          │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │ LSTM(64, return_seq)  │  ← Temporal pattern learning
    │ Dropout(0.3)          │
    ├───────────────────────┤
    │ LSTM(64)              │
    │ Dropout(0.3)          │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │ Dense(64, ReLU)       │
    │ Dropout(0.3)          │
    ├───────────────────────┤
    │ Dense(19, Softmax)    │  ← 19 exercise classes
    └───────────────────────┘

Output: (batch, 19) probability distribution
```

### 11.2 Training Configuration (Deployed)

| Parameter | Value |
|---|---|
| Window size | 30 frames |
| Stride | 5 |
| Batch size | 32 |
| Epochs | 100 |
| Optimiser | Adam (lr=0.001) |
| Loss | Categorical cross-entropy |
| Regularisation | BatchNorm + Dropout (0.3) |
| Confidence gate | ≥ 75% |
| FSM validation | Eliminates false positive reps |
| **Test Accuracy** | **93.6%** |
| **F1-Score** | **0.926** |

---

## 12. FitScore Calculation Design

### 12.1 Sub-Score Formulas

**Alignment Score:**
```
alignment = 100 × (1 - mean(|θ_actual - θ_ideal|) / max_deviation)
```

**Range of Motion Score:**
```
rom = 100 × min(1.0, achieved_rom / target_rom)
```

**Symmetry Score:**
```
symmetry = 100 × (1 - |θ_left - θ_right| / reference_range)
```

**Stability Score:**
```
stability = 100 × (1 - σ(hip_displacement) / stability_threshold)
```

**Tempo Score:**
```
tempo = 100 × (1 - |actual_duration - target_duration| / target_duration)
```

### 12.2 Composite FitScore

```
FitScore = 0.30 × alignment + 0.25 × rom + 0.20 × symmetry
         + 0.15 × stability + 0.10 × tempo
```

Clamped to [0, 100].

---

*This design document provides the detailed blueprints for every module, interaction, and data structure in the FitScore AI system. For the high-level architecture overview, see `architecture.md`. For implementation timelines, see `phases.md`.*
