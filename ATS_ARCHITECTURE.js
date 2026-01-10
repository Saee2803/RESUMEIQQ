/**
 * ATS INTELLIGENCE ENGINE - ARCHITECTURE DIAGRAM
 * 
 * ┌────────────────────────────────────────────────────────────────┐
 * │                    RESUMAVE EDITOR PAGE                        │
 * │              (app/editor/page.js - 'use client')               │
 * └────────────────────────────────────────────────────────────────┘
 *                              ↓
 *         ┌───────────────────────────────────────────┐
 *         │     useATSAnalysis() Hook                 │
 *         │   (hooks/useATSAnalysis.js)               │
 *         │  - Listens to Redux resume state          │
 *         │  - 500ms debounce                         │
 *         │  - Calls calculateATSScore()              │
 *         │  - Dispatches updateATSAnalysis()         │
 *         └───────────────────────────────────────────┘
 *                              ↓
 *         ┌───────────────────────────────────────────┐
 *         │  Scoring Engine                           │
 *         │  (utils/atsScoring.js)                    │
 *         │  ┌─────────────────────────────────────┐  │
 *         │  │ scoreContact() → 15 pts             │  │
 *         │  │ scoreSummary() → 10 pts             │  │
 *         │  │ scoreEducation() → 15 pts           │  │
 *         │  │ scoreExperience() → 30 pts          │  │
 *         │  │ scoreProjects() → 15 pts            │  │
 *         │  │ scoreSkills() → 15 pts              │  │
 *         │  │ scoreActionVerbs() → 10 pts         │  │
 *         │  │ scoreFormatting() → 5 pts           │  │
 *         │  │ ─────────────────────────────────   │  │
 *         │  │ TOTAL = 100 pts                     │  │
 *         │  │                                     │  │
 *         │  │ + generateSuggestions()             │  │
 *         │  │ + getScoreGrade()                   │  │
 *         │  │ + getScoreColor()                   │  │
 *         │  └─────────────────────────────────────┘  │
 *         └───────────────────────────────────────────┘
 *                              ↓
 *         ┌───────────────────────────────────────────┐
 *         │      Redux ATS Slice                      │
 *         │  (store/slices/atsSlice.js)               │
 *         │  State: {                                 │
 *         │    score: 0-100                           │
 *         │    grade: 'A'|'B'|'C'|'D'|'F'             │
 *         │    breakdown: {...}                       │
 *         │    suggestions: [...]                     │
 *         │  }                                        │
 *         └───────────────────────────────────────────┘
 *                              ↓
 *         ┌───────────────────────────────────────────┐
 *         │       ATS UI Components                   │
 *         │    (components/ATS/...)                   │
 *         │                                           │
 *         │  ┌─────────────────────────────────────┐  │
 *         │  │  ATSPanel (index.js)                │  │
 *         │  │  ├─ Score Display                   │  │
 *         │  │  │  ├─ Number (0-100)              │  │
 *         │  │  │  ├─ Progress bar                │  │
 *         │  │  │  └─ Grade badge (A-F)           │  │
 *         │  │  └─ Tabs:                          │  │
 *         │  │     ├─ Breakdown                   │  │
 *         │  │     └─ Suggestions                 │  │
 *         │  └─────────────────────────────────────┘  │
 *         │         ↓                  ↓              │
 *         │  ┌──────────────┐  ┌──────────────────┐  │
 *         │  │ScoreBreakdown│  │SuggestionsPanel  │  │
 *         │  │              │  │                  │  │
 *         │  │ 👤 Contact   │  │ 💡 Suggestions   │  │
 *         │  │ 📝 Summary   │  │                  │  │
 *         │  │ 🎓 Education │  │ Priority:        │  │
 *         │  │ 💼 Experience│  │ - High Impact    │  │
 *         │  │ 🚀 Projects  │  │ - Medium Impact  │  │
 *         │  │ ⚙️ Skills    │  │ - Low Impact     │  │
 *         │  │ ✨ Verbs     │  │                  │  │
 *         │  │ ✓ Formatting │  │ Total Potential: │  │
 *         │  │              │  │ +X points        │  │
 *         │  └──────────────┘  └──────────────────┘  │
 *         └───────────────────────────────────────────┘
 *                              ↓
 *         ┌───────────────────────────────────────────┐
 *         │      Rendered in Browser                  │
 *         │                                           │
 *         │  Right Sidebar:                           │
 *         │  ┌─────────────────────────────────────┐  │
 *         │  │       PDF Preview (existing)        │  │
 *         │  └─────────────────────────────────────┘  │
 *         │  ┌─────────────────────────────────────┐  │
 *         │  │   ATS Panel (new feature)           │  │
 *         │  │                                     │  │
 *         │  │   ATS Intelligence              → A │  │
 *         │  │   75/100 Progress bar           □■■ │  │
 *         │  │                                     │  │
 *         │  │   [Breakdown] [Suggestions]         │  │
 *         │  │   👤 15/15 ███████████████         │  │
 *         │  │   💼 24/30 ████████████            │  │
 *         │  │   ...                               │  │
 *         │  └─────────────────────────────────────┘  │
 *         └───────────────────────────────────────────┘
 * 
 * 
 * DATA FLOW TIMING
 * ═══════════════════════════════════════════════════════════════
 * 
 * User Types:
 *   │
 *   ├─ T=0ms: Input change detected
 *   │
 *   ├─ T=100ms: useATSAnalysis debounce timer reset
 *   │
 *   ├─ T=500ms: Calculation begins
 *   │   └─ scoreContact() ...
 *   │   └─ scoreExperience() ...
 *   │   └─ 8 functions complete (~5-20ms total)
 *   │
 *   ├─ T=510ms: Results dispatched to Redux
 *   │
 *   ├─ T=515ms: Components re-render
 *   │
 *   └─ T=520ms: User sees updated ATS panel
 *       (feels instant; perceived latency = ~500ms after typing stops)
 * 
 * 
 * REDUX STORE STRUCTURE
 * ═══════════════════════════════════════════════════════════════
 * 
 * store: {
 *   resume: {
 *     contact: {...},
 *     summary: {...},
 *     education: [...],
 *     experience: [...],
 *     projects: [...],
 *     skills: {...},
 *     certificates: [...],
 *     languages: [...],
 *     saved: true|false
 *   },
 *   ats: {  // ← ATS slice added
 *     score: 75,
 *     maxScore: 100,
 *     grade: 'C',
 *     breakdown: {
 *       contact: { score: 15, maxScore: 15, details: {...} },
 *       summary: { score: 10, maxScore: 10, details: {...} },
 *       education: { score: 15, maxScore: 15, details: {...} },
 *       experience: { score: 24, maxScore: 30, details: {...} },
 *       projects: { score: 0, maxScore: 15, details: {...} },
 *       skills: { score: 11, maxScore: 15, details: {...} },
 *       actionVerbs: { score: 0, maxScore: 10, details: {...} },
 *       formatting: { score: 0, maxScore: 5, details: {...} }
 *     },
 *     suggestions: [
 *       {
 *         category: 'Professional Experience',
 *         priority: 'high',
 *         text: 'Add 3-5 bullet points per job...',
 *         points: 10
 *       },
 *       ...
 *     ],
 *     timestamp: 1703592000000,
 *     lastUpdated: 1703592000500
 *   }
 * }
 * 
 * 
 * COMPONENT HIERARCHY
 * ═══════════════════════════════════════════════════════════════
 * 
 * EditorPage
 *   ├─ useATSAnalysis() [hook]
 *   │   └─ calculateATSScore(resume)
 *   │   └─ dispatch(updateATSAnalysis)
 *   │
 *   ├─ Tabs
 *   │   └─ [Tab buttons: contact, summary, education, ...]
 *   │
 *   ├─ Editor
 *   │   ├─ SingleEditor or MultiEditor
 *   │   │   └─ [Form inputs]
 *   │   └─ [Save button]
 *   │
 *   ├─ Preview
 *   │   └─ [PDF render]
 *   │
 *   └─ ATSPanel [new]
 *       ├─ Score display
 *       ├─ Progress bar
 *       ├─ Tab buttons
 *       └─ ScoreBreakdown or SuggestionsPanel
 *           ├─ ScoreBreakdown
 *           │   └─ [8 section scores with bars]
 *           └─ SuggestionsPanel
 *               └─ [Prioritized suggestions]
 * 
 */
