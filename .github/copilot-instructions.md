# Resumave AI Agent Guidelines

## Project Overview
Resumave is an **ATS-friendly resume builder** built with Next.js 14, React Redux, and React-PDF. Users create resumes without login, with auto-save via localStorage and PDF export in A4 format.

## Architecture

### Core Data Flow
1. **State Management**: Redux Toolkit centralized in `/store/index.js`
   - Single reducer: `resume` slice (`/store/slices/resumeSlice.js`)
   - Auto-persists to localStorage every 2.5s via debounced `saveState()`
   - `state.saved` flag tracks if latest changes are rendered to PDF

2. **Resume Structure**: Defined in `/config/ResumeFields.js`
   - 8 sections: `contact`, `summary`, `education`, `experience`, `projects`, `skills`, `certificates`, `languages`
   - Single-entry: contact, summary, skills (stored as objects)
   - Multi-entry: education, experience, projects, certificates, languages (stored as arrays)
   - Field metadata includes `label`, `placeholder`, `type` (textarea/email/month/tel)

3. **UI Split**:
   - **Left panel** (`/app/editor/page.js`): Tab-based editor routing to `<Editor>` component
   - **Right panel**: Live PDF preview using React-PDF (`@react-pdf/renderer`)
   - **Tabs** (`/components/Tabs.js`): Navigation between resume sections

### Key Components

| Component | Purpose |
|-----------|---------|
| `Editor/index.js` | Dispatch form, auto-save every 10s, route to Single/Multi |
| `Editor/SingleEditor.js` | Render flat forms (contact, summary, skills) |
| `Editor/MultiEditor.js` | Render array-based cards with add/delete/reorder (move up/down) |
| `Resume/Preview.js` | PDF preview; regenerates on `state.saved = true` |
| `Resume/pdf/index.js` | React-PDF Document component; renders sections via `<Section>` |
| `Resume/pdf/Section.js` | Repeatable section renderer (calls `<ListItem>` per entry) |
| `UI/Input.js` | Controlled input wrapper; triggers `updateResumeValue` dispatch |

## Redux Pattern
```javascript
// Action payload structure
updateResumeValue({ tab, name, value, index })  // index only for arrays
addNewIndex({ tab, name, value })               // Push {} to array
deleteIndex({ tab, index })                     // Remove from array
moveIndex({ tab, index, dir: 'up'|undefined })  // Swap adjacent items
saveResume()                                     // Set saved=true for PDF render
```

## Styling
- **Tailwind CSS** (`/tailwind.config.js`) with custom `primary` color scale
- **SCSS** (`/app/globals.scss`) defines `.btn`, `.btn-filled`, `.card` components
- **PDF Styles**: `/components/Resume/Styles.js` uses `@react-pdf/renderer` StyleSheet API
  - Times-Roman font for ATS compatibility
  - No complex layouts; ensures text extraction by scanners

## Development Workflow
- **Dev**: `pnpm dev` (Next.js dev server)
- **Build**: `pnpm build` → `pnpm start`
- **Lint**: `pnpm lint`
- **localStorage key**: `reduxState` (manual testing: `localStorage.getItem('reduxState')`)

## Common Patterns

### Adding a Resume Field
1. Add to `ResumeFields[tab].fields[]` in `/config/ResumeFields.js`
2. `Input` component auto-renders from metadata; no manual UI needed
3. Dispatch `updateResumeValue` on change (handled by Input wrapper)
4. For PDF display, update `/components/Resume/pdf/Renderer.js` or `ListItem.js`

### Reordering Array Sections
- `MultiEditor` dispatches `moveIndex({ tab, index, dir })` on arrow clicks
- Redux swaps `state[tab][index]` with adjacent entry
- `saved=false` triggers PDF regeneration

### PDF Generation
- Trigger: When `resumeData.saved` changes from false to true
- Mechanism: `usePDF` hook re-renders `<Resume>` component
- Limits: React-PDF lacks advanced layouts; use simple stacked sections

## Important Notes
- **No authentication**: All data client-side via localStorage
- **Responsive**: Editor and PDF preview stack on mobile; CSS grid layout in `/app/editor/layout.js`
- **ATS compliance**: Plain PDF text, no images/complex styling in resume PDF
- **Persist context**: Always load initial state from localStorage in `store/index.js` before rendering

## File Structure for Quick Navigation
```
app/
  (Home)/         ← Landing page
  editor/
    page.js       ← Tab router for sections
    layout.js     ← Two-column grid (editor | preview)
  globals.scss    ← Tailwind + CSS layer components

components/
  Editor/         ← Form editors (Single/Multi)
  Resume/
    pdf/          ← React-PDF components
    Preview.js    ← PDF preview pane
    Styles.js     ← PDF stylesheet

config/
  ResumeFields.js ← Resume section schema

store/
  slices/
    resumeSlice.js ← Redux reducer
  index.js        ← Store config + localStorage persist
```

## Red Flags & Gotchas
- **Unsaved changes**: Redux state updates don't save to PDF until `saveResume()` action fires
- **localStorage limits**: Check browser quota if resume exceeds ~5MB (JSON stringified)
- **Array indices**: MultiEditor keyed by index (i); reorder operations must maintain data integrity
- **Month type inputs**: Rendered as HTML month picker; format validation in Input component
- **Textarea multipoints**: Experience/projects descriptions support bullet lists (delimiter-based parsing)
