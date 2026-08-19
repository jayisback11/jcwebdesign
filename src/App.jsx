import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Code2,
  Gauge,
  Globe2,
  Laptop,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const services = [
  {
    icon: MonitorSmartphone,
    title: 'Business Websites',
    text: 'Clean, professional websites built to help businesses look credible and turn visitors into customers.',
  },
  {
    icon: Rocket,
    title: 'Website Redesigns',
    text: 'Refresh an outdated website with a faster, modern design that works beautifully on phones and desktops.',
  },
  {
    icon: MousePointerClick,
    title: 'Lead-Focused Pages',
    text: 'Landing pages with clear calls to action for quote requests, bookings, phone calls, and contact forms.',
  },
]

const process = [
  ['01', 'Tell me about your business', 'Send your business name, services, current website or social page, and what you want the new site to accomplish.'],
  ['02', 'I create your free mockup', 'I design a homepage concept so you can see the direction before committing to a full website.'],
  ['03', 'We build and launch', 'If you like the direction, I finish the site, make it mobile-friendly, test it, and get it ready to launch.'],
]

const packages = [
  {
    name: 'Starter',
    price: '$399',
    note: 'Great for a simple online presence',
    features: ['1-page website', 'Mobile responsive', 'Contact section', 'Social links', 'Basic SEO setup'],
  },
  {
    name: 'Business',
    price: '$799',
    note: 'Best for most growing businesses',
    featured: true,
    features: ['Up to 5 pages', 'Custom modern design', 'Quote/contact form', 'Google Maps', 'Mobile responsive', 'Basic SEO setup'],
  },
  {
    name: 'Growth',
    price: '$1,299+',
    note: 'For businesses ready to scale',
    features: ['Up to 10 pages', 'Advanced sections', 'Lead-focused landing pages', 'Animations', 'Priority revisions', 'Launch support'],
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  // Create a free form at https://formspree.io, then paste your endpoint here.
  // Example: https://formspree.io/f/abcdwxyz
  const FORM_ENDPOINT = 'https://formspree.io/f/mqpzygel'

  const closeMenu = () => setMenuOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      setFormStatus('error')
      setFormError('Form setup is not finished yet. Add your Formspree endpoint in App.jsx.')
      return
    }

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    formData.append(
      '_subject',
      `Free Homepage Mockup Request — ${formData.get('business') || formData.get('name')}`
    )

    setFormStatus('submitting')
    setFormError('')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        let message = 'Something went wrong. Please try again.'
        try {
          const result = await response.json()
          if (result?.errors?.length) {
            message = result.errors.map((item) => item.message).join(' ')
          }
        } catch {
          // Keep the generic message if the response is not JSON.
        }
        throw new Error(message)
      }

      formElement.reset()
      setFormStatus('success')
    } catch (error) {
      setFormStatus('error')
      setFormError(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="Jay Web Design home">
            <img src="/assets/jay-logo.png" alt="Jay Web Design logo" />
            <span>Jay Web Design</span>
          </a>

          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#pricing" onClick={closeMenu}>Pricing</a>
            <a href="#contact" className="nav-cta" onClick={closeMenu}>Free Mockup</a>
          </nav>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={17} /> Web Design for Businesses</div>
              <h1>Your business deserves a <span>better website.</span></h1>
              <p className="hero-lead">Modern, mobile-friendly websites designed to help businesses of all types look professional and turn more visitors into customers.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">Get a Free Homepage Mockup <ArrowRight size={18} /></a>
                <a className="btn btn-secondary" href="#work">See My Work</a>
              </div>
              <div className="trust-row">
                <span><Check size={16} /> No obligation</span>
                <span><Check size={16} /> Mobile friendly</span>
                <span><Check size={16} /> Work from anywhere</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="Website design preview">
              <div className="browser-card">
                <div className="browser-top"><span /><span /><span /></div>
                <div className="browser-page">
                  <div className="mini-nav">
                    <div className="mini-logo">YOUR BUSINESS</div>
                    <div className="mini-links"><span>Home</span><span>Services</span><span>About</span></div>
                  </div>
                  <div className="mini-hero">
                    <div>
                      <small>MODERN • TRUSTED • PROFESSIONAL</small>
                      <h3>Built to turn clicks into customers.</h3>
                      <p>A polished website that makes your business look as good online as it is in real life.</p>
                      <button>GET A FREE QUOTE</button>
                    </div>
                    <div className="mini-photo">
                      <Laptop size={70} strokeWidth={1.3} />
                    </div>
                  </div>
                  <div className="mini-cards">
                    <div><BadgeCheck size={21} /><b>Modern Design</b><small>Clean & credible</small></div>
                    <div><Phone size={21} /><b>Mobile Ready</b><small>Looks great anywhere</small></div>
                    <div><Gauge size={21} /><b>Fast & Focused</b><small>Built for results</small></div>
                  </div>
                </div>
              </div>
              <div className="phone-card">
                <div className="phone-notch" />
                <div className="phone-mini-brand">YOUR BUSINESS</div>
                <div className="phone-hero-block" />
                <div className="phone-line wide" />
                <div className="phone-line" />
                <div className="phone-button">GET STARTED</div>
                <div className="phone-feature"><ShieldCheck size={20} /> Mobile-first design</div>
              </div>
              <div className="floating-pill"><Code2 size={18} /> Custom React websites</div>
            </div>
          </div>
        </section>

        <section className="proof-strip">
          <div className="container proof-grid">
            <div><Globe2 /><span><b>Modern</b> visual design</span></div>
            <div><MonitorSmartphone /><span><b>Responsive</b> on every screen</span></div>
            <div><Gauge /><span><b>Fast</b> and easy to use</span></div>
            <div><BadgeCheck /><span><b>Professional</b> online presence</span></div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-heading centered">
              <span className="kicker">SERVICES</span>
              <h2>Websites built to help your business grow.</h2>
              <p>I focus on the things your customers actually care about: trust, clarity, speed, mobile usability, and an easy way to contact you.</p>
            </div>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, text }) => (
                <article className="service-card" key={title}>
                  <div className="icon-box"><Icon size={26} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a href="#contact">Get a free mockup <ArrowRight size={16} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section section-soft">
          <div className="container work-grid">
            <div className="work-copy">
              <span className="kicker">DESIGN PREVIEW</span>
              <h2>Show customers what your business can become online.</h2>
              <p>Your website should make a strong first impression in seconds. I design around your business, services, and the action you want visitors to take.</p>
              <ul className="check-list">
                <li><Check /> Clear headline and call to action</li>
                <li><Check /> Services presented simply</li>
                <li><Check /> Trust-building sections</li>
                <li><Check /> Easy quote or contact flow</li>
              </ul>
              <a href="#contact" className="text-link">Request your homepage concept <ArrowRight size={17} /></a>
            </div>
            <div className="work-image-card universal-preview" aria-label="Generic business website preview">
              <div className="preview-browser-top"><span /><span /><span /><div>yourbusiness.com</div></div>
              <div className="preview-site">
                <div className="preview-site-nav">
                  <strong>YOUR BUSINESS</strong>
                  <div><span>Home</span><span>Services</span><span>About</span><span>Contact</span></div>
                </div>
                <div className="preview-site-hero">
                  <div>
                    <span className="preview-tag">ANY INDUSTRY • ANY LOCATION</span>
                    <h3>A website built around your business.</h3>
                    <p>Professional, mobile-friendly design with clear calls to action that help turn visitors into customers.</p>
                    <button type="button">GET STARTED</button>
                  </div>
                  <div className="preview-art"><Globe2 size={78} strokeWidth={1.25} /></div>
                </div>
                <div className="preview-features">
                  <div><MonitorSmartphone size={22} /><b>Mobile Ready</b><small>Looks great on every screen</small></div>
                  <div><BadgeCheck size={22} /><b>Professional</b><small>Build trust with customers</small></div>
                  <div><MousePointerClick size={22} /><b>Lead Focused</b><small>Clear quote & contact actions</small></div>
                </div>
              </div>
              <div className="preview-location-pill"><Globe2 size={17} /> Available to businesses anywhere</div>
            </div>
          </div>
        </section>

        <section id="process" className="section">
          <div className="container">
            <div className="section-heading centered narrow">
              <span className="kicker">HOW IT WORKS</span>
              <h2>Simple process. See the design first.</h2>
              <p>You do not have to commit blindly. Start with a free homepage mockup and decide whether you want to move forward.</p>
            </div>
            <div className="process-grid">
              {process.map(([num, title, text]) => (
                <article className="process-card" key={num}>
                  <div className="process-number">{num}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section section-dark">
          <div className="container">
            <div className="section-heading centered dark-heading">
              <span className="kicker">STARTING PRICES</span>
              <h2>Straightforward website packages.</h2>
              <p>Every project is different, but these packages give businesses a simple starting point.</p>
            </div>
            <div className="pricing-grid">
              {packages.map((pkg) => (
                <article className={pkg.featured ? 'price-card featured' : 'price-card'} key={pkg.name}>
                  {pkg.featured && <div className="popular">MOST POPULAR</div>}
                  <h3>{pkg.name}</h3>
                  <div className="price">{pkg.price}</div>
                  <p>{pkg.note}</p>
                  <ul>
                    {pkg.features.map((f) => <li key={f}><Check size={17} /> {f}</li>)}
                  </ul>
                  <a href="#contact" className={pkg.featured ? 'btn btn-primary full' : 'btn btn-outline-light full'}>Get Started</a>
                </article>
              ))}
            </div>
            <p className="pricing-note">Hosting, domains, custom integrations, e-commerce, and advanced features can be quoted separately.</p>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="kicker">FREE HOMEPAGE MOCKUP</span>
              <h2>Want to see what your new website could look like?</h2>
              <p>Tell me about your business. I’ll use the information to understand what kind of homepage would fit your brand and customers.</p>
              <div className="contact-points">
                <div><Globe2 /> <span><b>Available anywhere</b><small>Serving businesses in any city, state, or location</small></span></div>
                <div><MessageCircle /> <span><b>Easy communication</b><small>Quick, straightforward project updates</small></span></div>
                <div><Mail /> <span><b>Email</b><small><a href="mailto:crisostomojay@outlook.com">crisostomojay@outlook.com</a></small></span></div>
                <div><Phone /> <span><b>Call or text</b><small><a href="tel:+12254215949">(225) 421-5949</a></small></span></div>
              </div>
            </div>

            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="form-title">
                <h3>Request Your Free Mockup</h3>
                <p>No obligation. Tell me a little about your business.</p>
              </div>
              <label>
                Your name
                <input required name="name" placeholder="John Smith" />
              </label>
              <label>
                Business name
                <input required name="business" placeholder="Your Business LLC" />
              </label>
              <label>
                Business location <span className="optional-label">(optional)</span>
                <input name="location" placeholder="City, State / Country" />
              </label>
              <label>
                Email
                <input required type="email" name="email" placeholder="you@business.com" />
              </label>
              <label>
                Current website or social page
                <input name="website" placeholder="https://..." />
              </label>
              <label>
                What do you need help with?
                <select name="need" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>New website</option>
                  <option>Website redesign</option>
                  <option>Landing page</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label>
                Tell me about your business
                <textarea name="message" rows="4" placeholder="What services do you offer and what do you want customers to do on your website?" />
              </label>
              <button
                className="btn btn-primary full"
                type="submit"
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? 'Sending Request...' : 'Request Free Mockup'}
                {formStatus !== 'submitting' && <ArrowRight size={18} />}
              </button>
              {formStatus === 'success' && (
                <div className="success-message">
                  Thanks! Your free mockup request was sent successfully. I’ll get back to you soon.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="error-message">{formError}</div>
              )}
              <small className="form-note">Your request is submitted directly through the website. No email app is required.</small>
            </form>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div>
              <span className="eyebrow light"><Sparkles size={17} /> Free homepage concept</span>
              <h2>Let’s build a website that makes your business look established.</h2>
            </div>
            <a href="#contact" className="btn btn-white">Start Your Free Mockup <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <a href="#top" className="brand footer-brand">
            <img src="/assets/jay-logo.png" alt="Jay Web Design" />
            <span>Jay Web Design</span>
          </a>
          <p>Modern, mobile-friendly websites for businesses anywhere.</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
