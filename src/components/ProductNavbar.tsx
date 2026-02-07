import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "./Button";
import MLExtensionsLogo from "../assets/ml_extensions_logo.svg";

interface ProductNavbarProps {
  productName: string;
  gumroadUrl: string;
  className?: string;
}

export const ProductNavbar: React.FC<ProductNavbarProps> = ({
  productName,
  gumroadUrl,
  className = "",
}) => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("problem");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navLinksRef = React.useRef<{ [key: string]: HTMLAnchorElement | null }>(
    {},
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down past threshold
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsNavbarHidden(true);
      }
      // Show navbar when scrolling up or near top
      else if (currentScrollY < lastScrollY || currentScrollY <= 80) {
        setIsNavbarHidden(false);
      }

      setLastScrollY(currentScrollY);

      // Determine active section - only update if we find a section with a navbar link
      const sections = navItems.map((item) => item.sectionId);
      let foundSection: string | null = null;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with some offset for navbar)
          if (rect.top <= 150 && rect.bottom >= 150) {
            const navItemId = navItems.find(
              (item) => item.sectionId === sectionId,
            )?.id;
            if (navItemId) {
              foundSection = navItemId;
              break;
            }
          }
        }
      }

      // Only update active section if we found a valid navbar section
      if (foundSection) {
        setActiveSection(foundSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Update underline position when active section changes
  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeLink = navLinksRef.current[activeSection];
      const wrapper = activeLink?.closest(".product-navbar-links-wrapper");

      if (activeLink && wrapper) {
        const wrapperRect = wrapper.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setUnderlineStyle({
          left: linkRect.left - wrapperRect.left,
          width: linkRect.width,
        });
      }
    };

    updateUnderlinePosition();
    window.addEventListener("resize", updateUnderlinePosition);

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(updateUnderlinePosition, 100);

    return () => {
      window.removeEventListener("resize", updateUnderlinePosition);
      clearTimeout(timeout);
    };
  }, [activeSection]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for fixed navbar
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "problem", href: "#problem", label: "Problem", sectionId: "problem" },
    {
      id: "solution",
      href: "#solution",
      label: "Solution",
      sectionId: "solution",
    },
    {
      id: "features",
      href: "#features",
      label: "Features",
      sectionId: "features",
    },
    { id: "gallery", href: "#gallery", label: "Gallery", sectionId: "gallery" },
    {
      id: "workflow",
      href: "#workflow",
      label: "Workflow",
      sectionId: "workflow",
    },
    {
      id: "who-its-for",
      href: "#who-its-for",
      label: "Users",
      sectionId: "who-its-for",
    },
    {
      id: "compatibility",
      href: "#compatibility",
      label: "Compatibility",
      sectionId: "compatibility",
    },
  ];

  return (
    <nav
      className={`product-navbar ${isNavbarHidden ? "hidden" : ""} ${className}`}
    >
      <div className="product-navbar-container">
        {/* Brand Section with Home Button */}
        <div className="product-navbar-brand">
          <a href="/" className="product-navbar-brand-link">
            ML Extensions
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="product-navbar-desktop-nav">
          <div className="product-navbar-links-wrapper">
            <div className="product-navbar-links">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  ref={(el) => (navLinksRef.current[item.id] = el)}
                  href={item.href}
                  className={`product-navbar-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            {/* Dynamic positioning - inline styles required for calculated transform/width values */}
            <span
              className="product-navbar-underline"
              style={{
                transform: `translateX(${underlineStyle.left}px)`,
                width: `${underlineStyle.width}px`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* CTA and Mobile Menu Button */}
        <div className="product-navbar-cta-mobile-wrapper">
          <div className="product-navbar-desktop-cta">
            <Button
              href={gumroadUrl}
              target="_blank"
              variant="primary"
              icon={<ExternalLink size={16} />}
              className="product-navbar-cta-button"
            >
              Buy on Gumroad
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="product-navbar-mobile-menu-button"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="product-navbar-mobile-menu">
            <div className="product-navbar-mobile-menu-nav">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="product-navbar-mobile-nav-link"
                  onClick={(e) => {
                    handleNavClick(e, item.sectionId);
                    closeMobileMenu();
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <Button
              href={gumroadUrl}
              target="_blank"
              variant="primary"
              icon={<ExternalLink size={16} />}
              className="product-navbar-mobile-cta-button"
            >
              Buy on Gumroad
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
