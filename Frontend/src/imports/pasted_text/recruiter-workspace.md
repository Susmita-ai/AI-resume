Continue the existing **AI Resume Analyzer** Figma project.

Use the same established design system, colors, typography, cards, buttons, navigation, icons, spacing, and visual language.

Do not redesign the candidate-facing application.

Create a separate **Recruiter / HR workspace** for organizations that want to screen multiple resumes against a job description using AI.

The recruiter experience should be professional, data-driven, and easy to use.

# 1. Recruiter Login

Create a recruiter login screen.

Heading:

**Recruiter Sign In**

Subtitle:

**“Screen candidates faster with AI-powered resume analysis.”**

Fields:

Work Email
Password

Buttons:

**Sign In**

**Continue with Google**

Link:

**Forgot Password?**

Add:

**Candidate Login**

as a secondary option for switching between user types.

# 2. Recruiter Dashboard

Create the main recruiter dashboard.

Sidebar:

**AI Resume Analyzer**

Navigation:

* Dashboard
* Jobs
* Candidates
* Resume Screening
* Shortlisted
* Reports
* Settings

Top-right:

* Notifications
* Recruiter profile

Main heading:

**Recruiter Dashboard**

Subtitle:

**“Overview of your recruitment activity.”**

# 3. Recruitment Overview

Create four statistics cards:

**24**
Active Jobs

**486**
Candidates

**142**
Resumes Screened

**38**
Shortlisted

Use clean icons and trend indicators.

# 4. Candidate Screening Overview

Create a large analytics section.

Heading:

**Candidate Screening**

Show:

Screened
142

Shortlisted
38

Under Review
64

Rejected
40

Create a clean visual chart showing candidate distribution.

Use:

* Shortlisted
* Under Review
* Rejected

Do not overcrowd the chart.

# 5. Active Jobs

Create:

**Active Job Openings**

Cards should show:

### Software Engineer

Company:
Example Company

Location:
Hyderabad

Applicants:
124

Screened:
82

Shortlisted:
18

Match threshold:
75%

Button:

**View Candidates**

### Data Scientist

Applicants:
86

Screened:
60

Shortlisted:
12

Button:

**View Candidates**

Add:

**+ Create New Job**

# 6. Create Job

Create a job creation workflow.

Heading:

**Create Job Opening**

Fields:

Job Title

Company

Location

Employment Type

Experience Level

Required Skills

Preferred Skills

Job Description

Add a large textarea:

**Paste job description here...**

Primary button:

**Create Job**

Secondary:

**Save Draft**

# 7. Candidate Screening

Create a page:

**Candidates — Software Engineer**

Top controls:

Search candidates

Filters:

* All
* High Match
* Shortlisted
* Under Review
* Rejected

Sort:

* Match Score
* Experience
* Recent
* Skills

Create candidate cards/table.

Columns:

Candidate
Match Score
ATS Score
Experience
Skills Match
Status
Actions

Example:

**Candidate A**

Match:
92%

ATS:
94%

Experience:
2 Years

Skills Match:
90%

Status:
Shortlisted

Actions:

**View**
**Shortlist**

# 8. AI Candidate Ranking

Create a prominent section:

**AI Screening Insights**

Show candidates ordered by their match with the job requirements.

For each candidate display:

**AI Match Score**

Example:

92%

Breakdown:

Skills — 94%
Experience — 88%
Education — 90%
Keywords — 91%
Projects — 86%

Important disclaimer-style UI:

**“AI scores are screening assistance only. Review candidate information before making hiring decisions.”**

Do not present the score as an automatic hiring decision.

# 9. Candidate Detail

Create a detailed candidate profile.

Header:

Candidate Name

Role:
Software Engineer

AI Match:
92%

Buttons:

**Shortlist**

**Move to Review**

**Reject**

**Download Resume**

## Candidate Summary

Show:

Education
Experience
Skills
Projects
Certifications

## Matching Skills

Python
SQL
FastAPI
Git
Machine Learning

## Missing / Not Detected Skills

AWS
Docker
System Design

## AI Screening Insights

Show:

**Strong Matches**

* Python
* SQL
* Machine Learning

**Areas to Review**

* Cloud experience
* System design experience

Keep language factual and avoid making claims about a candidate's suitability beyond the documented resume/job match data.

# 10. Candidate Comparison

Create:

**Compare Candidates**

Allow selecting 2–4 candidates.

Create a comparison table:

Candidate

AI Match Score

ATS Score

Skills Match

Experience

Education

Projects

Matching Skills

Missing Skills

Use neutral visual indicators.

Add:

**View Candidate**

for each candidate.

# 11. Shortlisted Candidates

Create:

**Shortlisted Candidates**

Display candidate cards with:

Name
Role
Match score
Key skills
Screening date
Status

Actions:

**View Profile**

**Download Resume**

**Move to Review**

# 12. Screening Reports

Create:

**Recruitment Reports**

Show:

Total Candidates
Average Match Score
Screened Candidates
Shortlisted Candidates

Create charts for:

Candidate distribution
Skills distribution
Match score distribution

Add:

**Download Report**

# 13. Notifications

Create recruiter notifications:

**12 new candidates added**

**8 candidates matched above your selected threshold**

**3 candidates were shortlisted**

**New job application received**

Use simple notification cards.

# 14. Recruiter Settings

Create:

### Account

Name
Work Email
Company
Role

### Screening Preferences

Match threshold

ATS analysis

Skills matching

Experience matching

Keyword matching

Use toggles and numeric controls.

### Notifications

Email notifications

New candidates

Screening completed

Shortlist updates

# 15. Empty States

Create:

### No Jobs

**“You haven't created any job openings yet.”**

Button:

**Create Job**

### No Candidates

**“Candidates will appear here after applications are received.”**

### No Shortlisted Candidates

**“No candidates have been shortlisted yet.”**

# 16. Mobile Recruiter UI

Create a mobile version around 390px.

Use:

* Bottom navigation or compact menu
* Stacked candidate cards
* Horizontal scrolling for comparison data
* Full-width actions
* Collapsible candidate details

# 17. Prototype Flow

Connect:

Recruiter Login
→ Recruiter Dashboard
→ Create Job
→ Candidates
→ Candidate Detail
→ Shortlist
→ Shortlisted Candidates
→ Candidate Comparison
→ Reports

# Final Requirement

The recruiter interface should feel like a professional **AI recruitment screening platform**.

The product should clearly separate:

**AI-powered screening assistance**

from

**human hiring decisions**.

Keep all candidate information, scores, and recommendations presented as analysis of the provided resume and job requirements.

Do not change the candidate-facing AI Resume Analyzer design.
