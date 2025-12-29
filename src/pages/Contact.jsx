import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { contactInfo } from '../data/mockData';

const Contact = () => {
  return (
    <div className="section">
      <div className="container">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Холбоо барих
        </motion.h1>
        
        <div className="grid grid-2" style={{ gap: '40px' }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="contact-card">
              <h2 style={{ marginBottom: '32px', color: 'var(--primary)' }}>Бидэнтэй холбогдох</h2>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="contact-label">Утасны дугаар</div>
                  <div className="contact-value">{contactInfo.phone}</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="contact-label">Имэйл хаяг</div>
                  <div className="contact-value">{contactInfo.email}</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="contact-label">Хаяг байршил</div>
                  <div className="contact-value">{contactInfo.address}</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="contact-label">Ажлын цаг</div>
                  <div className="contact-value">
                    <div>Ажлын өдөр: {contactInfo.workingHours.weekdays}</div>
                    <div>Амралтын өдөр: {contactInfo.workingHours.weekends}</div>
                  </div>
                </div>
              </div>
              
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-3"
                style={{ width: '100%' }}
              >
                <MapPin size={20} />
                Google Maps-ээр харах
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
          
          {/* Map & Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="contact-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Map placeholder */}
              <div style={{ 
                height: '300px', 
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <iframe 
                  src={contactInfo.mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy"
                  title="Google Map"
                />
              </div>
              
              {/* Location image */}
              <img 
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600"
                alt="Караоке байршил"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Additional Info */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Та бидэнтэй холбогдохыг хүсвэл</h3>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
              Захиалга өгөх, асуулт асуух, эсвэл санал хүсэлт илгээхийг хүсвэл 
              дээрх утасны дугаар болон имэйл хаягаар холбогдоно уу. 
              Бид танд тусалж, тав тухтай үйлчилгээ үзүүлэхэд бэлэн байна.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

