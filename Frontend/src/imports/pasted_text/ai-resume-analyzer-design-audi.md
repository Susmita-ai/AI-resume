Continue the existing **AI Resume Analyzer** Figma project.

This is the final design-quality phase.

Do not add major new features. Do not redesign the product. Instead, review everything created in the previous phases and make the entire application visually consistent, accessible, responsive, and production-ready.

# 1. Full Product Audit

Review every screen:

* Landing Page
* Login
* Sign Up
* Forgot Password
* Email Verification
* Onboarding
* Analyze Resume
* Upload Resume
* AI Analysis Loading
* Analysis Dashboard
* My Resumes
* Job Matches
* Job Match Details
* Recommendations
* Recommendation Details
* AI Resume Copilot
* Resume Report
* Recruiter Dashboard
* Candidate Screening
* Candidate Details
* Candidate Comparison
* Recruiter Reports
* Profile
* Settings
* Help
* Error Pages
* Empty States
* Dark Mode
* Mobile Screens

Check that all screens look like the same product.

# 2. Visual Consistency

Standardize:

* Colors
* Typography
* Font weights
* Border radius
* Shadows
* Icon style
* Button height
* Input height
* Card padding
* Section spacing
* Page margins
* Grid spacing
* Navigation spacing

Remove inconsistent styles.

If two components perform the same function, make them visually identical.

# 3. Typography Audit

Create a clear hierarchy:

Display
H1
H2
H3
Body Large
Body
Body Small
Caption
Label
Button

Ensure:

* Headings are clearly distinguishable
* Body text is readable
* Line height is comfortable
* Text does not overflow
* Long content wraps correctly

# 4. Spacing Audit

Use a consistent spacing system.

Prefer:

4
8
12
16
24
32
40
48
64

Fix:

* Uneven padding
* Misaligned cards
* Inconsistent gaps
* Crowded sections
* Excessive whitespace

# 5. Component Audit

Ensure repeated components use reusable components rather than independent copies.

Audit:

Buttons
Inputs
Cards
Score Cards
Badges
Skill Chips
Navigation
Tables
Modals
Alerts
Toasts
Progress Indicators
Recommendation Cards
Upload Components

Create variants where required.

# 6. Design Tokens

Ensure the design system has variables for:

### Colors

Primary
Secondary
Background
Surface
Border
Text Primary
Text Secondary
Success
Warning
Error
Info

### Typography

Font family
Font size
Font weight
Line height

### Spacing

4
8
12
16
24
32
40
48
64

### Radius

Small
Medium
Large
Full

### Shadows

Small
Medium
Large

# 7. Accessibility Audit

Review the application for accessibility.

Ensure:

* Sufficient color contrast
* Clear focus states
* Readable font sizes
* Buttons have meaningful labels
* Icons have supporting labels where necessary
* Form fields have labels
* Errors are clearly explained
* Status is not communicated only through color
* Mobile touch targets are sufficiently large

# 8. Responsive Audit

Review desktop, tablet, and mobile.

### Desktop

1440px

### Tablet

1024px

### Mobile

390px

Check:

* No overlapping elements
* No clipped text
* No horizontal overflow
* Cards resize correctly
* Charts remain readable
* Tables have appropriate responsive behavior
* Navigation works correctly
* Buttons remain accessible

# 9. Dashboard Audit

Ensure the main dashboard immediately communicates:

**Resume Score**

**ATS Score**

**Job Match**

**Skills**

**Recommendations**

The most important information should appear above the fold.

Avoid unnecessary decorative elements.

# 10. AI Copilot Audit

Ensure the Copilot clearly communicates:

Current Version
→ AI Suggestion
→ Improved Version
→ Apply

Make the primary action obvious.

Avoid making AI-generated content look like verified factual information.

Use clear labels such as:

**AI Suggestion**

**Generated Content**

# 11. Recruiter Dashboard Audit

Ensure recruiter screens clearly distinguish:

AI screening assistance

from

Human decision-making.

Use neutral language such as:

**AI Match Score**

**Skills Detected**

**Experience Match**

**Review Candidate**

Avoid UI wording that implies an automated score alone determines hiring decisions.

# 12. Data Visualization Audit

Review all charts and score visualizations.

Ensure:

* Labels are readable
* Values are clear
* Charts are not decorative only
* Similar metrics use consistent visualization
* Positive/negative states are understandable
* Mobile versions remain usable

# 13. Empty & Error State Audit

Every major page should have a meaningful state for:

Empty
Loading
Success
Error
Disabled
Processing

Each state should provide a clear next action.

# 14. Interaction Audit

Review prototype interactions.

Verify:

Landing
→ Authentication
→ Onboarding
→ Resume Upload
→ Job Description
→ AI Analysis
→ Dashboard
→ Job Match
→ Recommendations
→ AI Copilot
→ Report

Recruiter:

Login
→ Dashboard
→ Jobs
→ Candidates
→ Candidate Details
→ Comparison
→ Shortlist
→ Reports

Make sure important buttons actually lead to the appropriate screen.

# 15. Dark Mode Audit

Review dark mode for:

* Contrast
* Cards
* Inputs
* Charts
* Navigation
* Modals
* Toasts
* Tables
* Text

Ensure no dark-mode component accidentally uses unreadable text or low-contrast borders.

# 16. Content Audit

Use consistent terminology throughout the application.

Prefer:

**Resume Score**

**ATS Score**

**Job Match**

**Skills Match**

**Missing Skills**

**AI Recommendations**

**AI Resume Copilot**

**Analysis Report**

Do not randomly alternate between different names for the same feature.

Fix grammar, spelling, capitalization, and punctuation.

# 17. Developer Handoff

Prepare the Figma file for implementation.

Use meaningful names for:

Pages
Frames
Components
Variants
Layers
Variables

Avoid:

Rectangle 123
Frame 42
Group 17

Create a small developer reference section showing:

* Colors
* Typography
* Spacing
* Components
* Breakpoints
* Common states

# 18. Final Product Presentation

Create one final presentation-ready overview frame showing the complete product ecosystem:

### Candidate Experience

Landing
→ Analyze
→ AI Dashboard
→ Job Match
→ AI Copilot
→ Report

### Recruiter Experience

Recruiter Dashboard
→ Create Job
→ Screen Candidates
→ Candidate Analysis
→ Compare
→ Shortlist
→ Reports

Use this only as a visual product map.

# 19. Final Quality Checklist

Before finishing, verify:

✓ Consistent visual language
✓ Responsive layouts
✓ Accessible components
✓ Reusable components
✓ Clear navigation
✓ Complete loading states
✓ Complete error states
✓ Complete empty states
✓ Complete success states
✓ Working prototype connections
✓ Consistent terminology
✓ Developer-friendly naming
✓ Dark mode consistency
✓ Mobile consistency
✓ Professional spacing
✓ No visual clutter
✓ No overlapping elements
✓ No clipped content

# Final Goal

The final AI Resume Analyzer should look like a **real production-level AI SaaS platform** that could realistically be implemented using:

Frontend:
**React + Tailwind CSS**

Backend:
**FastAPI**

AI/ML:
**Resume parsing + NLP + ATS analysis + job matching + recommendation engine**

The Figma design should be polished enough for:

* Portfolio
* Placement presentation
* Project viva
* Technical interview
* Product demonstration
* Developer implementation

Do not add unnecessary features after this phase. Focus on consistency, quality, usability, and production readiness.
