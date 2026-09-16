# FitScore AI — Development Phases & Roadmap

> **Version:** 1.0  
> **Date:** September 2025  
> **Project:** FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Estimation and Deep-Learning  
> **Authors:** Preethi R, Ramyashri Ravikumar, Vaishnavi G N, Vaishnavi S

---

## Executive Timeline

```
Phase 1 (Weeks 1-4)  ████████░░░░░░░░░░░░░░░░  Foundation & Core ML
Phase 2 (Weeks 5-8)  ░░░░░░░░████████░░░░░░░░  Real-Time Engine & Scoring
Phase 3 (Weeks 9-12) ░░░░░░░░░░░░░░░░████████  Intelligence & Analytics
Phase 4 (Weeks 13-16)░░░░░░░░░░░░░░░░░░░░████  Polish, Testing & Deployment
```

**Total Duration:** 16 weeks (4 months)

---

## Phase 1: Foundation & Core ML Pipeline (Weeks 1–4)

### Objective
Build the project skeleton, train the CNN-LSTM model, and establish the database foundation.

### Week 1: Project Setup & Environment

| Task | Owner | Deliverable |
|---|---|---|
| Initialise React 19 project with Vite | Frontend Team | Configured `package.json`, Vite config, folder structure |
| Initialise FastAPI backend project | Backend Team | FastAPI app skeleton, project structure, requirements.txt |
| Set up PostgreSQL 16 database | Backend Team | Docker Compose with PostgreSQL + pgAdmin |
| Design and implement database schema | Backend Team | Alembic migrations for all core tables |
| Set up Git repository and branching strategy | All | `.gitignore`, branch protection rules, PR templates |
| Configure linting & formatting (ESLint, Ruff) | All | Pre-commit hooks configured |

**Milestone:** ✅ Dev environment fully operational; all team members can run frontend + backend + DB locally.

### Week 2: Data Collection & Preprocessing

| Task | Owner | Deliverable |
|---|---|---|
| Collect/curate exercise video dataset | ML Team | 19-class exercise dataset (squats, lunges, push-ups, bicep curls, etc.) |
| Extract MediaPipe landmarks from all videos | ML Team | CSV/NPY files with 33×4 features per frame |
| Implement hip-centre normalisation pipeline | ML Team | Python script: `normalize_landmarks.py` |
| Implement `atan2` joint angle computation | ML Team | Python module: `angle_computation.py` |
| Build sliding window dataset generator (30 frames, stride 5) | ML Team | Train/Val/Test splits (80/10/10) |
| Data augmentation (temporal jitter, mirroring) | ML Team | Augmented dataset ready |

**Milestone:** ✅ Preprocessed dataset ready for CNN-LSTM training.

### Week 3: CNN-LSTM Model Training

| Task | Owner | Deliverable |
|---|---|---|
| Implement CNN-LSTM architecture in TensorFlow/Keras | ML Team | Model definition: `cnn_lstm_model.py` |
| Baseline training (Config 1: 50 epochs, no augmentation) | ML Team | Baseline metrics: ~82% accuracy |
| Optimised training (Config 2: stride 5, 80 epochs) | ML Team | Improved: ~88% accuracy |
| Final training (Config 3: BatchNorm + Dropout, 100 epochs) | ML Team | Target: ≥92% accuracy |
| Implement confidence threshold gating (75%) | ML Team | Inference pipeline with confidence filtering |
| Model evaluation: confusion matrix, per-class F1 | ML Team | Evaluation report document |
| Export and version the trained model (`.h5` / SavedModel) | ML Team | Deployable model artifact |

**Milestone:** ✅ CNN-LSTM model trained with ≥92% accuracy and ≥0.91 F1-score.

### Week 4: Authentication & Core Backend

| Task | Owner | Deliverable |
|---|---|---|
| Implement User model and Pydantic schemas | Backend Team | `models/user.py`, `schemas/user.py` |
| Build auth endpoints (register, login, refresh, logout) | Backend Team | JWT-based auth with bcrypt |
| Implement auth middleware and route protection | Backend Team | Dependency injection guards |
| Build user profile CRUD endpoints | Backend Team | `GET/PUT /api/users/me` |
| Frontend: Build Login and Register pages | Frontend Team | Functional auth forms with validation |
| Frontend: Implement auth context and token management | Frontend Team | `AuthProvider`, protected routes |
| Integration test: auth flow end-to-end | All | Passing auth tests |

**Milestone:** ✅ Users can register, login, and access protected routes.

---

## Phase 2: Real-Time Engine & Scoring (Weeks 5–8)

### Objective
Build the live exercise monitoring pipeline with real-time pose estimation, FitScore computation, and WebSocket communication.

### Week 5: Client-Side Pose Estimation

| Task | Owner | Deliverable |
|---|---|---|
| Integrate MediaPipe Tasks Vision (`@mediapipe/tasks-vision`) | Frontend Team | BlazePose running in browser |
| Build `WebcamCapture` component (30 FPS `getUserMedia`) | Frontend Team | Live video feed component |
| Implement client-side landmark normalisation | Frontend Team | Hip-centre normalisation in JS |
| Implement client-side angle computation (`atan2`) | Frontend Team | Real-time angle extraction |
| Build `SkeletalOverlay` canvas component | Frontend Team | Skeleton drawn over video feed |
| Camera setup/calibration screen | Frontend Team | Distance, lighting, and framing guide |

**Milestone:** ✅ MediaPipe extracts and visualises 33 keypoints at 30 FPS in the browser.

### Week 6: WebSocket Pipeline & Server-Side Inference

| Task | Owner | Deliverable |
|---|---|---|
| Implement WebSocket endpoint in FastAPI | Backend Team | `ws://host/api/ws/session/{id}` |
| Build frame buffer and sliding window manager (server) | Backend Team | 30-frame window construction |
| Integrate CNN-LSTM model for real-time inference | Backend Team | Exercise classification pipeline |
| Implement FitScore Metric Engine | Backend Team | Weighted composite scoring (5 dimensions) |
| Implement FSM Repetition Counter | Backend Team | State machine: START→DOWN→UP→COMPLETE |
| WebSocket client integration in React | Frontend Team | Bi-directional real-time communication |
| Build exercise session CRUD endpoints | Backend Team | `POST/PUT/GET /api/sessions` |

**Milestone:** ✅ End-to-end pipeline: webcam → pose → classification → FitScore → display.

### Week 7: Real-Time Feedback UI

| Task | Owner | Deliverable |
|---|---|---|
| Build `ScoreGauge` component (animated 0–100 circular gauge) | Frontend Team | Real-time score visualisation |
| Build `RepCounter` component with phase indicator | Frontend Team | Live rep count display |
| Build `JointFeedback` body silhouette (green/amber/red) | Frontend Team | Colour-coded joint status |
| Build `LiveSession` composite view | Frontend Team | Full workout mode screen |
| Implement real-time score update via WebSocket | Frontend Team | Score updates every inference cycle |
| Add exercise selector (squats, lunges, push-ups, bicep curls) | Frontend Team | Exercise type picker before session |
| Build `SessionSummary` view (post-workout) | Frontend Team | Summary with scores, reps, duration |

**Milestone:** ✅ Users can complete a full exercise session with live scoring and feedback.

### Week 8: Injury Risk Detection

| Task | Owner | Deliverable |
|---|---|---|
| Implement rule-based injury thresholds | Backend Team | Knee valgus (>15°), pelvic tilt, shoulder impingement rules |
| Build ML-based compensation pattern detector | Backend Team | Trained on deviation features |
| Implement risk persistence logic (≥3 consecutive frames) | Backend Team | Debounced risk alerts |
| Build `InjuryAlertBanner` component | Frontend Team | Slide-in warning with flagged joint info |
| Implement injury risk in WebSocket response | Backend Team | Risk tier + flagged joints in feedback JSON |
| Persist injury records to database | Backend Team | `injury_records` table populated |
| Build `RiskLog` in session summary | Frontend Team | Post-session risk event timeline |

**Milestone:** ✅ Injury risk detection operational with real-time alerts and session logging.

---

## Phase 3: Intelligence & Analytics (Weeks 9–12)

### Objective
Add AI coaching, analytical dashboards, report generation, and comprehensive session history.

### Week 9: LLM Coaching Assistant

| Task | Owner | Deliverable |
|---|---|---|
| Set up LangChain with GPT-4o API integration | Backend Team | `CoachingAssistant` class |
| Design context-aware system prompt | Backend Team | Prompt template with FitScore, risk, history context |
| Build coaching API endpoints | Backend Team | `POST /api/coaching/feedback`, `POST /api/coaching/plan` |
| Build `CoachingPanel` component | Frontend Team | Post-session AI feedback display |
| Implement adaptive weekly plan generation | Backend Team | LLM-generated rehabilitation/training plans |
| Persist coaching logs to database | Backend Team | `coaching_logs` table populated |
| LLM fallback: rule-based feedback on API failure | Backend Team | Graceful degradation |

**Milestone:** ✅ Users receive personalised AI coaching after each session.

### Week 10: Dashboard & Analytics

| Task | Owner | Deliverable |
|---|---|---|
| Build analytics aggregation endpoints | Backend Team | FitScore trends, muscle distribution, summary stats |
| Build `DashboardPage` layout | Frontend Team | Grid layout with widget cards |
| Implement `TrendChart` (FitScore over time) | Frontend Team | Recharts line chart with period selector |
| Implement `MuscleHeatmap` (activation distribution) | Frontend Team | Canvas-based body heatmap |
| Build `RecentSessions` list widget | Frontend Team | Last 10 sessions with quick stats |
| Build `RiskTimeline` widget | Frontend Team | Injury risk events over time |
| Implement `FitScoreGauge` dashboard summary | Frontend Team | Large gauge showing overall score |

**Milestone:** ✅ Fully functional analytics dashboard with trends, heatmaps, and session history.

### Week 11: Session History & Reports

| Task | Owner | Deliverable |
|---|---|---|
| Build `HistoryPage` with paginated session list | Frontend Team | Filterable, sortable session history |
| Build `SessionDetail` view with rep-by-rep breakdown | Frontend Team | Detailed per-rep analysis |
| Implement ReportLab PDF generation engine | Backend Team | Medical-grade PDF reports |
| Design PDF report template (scores, charts, heatmaps) | Backend Team | Professional report layout |
| Set up Celery + Redis for async report generation | Backend Team | Background task queue |
| Build report generation API (async with WebSocket notification) | Backend Team | `POST /api/reports` → async |
| Build `ReportsPage` (generate, list, download) | Frontend Team | Report management interface |

**Milestone:** ✅ Users can view session history and generate/download PDF reports.

### Week 12: Profile & Settings

| Task | Owner | Deliverable |
|---|---|---|
| Build `ProfilePage` with body metrics form | Frontend Team | Height, weight, age, goals inputs |
| Build `GoalsSettings` (exercise preferences, targets) | Frontend Team | User goal configuration |
| Implement profile-aware scoring (body metrics influence ideal angles) | Backend Team | Personalised scoring adjustments |
| Build notification preferences | Frontend Team | Email/in-app notification settings |
| Build sidebar navigation with active state | Frontend Team | Polished navigation experience |
| Responsive layout adjustments | Frontend Team | Tablet and mobile-friendly layouts |

**Milestone:** ✅ Complete user profile management and personalised experience.

---

## Phase 4: Polish, Testing & Deployment (Weeks 13–16)

### Objective
Comprehensive testing, UI polish, performance optimisation, and production deployment.

### Week 13: UI/UX Polish

| Task | Owner | Deliverable |
|---|---|---|
| Design and implement design token system (colours, typography, spacing) | Frontend Team | CSS custom properties file |
| Dark mode implementation | Frontend Team | Toggle between light/dark themes |
| Micro-animations (page transitions, score updates, hover effects) | Frontend Team | Smooth, premium feel |
| Loading states and skeleton screens | Frontend Team | Consistent loading experience |
| Empty states and onboarding tour | Frontend Team | First-use guidance |
| Accessibility audit (WCAG 2.1 AA compliance) | Frontend Team | Accessible components |
| Cross-browser testing (Chrome, Firefox, Edge) | Frontend Team | Browser compatibility verified |

**Milestone:** ✅ Polished, premium-feeling UI with consistent design language.

### Week 14: Testing

| Task | Owner | Deliverable |
|---|---|---|
| Unit tests — Backend (pytest, 80%+ coverage) | Backend Team | Test suite for all modules |
| Unit tests — Frontend (Vitest, React Testing Library) | Frontend Team | Component and hook tests |
| Integration tests — API endpoints (pytest + httpx) | Backend Team | End-to-end API test suite |
| WebSocket integration tests | Backend Team | Real-time pipeline tests |
| CNN-LSTM model validation on unseen data | ML Team | Holdout set evaluation report |
| E2E tests — Critical user flows (Playwright) | All | Automated browser tests |
| Performance profiling (Lighthouse, backend latency) | All | Performance benchmark report |

**Milestone:** ✅ All tests passing; performance targets met.

### Week 15: Security & Optimisation

| Task | Owner | Deliverable |
|---|---|---|
| Security audit (OWASP Top 10 checklist) | Backend Team | Security review report |
| Rate limiting on auth endpoints | Backend Team | Token-bucket rate limiter |
| CORS configuration hardening | Backend Team | Strict origin whitelist |
| Content-Security-Policy headers | Frontend Team | CSP headers configured |
| Vite production build optimisation (code splitting, tree shaking) | Frontend Team | Optimised bundle |
| Database query optimisation and indexing | Backend Team | Optimised queries |
| WebSocket connection pooling and reconnection logic | All | Resilient real-time connection |
| Environment variable management (`.env` files) | All | Secure config management |

**Milestone:** ✅ Security hardened; performance optimised for production.

### Week 16: Deployment & Documentation

| Task | Owner | Deliverable |
|---|---|---|
| NGINX reverse proxy configuration | DevOps | SSL termination, routing |
| Docker Compose for production stack | DevOps | Single-command deployment |
| Database backup strategy | DevOps | Automated daily backups |
| Monitoring setup (basic health checks) | DevOps | Uptime monitoring |
| API documentation (FastAPI auto-docs + Swagger) | Backend Team | Interactive API docs |
| User guide / help documentation | All | In-app help and external docs |
| Final system testing in production environment | All | Production smoke tests |
| Project handover documentation | All | Complete technical documentation |

**Milestone:** ✅ FitScore AI deployed and operational in production.

---

## Phase Summary Table

| Phase | Duration | Key Deliverables | Success Criteria |
|---|---|---|---|
| **Phase 1** | Weeks 1–4 | Project skeleton, trained CNN-LSTM (93%+ accuracy), auth system | Model trained, auth working, DB schema deployed |
| **Phase 2** | Weeks 5–8 | Real-time pose → FitScore pipeline, injury detection, WebSocket | End-to-end live session with scoring and risk alerts |
| **Phase 3** | Weeks 9–12 | AI coaching, dashboard analytics, PDF reports, profile management | Complete feature set operational |
| **Phase 4** | Weeks 13–16 | UI polish, testing (80%+ coverage), security hardening, deployment | Production-ready application |

---

## Risk Mitigation Plan

| Risk | Probability | Impact | Mitigation Strategy |
|---|---|---|---|
| CNN-LSTM accuracy < 90% | Medium | High | Additional data augmentation; try attention mechanisms; fall back to simpler classifier |
| MediaPipe performance issues in browser | Low | High | Use BlazePose Lite; reduce frame rate to 15 FPS; fallback to server-side processing |
| GPT-4o API rate limits / cost | Medium | Medium | Cache frequent responses; implement rule-based fallback; use cheaper model tier |
| WebSocket scalability under load | Medium | Medium | Horizontal scaling; message batching; connection pooling |
| Team member availability | Low | Medium | Cross-training; documentation; modular code ownership |
| PostgreSQL performance at scale | Low | Low | Connection pooling; read replicas; query optimisation |

---

## Resource Allocation

| Team Member | Primary Responsibility | Secondary |
|---|---|---|
| **Preethi R** | Frontend Development (React, UI/UX) | E2E Testing |
| **Ramyashri Ravikumar** | ML Pipeline (CNN-LSTM, MediaPipe) | Data Collection |
| **Vaishnavi G N** | Backend Development (FastAPI, DB) | Security |
| **Vaishnavi S** | Backend + Integration (WebSocket, LLM) | Deployment |

---

## Dependencies & Prerequisites

```
Phase 1 ──────▶ Phase 2 ──────▶ Phase 3 ──────▶ Phase 4
   │               │                │                │
   │ Trained Model │ Real-time      │ Dashboard      │ Tested &
   │ Auth System   │ Pipeline       │ AI Coaching    │ Deployed
   │ DB Schema     │ FitScore       │ Reports        │ System
   │               │ Injury Risk    │ Profile        │
```

- Phase 2 **depends on** Phase 1's trained model and backend skeleton.
- Phase 3 **depends on** Phase 2's real-time pipeline and session data.
- Phase 4 **depends on** Phase 3's complete feature set.

---

*This phased roadmap ensures systematic, milestone-driven delivery of the FitScore AI platform. For technical details, see `architecture.md` and `design.md`. For feature specifications, see `spec.md` and `prd.md`.*
