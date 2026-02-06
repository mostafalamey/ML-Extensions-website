---
name: gumroad-ecommerce-integration
description: Handles Gumroad store integration, purchase buttons, product synchronization, and checkout flows for SketchUp extensions. Use when implementing purchase functionality or managing Gumroad products.
---

# Gumroad E-commerce Integration

Integrate Gumroad seamlessly into the ML Extensions website for smooth purchasing experience.

## Gumroad Embed Methods

### 1. Direct Purchase Links
```jsx
const GumroadButton = ({ productId, price, productName }) => {
  const gumroadUrl = `https://gum.co/${productId}?wanted=true`;
  
  return (
    <a
      href={gumroadUrl}
      className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
      target="_blank"
      rel="noopener noreferrer"
    >
      Buy {productName} - ${price}
    </a>
  );
};
```

### 2. Embedded Checkout Overlay
```jsx
import { useEffect } from 'react';

const GumroadOverlay = ({ productId, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen && window.GumroadOverlay) {
      window.GumroadOverlay.open({
        url: `https://gum.co/${productId}`,
        title: 'Purchase Extension'
      });
    }
  }, [isOpen, productId]);

  // Load Gumroad overlay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://gumroad.com/js/gumroad-overlay.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};
```

### 3. Product Information Integration
```jsx
const GumroadProduct = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product info from Gumroad API
    fetch(`https://api.gumroad.com/v2/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load product:', err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">${(product.price / 100).toFixed(2)}</div>
      <GumroadButton 
        productId={productId} 
        price={(product.price / 100).toFixed(2)}
        productName={product.name}
      />
    </div>
  );
};
```

## Enhanced Purchase Buttons

### Primary CTA Button
```jsx
const PrimaryPurchaseButton = ({ extension }) => (
  <div className="text-center space-y-4">
    <a
      href={`https://gum.co/${extension.gumroadId}?wanted=true`}
      className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
      target="_blank"
      rel="noopener noreferrer"
    >
      🚀 Get {extension.name} Now - ${extension.price}
    </a>
    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
      <span>✅ Instant Download</span>
      <span>✅ 30-Day Guarantee</span>
      <span>✅ Email Support</span>
    </div>
  </div>
);
```

### Secondary CTA Buttons
```jsx
const SecondaryCTA = ({ extension }) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <a
      href={`https://gum.co/${extension.gumroadId}?wanted=true`}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      Buy Now - ${extension.price}
    </a>
    <button 
      onClick={() => setShowDemo(true)}
      className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
    >
      See Demo
    </button>
  </div>
);
```

## Discount Code Integration

```jsx
const DiscountBanner = ({ discountCode, discountPercent, expiryDate }) => {
  const isExpired = new Date() > new Date(expiryDate);
  
  if (isExpired) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-3 px-4 mb-6 rounded-lg">
      <div className="font-bold">
        🔥 Limited Time: {discountPercent}% OFF with code "{discountCode}"
      </div>
      <div className="text-sm opacity-90">
        Expires {new Date(expiryDate).toLocaleDateString()}
      </div>
    </div>
  );
};
```

## Purchase Analytics Tracking

```jsx
const trackPurchaseClick = (extensionName, price, source) => {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: parseFloat(price),
      items: [{
        item_id: extensionName.toLowerCase().replace(/\s+/g, '-'),
        item_name: extensionName,
        category: 'SketchUp Extension',
        price: parseFloat(price),
        quantity: 1
      }]
    });
  }

  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      content_name: extensionName,
      content_type: 'product',
      value: parseFloat(price),
      currency: 'USD'
    });
  }
};
```

## Affiliate Link Support

```jsx
const generateAffiliateLink = (productId, affiliateCode) => {
  const baseUrl = `https://gum.co/${productId}`;
  const params = new URLSearchParams({
    wanted: 'true',
    ...(affiliateCode && { affiliate: affiliateCode })
  });
  
  return `${baseUrl}?${params.toString()}`;
};
```

## Customer Success Flow

```jsx
const PurchaseSuccessModal = ({ isOpen, onClose, extension }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your purchase of {extension.name} is complete. 
            Check your email for download instructions.
          </p>
          <div className="space-y-4">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Browsing
            </button>
            <a
              href="/support"
              className="block text-blue-600 hover:text-blue-700"
            >
              Need help? Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## Security & Error Handling

- Always use HTTPS for purchase links
- Validate product IDs before generating links
- Handle network errors gracefully
- Implement retry logic for failed API calls
- Log purchase events for analytics
- Provide clear error messages to users

## Testing Checklist

- [ ] Purchase button functionality
- [ ] Discount code application
- [ ] Mobile responsiveness
- [ ] Analytics tracking
- [ ] Error handling
- [ ] Loading states
- [ ] Accessibility compliance