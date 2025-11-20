import {
  ModuleFields,
  TextField,
  RichTextField,
} from '@hubspot/cms-components/fields';
import { useState } from 'react';
import styles from '../../../styles/solution-architecture-creator.module.css';

export function Component({ fieldValues }) {
  console.log('Component initialized with fieldValues:', fieldValues);
  
  const [formData, setFormData] = useState({
    submitterEmail: '',
    customerName: '',
    customerDomain: '',
    context: '',
    audienceType: '',
    solutionFormat: '',
    solutionIdeas: '',
    notes: '',
    diagramUrl: '',
    gongTranscripts: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [presentationData, setPresentationData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log('Form submit triggered!');
    e.preventDefault();
    console.log('Form data:', formData);
    setIsSubmitting(true);
    setSubmitMessage('');
    console.log('Loading state set to true');

    try {
      const payload = {
        metadata: {
          submittedBy: formData.submitterEmail.split('@')[0] || 'Unknown',
          submitterEmail: formData.submitterEmail
        },
        customer: {
          name: formData.customerName,
          domain: formData.customerDomain,
          portalId: fieldValues.portalId || '',
          context: formData.context,
          audienceType: formData.audienceType
        },
        content: {
          notes: formData.notes,
          solutionIdeas: formData.solutionIdeas,
          solutionFormat: formData.solutionFormat,
          diagramUrl: formData.diagramUrl,
          gongTranscripts: formData.gongTranscripts
        }
      };

      console.log('Sending payload to:', fieldValues.webhookUrl);
      console.log('Payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(fieldValues.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const responseData = await response.json();
        
        if (responseData.status === 'OK' && responseData.presentation_url) {
          setPresentationData({
            id: responseData.presentation_id,
            url: responseData.presentation_url
          });
          setSubmitMessage('✅ Presentation created successfully!');
          setFormData({
            submitterEmail: '',
            customerName: '',
            customerDomain: '',
            context: '',
            audienceType: '',
            solutionFormat: '',
            solutionIdeas: '',
            notes: '',
            diagramUrl: '',
            gongTranscripts: ''
          });
        } else {
          setSubmitMessage('✅ Request submitted successfully, but presentation creation is still in progress.');
        }
      } else {
        setSubmitMessage('❌ Failed to submit request. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('❌ Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}></div>
            <h3>Creating Your Presentation</h3>
            <p>Please wait while we generate your custom solution architecture presentation...</p>
          </div>
        </div>
      )}
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{fieldValues.title || 'Solution Architecture Presentation Creator'}</h1>
          {fieldValues.description && (
            <div className={styles.description}>
              <div dangerouslySetInnerHTML={{ __html: fieldValues.description }} />
            </div>
          )}
          <div style={{fontSize: '12px', opacity: 0.7, marginTop: '10px'}}>
            Debug: Component loaded, isSubmitting={isSubmitting ? 'true' : 'false'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="submitterEmail" className={styles.label}>
                Your Email Address
              </label>
              <input
                type="email"
                id="submitterEmail"
                name="submitterEmail"
                value={formData.submitterEmail}
                onChange={handleInputChange}
                className={styles.input}
                required
                placeholder="your.email@company.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="customerName" className={styles.label}>
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className={styles.input}
                required
                placeholder="Acme Corporation"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="customerDomain" className={styles.label}>
                Customer Domain
              </label>
              <input
                type="text"
                id="customerDomain"
                name="customerDomain"
                value={formData.customerDomain}
                onChange={handleInputChange}
                className={styles.input}
                required
                placeholder="acmecorp.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="context" className={styles.label}>
                Project Context
              </label>
              <input
                type="text"
                id="context"
                name="context"
                value={formData.context}
                onChange={handleInputChange}
                className={styles.input}
                required
                placeholder="Digital transformation, new product launch, etc."
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="audienceType" className={styles.label}>
                Audience Type
              </label>
              <select
                id="audienceType"
                name="audienceType"
                value={formData.audienceType}
                onChange={handleInputChange}
                className={styles.input}
                required
              >
                <option value="">Select audience type...</option>
                <option value="Executive">Executive Team</option>
                <option value="Technical">Technical Team</option>
                <option value="Mixed">Mixed Audience</option>
                <option value="Sales">Sales Team</option>
                <option value="Marketing">Marketing Team</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="solutionFormat" className={styles.label}>
                Solution Format
              </label>
              <select
                id="solutionFormat"
                name="solutionFormat"
                value={formData.solutionFormat}
                onChange={handleInputChange}
                className={styles.input}
                required
              >
                <option value="">Select solution format...</option>
                <option value="Document">Document</option>
                <option value="Deck">Deck</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="solutionIdeas" className={styles.label}>
                Solution Ideas
              </label>
              <textarea
                id="solutionIdeas"
                name="solutionIdeas"
                value={formData.solutionIdeas}
                onChange={handleInputChange}
                className={styles.textarea}
                required
                placeholder="Describe initial solution concepts, technologies, or approaches..."
                rows="3"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="notes" className={styles.label}>
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className={styles.textarea}
                required
                placeholder="Any additional requirements, constraints, or special considerations..."
                rows="4"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="diagramUrl" className={styles.label}>
                Diagram URL
              </label>
              <input
                type="url"
                id="diagramUrl"
                name="diagramUrl"
                value={formData.diagramUrl}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="https://example.com/diagram.png (optional)"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="gongTranscripts" className={styles.label}>
                Gong Transcripts
              </label>
              <textarea
                id="gongTranscripts"
                name="gongTranscripts"
                value={formData.gongTranscripts}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Paste Gong call transcripts or meeting notes (optional)..."
                rows="4"
              />
            </div>
          </div>

          <div className={styles.submitSection}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
              onClick={(e) => {
                console.log('Button clicked!', e);
                if (!isSubmitting) {
                  console.log('About to call handleSubmit');
                }
              }}
            >
              {isSubmitting ? 'Creating...' : 'Create Solution Architecture'}
            </button>
            
            {submitMessage && (
              <div className={styles.message}>
                {submitMessage}
                {presentationData && (
                  <div className={styles.presentationLinks}>
                    <a 
                      href={presentationData.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.presentationButton}
                    >
                      🎯 Open Your Presentation
                    </a>
                    <p className={styles.presentationId}>
                      Presentation ID: {presentationData.id}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export const fields = (
  <ModuleFields>
    <TextField
      name="title"
      label="Form Title"
      default="Solution Architecture Presentation Creator"
    />
    <RichTextField
      name="description"
      label="Form Description"
      default="<p>Create a custom solution architecture presentation tailored to your customer's needs. Our AI will generate a comprehensive, professional presentation based on your input.</p>"
    />
    <TextField
      name="webhookUrl"
      label="Webhook URL"
      default="https://hook.eu2.make.com/bw0cwucdpcprut2phrgxgax2anji43bb"
      help="Make.com webhook URL for processing form submissions"
    />
    <TextField
      name="portalId"
      label="HubSpot Portal ID"
      default="6458043"
      help="Your HubSpot Portal ID for tracking"
    />
  </ModuleFields>
);

export const meta = {
  label: 'Solution Architecture Presentation Creator',
  help: 'A form for creating custom solution architecture presentations with webhook integration.',
};