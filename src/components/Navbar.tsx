import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import MLExtensionsLogo from "../assets/ml_extensions_logo.svg";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navLinksRef = React.useRef<{ [key: string]: HTMLAnchorElement | null }>(
    {},
  );

  const navItems = [
    { id: "home", href: "#", label: "Home", sectionId: "home" },
    {
      id: "products",
      href: "#products",
      label: "Products",
      sectionId: "products",
    },
    { id: "learn", href: "#learn", label: "Learn", sectionId: "learn" },
    { id: "about", href: "#about", label: "About", sectionId: "about" },
    { id: "contact", href: "#contact", label: "Contact", sectionId: "contact" },
  ];

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
      const wrapper = activeLink?.closest(".base-navbar-links-wrapper");

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
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
    }
  };

  return (
    <>
      <nav
        className={`base-navbar ${isNavbarHidden ? "hidden" : ""} ${className}`}
      >
        <div className="base-navbar-container">
          <Link to="/" className="base-navbar-logo">
            <img
              src={MLExtensionsLogo}
              alt="ML Extensions"
              width="36"
              height="36"
            />
            ML Extensions
          </Link>

          {/* Desktop Navigation */}
          <div className="base-navbar-links-wrapper">
            <ul className="base-navbar-links navbar-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    ref={(el) => {
                      navLinksRef.current[item.id] = el;
                    }}
                    href={item.href}
                    className={`base-navbar-link ${activeSection === item.id ? "active" : ""}`}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Dynamic positioning - inline styles required for calculated transform/width values */}
            <span
              className="base-navbar-underline navbar-underline"
              style={{
                transform: `translateX(${underlineStyle.left}px)`,
                width: `${underlineStyle.width}px`,
              }}
              aria-hidden="true"
            />
          </div>

          {/* CTA and Mobile Menu Button */}
          <Button
            href="#products"
            variant="primary"
            className="base-navbar-cta"
            onClick={(e) => handleNavClick(e, "products")}
          >
            View Products
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="base-mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`base-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="base-mobile-menu-header">
          <Link to="/" className="base-navbar-logo" onClick={closeMobileMenu}>
            <img
              src={MLExtensionsLogo}
              alt="ML Extensions"
              width="24"
              height="24"
            />
            ML Extensions
          </Link>
          <button
            className="base-mobile-menu-close mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="base-mobile-menu-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={activeSection === item.id ? "active" : ""}
                onClick={(e) => {
                  handleNavClick(e, item.sectionId);
                  closeMobileMenu();
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="base-mobile-menu-footer">
          <Button
            href="#products"
            variant="primary"
            onClick={(e) => {
              handleNavClick(e, "products");
              closeMobileMenu();
            }}
          >
            View Products
          </Button>
        </div>
      </div>
    </>
  );
};
