import { Link } from 'react-router-dom';
import { Mic2, Phone, Mail, MapPin } from 'lucide-react';
import { contactInfo } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="nav-logo" style={{ color: 'white', marginBottom: '16px' }}>
              <Mic2 size={28} />
              <span>Алтантуяа</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              Найз нөхөд, гэр бүлтэйгээ хамт дуулж, зугаатай цагийг өнгөрүүлээрэй.
            </p>
          </div>
          
          <div>
            <h4 className="footer-title">Холбоосууд</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Нүүр</Link>
              <Link to="/rooms" className="footer-link">Өрөө</Link>
              <Link to="/products" className="footer-link">Бүтээгдэхүүн</Link>
              <Link to="/contact" className="footer-link">Холбоо барих</Link>
            </div>
          </div>
          
          <div>
            <h4 className="footer-title">Холбоо барих</h4>
            <div className="footer-links">
              <div className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} />
                {contactInfo.phone}
              </div>
              <div className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} />
                {contactInfo.email}
              </div>
              <div className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} />
                Улаанбаатар хот
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="footer-title">Ажлын цаг</h4>
            <div className="footer-links">
              <div className="footer-link">
                <strong>Ажлын өдөр:</strong><br />
                {contactInfo.workingHours.weekdays}
              </div>
              <div className="footer-link">
                <strong>Амралтын өдөр:</strong><br />
                {contactInfo.workingHours.weekends}
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Алтантуяа Караоке. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

