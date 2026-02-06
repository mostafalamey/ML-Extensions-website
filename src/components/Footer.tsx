import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Section';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
  brandName?: string;
  brandDescription?: string;
  copyrightText?: string;
}

export const Footer: React.FC<FooterProps> = ({
  sections = [
    {
      title: 'Products',
      links: [
        { label: 'ML Kitchens', href: '/ml-kitchens' },
        { label: 'ML Doors', href: '/ml-doors' }
      ]
    },
    {
      title: 'Learn',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Tutorials', href: '#' },
        { label: 'Workflows', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '#' },
        { label: 'Gumroad Store', href: '#' }
      ]
    }
  ],
  brandName = 'ML Extensions',
  brandDescription = 'Professional SketchUp extensions for serious designers and manufacturers.',
  copyrightText = '© 2026 ML Extensions. Professional SketchUp tools for real workflows.'
}) => {
  return (
    <footer style={{ 
      background: 'var(--color-background-alt)', 
      padding: 'var(--spacing-16) 0 var(--spacing-8)', 
      borderTop: '1px solid var(--color-border)' 
    }}>
      <Container>
        <div className="grid-4" style={{ marginBottom: 'var(--spacing-12)' }}>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 style={{ 
                color: 'var(--color-accent)', 
                marginBottom: 'var(--spacing-4)' 
              }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none' }}>
                {section.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: 'var(--spacing-2)' }}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 style={{ 
              color: 'var(--color-accent)', 
              marginBottom: 'var(--spacing-4)' 
            }}>
              {brandName}
            </h4>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--color-text-tertiary)' 
            }}>
              {brandDescription}
            </p>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          paddingTop: 'var(--spacing-8)', 
          borderTop: '1px solid var(--color-border)',
          color: 'var(--color-text-tertiary)',
          fontSize: 'var(--font-size-sm)'
        }}>
          <p>{copyrightText}</p>
        </div>
      </Container>
    </footer>
  );
};