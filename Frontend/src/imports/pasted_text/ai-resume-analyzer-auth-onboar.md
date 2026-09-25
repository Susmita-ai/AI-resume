Continue the existing **AI Resume Analyzer** Figma project.

Use the exact existing design system, colors, typography, components, buttons, cards, icons, spacing, and visual style. Do not redesign the brand.

Create a complete **authentication and onboarding experience** for the AI Resume Analyzer.

# 1. Login Page

Create a modern split-screen login page.

Left side:
Show the AI Resume Analyzer branding with a professional resume/AI visual.

Headline:

**“Your Resume. Smarter with AI.”**

Supporting text:

**“Analyze your resume, discover skill gaps, improve ATS compatibility, and prepare for your next opportunity.”**

Right side:

**Welcome Back**

Subtitle:

**“Sign in to continue to your AI Resume Analyzer.”**

Fields:

Email Address
Password

Include:

* Show/hide password
* Remember me
* Forgot Password?

Primary button:

**Sign In**

Divider:

**OR**

Button:

**Continue with Google**

Below:

**Don't have an account? Sign Up**

# 2. Sign Up Page

Create a registration screen.

Heading:

**Create Your Account**

Subtitle:

**“Start improving your resume with AI.”**

Fields:

Full Name
Email Address
Password
Confirm Password

Checkbox:

**I agree to the Terms of Service and Privacy Policy**

Primary button:

**Create Account**

Google option:

**Continue with Google**

Bottom:

**Already have an account? Sign In**

# 3. Forgot Password

Create a password recovery screen.

Heading:

**Forgot Your Password?**

Text:

**“Enter your email address and we'll send you a link to reset your password.”**

Field:

Email Address

Button:

**Send Reset Link**

Success state:

**“Reset link sent!”**

Supporting text:

**“Check your email for instructions to create a new password.”**

Button:

**Back to Sign In**

# 4. Reset Password

Create:

**Create New Password**

Fields:

New Password
Confirm New Password

Show password requirements:

✓ At least 8 characters
✓ One uppercase letter
✓ One number
✓ One special character

Button:

**Reset Password**

Success:

**“Password updated successfully.”**

Button:

**Continue to Login**

# 5. Email Verification

Create:

**Verify Your Email**

Text:

**“We've sent a verification link to your email address.”**

Show email address.

Buttons:

**Open Email**

**Resend Email**

Add:

**Change Email**

Include a countdown for resend:

**Resend available in 30 seconds**

# 6. First-Time User Onboarding

After successful signup, create a short onboarding flow.

### Step 1

Heading:

**“Let's personalize your experience.”**

Question:

**“What type of opportunity are you targeting?”**

Options:

Software Engineer
Data Scientist
Data Analyst
ML Engineer
Frontend Developer
Backend Developer
Other

Allow multiple selection if appropriate.

Button:

**Continue**

### Step 2

Heading:

**“Tell us about your experience.”**

Options:

Student
Fresher
0–1 Years
1–3 Years
3+ Years

Button:

**Continue**

### Step 3

Heading:

**“What are your key skills?”**

Create searchable skill selection.

Example:

Python
SQL
Java
C++
JavaScript
React
Machine Learning
FastAPI
Django
AWS
Git

Allow users to add custom skills.

Button:

**Continue**

### Step 4

Heading:

**“You're ready to analyze your resume.”**

Show a personalized summary:

Target Role:
Software Engineer

Experience:
Fresher

Skills:
Python, SQL, Machine Learning

Primary CTA:

**Analyze My Resume**

Secondary:

**Go to Dashboard**

# 7. Authentication States

Create reusable states for:

### Login Error

**“Incorrect email or password.”**

Button:

**Try Again**

### Account Exists

**“An account with this email already exists.”**

Button:

**Sign In**

### Invalid Email

**“Please enter a valid email address.”**

### Weak Password

**“Your password doesn't meet the requirements.”**

### Network Error

**“Unable to connect. Please try again.”**

### Loading

Button state:

**Signing In...**

or

**Creating Account...**

# 8. Mobile Authentication

Create mobile versions at approximately **390px width**.

Ensure:

* Forms fit comfortably
* Buttons are full width
* Input fields are easy to tap
* Branding remains visible
* No unnecessary visual clutter
* Google login remains accessible
* Keyboard-friendly spacing

# 9. Prototype Flow

Connect:

Landing
→ Sign Up
→ Onboarding
→ Analyze Resume

And:

Landing
→ Sign In
→ Dashboard

Forgot Password
→ Reset Link
→ Reset Password
→ Login

Email Verification
→ Verified
→ Onboarding

# 10. Final UX Requirements

Authentication should feel:

* Secure
* Simple
* Professional
* Fast
* Friendly
* Modern

Do not overwhelm new users with too many questions.

Keep onboarding short and focused.

Use the existing AI Resume Analyzer design system throughout.

The final experience should make the user journey feel complete:

**Landing → Sign Up/Login → Personalization → Resume Upload → AI Analysis → Dashboard**
