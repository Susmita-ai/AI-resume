Continue the existing **AI Resume Analyzer** Figma project.

Do not change the established visual identity, branding, colors, typography, or overall UX. This phase is focused on making the existing design **developer-ready and implementation-friendly**.

## 1. Organize the Figma File

Organize the project into clear pages:

1. **Design System**
2. **Landing Page**
3. **Authentication**
4. **Resume Analysis**
5. **Analysis Dashboard**
6. **Job Matches**
7. **Recommendations**
8. **Resume History**
9. **Profile & Settings**
10. **Mobile**
11. **Prototype**

Use clear naming for frames, components, and sections.

## 2. Design Tokens

Create a consistent design system containing:

### Colors

Define reusable variables for:

* Primary
* Primary hover
* Secondary
* Background
* Surface
* Border
* Text primary
* Text secondary
* Success
* Warning
* Error
* Info

Keep the existing colors from the project.

### Typography

Define styles for:

* Display heading
* H1
* H2
* H3
* Body large
* Body
* Body small
* Caption
* Button
* Label

Maintain consistent font weights and line heights.

### Spacing

Use a consistent spacing system such as:

4
8
12
16
24
32
40
48
64

Apply it consistently across the application.

## 3. Component Library

Convert repeated UI elements into reusable components.

Create variants for:

### Buttons

* Primary
* Secondary
* Outline
* Ghost
* Danger
* Disabled
* Loading

### Inputs

* Default
* Focus
* Filled
* Error
* Disabled

### Cards

* Default
* Hover
* Selected
* Disabled

### Score Components

* Circular score
* Progress bar
* Score card
* Match percentage

### Status

* Success
* Warning
* Error
* Info

### Navigation

* Desktop sidebar
* Mobile navigation
* Active item
* Hover item

## 4. Developer-Friendly Naming

Use clear names such as:

Button/Primary
Button/Secondary
Input/Default
Input/Error
Card/Score
Card/Recommendation
Card/JobMatch
Badge/Success
Badge/Warning
Navigation/Sidebar
Navigation/Mobile

Use meaningful layer names rather than generic names such as:

Rectangle 123
Frame 45
Group 12

## 5. Resume Analysis Components

Create reusable components for:

### Resume Upload

States:

Empty
Uploading
Uploaded
Processing
Error

### Analysis Progress

States:

Not Started
Processing
Completed
Failed

### Resume Score

States:

Excellent
Good
Needs Improvement
Poor

### Skill Tags

States:

Matched
Missing
Neutral
Recommended

## 6. Dashboard Data Visualization

Make the following components reusable:

* Resume score circle
* ATS score
* Job match score
* Skill progress bar
* Match breakdown
* Keyword comparison
* Skill chart
* Recommendation priority
* Resume quality checklist

Use realistic sample data but structure the components so the values can later be replaced dynamically by API data.

## 7. API-Friendly UI Structure

Design the UI assuming the frontend will receive data from a backend API.

The dashboard should be able to dynamically display:

* Resume name
* Job title
* Company
* Resume score
* ATS score
* Job match percentage
* Skills
* Missing skills
* Keywords
* Education
* Experience
* Projects
* Certifications
* Recommendations

Avoid layouts that depend on fixed text lengths.

Cards and containers should accommodate different amounts of content.

## 8. Interaction States

Create all important states needed during development.

### Buttons

Default
Hover
Pressed
Disabled
Loading

### Forms

Empty
Filled
Focus
Error
Success

### Upload

No file
Uploading
Uploaded
Processing
Failed

### Analysis

Waiting
Analyzing
Completed
Failed

### Dashboard

Loaded
Loading
Empty
Error

## 9. Prototype Connections

Create a complete clickable prototype.

Main flow:

Landing
→ Analyze Resume
→ Upload Resume
→ Job Description
→ Analysis Loading
→ Analysis Complete
→ Dashboard

Dashboard navigation:

Dashboard
→ My Resumes
→ Job Matches
→ Recommendations
→ Profile
→ Settings

Important actions:

Analyze Again
→ Analyze Resume

View Match
→ Job Match Details

View Improvement
→ Recommendation Details

Download Report
→ Download/Success state

Delete Resume
→ Confirmation Modal

## 10. Microinteractions

Define subtle interactions for:

* Button hover
* Card hover
* Navigation selection
* Upload progress
* Score animation
* Progress bars
* Success messages
* Toast notifications
* Modal opening
* Page transitions

Keep animations subtle and professional.

Do not use excessive animation.

## 11. Responsive Rules

Document how components behave at:

### Desktop

1440px

### Tablet

1024px

### Mobile

390px

Define:

* Container widths
* Grid behavior
* Card stacking
* Sidebar behavior
* Typography scaling
* Button behavior
* Table behavior
* Chart behavior

## 12. Empty, Error & Loading Screens

Ensure every major page has:

### Loading

Skeleton loaders where appropriate.

### Empty

Clear explanation + primary CTA.

### Error

Friendly explanation + retry action.

### Success

Confirmation + next action.

## 13. Final Developer Handoff

Add a small documentation section explaining:

**Primary CTA**
Analyze Resume

**Core User Journey**
Upload Resume → Add Job Description → AI Analysis → Dashboard → Recommendations

**Primary Data**
Resume
Job Description
Scores
Skills
Recommendations

**Frontend Structure**
Landing
Authentication
Analysis
Dashboard
History
Job Matches
Recommendations
Profile
Settings

Keep the design visually identical to the existing project while making the file clean, organized, scalable, and easy for a developer to implement.

The final Figma file should be suitable for direct recreation using **React, Tailwind CSS, and a FastAPI backend**.
