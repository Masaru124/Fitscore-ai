# FitScore AI — UI/UX Design Plan

> **Version:** 1.0  
> **Date:** September 2025  
> **Project:** FitScore AI: A Real-Time Exercise Quality Scoring System using Pose Estimation and Deep-Learning  
> **Authors:** Preethi R, Ramyashri Ravikumar, Vaishnavi G N, Vaishnavi S

---

## 1. Design Vision

FitScore AI's interface should feel like a **premium personal trainer** — clean, motivating, and intelligent. The design balances complex biomechanical data with a calm, accessible interface that never overwhelms the user, especially during active exercise.

### 1.1 Design Principles

| # | Principle | Description |
|---|---|---|
| 1 | **Clarity Over Complexity** | Show the right information at the right time; progressive disclosure |
| 2 | **Motion-Friendly** | During exercise, UI is minimal and high-contrast; details come after |
| 3 | **Data as Motivation** | Scores, trends, and heatmaps should inspire improvement, not intimidate |
| 4 | **Accessible by Default** | WCAG AA compliant; supports screen readers and keyboard navigation |
| 5 | **Premium Feel** | Smooth animations, thoughtful micro-interactions, modern typography |

---

## 2. Design System

### 2.1 Colour Palette

#### Primary Palette

| Name | Hex | Usage |
|---|---|---|
| **Deep Navy** | `#0F172A` | Primary background (dark mode) |
| **Rich Indigo** | `#4F46E5` | Primary brand colour, CTAs, active states |
| **Electric Violet** | `#7C3AED` | Accent, gradients, highlights |
| **Soft White** | `#F8FAFC` | Primary background (light mode) |
| **Pure White** | `#FFFFFF` | Cards, surfaces |

#### Semantic Colours

| Name | Hex | Usage |
|---|---|---|
| **Success Green** | `#10B981` | Good form, high scores, correct alignment |
| **Warning Amber** | `#F59E0B` | Moderate risk, needs attention |
| **Danger Red** | `#EF4444` | High risk, injury alert, critical errors |
| **Info Blue** | `#3B82F6` | Informational messages, links |
| **Neutral Grey** | `#64748B` | Secondary text, borders, disabled states |

#### FitScore Gradient Scale

```
0–30:   #EF4444 → #F97316  (Poor — Red to Orange)
31–50:  #F97316 → #F59E0B  (Below Average — Orange to Amber)
51–70:  #F59E0B → #84CC16  (Average — Amber to Lime)
71–85:  #84CC16 → #10B981  (Good — Lime to Green)
86–100: #10B981 → #06B6D4  (Excellent — Green to Cyan)
```

#### Joint Feedback Colours

| Status | Colour | Meaning |
|---|---|---|
| **Correct** | `#10B981` (Green) | Joint within ideal range |
| **Caution** | `#F59E0B` (Amber) | Minor deviation; could improve |
| **Danger** | `#EF4444` (Red) | Significant deviation; injury risk |
| **Inactive** | `#475569` (Dark Grey) | Joint not relevant to current exercise |

### 2.2 Typography

| Level | Font | Weight | Size | Usage |
|---|---|---|---|---|
| **Display** | Inter | 800 | 48px / 3rem | Hero scores, large numbers |
| **Heading 1** | Inter | 700 | 30px / 1.875rem | Page titles |
| **Heading 2** | Inter | 600 | 24px / 1.5rem | Section titles |
| **Heading 3** | Inter | 600 | 20px / 1.25rem | Card titles |
| **Body** | Inter | 400 | 16px / 1rem | General text |
| **Body Small** | Inter | 400 | 14px / 0.875rem | Secondary text, labels |
| **Caption** | Inter | 500 | 12px / 0.75rem | Timestamps, metadata |
| **Monospace** | JetBrains Mono | 400 | 14px / 0.875rem | Scores, angles, data |

### 2.3 Spacing System

```
4px  — xs    (tight padding, icon gaps)
8px  — sm    (compact elements)
12px — md    (card padding inner)
16px — lg    (standard padding)
24px — xl    (section spacing)
32px — 2xl   (major section gaps)
48px — 3xl   (page margins)
64px — 4xl   (hero spacing)
```

### 2.4 Border Radius

| Element | Radius |
|---|---|
| Buttons | 8px |
| Cards | 12px |
| Modals | 16px |
| Badges/Tags | 9999px (pill) |
| Avatar | 50% (circle) |

### 2.5 Shadow System

| Level | Box Shadow | Usage |
|---|---|---|
| **Subtle** | `0 1px 3px rgba(0,0,0,0.08)` | Cards, hover states |
| **Medium** | `0 4px 12px rgba(0,0,0,0.12)` | Dropdowns, popovers |
| **Large** | `0 8px 24px rgba(0,0,0,0.16)` | Modals, dialogs |
| **Glow (brand)** | `0 0 24px rgba(79,70,229,0.3)` | Active score gauge, focused inputs |

---

## 3. Page Designs & Wireframes

### 3.1 Login / Register Page

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                     ┌─────────────────┐                      │
│                     │                 │                      │
│                     │   FitScore AI   │                      │
│                     │      Logo       │                      │
│                     │                 │                      │
│                     └─────────────────┘                      │
│                                                              │
│               "Your AI-Powered Fitness Coach"                │
│                                                              │
│              ┌───────────────────────────┐                   │
│              │  📧 Email                 │                   │
│              └───────────────────────────┘                   │
│              ┌───────────────────────────┐                   │
│              │  🔒 Password              │                   │
│              └───────────────────────────┘                   │
│                                                              │
│              ┌───────────────────────────┐                   │
│              │      Sign In  →           │ ← Indigo button   │
│              └───────────────────────────┘                   │
│                                                              │
│              Don't have an account? Sign Up                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Background: Subtle gradient animation               │    │
│  │  (Deep Navy → Indigo → Violet, slow-moving)          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Full-screen gradient background with slow-moving animation
- Glassmorphism card for the form (frosted glass effect)
- Minimal, focused layout — no distractions
- Social login buttons (future: Google, Apple)
- Password strength indicator on register page

---

### 3.2 Dashboard Page

```
┌──────┬───────────────────────────────────────────────────────┐
│      │  Dashboard                          [User Avatar ▼]  │
│  N   │                                                       │
│  A   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  V   │  │ Overall  │ │ Total   │ │ Sessions│ │ Streak  │   │
│      │  │ FitScore │ │ Reps    │ │ This    │ │         │   │
│  S   │  │          │ │         │ │ Week    │ │ 5 days  │   │
│  I   │  │   78 🟢  │ │  342    │ │   12    │ │ 🔥      │   │
│  D   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│  E   │                                                       │
│  B   │  ┌──────────────────────────────────────────────────┐ │
│  A   │  │  FitScore Trend                    [7d|30d|90d] │ │
│  R   │  │                                                  │ │
│      │  │  100┤                                            │ │
│  ──  │  │   80┤         ╱╲    ╱╲  ╱──                     │ │
│      │  │   60┤    ╱╲╱╲╱  ╲╱╱  ╲╱                        │ │
│  📊  │  │   40┤╱╲╱╱                                       │ │
│  D   │  │   20┤                                            │ │
│  a   │  │     └──────────────────────────                  │ │
│  s   │  │      Sep 1       Sep 8       Sep 15              │ │
│  h   │  └──────────────────────────────────────────────────┘ │
│      │                                                       │
│  🏋  │  ┌───────────────────┐ ┌────────────────────────────┐ │
│  W   │  │  Muscle Heatmap   │ │  Recent Sessions           │ │
│  o   │  │                   │ │                            │ │
│  r   │  │   ┌───────────┐   │ │  🏋 Squat    85  12 reps  │ │
│  k   │  │   │           │   │ │  🏋 Lunge    72   8 reps  │ │
│  o   │  │   │  Body     │   │ │  🏋 Push-up  68  10 reps  │ │
│  u   │  │   │  Outline  │   │ │  🏋 Curl     91  15 reps  │ │
│  t   │  │   │  with     │   │ │  🏋 Squat    79  12 reps  │ │
│      │  │   │  Heatmap  │   │ │                            │ │
│  📋  │  │   │  Overlay  │   │ │  [View All →]              │ │
│  H   │  │   └───────────┘   │ │                            │ │
│  i   │  └───────────────────┘ └────────────────────────────┘ │
│  s   │                                                       │
│  t   │  ┌──────────────────────────────────────────────────┐ │
│      │  │  Injury Risk Timeline                            │ │
│  📄  │  │  ──●────────●──────────────────●──              │ │
│  R   │  │    Low      Mod               Low               │ │
│  e   │  └──────────────────────────────────────────────────┘ │
│  p   │                                                       │
│      │                                                       │
│  👤  │                                                       │
│  P   │                                                       │
└──────┴───────────────────────────────────────────────────────┘
```

**Design Notes:**
- Left sidebar navigation with icons + labels (collapsible)
- Top row: stat cards with glassmorphism effect and subtle glow
- FitScore trend: smooth line chart with gradient fill below the line
- Muscle heatmap: body silhouette with colour intensity mapping
- Recent sessions: compact list with score badge colours
- Risk timeline: scatter/timeline chart with colour-coded dots
- All cards have hover lift animation

---

### 3.3 Workout / Live Session Page

#### 3.3.1 Camera Setup Screen

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                    Camera Setup                              │
│                                                              │
│        ┌──────────────────────────────────┐                  │
│        │                                  │                  │
│        │       Live Preview               │                  │
│        │                                  │                  │
│        │    ┌──────────────────────┐      │                  │
│        │    │                      │      │                  │
│        │    │   Body Outline       │      │                  │
│        │    │   Guide (dotted)     │      │                  │
│        │    │                      │      │                  │
│        │    └──────────────────────┘      │                  │
│        │                                  │                  │
│        └──────────────────────────────────┘                  │
│                                                              │
│        ✅ Full body visible                                  │
│        ✅ Good lighting detected                             │
│        ⚠️ Step back slightly                                │
│                                                              │
│        ┌──────────────────────────────┐                      │
│        │   Continue to Exercise →     │                      │
│        └──────────────────────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### 3.3.2 Exercise Selector

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                  Select Exercise                             │
│                                                              │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│    │          │  │          │  │          │  │          │  │
│    │  Squat   │  │  Lunge   │  │ Push-up  │  │  Bicep   │  │
│    │    🏋    │  │    🦵    │  │    💪    │  │  Curl    │  │
│    │          │  │          │  │          │  │    💪    │  │
│    └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
│    Selected: Squat                                           │
│    Target: 12 reps  |  Tempo: 3s/rep                         │
│                                                              │
│    ┌──────────────────────────────┐                          │
│    │      Start Session →        │                          │
│    └──────────────────────────────┘                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### 3.3.3 Live Session (Active Workout Mode)

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │                                                       │  │
│  │               Live Video Feed                         │  │
│  │               with Skeletal Overlay                   │  │
│  │                                                       │  │
│  │           (Joint dots: 🟢 🟡 🔴)                     │  │
│  │           (Bone lines connecting joints)              │  │
│  │                                                       │  │
│  │                                                       │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────┐              ┌───────────────┐          ┌──────┐  │
│  │ REPS │              │               │          │ TIME │  │
│  │      │              │   FitScore    │          │      │  │
│  │  5   │              │     82        │          │ 2:15 │  │
│  │      │              │   ╱────╲      │          │      │  │
│  │ /12  │              │  │  🟢  │     │          │      │  │
│  └──────┘              │   ╲────╱      │          └──────┘  │
│                        │               │                    │
│                        └───────────────┘                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ⚠️ INJURY ALERT: Knees collapsing inward — push     │   │
│  │    knees over toes                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────┐                                      │
│  │   End Session  ■   │                                      │
│  └────────────────────┘                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Active Workout Mode Design Notes:**
- **Minimal UI:** During exercise, only essential data visible (reps, score, timer)
- **Full-screen video** with skeleton overlay at maximum size
- **FitScore gauge:** Large, central circular gauge with smooth animation
- **Colour updates:** Score gauge changes colour based on score gradient scale
- **Injury alert:** Slides in from bottom; red background; auto-hides after 5s unless risk persists
- **Joint colours:** Skeleton joints glow green/amber/red based on real-time evaluation
- **No sidebar:** Navigation hidden during active workout
- **End session:** Red button, requires confirmation tap

---

### 3.4 Session Summary Page

```
┌──────┬───────────────────────────────────────────────────────┐
│      │  Session Summary                      Sep 16, 2025   │
│  N   │                                                       │
│  A   │  ┌──────────────────────────────────────────────────┐ │
│  V   │  │           Overall FitScore: 82                   │ │
│      │  │                                                  │ │
│  S   │  │          ╭────────────────╮                       │ │
│  I   │  │         │    82 / 100    │                       │ │
│  D   │  │          ╰────────────────╯                       │ │
│  E   │  │                                                  │ │
│  B   │  │  Reps: 12  |  Duration: 3:45  |  Risk: Low      │ │
│  A   │  └──────────────────────────────────────────────────┘ │
│  R   │                                                       │
│      │  ┌──────────────────────────────────────────────────┐ │
│      │  │  Sub-Score Breakdown         (Radar Chart)       │ │
│      │  │                                                  │ │
│      │  │         Alignment: 85                            │ │
│      │  │            ╱╲                                    │ │
│      │  │     ROM  ╱    ╲  Symmetry                       │ │
│      │  │       78 ╲    ╱ 88                              │ │
│      │  │            ╲╱                                    │ │
│      │  │     Stability: 80    Tempo: 82                  │ │
│      │  └──────────────────────────────────────────────────┘ │
│      │                                                       │
│      │  ┌──────────────────────────────────────────────────┐ │
│      │  │  AI Coaching Feedback                            │ │
│      │  │                                                  │ │
│      │  │  🤖 "Great session! Your alignment improved by   │ │
│      │  │  8% compared to last week. Focus on deepening    │ │
│      │  │  your squat — your ROM score of 78 suggests      │ │
│      │  │  you're stopping short of parallel. Try box       │ │
│      │  │  squats to build confidence at the bottom."       │ │
│      │  │                                                  │ │
│      │  │  [Generate Weekly Plan →]                        │ │
│      │  └──────────────────────────────────────────────────┘ │
│      │                                                       │
│      │  ┌──────────────────────────────────────────────────┐ │
│      │  │  Rep-by-Rep Breakdown                            │ │
│      │  │                                                  │ │
│      │  │  Rep 1: 85  ███████████████████░░░   🟢         │ │
│      │  │  Rep 2: 82  ██████████████████░░░░   🟢         │ │
│      │  │  Rep 3: 79  █████████████████░░░░░   🟢         │ │
│      │  │  Rep 4: 72  ██████████████░░░░░░░░   🟡         │ │
│      │  │  ...                                             │ │
│      │  └──────────────────────────────────────────────────┘ │
│      │                                                       │
│      │  ┌──────────────────────────────────────────────────┐ │
│      │  │  Risk Events Log                                 │ │
│      │  │                                                  │ │
│      │  │  0:45  ⚠️ Moderate — Left knee valgus (Rep 4)   │ │
│      │  │  1:22  ⚠️ Low — Slight trunk lean (Rep 7)       │ │
│      │  └──────────────────────────────────────────────────┘ │
│      │                                                       │
│      │  [← Back to Dashboard]    [Start New Session →]      │
│      │                                                       │
└──────┴───────────────────────────────────────────────────────┘
```

---

### 3.5 Reports Page

```
┌──────┬───────────────────────────────────────────────────────┐
│      │  Reports                              [User Avatar]  │
│  N   │                                                       │
│  A   │  ┌──────────────────────────────────────────────────┐ │
│  V   │  │  Generate New Report                             │ │
│      │  │                                                  │ │
│  S   │  │  Report Type: [Performance Summary ▼]            │ │
│  I   │  │  Date Range:  [Sep 1] to [Sep 16]               │ │
│  D   │  │                                                  │ │
│  E   │  │  [📄 Generate Report]                            │ │
│  B   │  └──────────────────────────────────────────────────┘ │
│  A   │                                                       │
│  R   │  ┌──────────────────────────────────────────────────┐ │
│      │  │  Report History                                  │ │
│      │  │                                                  │ │
│      │  │  📄 Performance Summary — Sep 1-15    [Download] │ │
│      │  │  📄 Weekly Progress — Sep 8-15        [Download] │ │
│      │  │  📄 Rehabilitation Report — Sep 1-10  [Download] │ │
│      │  └──────────────────────────────────────────────────┘ │
│      │                                                       │
└──────┴───────────────────────────────────────────────────────┘
```

---

## 4. Interaction Design

### 4.1 Micro-Animations

| Element | Animation | Duration | Trigger |
|---|---|---|---|
| FitScore Gauge | Smooth number count-up + arc fill | 800ms | Score update |
| Rep Counter | Scale-up bounce + fade | 300ms | New rep completed |
| Joint Colour | Smooth colour transition | 200ms | Status change |
| Injury Alert | Slide up from bottom + shake | 400ms | Risk detected |
| Score Badge | Pulse glow | 600ms | New score |
| Card Hover | Lift (translateY -2px) + shadow increase | 200ms | Mouse hover |
| Page Transition | Fade + slide-up | 300ms | Route change |
| Skeleton Overlay | Smooth keypoint interpolation | Per frame | Pose update |
| Button Press | Scale down (0.97) + shadow decrease | 100ms | Click |
| Loading State | Skeleton shimmer | Continuous | Data loading |

### 4.2 State Transitions

```
Idle ─────────▶ Camera Setup ─────────▶ Exercise Select
                     │                        │
                     │ (camera denied)         │
                     ▼                         ▼
              Error Modal              Active Workout
                                            │
                                            │ (tracking lost)
                                            ▼
                                      "Reposition" Overlay
                                            │
                                            │ (tracking restored)
                                            ▼
                                      Active Workout
                                            │
                                            │ (end session)
                                            ▼
                                      Session Summary
                                            │
                                    ┌───────┼────────┐
                                    ▼       ▼        ▼
                              Dashboard  New Session  Reports
```

---

## 5. Responsive Design

### 5.1 Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| **Desktop** | ≥ 1280px | Sidebar + full content area |
| **Tablet** | 768px – 1279px | Collapsed sidebar (icons only) + content |
| **Mobile** | < 768px | Bottom navigation bar + full-width content |

### 5.2 Workout Mode Responsiveness

| Breakpoint | Video Size | Score Display | Controls |
|---|---|---|---|
| Desktop | 70% width | Side panel | Side controls |
| Tablet | Full width | Floating overlay | Floating controls |
| Mobile | Full width | Compact overlay | Bottom bar |

---

## 6. Accessibility Plan

### 6.1 WCAG AA Compliance Checklist

| Category | Requirement | Implementation |
|---|---|---|
| **Colour Contrast** | 4.5:1 minimum for text | Verified with contrast checker tools |
| **Focus Indicators** | Visible focus ring on all interactive elements | 2px solid indigo outline |
| **Keyboard Navigation** | All features accessible via keyboard | Tab order, Enter/Space for actions |
| **Screen Reader** | All images and icons have alt text / aria-labels | `aria-label`, `aria-live` for dynamic content |
| **Motion** | Respect `prefers-reduced-motion` | Disable animations when set |
| **Text Scaling** | UI usable at 200% zoom | Rem-based sizing, flexible layouts |
| **Error Messages** | Clear, descriptive error text associated with fields | `aria-describedby` on form inputs |
| **Live Regions** | Dynamic score/alert updates announced | `aria-live="polite"` for scores, `"assertive"` for alerts |

### 6.2 Accessibility for Active Workout

| Feature | Accessible Alternative |
|---|---|
| Visual skeleton overlay | Audio cues (beep on good rep, tone on risk) |
| Colour-coded joints | Shape-coded indicators (✓ / ⚠ / ✗) alongside colours |
| Injury alert banner | Audio alert + screen reader announcement |
| Score gauge | Numeric score always visible alongside gauge |

---

## 7. User Flow Diagrams

### 7.1 First-Time User Journey

```
Landing Page → Register → Profile Setup → Camera Setup → First Exercise
     │                                                        │
     │                                                        ▼
     │                                                  Session Summary
     │                                                        │
     │                                                        ▼
     └───────────────────────────────────────────────── Dashboard
```

### 7.2 Returning User Journey

```
Login → Dashboard → Select Exercise → Camera Check → Active Workout
                                                          │
                                                          ▼
                                                    Session Summary
                                                          │
                                              ┌───────────┼───────────┐
                                              ▼           ▼           ▼
                                          Dashboard   AI Coaching   Reports
```

### 7.3 Report Generation Flow

```
Dashboard → Reports Page → Select Type & Range → Generate → Processing...
                                                                │
                                                                ▼
                                                          Report Ready
                                                                │
                                                          [Download PDF]
```

---

## 8. Dark Mode Design

### 8.1 Dark Mode Palette

| Element | Light Mode | Dark Mode |
|---|---|---|
| Background | `#F8FAFC` | `#0F172A` |
| Surface (Cards) | `#FFFFFF` | `#1E293B` |
| Primary Text | `#0F172A` | `#F1F5F9` |
| Secondary Text | `#64748B` | `#94A3B8` |
| Border | `#E2E8F0` | `#334155` |
| Input Background | `#FFFFFF` | `#1E293B` |
| Sidebar | `#F1F5F9` | `#0F172A` |
| Hover State | `#E2E8F0` | `#334155` |

### 8.2 Implementation

- Use CSS custom properties (`--color-bg`, `--color-surface`, etc.)
- Toggle via `data-theme="dark"` attribute on `<html>`
- Persist preference in `localStorage`
- Respect `prefers-color-scheme` media query for auto-detection
- Workout mode: always dark background for contrast

---

## 9. Loading & Empty States

### 9.1 Loading States

| Scenario | Treatment |
|---|---|
| Page loading | Skeleton screens matching content layout |
| Data fetching | Shimmer animation on placeholder elements |
| Model loading (first time) | Progress bar with "Loading AI Engine..." text |
| Report generating | Spinner with percentage + "Generating your report..." |
| AI coaching thinking | Typing animation dots ("FitScore AI is analysing...") |

### 9.2 Empty States

| Scenario | Message | CTA |
|---|---|---|
| No sessions yet | "Ready to get started? Your first workout is just a click away." | "Start Your First Workout →" |
| No reports | "Generate your first performance report to track your progress." | "Create Report →" |
| No trend data | "Complete a few sessions to see your FitScore trend here." | "Start Workout →" |

---

## 10. Design Deliverables Checklist

| # | Deliverable | Status |
|---|---|---|
| 1 | Design token system (CSS custom properties) | Specified above |
| 2 | Colour palette (light + dark mode) | Specified above |
| 3 | Typography scale | Specified above |
| 4 | Spacing system | Specified above |
| 5 | Login/Register wireframe | Specified above |
| 6 | Dashboard wireframe | Specified above |
| 7 | Workout mode wireframe (setup, select, active, summary) | Specified above |
| 8 | Reports page wireframe | Specified above |
| 9 | Component specifications | See `design.md` §9 |
| 10 | Animation specifications | Specified above |
| 11 | Responsive breakpoints | Specified above |
| 12 | Accessibility plan | Specified above |
| 13 | User flow diagrams | Specified above |
| 14 | Dark mode specifications | Specified above |
| 15 | Loading & empty states | Specified above |

---

*This UI/UX plan provides the complete design foundation for FitScore AI's interface. For component-level specifications, see `design.md`. For the full feature list, see `prd.md`. For implementation timeline, see `phases.md`.*
