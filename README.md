# Daniel Kimeu — Data Analyst CV & Portfolio CMS

A professional personal CV/portfolio web application with a private, authenticated Admin CMS dashboard. This architecture allows the CV owner to update, add, delete, and replace CV information and upload updated PDF resumes at any time without editing any source code or redeploying the website.

---

## 🌟 Key Architecture & Highlights

### 1. Public Side (`/`)
- **No login required** — accessible to recruiters, hiring managers, and clients worldwide.
- **Corporate & Polished Presentation** tailored for Data Analysts and Business Intelligence specialists:
  - **Header & Hero Section**: Value proposition tagline, live status badge ("Available for Opportunities"), quick contact links, and prominent "Download My CV" & "Get in Touch" buttons.
  - **Career Summary**: 3 analytical pillars (Advanced Analytics, Business Intelligence & KPI Architecture, Data Infrastructure & Automation).
  - **Core Competencies & Skills Matrix**: Grouped by domain (*Data Analysis & Visualization*, *Database & SQL*, *Business Intelligence*, *Spreadsheets & Statistical Modeling*, *Tools & Workflows*) with proficiency chips and interactive filtering.
  - **Professional Experience**: Chronological interactive timeline with KPIs, responsibilities, quantifiable achievements, and technology tags.
  - **Key Projects & Dashboards**: Analytical case studies with business context, methodology, quantifiable business impact, interactive metric tags, and live repository links.
  - **Education**: Degrees, honors, coursework, and dates.
  - **Certifications**: Industry credentials with credential IDs and direct verification links.
  - **Achievements & Awards**: Recognitions, performance awards, and competition victories.
  - **Professional Referees**: Recommendations with direct contact details.
  - **Interactive Contact Section**: Contact information, social links, and message form.
  - **Dynamic CV PDF Generator & Viewer (`/download-cv`)**: Interactive print-ready layout with custom styling, ATS-friendly rendering, and instant browser print/PDF export.
  - **Dark / Light Theme**: Dark theme with warm/cool slate neutrals and high-contrast light theme.

---

### 2. Private Admin Dashboard (`/admin`)
- **Secure Access Control**: Authenticated admin access protecting management routes.
- **Full CRUD Management across all 9 CV Dimensions**:
  - **Profile & Career Summary**: Edit headline, bio, contact details, areas of expertise, and job availability status.
  - **Experience Management**: Add, modify, reorder, and remove career entries with structured bullet points and technology chips.
  - **Skills Matrix**: Add, categorize, set proficiency levels (*Beginner*, *Intermediate*, *Advanced*, *Expert*), and toggle featured status.
  - **Projects Portfolio**: Add and edit case studies with metrics, GitHub repository links, and live dashboard URLs.
  - **Education**: Manage academic degrees and certifications.
  - **Certifications & Licenses**: Add certifications, issuers, dates, and credential links.
  - **Honors & Achievements**: Record honors and recognitions.
  - **Referees**: Manage professional references with public visibility toggles.
  - **PDF Resume Management (`/admin/resume`)**: Upload, replace, and activate PDF resume files via drag-and-drop. The public "Download CV" button automatically routes to the latest active file.
  - **Database & Storage Settings (`/admin/settings`)**: One-click JSON backup export & restore, sample data reset, and full Supabase SQL schema copy tool.

---

## 🗄️ Database & Storage Setup

This application features a **hybrid dual-persistence engine**:
1. **Zero-Config Local Persistence**: Works out of the box with browser `localStorage`, retaining all edits, uploads, and data across sessions.
2. **Supabase Cloud PostgreSQL & Storage**: Connect your Supabase project in minutes for real-time cloud multi-device sync.

### Connecting Supabase Cloud (Optional):
1. Sign up at [supabase.com](https://supabase.com) and create a new project.
2. Open the **SQL Editor** in your Supabase dashboard.
3. In the Admin CMS at `/admin/settings`, click **Copy Complete SQL Script** and run it in your Supabase SQL Editor.
4. Set the following environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key-here"
   ```
5. All reads, updates, and PDF uploads will synchronize with your Supabase database.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run production build
npm run build
```

---

## 🔐 Default Admin Access

- **Admin Login URL**: `/admin/login` (or click the discreet "Admin CMS" link in the footer).
- **Default Email**: `admin@danielkimeu.dev` (or any valid email).
- **Default Password**: `password123` (min. 6 characters for local session or configured Supabase user).
