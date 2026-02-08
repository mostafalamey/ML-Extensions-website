import { useEffect, useState } from "react";
import {
  Package,
  Zap,
  Settings,
  Check,
  BookOpen,
  Users,
  Wrench,
  Target,
} from "lucide-react";
import {
  Navbar,
  Hero,
  Section,
  Container,
  ProductCard,
  FeatureCard,
  ValueCard,
  Button,
  Footer,
} from "../components";

// Hero images for each product
const kitchenHeroImages = [
  "/kitchens-hero/kit05.webp",
  "/kitchens-hero/kit06.webp",
  "/kitchens-hero/kit08.webp",
  "/kitchens-hero/kit15.webp",
];

const doorHeroImages = ["/doors-hero/door01.webp", "/doors-hero/door02.webp"];

// Function to get a random image from an array
const getRandomImage = (images: string[]) => {
  return images[Math.floor(Math.random() * images.length)];
};

function HomePage() {
  const [kitchenImage] = useState(() => getRandomImage(kitchenHeroImages));
  const [doorImage] = useState(() => getRandomImage(doorHeroImages));

  useEffect(() => {
    // Handle smooth scrolling for all hash links
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash) {
        const hash = anchor.hash;
        const sectionId = hash.substring(1);

        // Don't prevent navigation to product pages
        if (anchor.pathname !== window.location.pathname) {
          return;
        }

        e.preventDefault();

        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleHashClick);

    return () => {
      document.removeEventListener("click", handleHashClick);
    };
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
        backgroundImages={[
          "/kitchens-hero/kit05.webp",
          "/kitchens-hero/kit06.webp",
          "/doors-hero/door01.webp",
          "/kitchens-hero/kit08.webp",
          "/doors-hero/door02.webp",
          "/kitchens-hero/kit15.webp",
        ]}
        carouselInterval={5000}
      />

      {/* Introduction Section */}
      <Section id="introduction" animation="fade-up">
        <Container textAlign="center">
          <h2>Built for real production workflows</h2>
          <p className="content-max-width-600 margin-top-6 text-lg">
            ML Extensions creates professional-grade SketchUp tools designed to
            eliminate repetitive work, enforce consistency, and prepare models
            for real-world manufacturing.
          </p>
          <p className="margin-top-4 text-lg">
            Our extensions are built for people who don't just visualize spaces
            — they build them.
          </p>
        </Container>
      </Section>

      {/* Products Overview */}
      <Section background="alt" id="products" animation="scale">
        <Container stagger>
          <h2 className="text-center margin-bottom-16">Extensions</h2>

          <div className="grid-2">
            <ProductCard
              title="ML Kitchens"
              description="A complete modular kitchen system for SketchUp. Design faster, customize deeply, and generate manufacturing-ready kitchen layouts."
              href="/ml-kitchens"
              imageSrc={kitchenImage}
              imageAlt="ML Kitchens Extension"
            />

            <ProductCard
              title="ML Doors"
              description="A comprehensive door system for SketchUp. Create, place, customize, animate, and document doors with precision and speed."
              href="/ml-doors"
              imageSrc={doorImage}
              imageAlt="ML Doors Extension"
            />
          </div>
        </Container>
      </Section>

      {/* Who It's For */}
      <Section id="who-its-for" animation="fade-right">
        <Container stagger>
          <h2 className="text-center margin-bottom-16">
            Designed for professionals
          </h2>

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
      <Section background="alt" id="values" animation="fade-left">
        <Container stagger>
          <h2 className="text-center margin-bottom-16">
            What drives ML Extensions
          </h2>

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

      {/* Learn Section */}
      <Section id="learn" animation="zoom">
        <Container textAlign="center" stagger>
          <h2>Learn & Documentation</h2>
          <p className="content-max-width-600 margin-top-6 text-lg">
            Every ML Extension includes clear documentation, visual guides, and
            workflow-focused explanations to get you productive quickly.
          </p>
          <div className="grid-3 homepage-section-margin">
            <FeatureCard
              icon={<BookOpen className="feature-icon" />}
              title="Comprehensive Docs"
              description="Step-by-step guides for every feature and workflow."
            />
            <FeatureCard
              icon={<Zap className="feature-icon" />}
              title="Quick Start Guides"
              description="Get up and running in minutes with quick tutorials."
            />
            <FeatureCard
              icon={<Settings className="feature-icon" />}
              title="Advanced Techniques"
              description="Master advanced features and customization options."
            />
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section background="alt" id="about" animation="fade-up">
        <Container textAlign="center" stagger>
          <h2>About ML Extensions</h2>
          <p className="content-max-width-700 margin-top-6 text-lg">
            ML Extensions was founded with a simple mission: build
            professional-grade SketchUp tools that eliminate repetitive work and
            bridge the gap between design and manufacturing.
          </p>
          <p className="content-max-width-700 margin-top-4 text-lg">
            Our extensions are used by designers, architects, and manufacturers
            around the world who demand precision, speed, and reliability in
            their workflows.
          </p>
          <div className="grid-3 homepage-section-margin">
            <ValueCard
              icon={<Target />}
              title="Professional Focus"
              description="Built for real-world production workflows, not hobbyists."
            />
            <ValueCard
              icon={<Check />}
              title="Quality First"
              description="Rigorous testing and continuous improvement."
            />
            <ValueCard
              icon={<Users />}
              title="User-Driven"
              description="Features based on real user needs and feedback."
            />
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" animation="fade-right">
        <Container textAlign="center">
          <h2>Get in Touch</h2>
          <p className="content-max-width-600 margin-top-6 text-lg">
            Have questions about our extensions? Need support or want to request
            a feature? We'd love to hear from you.
          </p>
          <div className="contact-info-wrapper">
            <div>
              <h3 className="homepage-subtitle-margin">Email</h3>
              <a
                href="mailto:support@mlextensions.com"
                className="contact-link text-lg"
              >
                support@mlextensions.com
              </a>
            </div>
            <div>
              <h3 className="homepage-subtitle-margin">Support</h3>
              <p>Visit our Gumroad pages for product support and updates</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section background="alt" id="closing-cta" animation="scale">
        <Container textAlign="center">
          <h2>Build better models. Faster.</h2>
          <p className="content-max-width-500 margin-top-6 text-lg">
            Explore ML Extensions and see how professional SketchUp workflows
            are meant to feel.
          </p>
          <div className="margin-top-8">
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
