import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronRight,
  Shield,
  Clock,
  Menu,
  X,
  Phone,
  Star,
  User,
  MessageCircle,
  Check,
  Mail,
  MapPin,
  Calendar,
  Zap,
  Award,
  Globe
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  // Business Details
  const whatsappNumber = '+447405040085';
  const whatsappDigits = whatsappNumber.replace('+', '');
  const displayPhone = '+44 7405 040085';
  const companyEmail = 'info@monvant.vip';

  // State
  const [form, setForm] = useState({
    fullName: '',
    contact: '',
    preferredContact: 'WhatsApp',
    serviceType: 'Airport Arrival (Signature / Jet Center)',
    requirements: '',
  });

  // Assets
  const fleetImages = [
    { src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1600', caption: 'The Monvant Signature Fleet' },
    { src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1600', caption: 'Discreet Black Exterior' },
    { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1600', caption: 'Hand-Stitched Leather Interiors' },
    { src: 'https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?auto=format&fit=crop&q=80&w=1600', caption: 'Executive Cabin Experience' },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxCaption, setLightboxCaption] = useState('');
  const [touchStartY, setTouchStartY] = useState(null);

  // Effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Cookie check
    const consent = localStorage.getItem('monvant_cookie_ok');
    if (consent !== '1') setShowCookies(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % 2);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const acceptCookies = () => {
    localStorage.setItem('monvant_cookie_ok', '1');
    setShowCookies(false);
  };

  const openWhatsApp = (text) => {
    const msg = text ? encodeURIComponent(text) : '';
    window.open(
      `https://wa.me/${whatsappDigits}${msg ? `?text=${msg}` : ''}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const inquiryText = useMemo(() => {
    return [
      '*Monvant Chauffeur Inquiry*',
      `Name: ${form.fullName || '-'}`,
      `Contact: ${form.contact || '-'}`,
      `Service: ${form.serviceType}`,
      `Requirements: ${form.requirements || 'No specific requirements.'}`,
    ].join('\n');
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    openWhatsApp(inquiryText);
  };

  const NavItem = ({ href, label, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="text-sm uppercase tracking-[0.2em] font-medium hover:text-[#C5A059] transition-colors"
    >
      {label}
    </a>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-gray-200 font-sans selection:bg-[#C5A059] selection:text-black">

      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-serif tracking-widest text-white">MONVANT</span>
            <span className="text-[10px] tracking-[0.4em] text-[#C5A059] -mt-1 uppercase">Travel Redefined</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <NavItem href="#about" label="The Standard" />
            <NavItem href="#services" label="Services" />
            <NavItem href="#fleet" label="Fleet" />
            <a
              href="#contact"
              className="px-6 py-2 border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-black transition-all text-xs uppercase tracking-widest"
            >
              Enquire Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] bg-black transition-transform duration-500 flex flex-col p-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end">
          <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow space-y-8 text-2xl font-serif">
          <NavItem href="#about" label="The Standard" onClick={() => setIsMenuOpen(false)} />
          <NavItem href="#services" label="Services" onClick={() => setIsMenuOpen(false)} />
          <NavItem href="#fleet" label="Fleet" onClick={() => setIsMenuOpen(false)} />
          <NavItem href="#contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
          <div className="pt-8 flex space-x-6">
            <Phone onClick={() => window.open(`tel:${whatsappNumber}`)} className="text-[#C5A059]" />
            <Mail onClick={() => window.location.href = `mailto:${companyEmail}`} className="text-[#C5A059]" />
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <header className="relative h-screen overflow-hidden flex items-center justify-center">
        {fleetImages.slice(0, 2).map((img, idx) => (
          <img
            key={img.src}
            src={img.src}
            alt="Hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroIndex === idx ? 'opacity-40' : 'opacity-0'}`}
            style={{ animation: 'slowZoom 20s infinite alternate' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="inline-block text-[#C5A059] text-xs uppercase tracking-[0.5em] mb-4 animate-pulse">London • Paris • Geneva</span>
          <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight text-white">
            Travel,<br />
            <span className="text-[#C5A059] italic">Redefined.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience London’s most discreet chauffeur service. Purpose-built for high-profile arrivals, corporate excellence, and private events.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#contact"
              className="px-10 py-5 bg-[#C5A059] text-black font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center hover:bg-white transition-colors"
            >
              Request Arrival <ChevronRight size={16} className="ml-2" />
            </a>
            <button
              onClick={() => openWhatsApp('Hello Monvant, I would like to inquire about a chauffeur service.')}
              className="px-10 py-5 border border-white/20 hover:border-[#C5A059] text-white uppercase tracking-[0.2em] text-xs transition-colors backdrop-blur-sm"
            >
              WhatsApp Concierge
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C5A059] to-transparent" />
        </div>
      </header>

      {/* THE STANDARD */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center border border-[#C5A059]/30 rounded-full mb-6 text-[#C5A059]">
                <Shield size={20} />
              </div>
              <h3 className="text-xl font-serif text-white">Ultimate Discretion</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Our drivers are trained in privacy protocols and security awareness, ensuring your movements remain confidential at all times.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center border border-[#C5A059]/30 rounded-full mb-6 text-[#C5A059]">
                <Clock size={20} />
              </div>
              <h3 className="text-xl font-serif text-white">Punctuality Perfected</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Advanced flight tracking and route optimization mean we are always on site 15 minutes before your scheduled arrival.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center border border-[#C5A059]/30 rounded-full mb-6 text-[#C5A059]">
                <Award size={20} />
              </div>
              <h3 className="text-xl font-serif text-white">Bespoke Comfort</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                From specific refreshments to Wi-Fi and climate preferences, every journey is tailored to your exact specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-4">Our Services</h2>
            <p className="text-4xl md:text-5xl font-serif text-white">Exceptional Journeys</p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {[
              { title: 'Airport Transfers', icon: <Globe />, desc: 'Seamless pickups from Heathrow, Gatwick, and Signature Jet Centers.' },
              { title: 'Corporate Roadshows', icon: <MapPin />, desc: 'Multi-stop efficiency for demanding executive schedules.' },
              { title: 'Special Occasions', icon: <Star />, desc: 'Red carpet arrivals with impeccable vehicle presentation.' },
              { title: 'Discreet Security', icon: <Shield />, desc: 'Logistics for high-net-worth individuals requiring low profiles.' }
            ].map((service, i) => (
              <div key={i} className="bg-[#0B0B0B] p-12 hover:bg-[#121212] transition-colors group">
                <div className="text-[#C5A059] mb-6 group-hover:scale-110 transition-transform inline-block">
                  {React.cloneElement(service.icon, { size: 32 })}
                </div>
                <h4 className="text-2xl font-serif mb-4 text-white">{service.title}</h4>
                <p className="text-gray-500 leading-relaxed font-light">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET GALLERY */}
      <section id="fleet" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-4">The Fleet</h2>
            <p className="text-4xl font-serif text-white">Modern performance meets timeless luxury.</p>
          </div>
          <p className="text-gray-500 font-light max-w-sm">
            Exclusively featuring the latest Range Rover and Defender models, maintained to showroom standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fleetImages.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden group aspect-[4/5] cursor-pointer"
              onClick={() => {
                setLightboxImage(img.src);
                setLightboxCaption(img.caption);
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-2">View Detail</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="contact" className="py-32 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-serif text-white mb-8">Reservation Concierge</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Phone className="text-[#C5A059] mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Direct Line</p>
                    <a href={`tel:${whatsappDigits}`} className="text-xl text-white hover:text-[#C5A059]">{displayPhone}</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="text-[#C5A059] mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${companyEmail}`} className="text-xl text-white hover:text-[#C5A059]">{companyEmail}</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageCircle className="text-[#C5A059] mt-1" size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                    <p className="text-gray-400 font-light">Available 24/7 for urgent arrivals.</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2">Full Name</label>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#C5A059] transition-colors text-white"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2">Contact Number / Email</label>
                <input
                  required
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#C5A059] transition-colors text-white"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2">Requirements</label>
                <textarea
                  rows={4}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#C5A059] transition-colors text-white resize-none"
                  placeholder="e.g. Flight number, number of passengers..."
                />
              </div>
              <button className="w-full py-5 bg-[#C5A059] text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all">
                Send Digital Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-serif tracking-widest text-white">MONVANT</span>
            <p className="text-xs text-gray-600 mt-2 tracking-widest uppercase">© {new Date().getFullYear()} Monvant Travel. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-8 text-xs uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Safety Protocols</a>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
          onTouchEnd={(e) => {
            if (!touchStartY) return;
            if (e.changedTouches[0].clientY - touchStartY > 80) setLightboxImage(null);
          }}
        >
          <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full">
            <X size={32} />
          </button>
          <img
            src={lightboxImage}
            className="max-w-full max-h-[80vh] object-contain shadow-2xl"
            alt="Expanded view"
          />
          <div className="mt-8 text-center">
            <p className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold">
              {lightboxCaption}
            </p>
            <p className="text-gray-500 text-[10px] uppercase mt-4 tracking-widest">Swipe down to close</p>
          </div>
        </div>
      )}

      {/* COOKIE BANNER */}
      {showCookies && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:w-96 bg-black border border-white/10 p-6 z-[80] shadow-2xl backdrop-blur-xl">
          <h5 className="text-white text-sm font-serif mb-2">Cookies & Privacy</h5>
          <p className="text-xs text-gray-500 font-light leading-relaxed mb-4">
            We use essential cookies to provide our chauffeur reservation services and ensure site security.
          </p>
          <button
            onClick={acceptCookies}
            className="w-full py-3 bg-white/10 hover:bg-[#C5A059] hover:text-black text-white text-[10px] uppercase tracking-widest transition-all"
          >
            I Accept
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Inter:wght@300;400;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, .font-serif {
          font-family: 'Bodoni Moda', serif;
        }

        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }

        html {
          scroll-behavior: smooth;
        }

        ::placeholder {
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
};

export default App;