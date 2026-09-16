# FitScore AI — Technical Specification Document

> **Version:** 1.0  
> **Date:** September 2025  
> **Project:** FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Estimation and Deep-Learning  
> **Authors:** Preethi R, Ramyashri Ravikumar, Vaishnavi G N, Vaishnavi S

---

## 1. System Overview

FitScore AI is a web-based exercise assessment platform that combines **MediaPipe BlazePose** for real-time 3D skeletal tracking, a **CNN-LSTM hybrid deep learning model** for exercise classification and quality assessment, and a **context-aware LLM assistant** for personalised coaching. The system replaces binary feedback with the **FitScore metric** (0–100), evaluating five biomechanical dimensions: joint alignment, range of motion, symmetry, stability, and tempo.

---

## 2. Detailed Module Specifications

### 2.1 Pose Estimation Module

#### 2.1.1 Technology
- **Model:** MediaPipe BlazePose (33 3D keypoints)
- **Execution:** Client-side via `@mediapipe/tasks-vision` (WASM + WebGL acceleration)
- **Fallback:** Server-side MediaPipe Python SDK for uploaded video files

#### 2.1.2 Keypoint Specification

| Index | Landmark | Body Part |
|---|---|---|
| 0 | Nose | Head |
| 1–4 | Left/Right Eye (inner, outer) | Face |
| 5–6 | Left/Right Ear | Face |
| 7–8 | Mouth (left, right) | Face |
| 9–10 | Left/Right Shoulder | Upper Body |
| 11–12 | Left/Right Elbow | Arms |
| 13–14 | Left/Right Wrist | Arms |
| 15–18 | Left/Right Pinky, Index | Hands |
| 19–20 | Left/Right Thumb | Hands |
| 21–22 | Left/Right Hip | Torso |
| 23–24 | Left/Right Knee | Legs |
| 25–26 | Left/Right Ankle | Legs |
| 27–28 | Left/Right Heel | Feet |
| 29–30 | Left/Right Foot Index | Feet |
| 31–32 | Left/Right Foot (inner, outer) | Feet |

**Output per keypoint:** `(x, y, z, visibility)` — 4 values × 33 = **132 features per frame**

#### 2.1.3 Configuration Parameters

| Parameter | Value | Justification |
|---|---|---|
| Model complexity | `LITE` (web) / `FULL` (server) | Balance speed vs. accuracy |
| Min detection confidence | 0.7 | Reject low-quality detections |
| Min tracking confidence | 0.5 | Smooth tracking across frames |
| Frame rate target | 30 FPS | Standard video rate |
| Image width | 640px | Optimal for BlazePose performance |
| Image height | 480px | Standard webcam aspect ratio |

---

### 2.2 Normalisation & Angle Computation Module

#### 2.2.1 Hip-Centre Normalisation

**Purpose:** Make coordinates scale-invariant and body-type-agnostic.

**Algorithm:**
```python
def normalise_landmarks(landmarks):
    """
    Normalise all landmarks relative to the hip centre.
    Scale by torso length (shoulder-to-hip distance).
    """
    # Compute hip centre
    hip_centre = (landmarks[LEFT_HIP] + landmarks[RIGHT_HIP]) / 2
    
    # Compute torso length for scale normalisation
    left_torso = distance(landmarks[LEFT_SHOULDER], landmarks[LEFT_HIP])
    right_torso = distance(landmarks[RIGHT_SHOULDER], landmarks[RIGHT_HIP])
    torso_length = (left_torso + right_torso) / 2
    
    # Normalise: translate to origin, scale by torso
    normalised = []
    for kp in landmarks:
        normalised.append((kp - hip_centre) / torso_length)
    
    return normalised
```

#### 2.2.2 Joint Angle Computation

**Clinically Relevant Angles:**

| Angle Name | Joint Triplet (a–b–c) | Exercise Relevance |
|---|---|---|
| Left Knee Angle | Hip – Knee – Ankle (L) | Squat depth, lunge angle |
| Right Knee Angle | Hip – Knee – Ankle (R) | Squat depth, lunge angle |
| Left Hip Angle | Shoulder – Hip – Knee (L) | Hip hinge, squat posture |
| Right Hip Angle | Shoulder – Hip – Knee (R) | Hip hinge, squat posture |
| Left Elbow Angle | Shoulder – Elbow – Wrist (L) | Bicep curl ROM |
| Right Elbow Angle | Shoulder – Elbow – Wrist (R) | Bicep curl ROM |
| Left Shoulder Angle | Elbow – Shoulder – Hip (L) | Push-up, overhead press |
| Right Shoulder Angle | Elbow – Shoulder – Hip (R) | Push-up, overhead press |
| Spine Angle | Shoulder_mid – Hip_mid – Knee_mid | Trunk lean, posture |

**Computation (atan2):**
```python
def compute_angle(a, b, c):
    """
    Compute angle at joint b formed by vectors ba and bc.
    Returns angle in degrees (0-180).
    """
    ba = a - b
    bc = c - b
    
    cos_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.degrees(np.arccos(np.clip(cos_angle, -1.0, 1.0)))
    
    return angle
```

---

### 2.3 CNN-LSTM Exercise Classifier

#### 2.3.1 Model Architecture Specification

```
Layer 1:  Conv1D(filters=64, kernel_size=3, activation='relu', padding='same')
          BatchNormalization()
          MaxPooling1D(pool_size=2)

Layer 2:  Conv1D(filters=128, kernel_size=3, activation='relu', padding='same')
          BatchNormalization()
          MaxPooling1D(pool_size=2)

Layer 3:  LSTM(units=64, return_sequences=True)
          Dropout(0.3)

Layer 4:  LSTM(units=64, return_sequences=False)
          Dropout(0.3)

Layer 5:  Dense(units=64, activation='relu')
          Dropout(0.3)

Layer 6:  Dense(units=19, activation='softmax')
```

**Total Parameters:** ~250K (lightweight for real-time inference)

#### 2.3.2 Input Specification

| Property | Value |
|---|---|
| Input shape | `(batch_size, 30, 132)` |
| Window size | 30 frames (~1 second at 30 FPS) |
| Stride | 5 frames |
| Feature dimensions | 132 (33 keypoints × 4 values: x, y, z, visibility) |
| Data normalisation | Hip-centre normalised, torso-length scaled |

#### 2.3.3 Output Specification

| Property | Value |
|---|---|
| Output shape | `(batch_size, 19)` |
| Output type | Probability distribution (softmax) |
| Confidence threshold | ≥ 75% |
| Below-threshold behaviour | Label as "unknown"; do not count rep |

#### 2.3.4 Exercise Classes (19 Categories)

| # | Exercise Class | Notes |
|---|---|---|
| 1 | Squat | Standard bodyweight squat |
| 2 | Lunge (Left) | Left leg forward |
| 3 | Lunge (Right) | Right leg forward |
| 4 | Push-up | Standard push-up |
| 5 | Bicep Curl (Left) | Left arm |
| 6 | Bicep Curl (Right) | Right arm |
| 7 | Shoulder Press (Left) | Left arm overhead |
| 8 | Shoulder Press (Right) | Right arm overhead |
| 9 | Lateral Raise (Left) | Left arm lateral |
| 10 | Lateral Raise (Right) | Right arm lateral |
| 11 | Deadlift | Bodyweight/light |
| 12 | Plank Hold | Static hold |
| 13 | Side Plank (Left) | Left side |
| 14 | Side Plank (Right) | Right side |
| 15 | Knee Raise (Left) | Standing |
| 16 | Knee Raise (Right) | Standing |
| 17 | Pendulum Swing (Left) | Rehabilitation |
| 18 | Pendulum Swing (Right) | Rehabilitation |
| 19 | Idle/Transition | Rest between exercises |

#### 2.3.5 Training Results (All Configurations)

| Config | Accuracy | Loss | Precision | Recall | F1 | Notes |
|---|---|---|---|---|---|---|
| Baseline (50 epochs, no aug) | 82.4% | 0.541 | 0.814 | 0.803 | 0.808 | Moderate overfitting |
| Stride 5 + augmentation (80 ep) | 88.7% | 0.423 | 0.876 | 0.871 | 0.873 | Hip normalisation helped |
| BatchNorm + Dropout (100 ep) | 92.1% | 0.318 | 0.914 | 0.909 | 0.911 | Best stability |
| LSTM 128 units (100 ep) | 91.3% | 0.335 | 0.905 | 0.899 | 0.902 | No gain, more compute |
| **Deployed: Config 3 + FSM** | **93.6%** | **0.297** | **0.929** | **0.924** | **0.926** | **FSM eliminates false reps** |

---

### 2.4 FitScore Metric Engine

#### 2.4.1 Scoring Dimensions

| Dimension | Weight | Score Range | Algorithm |
|---|---|---|---|
| **Joint Alignment** | 0.30 | 0–100 | Mean angular deviation from ideal template |
| **Range of Motion** | 0.25 | 0–100 | Ratio of achieved to target ROM |
| **Movement Symmetry** | 0.20 | 0–100 | L/R angular difference normalised |
| **Posture Stability** | 0.15 | 0–100 | Hip-centre displacement variance |
| **Exercise Tempo** | 0.10 | 0–100 | Rep duration deviation from target |

#### 2.4.2 Ideal Angle Templates (Squat Example)

| Phase | Knee Angle | Hip Angle | Spine Angle | Ankle Angle |
|---|---|---|---|---|
| **Standing (Start)** | 170°–180° | 170°–180° | 170°–180° | 80°–90° |
| **Bottom (Peak)** | 80°–100° | 70°–90° | 140°–160° | 60°–80° |
| **Return (Complete)** | 170°–180° | 170°–180° | 170°–180° | 80°–90° |

#### 2.4.3 Computation Flow

```python
def compute_fitscore(angles, timing_data, exercise_template):
    """
    Compute weighted FitScore from biomechanical parameters.
    """
    # 1. Alignment Score
    deviations = [abs(actual - ideal) for actual, ideal in 
                  zip(angles, exercise_template.ideal_angles)]
    alignment = 100 * (1 - np.mean(deviations) / exercise_template.max_deviation)
    
    # 2. ROM Score
    achieved_rom = max(angles['primary_joint']) - min(angles['primary_joint'])
    rom = 100 * min(1.0, achieved_rom / exercise_template.target_rom)
    
    # 3. Symmetry Score
    l_r_diff = abs(angles['left_primary'] - angles['right_primary'])
    symmetry = 100 * (1 - l_r_diff / exercise_template.symmetry_reference)
    
    # 4. Stability Score
    hip_variance = np.var(angles['hip_displacement_series'])
    stability = 100 * (1 - hip_variance / exercise_template.stability_threshold)
    
    # 5. Tempo Score
    actual_duration = timing_data['rep_duration']
    target_duration = exercise_template.target_tempo
    tempo = 100 * (1 - abs(actual_duration - target_duration) / target_duration)
    
    # Composite score
    fitscore = (0.30 * alignment + 0.25 * rom + 0.20 * symmetry + 
                0.15 * stability + 0.10 * tempo)
    
    return max(0, min(100, fitscore)), {
        'alignment': alignment, 'rom': rom, 'symmetry': symmetry,
        'stability': stability, 'tempo': tempo
    }
```

---

### 2.5 FSM Repetition Counter

#### 2.5.1 State Machine Definition

```
States: { IDLE, DESCENDING, BOTTOM, ASCENDING, COMPLETE }

Transitions:
  IDLE → DESCENDING:      primary_angle decreases below start_threshold
  DESCENDING → BOTTOM:    primary_angle reaches bottom_threshold
  BOTTOM → ASCENDING:     primary_angle increases above bottom_threshold + hysteresis
  ASCENDING → COMPLETE:   primary_angle returns above start_threshold
  COMPLETE → IDLE:        auto-transition (increment rep count)
  
  Any State → IDLE:       tracking_lost OR confidence < 0.75 (reset)
```

#### 2.5.2 Exercise-Specific Thresholds

| Exercise | Primary Joint | Start Threshold | Bottom Threshold | Hysteresis |
|---|---|---|---|---|
| Squat | Knee | 160° | 100° | 10° |
| Lunge | Front Knee | 160° | 95° | 10° |
| Push-up | Elbow | 160° | 90° | 10° |
| Bicep Curl | Elbow | 160° | 45° | 10° |

---

### 2.6 Injury Risk Stratification Engine

#### 2.6.1 Rule-Based Detection Rules

| Rule ID | Condition | Risk Tier | Alert Message |
|---|---|---|---|
| IR-001 | Knee valgus angle > 15° | **High** | "Knees collapsing inward — push knees over toes" |
| IR-002 | Anterior pelvic tilt > 20° | **Moderate** | "Excessive lower back arch — engage core" |
| IR-003 | Shoulder impingement angle < 60° | **High** | "Shoulder pinching — widen hand placement" |
| IR-004 | Heel lift detected (ankle y < threshold) | **Moderate** | "Heels lifting — press through entire foot" |
| IR-005 | Trunk lean > 30° (squat) | **Moderate** | "Leaning too far forward — chest up" |
| IR-006 | L/R knee asymmetry > 15° | **Moderate** | "Uneven knee tracking — check for weakness" |
| IR-007 | Neck hyperextension > 30° | **Low** | "Neutral neck — look at a spot on the floor" |
| IR-008 | Spinal sag in push-up > 20° | **High** | "Hips sagging — tighten core and glutes" |

#### 2.6.2 Risk Persistence Logic

```python
class RiskDebouncer:
    """
    Only trigger alerts when a risk condition persists
    for >= PERSISTENCE_FRAMES consecutive frames.
    """
    PERSISTENCE_FRAMES = 3  # ~100ms at 30 FPS
    
    def __init__(self):
        self.counters = {}  # rule_id → consecutive_count
    
    def update(self, active_rules: List[str]) -> List[str]:
        triggered = []
        for rule_id in self.counters:
            if rule_id in active_rules:
                self.counters[rule_id] += 1
            else:
                self.counters[rule_id] = 0
        
        for rule_id in active_rules:
            if rule_id not in self.counters:
                self.counters[rule_id] = 1
            if self.counters[rule_id] >= self.PERSISTENCE_FRAMES:
                triggered.append(rule_id)
        
        return triggered
```

---

### 2.7 LLM Coaching Assistant

#### 2.7.1 Integration Architecture

| Component | Specification |
|---|---|
| **LLM Provider** | OpenAI GPT-4o |
| **SDK** | LangChain (Python) |
| **Prompting Strategy** | Context-aware system prompt + structured user context |
| **Rate Limiting** | Max 5 coaching requests per session |
| **Fallback** | Rule-based feedback templates on API failure |
| **Response Caching** | Cache identical context patterns for 1 hour |

#### 2.7.2 System Prompt Template

```
You are FitScore AI Coach, a certified fitness and rehabilitation specialist.

CONTEXT:
- Exercise: {exercise_type}
- FitScore: {fit_score}/100
- Sub-scores: Alignment {alignment}, ROM {rom}, Symmetry {symmetry}, 
  Stability {stability}, Tempo {tempo}
- Injury Risk: {risk_tier} ({flagged_joints})
- User Profile: Height {height}cm, Weight {weight}kg, Age {age}
- Goal: {fitness_goal}
- Session History (last 5): {recent_scores}

INSTRUCTIONS:
1. Provide 2-3 specific, actionable corrections based on the lowest sub-scores.
2. If injury risk is Moderate/High, prioritise safety guidance.
3. Acknowledge improvements compared to recent history.
4. Use encouraging, professional tone.
5. Keep response under 200 words.
6. Do NOT provide medical diagnoses.
```

---

### 2.8 Analytics & Reporting Module

#### 2.8.1 PDF Report Specification

**Report Sections:**

| Section | Content | Visualisation |
|---|---|---|
| Header | User name, report period, generated date | Logo, title |
| Executive Summary | Overall FitScore average, total sessions, improvement % | Summary box |
| FitScore Trend | Daily/weekly FitScore progression | Line chart |
| Sub-Score Breakdown | Average scores per dimension | Radar chart |
| Exercise Distribution | Session count per exercise type | Pie/bar chart |
| Muscle Activation | Estimated muscle group engagement | Body heatmap |
| Injury Risk Summary | Risk events count and types | Table + timeline |
| AI Recommendations | LLM-generated summary recommendations | Text block |
| Session Log | Individual session details | Table |

**PDF Specifications:**
- Format: A4 portrait
- Engine: ReportLab (Python)
- Charts: Matplotlib (rendered to PNG, embedded in PDF)
- File size target: < 2 MB
- Generation: Async via Celery worker

---

### 2.9 WebSocket Communication Protocol

#### 2.9.1 Connection Lifecycle

```
Client                              Server
  │                                    │
  │  GET /api/ws/session/{id}          │
  │  Upgrade: websocket                │
  │───────────────────────────────────▶│
  │                                    │
  │  101 Switching Protocols           │
  │◀───────────────────────────────────│
  │                                    │
  │  { type: "frame_data", ... }       │ (30 Hz)
  │───────────────────────────────────▶│
  │                                    │
  │  { type: "feedback", ... }         │ (per inference cycle)
  │◀───────────────────────────────────│
  │                                    │
  │  ... (repeat for session) ...      │
  │                                    │
  │  { type: "end_session" }           │
  │───────────────────────────────────▶│
  │                                    │
  │  { type: "session_summary", ... }  │
  │◀───────────────────────────────────│
  │                                    │
  │  Close (1000)                      │
  │◀──────────────────────────────────▶│
```

#### 2.9.2 Message Types

**Client → Server:**

| Type | Fields | Rate |
|---|---|---|
| `frame_data` | `timestamp`, `landmarks.keypoints[33][4]`, `landmarks.angles{}` | ~30 Hz |
| `end_session` | — | Once |
| `ping` | — | Every 30s |

**Server → Client:**

| Type | Fields | Rate |
|---|---|---|
| `feedback` | `exercise_label`, `confidence`, `rep_count`, `rep_phase`, `fit_score`, `sub_scores{}`, `risk{}`, `joint_feedback{}` | Per inference (~1-3 Hz) |
| `session_summary` | `overall_score`, `total_reps`, `duration`, `risk_events[]`, `sub_score_averages{}` | Once (on end) |
| `error` | `code`, `message` | As needed |
| `pong` | — | Response to ping |

---

## 3. Performance Specifications

### 3.1 Latency Budget

| Stage | Budget | Notes |
|---|---|---|
| Webcam frame capture | ~5 ms | Browser native |
| MediaPipe inference | ~15-25 ms | WASM + WebGL |
| Normalisation + angle computation | ~2 ms | Client-side JS |
| WebSocket transmit | ~5-15 ms | Network dependent |
| CNN-LSTM inference | ~20-30 ms | Server-side TensorFlow |
| FitScore computation | ~2 ms | Mathematical |
| Risk analysis | ~3 ms | Rule engine |
| WebSocket response | ~5-15 ms | Network dependent |
| **Total end-to-end** | **~57-92 ms** | **Under 100 ms target ✅** |

### 3.2 Memory & CPU Budget

| Component | Memory | CPU |
|---|---|---|
| MediaPipe (browser) | ~150 MB (WASM module) | 1 thread (GPU-accelerated via WebGL) |
| React application | ~50 MB | Main thread |
| FastAPI per connection | ~20 MB | 1 thread per WebSocket |
| TensorFlow model | ~50 MB | Shared across connections |
| PostgreSQL | ~256 MB (shared buffers) | As needed |

---

## 4. Error Handling Specification

### 4.1 Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| `AUTH_001` | 401 | Invalid credentials |
| `AUTH_002` | 401 | Token expired |
| `AUTH_003` | 403 | Insufficient permissions |
| `VAL_001` | 422 | Input validation failure |
| `SES_001` | 404 | Session not found |
| `SES_002` | 409 | Session already active |
| `ML_001` | 500 | Model inference failure |
| `ML_002` | 503 | Model not loaded |
| `LLM_001` | 503 | LLM API unavailable |
| `LLM_002` | 429 | LLM rate limit exceeded |
| `WS_001` | 1008 | WebSocket policy violation |
| `WS_002` | 1011 | Server internal error |
| `RPT_001` | 404 | Report not found |
| `RPT_002` | 503 | Report generation failed |

### 4.2 Retry & Fallback Policies

| Component | Retry Strategy | Fallback |
|---|---|---|
| WebSocket connection | Exponential backoff (1s, 2s, 4s, 8s, max 30s) | Display "Reconnecting..." banner |
| LLM API call | 2 retries with 1s delay | Rule-based feedback templates |
| Database query | 1 retry | Return cached data if available |
| Model inference | No retry (real-time constraint) | Skip frame; use last known result |
| Report generation | 3 retries | Notify user of failure |

---

## 5. Testing Specifications

### 5.1 Unit Testing

| Module | Framework | Coverage Target | Key Test Cases |
|---|---|---|---|
| Auth endpoints | pytest | 90% | Registration, login, token refresh, invalid credentials |
| FitScore Engine | pytest | 95% | All sub-score calculations, edge cases (0, 100), weight validation |
| FSM Rep Counter | pytest | 95% | All state transitions, partial reps, rapid movements |
| Injury Risk Engine | pytest | 90% | All rules triggered/not triggered, persistence logic |
| Normalisation | pytest | 90% | Edge cases (missing keypoints, zero torso length) |
| React components | Vitest + RTL | 80% | Rendering, user interactions, state updates |

### 5.2 Integration Testing

| Test Scenario | Method | Expected Result |
|---|---|---|
| Full auth flow | pytest + httpx | User can register, login, access protected endpoint |
| WebSocket session flow | pytest + websockets | Frame data sent, feedback received correctly |
| Session lifecycle | pytest + httpx | Create → stream data → end → summary correct |
| Report generation | pytest + Celery mock | Report PDF generated with correct data |

### 5.3 Model Validation

| Test | Method | Acceptance Criteria |
|---|---|---|
| Classification accuracy | Holdout test set (10%) | ≥ 93% |
| Per-class F1 | Confusion matrix analysis | No class below 0.85 F1 |
| Latency | Benchmark on reference hardware | < 30 ms per inference |
| Robustness | Varied lighting, angles, body types | Accuracy degrades < 5% |

---

*This specification provides the complete technical detail required to implement FitScore AI. For high-level architecture, see `architecture.md`. For design diagrams, see `design.md`. For implementation timeline, see `phases.md`.*
