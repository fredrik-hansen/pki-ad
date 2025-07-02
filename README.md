
# Cybersecurity Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing cybersecurity expertise, professional experience, and global contributions.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI**: Clean, professional design with smooth animations
- **DOCX Export**: Generate professional Word documents from portfolio content
- **Interactive Components**: Engaging user interface with hover effects and transitions
- **SEO Optimized**: Structured data and meta tags for better search visibility
- **Fast Loading**: Built with Vite for optimal performance

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Document Export**: DOCX library
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components (Shadcn)
│   ├── experience/             # Experience-related components
│   ├── About.tsx               # About section
│   ├── Certifications.tsx      # Professional certifications
│   ├── Contact.tsx             # Contact information
│   ├── CybersecurityDomains.tsx # Security expertise areas
│   ├── DOCXExportButton.tsx    # Document export functionality
│   ├── Experience.tsx          # Professional experience
│   ├── Hero.tsx               # Landing section
│   ├── Navigation.tsx         # Site navigation
│   ├── TechnicalCompetencies.tsx # Technical skills
│   └── VolunteerWork.tsx      # Volunteer work and speaking engagements
├── data/
│   └── speakingEngagements.ts  # Speaking engagement data
├── pages/
│   ├── Index.tsx              # Main portfolio page
│   └── NotFound.tsx           # 404 error page
├── utils/
│   └── docxExport.ts          # DOCX export utility
└── lib/
    └── utils.ts               # Utility functions
```

## 🎨 Customization Guide

### 1. Personal Information

#### Hero Section (`src/components/Hero.tsx`)
Update the main landing section with your information:
- Name and title
- Professional tagline
- Background description
- Call-to-action buttons

#### About Section (`src/components/About.tsx`)
Customize your professional story:
- Professional summary
- Career highlights
- Personal mission statement
- Key achievements

#### Contact Information (`src/components/Contact.tsx`)
Update contact details:
- Email address
- Phone number
- Location
- Social media links
- Professional profiles (LinkedIn, GitHub, etc.)

### 2. Professional Experience

#### Experience Data (`src/components/experience/ExperienceData.ts`)
Update your work history:
```typescript
export const experienceData = [
  {
    title: "Your Job Title",
    company: "Company Name",
    period: "Start Date - End Date",
    location: "City, Country",
    description: "Role description...",
    achievements: ["Achievement 1", "Achievement 2"],
    technologies: ["Tech 1", "Tech 2"]
  }
];
```

#### Career Timeline (`src/components/experience/CareerTimeline.tsx`)
The timeline automatically updates based on the experience data.

### 3. Technical Skills

#### Technical Competencies (`src/components/TechnicalCompetencies.tsx`)
Update your technical skills:
```typescript
const competencies = [
  {
    category: "Category Name",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    icon: YourIconComponent
  }
];
```

#### Cybersecurity Domains (`src/components/CybersecurityDomains.tsx`)
Customize your security expertise areas:
```typescript
const domains = [
  {
    title: "Domain Name",
    description: "Domain description...",
    icon: YourIconComponent,
    skills: ["Skill 1", "Skill 2"]
  }
];
```

### 4. Certifications

#### Update Certifications (`src/components/Certifications.tsx`)
Add your professional certifications:
```typescript
const certifications = [
  {
    name: "Certification Name",
    issuer: "Issuing Organization",
    date: "Issue Date",
    credentialId: "Credential ID (optional)",
    verifyUrl: "Verification URL (optional)"
  }
];
```

### 5. Volunteer Work & Speaking Engagements

#### Speaking Engagements (`src/data/speakingEngagements.ts`)
Update your speaking history:
```typescript
export const speakingEngagements = [
  {
    event: "Event Name",
    location: "Event Location",
    topic: "Presentation Topic",
    audience: "Audience size (optional)",
    description: "Presentation description..."
  }
];
```

#### Volunteer Roles (`src/components/VolunteerWork.tsx`)
Update volunteer positions:
```typescript
const volunteerRoles = [
  {
    title: "Role Title",
    organization: "Organization Name",
    period: "Start - End Date",
    description: "Role description...",
    impact: "Impact statement"
  }
];
```

### 6. Styling Customization

#### Colors and Branding
The portfolio uses a consistent color scheme. To customize:

1. **Primary Colors**: Update gradient colors in component classes
   ```css
   from-blue-400 to-cyan-400  /* Main gradient */
   from-blue-500 to-cyan-500  /* Secondary gradient */
   ```

2. **Background Colors**: 
   ```css
   bg-slate-950  /* Dark background */
   bg-slate-900  /* Card backgrounds */
   ```

3. **Text Colors**:
   ```css
   text-white      /* Primary text */
   text-slate-300  /* Secondary text */
   text-slate-500  /* Muted text */
   ```

#### Typography
- Headings use gradient text effects
- Body text uses Tailwind's default font stack
- Responsive font sizes are implemented throughout

### 7. Adding New Sections

To add a new section:

1. Create a new component in `src/components/`
2. Import and add it to `src/pages/Index.tsx`
3. Add navigation link in `src/components/Navigation.tsx`
4. Update DOCX export in `src/utils/docxExport.ts` if needed

Example new section:
```typescript
// src/components/NewSection.tsx
export const NewSection = () => {
  return (
    <section id="new-section" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Your content here */}
      </div>
    </section>
  );
};
```

### 8. DOCX Export Customization

The portfolio includes automatic DOCX export functionality. To customize:

#### Export Content (`src/utils/docxExport.ts`)
- Modify document structure
- Update styling and formatting
- Add or remove sections
- Customize document metadata

#### Export Button (`src/components/DOCXExportButton.tsx`)
- Change button styling
- Modify export filename
- Update button text and icons

## 🚀 Development

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn or bun

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### Development Server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Visit `http://localhost:5173` to view the portfolio.

### Build for Production
```bash
npm run build
# or
yarn build
# or
bun build
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full layout with side-by-side content
- **Tablet**: Adjusted layouts with proper spacing
- **Mobile**: Stacked layouts with touch-friendly interactions

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any environment-specific configurations:
```env
VITE_APP_TITLE=Your Portfolio Title
VITE_CONTACT_EMAIL=your.email@example.com
```

### Tailwind Configuration
Customize styling in `tailwind.config.ts`:
- Add custom colors
- Extend spacing scales  
- Add custom animations
- Configure responsive breakpoints

## 📊 Performance

The portfolio is optimized for performance:
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Responsive images with proper sizing
- **CSS Optimization**: Tailwind CSS purging removes unused styles
- **Bundle Analysis**: Use `npm run build -- --analyze` to analyze bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Provide steps to reproduce any bugs

## 🎯 Roadmap

Potential future enhancements:
- [ ] Dark/Light theme toggle
- [ ] Blog integration
- [ ] Project portfolio section
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Contact form with backend integration

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
