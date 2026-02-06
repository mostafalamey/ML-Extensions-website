import React, { useEffect } from 'react';
import { Package, Zap, Settings, Check, BookOpen, Users, Wrench, Target } from 'lucide-react';
import { 
  Navbar, 
  Hero, 
  Section, 
  Container, 
  ProductCard, 
  FeatureCard, 
  ValueCard,
  Button,
  Footer 
} from '../components';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <Navbar />
      
      <Hero 
        title="Professional SketchUp Extensions"
        subtitle="Productivity, customization, and manufacturing-aware workflows for serious designers and manufacturers."
        primaryButtonText="View Products"
        primaryButtonHref="#products"
        secondaryButtonText="Explore Documentation"
        secondaryButtonHref="#learn"
      />

      {/* Introduction Section */}
      <Section id="introduction">
        <Container textAlign="center">
          <h2>Built for real production workflows</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', marginTop: 'var(--spacing-6)', fontSize: 'var(--font-size-lg)' }}>
            ML Extensions creates professional-grade SketchUp tools designed to eliminate repetitive work, 
            enforce consistency, and prepare models for real-world manufacturing.
          </p>
          <p style={{ marginTop: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)' }}>
            Our extensions are built for people who don't just visualize spaces — they build them.
          </p>
        </Container>
      </Section>

      {/* Products Overview */}
      <Section background="alt" id="products">
        <Container>
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-16)' }}>Extensions</h2>
          
          <div className="grid-2">
            <ProductCard 
              title="ML Kitchens"
              description="A complete modular kitchen system for SketchUp. Design faster, customize deeply, and generate manufacturing-ready kitchen layouts."
              href="/ml-kitchens"
            />
            
            <ProductCard 
              title="ML Doors"
              description="A comprehensive door system for SketchUp. Create, place, customize, animate, and document doors with precision and speed."
              href="/ml-doors"
            />
          </div>
        </Container>
      </Section>

      {/* Who It's For */}
      <Section id="who-its-for">
        <Container>
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-16)' }}>Designed for professionals</h2>
          
          <div className="grid-4">
            <FeatureCard
              icon={<Users className="feature-icon" />}
              title="Interior Designers"
              description="Quickly iterate designs without breaking technical accuracy."
            />
            
            <FeatureCard
              icon={<Target className="feature-icon" />}
              title="Architects"
              description="Maintain clean models while handling complex openings and systems."
            />
            
            <FeatureCard
              icon={<Wrench className="feature-icon" />}
              title="Manufacturers"
              description="Bridge the gap between design and production."
            />
            
            <FeatureCard
              icon={<Package className="feature-icon" />}
              title="Studios & Freelancers"
              description="Standardize workflows and scale output."
            />
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section background="alt" id="values">
        <Container>
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-16)' }}>What drives ML Extensions</h2>
          
          <div className="values-grid">
            <ValueCard
              icon={<Zap />}
              title="Speed"
              description="Automate repetitive modeling tasks."
            />
            
            <ValueCard
              icon={<Check />}
              title="Accuracy"
              description="Parametric, consistent, predictable results."
            />
            
            <ValueCard
              icon={<Settings />}
              title="Customization"
              description="Adapt tools to your workflow, not the other way around."
            />
            
            <ValueCard
              icon={<Package />}
              title="Production Awareness"
              description="Design with manufacturing constraints in mind."
            />
          </div>
        </Container>
      </Section>

      {/* Documentation Teaser */}
      <Section id="documentation">
        <Container textAlign="center">
          <h2>Learn once. Move fast.</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', marginTop: 'var(--spacing-6)', fontSize: 'var(--font-size-lg)' }}>
            Every ML Extension includes clear documentation, visual guides, and workflow-focused 
            explanations to get you productive quickly.
          </p>
          <div style={{ marginTop: 'var(--spacing-8)' }}>
            <Button href="#learn" variant="primary" icon={<BookOpen size={20} />}>
              Go to Documentation
            </Button>
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section background="alt" id="closing-cta">
        <Container textAlign="center">
          <h2>Build better models. Faster.</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto', marginTop: 'var(--spacing-6)', fontSize: 'var(--font-size-lg)' }}>
            Explore ML Extensions and see how professional SketchUp workflows are meant to feel.
          </p>
          <div style={{ marginTop: 'var(--spacing-8)' }}>
            <Button href="#products" variant="primary">
              View Products
            </Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

export default HomePage;