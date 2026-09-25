Continue the existing **AI Resume Analyzer** Figma project.

Use the existing design system, branding, colors, typography, components, spacing, navigation, and visual language from all previous phases.

Do not redesign existing pages. This phase adds the missing interaction states and advanced UX patterns.

# 1. Global Notification System

Create a reusable notification/toast system.

### Success

**Resume uploaded successfully.**

**Analysis completed successfully.**

**Changes saved successfully.**

**AI suggestion applied.**

### Information

**Your analysis is being processed.**

### Warning

**Your resume has some missing information.**

### Error

**Something went wrong. Please try again.**

Create variants:

* Success
* Info
* Warning
* Error

Include close buttons.

# 2. Confirmation Modals

Create reusable confirmation dialogs.

### Delete Resume

**Delete this resume?**

“This will remove the resume and its analysis history.”

Buttons:

**Cancel**

**Delete**

### Delete Analysis

**Delete analysis?**

### Logout

**Are you sure you want to sign out?**

### Discard Changes

**You have unsaved changes.**

Buttons:

**Keep Editing**

**Discard**

# 3. Search Experience

Create reusable search components.

Placeholder:

**Search resumes, jobs, or candidates...**

States:

* Empty
* Typing
* Results
* No results
* Loading

No results:

**“No matching results found.”**

Suggestion:

**Try a different keyword.**

# 4. Filters

Create a reusable filter panel.

For candidate/resume screens:

Status:

* All
* Completed
* Processing
* Failed

Score:

* 90+
* 80–89
* 70–79
* Below 70

Job Role:

* Software Engineer
* Data Scientist
* Data Analyst
* ML Engineer
* Frontend Developer

Date:

* Today
* This week
* This month
* Custom

Buttons:

**Apply Filters**

**Clear All**

# 5. Sorting

Create sorting dropdowns:

* Highest Score
* Lowest Score
* Most Recent
* Oldest
* Best Job Match
* Best ATS Score

Show selected sorting state.

# 6. Pagination

Create reusable pagination.

Example:

Previous

1 2 3 4 5

Next

Also create:

**Showing 1–10 of 142 results**

Create disabled states for Previous/Next when appropriate.

# 7. Skeleton Loading

Create skeleton states for major pages.

### Dashboard

Skeleton:

* Score cards
* Charts
* Recommendation cards
* Skills

### Resume History

Skeleton:

* Table rows

### Job Matches

Skeleton:

* Job cards

### Candidate Screening

Skeleton:

* Candidate rows/cards

Use subtle animated-looking placeholders.

# 8. Global Error Pages

Create:

### 404

**Page Not Found**

“The page you're looking for doesn't exist.”

Button:

**Back to Dashboard**

### 500

**Something Went Wrong**

“Something unexpected happened. Please try again.”

Buttons:

**Try Again**

**Back to Dashboard**

### Connection Error

**You're Offline**

“Check your internet connection and try again.”

# 9. File Upload States

Create all upload states:

### Empty

Upload icon

**Drag & drop your resume here**

### Uploading

Filename

Progress:
**64%**

Cancel button

### Uploaded

✓ Upload complete

### Processing

**Preparing your resume for AI analysis...**

### Failed

**Upload failed**

Button:

**Try Again**

# 10. AI Analysis States

Create:

### Starting

**Starting AI analysis...**

### Processing

**Analyzing resume content...**

### Skill Extraction

**Identifying skills...**

### Job Matching

**Comparing with job description...**

### Recommendations

**Generating recommendations...**

### Complete

**Your analysis is ready!**

Button:

**View Results**

### Failed

**We couldn't complete the analysis.**

Button:

**Try Again**

# 11. Progress Experience

Create a reusable multi-step progress component:

Upload
→ Extract
→ Analyze
→ Match
→ Recommend
→ Complete

Show:

Completed
Current
Upcoming
Failed

# 12. Global Command/Search Panel

Create an optional command menu opened with a search icon or keyboard shortcut.

Title:

**Quick Actions**

Actions:

Analyze Resume
View Dashboard
My Resumes
Job Matches
Recommendations
AI Copilot
Download Latest Report
Profile
Settings

Add keyboard-style shortcut indicators.

# 13. User Menu

Create a profile dropdown.

Show:

User name
Email

Options:

Profile
Settings
My Resumes
Help
Sign Out

# 14. Help Center

Create a simple help panel.

Heading:

**How can we help?**

Search:

**Search help articles...**

Categories:

Getting Started
Resume Analysis
ATS Score
Job Matching
AI Copilot
Reports
Account

Add:

**Contact Support**

# 15. Feedback Widget

Create a small feedback component:

**Was this analysis helpful?**

Buttons:

👍 Yes
👎 No

Optional:

**Tell us what could be improved**

Textarea

Button:

**Submit Feedback**

# 16. Accessibility States

Ensure:

* Keyboard focus states
* Visible focus outlines
* Disabled states
* Error states
* Screen-reader-friendly labels
* Sufficient contrast
* Clear text labels for important icons
* Large mobile touch targets

Do not rely only on color to communicate status.

# 17. Dark Mode

Create a dark-mode version of the core application.

Apply dark mode to:

* Dashboard
* Analyze Resume
* Resume History
* Job Matches
* Recommendations
* AI Copilot
* Profile
* Settings

Maintain readable contrast and preserve the existing brand identity.

Create theme variables for:

Background
Surface
Text
Border
Primary
Success
Warning
Error

# 18. Final Prototype Interactions

Add realistic interactions for:

* Hover
* Click
* Dropdown
* Modal
* Toast
* Search
* Filter
* Sort
* Pagination
* Upload
* Loading
* Success
* Error
* Navigation

Keep transitions subtle and professional.

# Final Requirement

The goal of this phase is to make the application feel complete in every possible state.

A user should never encounter an unexplained blank screen, broken button, missing loading state, or unclear error.

The final application should feel like a polished, production-ready AI SaaS product.

Do not introduce unrelated features or change the existing product architecture.
