import { useState } from 'react';
import { X, Sparkles, Check, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { authService, dbService } from '../../lib/firebase';
import { useDialog } from '../../hooks/useDialog';

interface CheckoutModalProps {
  uid: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export function CheckoutModal({ uid, onClose, onPaymentSuccess }: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isPreviewCheckout = !authService.isReal;
  const dialogRef = useDialog<HTMLDivElement>(onClose, !loading);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPreviewCheckout) return;
    const cardDigits = cardNumber.replace(/\s/g, '');
    const [month, year] = expiry.split('/').map(Number);
    if (!name.trim() || cardDigits.length < 15 || !month || month > 12 || !year || cvc.length < 3) {
      setError('Please fill in all card details.');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate payment processing delay (1.5 seconds)
    setTimeout(async () => {
      try {
        await dbService.updateUserStats(uid, { isPremium: true });
        onPaymentSuccess();
        onClose();
      } catch (err: any) {
        console.error("Payment sync failed:", err);
        setError('Payment verification failed. Please try again.');
        setLoading(false);
      }
    }, 1500);
  };

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const priceId = import.meta.env.VITE_STRIPE_PRICE_ID;
      if (!priceId) {
        throw new Error("Stripe Price ID is missing in environment configuration.");
      }
      if (priceId.startsWith('prod_')) {
        throw new Error("Your configuration currently uses a Stripe Product ID (prod_...) instead of a Price ID (price_...). Please find your Price ID in the Stripe Dashboard under Pricing and update VITE_STRIPE_PRICE_ID in your .env file.");
      }
      const checkoutUrl = await dbService.createCheckoutSession(uid, priceId);
      window.location.assign(checkoutUrl);
    } catch (err: any) {
      console.error("Stripe Checkout Redirect Error:", err);
      setError(err?.message || "Secure payment redirect failed. Please try again later.");
      setLoading(false);
    }
  };


  const handleFormatCardNumber = (value: string) => {
    const raw = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const groups = [];
    for (let i = 0; i < raw.length; i += 4) {
      groups.push(raw.substring(i, i + 4));
    }
    setCardNumber(groups.join(' ').substring(0, 19));
  };

  const handleFormatExpiry = (value: string) => {
    const raw = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (raw.length >= 2) {
      setExpiry(`${raw.substring(0, 2)}/${raw.substring(2, 4)}`.substring(0, 5));
    } else {
      setExpiry(raw);
    }
  };

  return <div className="modal-backdrop checkout-backdrop" onMouseDown={event => { if (event.target === event.currentTarget && !loading) onClose(); }}>
    <div className="modal-content checkout-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <header className="modal-header">
        <div className="modal-title">
          <Sparkles className="icon-coral" size={20} />
          <h2 id="checkout-title">Upgrade to Sori Pro</h2>
        </div>
        <button className="close-button" onClick={onClose} disabled={loading} aria-label="Close checkout">
          <X size={20} />
        </button>
      </header>

      <div className="modal-body checkout-grid">
        {/* Left Side: Pitch */}
        <div className="checkout-pitch">
          <div className="price-badge">
            <span className="tier-name">YEARLY SUBSCRIPTION</span>
            <div className="price-block">
              <strong>$10</strong>
              <div>
                <span>/ month</span>
                <small>Billed annually ($120.00)</small>
              </div>
            </div>
          </div>

          <ul className="premium-perks">
            <li>
              <Check size={16} className="icon-green" />
              <div>
                <strong>Unlimited AI Stories</strong>
                <span>Generate custom graded readers on any topic.</span>
              </div>
            </li>
            <li>
              <Check size={16} className="icon-green" />
              <div>
                <strong>Studio Voice Audio</strong>
                <span>Listen with human-like, high-fidelity premium voices.</span>
              </div>
            </li>
            <li>
              <Check size={16} className="icon-green" />
              <div>
                <strong>Unlimited Saved Vocabulary</strong>
                <span>Collect and review all the terms you encounter.</span>
              </div>
            </li>
            <li>
              <Check size={16} className="icon-green" />
              <div>
                <strong>Unlocked Curated Library</strong>
                <span>Access intermediate, advanced, and all upcoming stories.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Form */}
        {isPreviewCheckout ? <form onSubmit={handlePay} className="checkout-payment-form">
          <h3>Payment Details</h3>
          <p className="payment-security-note preview">
            <ShieldCheck size={14} /> Checkout preview — no card will be charged
          </p>

          {error && <div className="form-error" role="alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="card-name">Cardholder Name</label>
            <input 
              id="card-name"
              type="text" 
              autoComplete="cc-name"
              placeholder="Min-jun Kim" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="card-number">Card Number</label>
            <div className="card-input-wrap">
              <CreditCard size={18} />
              <input 
                id="card-number"
                type="text" 
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242" 
                value={cardNumber} 
                onChange={e => handleFormatCardNumber(e.target.value)} 
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-row card-meta-row">
            <div className="form-group">
              <label htmlFor="card-expiry">Expiry Date</label>
              <input 
                id="card-expiry"
                type="text" 
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY" 
                value={expiry} 
                onChange={e => handleFormatExpiry(e.target.value)} 
                disabled={loading}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-cvc">CVC</label>
              <input 
                id="card-cvc"
                type="password" 
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="•••" 
                maxLength={4}
                value={cvc} 
                onChange={e => setCvc(e.target.value.replace(/[^0-9]/g, ''))} 
                disabled={loading}
                required
              />
            </div>
          </div>

          <button className="primary full checkout-pay-btn" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Verifying payment...</span>
              </>
            ) : (
              <span>Activate Pro Preview</span>
            )}
          </button>
          
          <p className="billing-footer-text">
            Preview only. No payment is processed or stored.
          </p>
        </form> : <div className="checkout-payment-form">
          <h3>Secure Upgrade</h3>
          <p className="payment-security-note">
            <ShieldCheck size={14} /> Powered by Stripe — Secure payment processing
          </p>

          {error && <div className="form-error" role="alert" style={{ whiteSpace: 'pre-line' }}>{error}</div>}

          <div className="secure-checkout-summary">
            <p style={{ margin: 0 }}>You will be redirected to Stripe to securely complete your upgrade to Sori Pro.</p>
            <ul className="secure-checkout-bullets">
              <li>🔒 Bank-grade encryption and secure storage</li>
              <li>🔄 Automatic subscription synchronization upon return</li>
              <li>💳 Self-service management via the Stripe Customer Portal</li>
            </ul>
          </div>

          <button 
            className="primary full checkout-pay-btn" 
            type="button" 
            onClick={handleStripeCheckout} 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Redirecting to Stripe...</span>
              </>
            ) : (
              <span>Proceed to Payment</span>
            )}
          </button>
          
          <p className="billing-footer-text">
            Cancel anytime. Managed via Stripe Customer Portal.
          </p>
        </div>}
      </div>
    </div>
  </div>;
}
