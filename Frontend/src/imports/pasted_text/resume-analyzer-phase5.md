Continue the existing **AI Resume Analyzer** Figma project.

Do not change the existing brand identity or core layouts. Use the same colors, typography, components, icons, spacing, buttons, cards, and visual system created in Phases 1–4.

This phase focuses on **responsive design, mobile layouts, UX states, accessibility, and final visual polish**.

# 1. Responsive Desktop Design

Review all major screens and make the desktop layouts consistent at approximately **1440px width**.

Ensure:

* Consistent maximum content width
* Consistent sidebar width
* Consistent page margins
* Consistent card spacing
* Consistent typography hierarchy
* Proper alignment of dashboard components
* No unnecessary empty space
* No overlapping elements
* Charts and tables remain readable

Pages to review:

* Landing Page
* Analyze Resume
* Analysis Loading
* Analysis Dashboard
* My Resumes
* Job Matches
* Job Match Details
* Recommendations
* Recommendation Details
* Profile
* Settings

# 2. Tablet Layout

Create tablet-friendly layouts around **768–1024px**.

Adapt:

* Sidebar into a compact/collapsible navigation
* Multi-column cards into fewer columns
* Tables into horizontally scrollable layouts
* Charts to fit available width
* Forms into stacked layouts
* Buttons into appropriate responsive sizes

Maintain clear hierarchy and readability.

# 3. Mobile Design

Create mobile versions around **390px width**.

The mobile experience should feel intentionally designed, not simply compressed from desktop.

## Mobile Navigation

Replace the desktop sidebar with:

* Top navigation bar
* AI Resume Analyzer logo
* Notification icon
* Profile icon
* Hamburger menu

The menu should contain:

Dashboard
Analyze Resume
My Resumes
Job Matches
Recommendations
Profile
Settings

## Mobile Dashboard

Stack the content vertically.

Order:

1. Resume Analysis header
2. Resume information
3. AI Resume Score
4. ATS Score
5. Job Match
6. Skills Match
7. Job Match Analysis
8. Skills Analysis
9. Resume Breakdown
10. AI Recommendations
11. Resume Quality
12. Improvement CTA

Score cards should become horizontally scrollable or vertically stacked.

Charts must remain readable on a small screen.

# 4. Mobile Resume Upload

Create a mobile-friendly upload screen.

Show:

**Analyze Your Resume**

Upload card:

**Upload Resume**

“Tap to upload your PDF or DOCX resume.”

Large upload icon.

Then:

**Target Job Description**

Large mobile textarea.

Fields:

Job Role
Company

Primary CTA:

**Analyze Resume with AI**

The button should remain easy to tap.

# 5. Mobile Analysis Loading

Create a mobile loading screen:

**Analyzing Your Resume...**

Show:

Progress percentage

68%

Analysis steps:

✓ Reading resume
✓ Extracting information
✓ Identifying skills
○ Comparing job description
○ Checking ATS compatibility
○ Generating recommendations

Keep the animation area compact.

# 6. Mobile Resume History

Create a mobile version of My Resumes.

Instead of a large table, convert each row into a card.

Each card should display:

Resume name
Target role
ATS score
Job match
Resume score
Analysis date

Buttons:

**View**
**Download**

Use a three-dot menu for secondary actions.

# 7. Mobile Job Match

Convert job match cards into vertically stacked cards.

Each card:

Job title
Company
Match percentage
Top matching skills
Missing skills

Primary action:

**View Match**

# 8. Mobile Recommendations

Create recommendation cards optimized for mobile.

Each card:

Priority
Recommendation
Short explanation
Impact

Button:

**View Improvement**

Keep text concise and readable.

# 9. Accessibility Review

Review the entire design for accessibility.

Ensure:

* Strong text/background contrast
* Readable font sizes
* Buttons have clear labels
* Icons have supporting text when necessary
* Important information is not communicated only through color
* Error messages are clearly visible
* Form fields have clear labels
* Touch targets are large enough on mobile

# 10. UX States

Create polished reusable states for:

### Empty

“No resume analyses yet.”

CTA:
**Analyze Your Resume**

### Loading

“Analyzing your resume…”

### Success

“Analysis completed successfully.”

### Error

“We couldn't complete the analysis.”

CTA:
**Try Again**

### Offline/Connection Error

“Check your internet connection and try again.”

### File Error

“This file could not be processed.”

CTA:
**Upload Another File**

# 11. Final Component Library

Create or organize a reusable component library containing:

* Buttons
* Inputs
* Textareas
* Dropdowns
* Checkboxes
* Toggles
* Navigation
* Sidebar
* Mobile navigation
* Cards
* Score cards
* Progress bars
* Progress circles
* Skill chips
* Badges
* Alerts
* Modals
* Tables
* Empty states
* Loading states
* Error states
* Success states

Use component variants wherever appropriate.

# 12. Final Visual Polish

Review the entire application and improve:

* Alignment
* Spacing
* Typography hierarchy
* Component consistency
* Border radius
* Shadows
* Icon sizing
* Button sizing
* Card proportions
* Visual hierarchy

Remove unnecessary elements and avoid visual clutter.

The product should communicate three things immediately:

**Upload Resume → Get AI Analysis → Improve Your Resume**

# 13. Prototype Flow

Connect the important screens into a clickable prototype.

Create this main flow:

Landing Page
→ Analyze My Resume
→ Upload Resume
→ Add Job Description
→ Analyze Resume with AI
→ Loading
→ Analysis Complete
→ Dashboard
→ Job Match
→ Recommendations
→ Recommendation Details

Also connect:

Dashboard
→ My Resumes
→ Job Matches
→ Recommendations
→ Profile
→ Settings

Buttons such as **Analyze Resume**, **View Analysis**, **View Match**, **View Improvement**, and **Analyze Again** should have appropriate prototype interactions.

# Final Requirement

The final Figma project should look like a **real production-level AI SaaS application**, not a college project.

It should be:

* Professional
* Modern
* Clean
* Responsive
* Accessible
* Easy to navigate
* Consistent
* Portfolio-ready
* Placement-presentation-ready

Do not introduce new features or redesign the product. Focus on responsive behavior, UX consistency, accessibility, prototype connections, and final polish.
