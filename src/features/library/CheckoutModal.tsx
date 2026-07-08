import { useState } from 'react';
import { X, Sparkles, Check, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { dbService } from '../../lib/firebase';

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

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc || !name) {
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

  return <div className="modal-backdrop">
    <div className="modal-content checkout-modal">
      <header className="modal-header">
        <div className="modal-title">
          <Sparkles className="icon-coral" size={20} />
          <h2>Upgrade to Sori Pro</h2>
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
        <form onSubmit={handlePay} className="checkout-payment-form">
          <h3>Payment Details</h3>
          <p className="payment-security-note">
            <ShieldCheck size={14} /> Secured by Stripe Encryption
          </p>

          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="card-name">Cardholder Name</label>
            <input 
              id="card-name"
              type="text" 
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
                placeholder="•••" 
                maxLength={3}
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
              <span>Pay $120.00 & Upgrade</span>
            )}
          </button>
          
          <p className="billing-footer-text">
            Cancel subscription anytime. Billed yearly at $120.00. 
            By purchasing, you agree to our Terms of Service.
          </p>
        </form>
      </div>
    </div>
  </div>;
}
