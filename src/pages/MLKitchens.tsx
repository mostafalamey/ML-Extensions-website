import { motion } from "framer-motion";
import {
  CheckSquare,
  Package,
  Settings,
  Zap,
  Users,
  Wrench,
  FileText,
  ExternalLink,
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

// ML Kitchens Features Data
const mlKitchensFeatures = [
  {
    title: "Advanced Configuration Dialog",
    description:
      "Six-tab interface with live 3D preview. Configure dimensions, construction, doors, drawers, and materials with real-time visual feedback.",
    gifUrl: undefined, // Will be added when available
    placeholderText: "Config Dialog Demo",
  },
  {
    title: "Revolutionary 3D Preview System",
    description:
      "Real-time Three.js visualization with interactive door and drawer animations. Click to open elements and see exactly what you're designing.",
    gifUrl: undefined,
    placeholderText: "3D Preview Demo",
  },
  {
    title: "Precision Placement Controls",
    description:
      "Advanced placement with keyboard shortcuts, live anchor markers, and 90° rotation controls for perfect cabinet positioning every time.",
    gifUrl: undefined,
    placeholderText: "Placement Demo",
  },
  {
    title: "160+ Professional Cabinet Presets",
    description:
      "Complete library of base, wall, tall, and corner cabinets in both metric and imperial units. From single doors to complex configurations.",
    gifUrl: undefined,
    placeholderText: "Cabinet Library Demo",
  },
  {
    title: "25+ Door & Drawer Styles",
    description:
      "From classic Shaker to contemporary slab designs. Mix and match styles per cabinet or even per door for unlimited design flexibility.",
    gifUrl: undefined,
    placeholderText: "Styles Demo",
  },
  {
    title: "Built-In Appliance Integration",
    description:
      "Visual appliance selector with ovens, microwaves, dishwashers, and refrigerators. Automatic scaling and real-time 3D preview integration.",
    gifUrl: undefined,
    placeholderText: "Appliances Demo",
  },
  {
    title: "Professional Schedule Manager",
    description:
      "Generate detailed cabinet schedules with filtering, client information, and professional CSV/HTML exports for quotes and documentation.",
    gifUrl: undefined,
    placeholderText: "Schedule Demo",
  },
  {
    title: "OpenCutList Compatibility",
    description:
      "Seamless integration with manufacturing tools. Generate cut lists, material reports, and CNC-ready documentation from your designs.",
    gifUrl: undefined,
    placeholderText: "Manufacturing Demo",
  },
];

// Gallery Images Data - Edit this array to add/remove/update gallery images
const galleryImages: GalleryImage[] = [
  {
    id: "kitchen-2",
    url: "/kitchens-gallery/kit02.webp",
    alt: "Contemporary Kitchen Layout",
  },
  {
    id: "kitchen-4",
    url: "/kitchens-gallery/kit04.webp",
    alt: "Professional Kitchen Design",
  },
  {
    id: "kitchen-5",
    url: "/kitchens-gallery/kit05.webp",
    alt: "Kitchen Cabinetry System",
  },
  {
    id: "kitchen-6",
    url: "/kitchens-gallery/kit06.webp",
    alt: "Custom Kitchen Installation",
  },
  {
    id: "kitchen-7",
    url: "/kitchens-gallery/kit07.webp",
    alt: "Modular Kitchen Design",
  },
  {
    id: "kitchen-8",
    url: "/kitchens-gallery/kit08.webp",
    alt: "Kitchen with Island Configuration",
  },
  {
    id: "kitchen-9",
    url: "/kitchens-gallery/kit09.webp",
    alt: "Elegant Kitchen Setup",
  },
  {
    id: "kitchen-10",
    url: "/kitchens-gallery/kit10.webp",
    alt: "Complete Kitchen Design Solution",
  },
  {
    id: "kitchen-11",
    url: "/kitchens-gallery/kit11.webp",
    alt: "Kitchen Cabinet Arrangement",
  },
  {
    id: "kitchen-12",
    url: "/kitchens-gallery/kit12.webp",
    alt: "Professional Kitchen Layout",
  },
  {
    id: "kitchen-13",
    url: "/kitchens-gallery/kit13.webp",
    alt: "High-End Kitchen Design",
  },
  {
    id: "kitchen-14",
    url: "/kitchens-gallery/kit14.webp",
    alt: "Kitchen Design with Appliances",
  },
  {
    id: "kitchen-15",
    url: "/kitchens-gallery/kit15.webp",
    alt: "Modern Kitchen Cabinets",
  },
  {
    id: "kitchen-16",
    url: "/kitchens-gallery/kit16.webp",
    alt: "Kitchen Design Example",
  },
  {
    id: "kitchen-17",
    url: "/kitchens-gallery/kit17.webp",
    alt: "Complete Kitchen Project",
  },
];

function MLKitchens() {
  return (
    <div className="App">
      <ProductNavbar
        productName="ML Kitchens"
        gumroadUrl="https://mostafalamey1.gumroad.com/l/mlkitchens281"
      />

      <Hero
        title="ML Kitchens"
        subtitle="A professional kitchen cabinet design extension for SketchUp with precision workflows, real-time previews, and production-ready outputs."
        primaryButtonText="Buy on Gumroad"
        primaryButtonHref="https://mostafalamey1.gumroad.com/l/mlkitchens281"
        primaryButtonTarget="_blank"
        secondaryButtonText="View Documentation"
        secondaryButtonHref="#documentation"
        backgroundImages={[
          "/kitchens-hero/kit04.webp",
          "/kitchens-hero/kit05.webp",
          "/kitchens-hero/kit06.webp",
          "/kitchens-hero/kit08.webp",
          "/kitchens-hero/kit15.webp",
        ]}
        carouselInterval={5000}
      />

      {/* The Problem */}
      <Section id="problem" animation="fade-up">
        <Container textAlign="center">
          <h2>The problem</h2>
          <p className="content-max-width-700 margin-top-6 text-lg">
            Designing cabinets by hand wastes hours. Static plans, manual
            measurements, and inconsistent revisions slow you down — and client
            revisions make it worse. Most kitchen tools lack flexibility,
            customizable hardware, and reliable documentation.
          </p>
        </Container>
      </Section>

      {/* What It Does */}
      <Section background="alt" id="solution" animation="fade-left">
        <Container stagger>
          <h2 className="text-center margin-bottom-16">What it does</h2>

          <div className="content-max-width-800 margin-bottom-12">
            <p className="text-lg text-center margin-bottom-8">
              ML Kitchens replaces manual cabinet modeling with a fully
              automated, customizable system built for real workflows.
            </p>
          </div>

          <div className="grid-2 grid-gap-8">
            <div className="feature-list">
              <h3 className="margin-bottom-6">Key capabilities:</h3>
              <ul className="feature-list-unstyled">
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    160+ professional cabinet presets with metric and imperial
                    support
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Live 3D preview with smooth animations and real-time
                    feedback
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Six-tab configuration interface for every design detail
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Multiple door, drawer, hardware, and material libraries
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
                    Integrated appliance placement and countertop generation
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Professional schedule manager with CSV/HTML exports
                  </span>
                </motion.li>
                <motion.li className="feature-list-item" variants={staggerItem}>
                  <CheckSquare size={20} className="feature-list-icon" />
                  <span>
                    Fully compatible with manufacturing tools like OpenCutList
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
            {mlKitchensFeatures.map((feature, index) => (
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
            Explore real kitchen designs created with ML Kitchens. Hover to
            reveal details, click to enlarge.
          </p>
          <ImageGallery images={galleryImages} scrollSpeed={0.9} />
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
                  <h4>Start with presets</h4>
                  <p>Place cabinets using presets or custom dimensions.</p>
                </div>
              </motion.div>

              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">2</span>
                <div>
                  <h4>Customize everything</h4>
                  <p>Adjust geometry, materials, hardware, and appliances.</p>
                </div>
              </motion.div>

              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">3</span>
                <div>
                  <h4>Preview changes</h4>
                  <p>See updates instantly in real-time 3D.</p>
                </div>
              </motion.div>
            </div>

            <div className="workflow-steps">
              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">4</span>
                <div>
                  <h4>Generate documentation</h4>
                  <p>Create schedules and production documentation.</p>
                </div>
              </motion.div>

              <motion.div className="workflow-step workflow-step-spacing" variants={staggerItem}>
                <span className="step-number">5</span>
                <div>
                  <h4>Export results</h4>
                  <p>Print or export finished designs and schedules.</p>
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
              icon={<Settings className="feature-icon" />}
              title="Kitchen Designers"
              description="Present accurate designs that clients understand."
            />

            <FeatureCard
              icon={<Wrench className="feature-icon" />}
              title="Contractors & Remodelers"
              description="Quote and deliver with precision."
            />

            <FeatureCard
              icon={<Users className="feature-icon" />}
              title="Architects"
              description="Integrate detailed kitchen cabinetry into projects."
            />

            <FeatureCard
              icon={<Package className="feature-icon" />}
              title="Cabinet Makers"
              description="Produce accurate parts with manufacturing-ready exports."
            />

            <FeatureCard
              icon={<Zap className="feature-icon" />}
              title="Interior Designers"
              description="Customize every detail with confidence."
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
                <h4 className="compatibility-item-title">Requirements</h4>
                <p>Internet connection for license verification</p>
              </div>
              <div>
                <h4 className="compatibility-item-title">Editions</h4>
                <p>Works in SketchUp Pro and Make (2024+)</p>
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
            Comprehensive guides, feature documentation, keyboard shortcuts, and
            workflow examples are included to help you get productive quickly.
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
            ML Kitchens continues to evolve with deeper manufacturing
            integration, expanded libraries, and new workflow simplifications
            based on real user feedback.
          </p>
        </Container>
      </Section>

      {/* Purchase CTA */}
      <Section background="alt" id="purchase" animation="zoom">
        <Container textAlign="center">
          <h2>Ready to transform your kitchen design workflow?</h2>
          <p className="content-max-width-500 margin-top-6 text-lg">
            Get ML Kitchens and start designing professional kitchen cabinets
            with precision and speed.
          </p>
          <div className="margin-top-8">
            <Button
              href="https://mostafalamey1.gumroad.com/l/mlkitchens281"
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

export default MLKitchens;
