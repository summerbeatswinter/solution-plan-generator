# Solution Plan Generator

A HubSpot CMS React application that creates custom solution architecture presentations based on customer requirements and project context.
- Current front-end URL: https://6458043.hs-sites.com/sa-presentation-creator
- Current back-end Make Scenario: https://eu2.make.com/470421/scenarios/7358455/edit

## 🎯 Overview

This tool streamlines the process of creating tailored solution architecture presentations for sales and technical teams. Users input customer details, project context, and requirements, and the system generates professional presentations via automated workflows.

## ✨ Features

- **Customer Information Capture**: Company name, domain, and project context
- **Audience-Specific Content**: Tailored for Executive, Technical, Mixed, Sales, or Marketing audiences
- **Solution Format Options**: Choose between Document or Deck formats
- **Rich Content Input**: Solution ideas, notes, diagrams, and Gong call transcripts
- **Webhook Integration**: Seamless connection to Make.com for automated processing
- **HubSpot CMS Integration**: Native deployment and hosting on HubSpot
- **Responsive Design**: Works across desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React with HubSpot CMS Components
- **Styling**: CSS Modules
- **Deployment**: HubSpot CMS
- **Automation**: Make.com webhook integration
- **Version Control**: Git/GitHub

## 📋 Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Email Address | Email | Yes | Submitter's contact information |
| Customer Name | Text | Yes | Target customer/company name |
| Customer Domain | Text | Yes | Customer's website domain |
| Project Context | Text | Yes | Brief project description |
| Audience Type | Select | Yes | Target audience for the presentation |
| Solution Format | Select | Yes | Document or Deck output format |
| Solution Ideas | Textarea | Yes | Initial solution concepts and approaches |
| Additional Notes | Textarea | Yes | Requirements, constraints, considerations |
| Diagram URL | URL | No | Link to existing diagrams or mockups |
| Gong Transcripts | Textarea | No | Call transcripts or meeting notes |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- HubSpot CLI
- HubSpot Developer Account
- Make.com account (for webhook processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/summerbeatswinter/solution-plan-generator.git
   cd solution-plan-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd src/theme/my-theme
   npm install
   ```

3. **Configure HubSpot CLI**
   ```bash
   hs init
   hs auth
   ```

4. **Set up your webhook URL**
   - Update the `webhookUrl` field in the module configuration
   - Configure your Make.com webhook to handle the payload

### Development

1. **Start local development**
   ```bash
   npm start
   ```

2. **Deploy to HubSpot**
   ```bash
   npm run deploy
   ```

## 🔧 Configuration

### Module Fields

The component accepts these configurable fields:

- `title`: Form title (default: "Solution Architecture Presentation Creator")
- `description`: Form description with HTML support
- `webhookUrl`: Make.com webhook endpoint
- `portalId`: HubSpot Portal ID for tracking

### Webhook Payload Structure

```json
{
  "metadata": {
    "submittedBy": "username",
    "submitterEmail": "user@company.com"
  },
  "customer": {
    "name": "Customer Name",
    "domain": "customer.com",
    "portalId": "1234567",
    "context": "Project context",
    "audienceType": "Executive"
  },
  "content": {
    "notes": "Additional requirements...",
    "solutionIdeas": "Initial solution concepts...",
    "solutionFormat": "Document",
    "diagramUrl": "https://example.com/diagram.png",
    "gongTranscripts": "Call transcripts..."
  }
}
```

## 📁 Project Structure

```
solution-plan-generator/
├── src/
│   └── theme/
│       └── my-theme/
│           ├── components/
│           │   └── modules/
│           │       └── SolutionArchitectureCreator/
│           │           └── index.jsx
│           ├── styles/
│           │   └── solution-architecture-creator.module.css
│           ├── templates/
│           │   ├── layouts/
│           │   │   └── base.hubl.html
│           │   ├── page.hubl.html
│           │   └── solution-architecture-page.hubl.html
│           ├── theme.json
│           └── package.json
├── package.json
├── hsproject.json
└── README.md
```

## 🎨 Styling

The component uses CSS Modules for styling with the following key classes:

- `.wrapper`: Main container with loading overlay support
- `.form`: Form styling and grid layout
- `.inputGroup`: Individual form field containers
- `.submitButton`: Primary action button
- `.loadingOverlay`: Full-screen loading indicator

## 🔐 Security

- **Sensitive Configuration**: `hubspot.config.yml` is excluded from version control
- **Access Tokens**: Stored securely in HubSpot CLI configuration
- **Input Validation**: Required fields and email validation
- **HTTPS**: All webhook communications use secure protocols

## 📈 Usage Analytics

The form automatically tracks:
- Submission attempts and success rates
- Customer domain patterns
- Audience type preferences
- Form field completion rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary to HubSpot.

## 🆘 Support

For questions or issues:
- Create an issue in this repository
- Contact the development team
- Check HubSpot CMS documentation

## 🔄 Deployment History

- **Build #16**: Added Solution Format dropdown field
- **Initial Release**: Core form functionality with webhook integration

---

*Generated with ❤️ using HubSpot CMS React components*
