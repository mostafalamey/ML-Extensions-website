import { motion } from "framer-motion";
import {
  CheckSquare,
  Package,
  Wrench,
  FileText,
  ExternalLink,
  Home,
  Building,
  Layers,
} from "lucide-react";
import {
  ProductNavbar,
  Hero,
  Section,
  Container,
  FeatureCard,
  FeatureShowcard,
  Button,
  Footer,
  ImageGallery,
  type GalleryImage,
} from "../components";
import { staggerItem } from "../utils/animations";

// ML Doors Features Data
const mlDoorsFeatures = [
  {
    title: "Complete Door System Generation",
    description:
      "Automatically generate complete door assemblies including frames, jambs, casings, and hardware. No manual modeling required - get professional results in seconds.",
    gifUrl: undefined, // Will be added when available
    placeholderText: "Door System Demo",
  },
  {
    title: "Interactive 3D Preview System",
    description:
      "Real-time preview with door animations and opening/closing behaviors. See exactly how your doors will look and function before placement.",
    gifUrl: undefined,
    placeholderText: "3D Preview Demo",
  },
  {
    title: "Multiple Door Types",
    description:
      "Support for hinged (single/double), sliding, pocket doors, and standard doorways. Each type includes specialized hardware and placement logic.",
    gifUrl: undefined,
    placeholderText: "Door Types Demo",
  },
  {
    title: "20+ Professional Door Designs",
    description:
      "Comprehensive library of door leaf designs from traditional panels to contemporary styles. Mix and match with 48 professional materials.",
    gifUrl: undefined,
    placeholderText: "Door Library Demo",
  },
  {
    title: "Custom Geometry Import",
    description:
      "Import any SketchUp geometry as door panels, profiles, or hardware. Save custom designs for reuse across projects with complete flexibility.",
    gifUrl: undefined,
    placeholderText: "Custom Import Demo",
  },
  {
    title: "Intelligent Wall Integration",
    description:
      "Automatically cut and patch walls when placing or moving doors. Perfect wall integration with no manual cleanup required.",
    gifUrl: undefined,
    placeholderText: "Wall Integration Demo",
  },
  {
    title: "Door Animation System",
    description:
      "Smooth door motion with configurable opening directions and realistic swing behaviors. Perfect for presentations and design validation.",
    gifUrl: undefined,
    placeholderText: "Animation Demo",
  },
  {
    title: "Professional Documentation",
    description:
      "Generate detailed door schedules with CSV and HTML exports. Include specifications, materials, and hardware for production-ready documentation.",
    gifUrl: undefined,
    placeholderText: "Documentation Demo",
  },
];

// Gallery Images Data - Edit this array to add/remove/update gallery images
const galleryImages: GalleryImage[] = [
  {
    id: "door-1",
    url: "https://placehold.co/400x600/1a1a1a/FFC107?text=Door+Design+1",
    alt: "Door Design 1",
  },
  {
    id: "door-2",
    url: "https://placehold.co/400x600/1a1a1a/FFC107?text=Door+Design+2",
    alt: "Door Design 2",
  },
  {
    id: "door-3",
    url: "https://placehold.co/400x600/1a1a1a/FFC107?text=Door+Design+3",
    alt: "Door Design 3",
  },
  {
    id: "door-4",
    url: "https://placehold.co/400x600/1a1a1a/FFC107?text=Door+Design+4",
    alt: "Door Design 4",
  },
  {
    id: "door-5",
    url: "https://placehold.co/400x600/1a1a1a/FFC107?text=Door+Design+5",
    alt: "Door Design 5",
  },
  {
    id: "door-6",
    url: "https://placehold.co/400x600/1a1a1a/FFC107?text=Door+Design+6",
    alt: "Door Design 6",
  },
];

function MLDoors() {
  return (
    <div className="App">
      <ProductNavbar
        productName="ML Doors"
        gumroadUrl="https://mostafalamey1.gumroad.com/l/MLDoors232"
      />

      <Hero
        title="ML Doors"
        subtitle="A complete professional door creation and management system for SketchUp with automated placement, intelligent wall integration, and production-ready documentation."
        primaryButtonText="Buy on Gumroad"
        primaryButtonHref="https://mostafalamey1.gumroad.com/l/MLDoors232"
        primaryButtonTarget="_blank"
        secondaryButtonText="View Documentation"
        secondaryButtonHref="#documentation"
        backgroundImages={["/doors-hero/door01.webp", "/doors-hero/door02.webp"]}
        carouselInterval={5000}
      />

      {/* The Problem */}
      <Section id="problem" animation="fade-up">
        <Container textAlign="center">
          <h2>The problem</h2>
          <p className="content-max-width-700 margin-top-6 text-lg">
            Creating doors manually in SketchUp is time-consuming and
            inconsistent. Wall cutting, frame geometry, hardware placement, and
            documentation require tedious manual work — and client changes mean
            starting over.
          </p>
        </Container>
      </Section>

      {/* What It Does */}
      <Section background="alt" id="solution" animation="fade-left">
        <Container stagger>
          <h2 className="text-center margin-bottom-16">What it does</h2>

          <div className="content-max-width-800 margin-bottom-12">
            <p className="text-lg text-center margin-bottom-8">
              ML Doors transforms door design with a complete automated system
              that eliminates manual modeling and delivers professional results
              including frames, casings, hardware, and intelligent wall
              integration.
            </p>
          </div>

          <div className="grid-2 grid-gap-8">
            <div className="feature-list">
              <h3 className="margin-bottom-6">Key capabilities:</h3>
              <ul className="feature-list-unstyled">
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    20+ professional door designs with 48 material combinations
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Complete system generation including frames, jambs, and
                    casings
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Interactive 3D preview with realistic door animations
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Multiple door types: hinged, sliding, pocket, and doorways
                  </span>
                </motion.li>
              </ul>
            </div>

            <div className="feature-list">
              <h3 className="margin-bottom-6">&nbsp;</h3>
              <ul className="feature-list-unstyled">
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Automatic wall cutting and patching with intelligent
                    integration
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Custom geometry import for unlimited design flexibility
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Professional schedule generation with CSV and HTML exports
                  </span>
                </motion.li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Showcase */}
      <Section id="features">
        <Container>
          <h2 className="text-center margin-bottom-16">Key Features</h2>

          <div className="grid-2 grid-gap-12">
            {mlDoorsFeatures.map((feature, index) => (
              <FeatureShowcard
                key={index}
                title={feature.title}
                description={feature.description}
                gifUrl={feature.gifUrl}
                placeholderText={feature.placeholderText}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section background="alt" id="gallery" animation="zoom">
        <Container>
          <h2 className="text-center margin-bottom-12">Project Gallery</h2>
          <p className="content-max-width-700 text-center margin-bottom-12 text-lg">
            Explore real door designs created with ML Doors. Hover to reveal
            details, click to enlarge.
          </p>
          <ImageGallery images={galleryImages} scrollSpeed={0.5} />
        </Container>
      </Section>

      {/* Workflow */}
      <Section id="workflow" animation="fade-right">
        <Container stagger>
          <h2 className="text-center margin-bottom-16">
            How it fits into your workflow
          </h2>

          <div className="grid-2 grid-gap-12">
            <div className="workflow-steps">
              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">1</span>
                <div>
                  <h4>Select wall and door type</h4>
                  <p>
                    Choose from hinged, sliding, pocket, or standard doorways.
                  </p>
                </div>
              </motion.div>

              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">2</span>
                <div>
                  <h4>Place automatically</h4>
                  <p>Wall cutting and patching happen instantly.</p>
                </div>
              </motion.div>

              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">3</span>
                <div>
                  <h4>Customize design</h4>
                  <p>Adjust materials, profiles, and hardware.</p>
                </div>
              </motion.div>
            </div>

            <div className="workflow-steps">
              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">4</span>
                <div>
                  <h4>Preview and animate</h4>
                  <p>Test door behavior with realistic motion.</p>
                </div>
              </motion.div>

              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">5</span>
                <div>
                  <h4>Generate documentation</h4>
                  <p>Export schedules and production specifications.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Who It's For */}
      <Section background="alt" id="who-its-for" animation="fade-up">
        <Container stagger>
          <h2 className="text-center margin-bottom-16">Who this is for</h2>

          <div className="grid-3">
            <FeatureCard
              icon={<Building className="feature-icon" />}
              title="Architects"
              description="Speed up door placement and maintain design accuracy."
            />

            <FeatureCard
              icon={<Home className="feature-icon" />}
              title="Interior Designers"
              description="Visualize detailed door variations with precision."
            />

            <FeatureCard
              icon={<Wrench className="feature-icon" />}
              title="Contractors"
              description="Keep models accurate and production-ready."
            />

            <FeatureCard
              icon={<Layers className="feature-icon" />}
              title="BIM Professionals"
              description="Ensure door specifications match project requirements."
            />

            <FeatureCard
              icon={<Package className="feature-icon" />}
              title="Millwork Designers"
              description="Create detailed door systems for manufacturing."
            />
          </div>
        </Container>
      </Section>

      {/* Compatibility */}
      <Section id="compatibility" animation="fade-left">
        <Container textAlign="center">
          <h2>Compatibility</h2>
          <div className="compatibility-wrapper">
            <div className="compatibility-grid">
              <div>
                <h4 className="compatibility-item-title">SketchUp Versions</h4>
                <p>2021 and newer</p>
              </div>
              <div>
                <h4 className="compatibility-item-title">Operating Systems</h4>
                <p>Windows & Mac</p>
              </div>
              <div>
                <h4 className="compatibility-item-title">Units</h4>
                <p>Metric and Imperial supported</p>
              </div>
              <div>
                <h4 className="compatibility-item-title">Requirements</h4>
                <p>Internet connection for license verification</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Documentation */}
      <Section background="alt" id="documentation" animation="scale">
        <Container textAlign="center">
          <h2>Learn and master</h2>
          <p className="content-max-width-600 margin-top-6 text-lg">
            ML Doors includes built-in documentation with visual guides and
            context-sensitive help to get you productive quickly with
            professional door design workflows.
          </p>
          <div className="margin-top-8">
            <Button
              href="#learn"
              variant="secondary"
              icon={<FileText size={20} />}
            >
              View Documentation
            </Button>
          </div>
        </Container>
      </Section>

      {/* Roadmap */}
      <Section id="roadmap" animation="fade-right">
        <Container textAlign="center">
          <h2>Where this is going</h2>
          <p className="content-max-width-600 margin-top-6 text-lg">
            ML Doors continues to evolve with expanded door libraries, enhanced
            automation, and deeper integration with architectural workflows
            based on professional feedback.
          </p>
        </Container>
      </Section>

      {/* Purchase CTA */}
      <Section background="alt" id="purchase" animation="zoom">
        <Container textAlign="center">
          <h2>Ready to transform your door design workflow?</h2>
          <p className="content-max-width-500 margin-top-6 text-lg">
            Get ML Doors and start creating professional door systems with
            precision, speed, and complete automation.
          </p>
          <div className="margin-top-8">
            <Button
              href="https://mostafalamey1.gumroad.com/l/MLDoors232"
              target="_blank"
              variant="primary"
              icon={<ExternalLink size={20} />}
            >
              Buy on Gumroad
            </Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

export default MLDoors;
