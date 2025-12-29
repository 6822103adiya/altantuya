import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic2, Music, Users, Star, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { rooms } = useApp();
  
  const features = [
    {
      icon: <Mic2 size={32} />,
      title: 'Өндөр чанарын тоноглол',
      description: 'Мэргэжлийн түвшний микрофон, чанга яригч системтэй'
    },
    {
      icon: <Music size={32} />,
      title: '10,000+ дуу',
      description: 'Монгол, гадаад олон төрлийн дуунаас сонгоно уу'
    },
    {
      icon: <Users size={32} />,
      title: 'Бүх насныханд',
      description: 'Гэр бүл, найз нөхөд хамт ирэхэд тохиромжтой'
    },
    {
      icon: <Clock size={32} />,
      title: 'Уян хатан цаг',
      description: 'Өглөө 10:00-ээс шөнийн 00:00 хүртэл ажиллана'
    }
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Алтантуяа Караоке</h1>
            <p>
              Найз нөхөд, гэр бүлтэйгээ хамт дуулж, дурсамжтай мөчүүдийг бүтээгээрэй. 
              Манай орчин үеийн өрөөнүүд таныг хүлээж байна.
            </p>
            <Link to="/rooms" className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)' }}>
              Өрөө захиалах
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '100px',
          background: 'var(--secondary)',
          borderRadius: '100px 100px 0 0'
        }} />
      </section>
      
      {/* Features Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Яагаад биднийг сонгох вэ?
          </motion.h2>
          
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card"
                style={{ padding: '32px', textAlign: 'center' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  margin: '0 auto 20px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '12px', color: 'var(--primary)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Rooms */}
      <section className="section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Алдартай өрөөнүүд
          </motion.h2>
          
          <div className="grid grid-3">
            {rooms.slice(0, 3).map((room, index) => (
              <motion.div
                key={room.id}
                className="room-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={room.thumbnail} alt={room.name} className="room-card-image" />
                <div className="room-card-content">
                  <h3 className="room-card-title">{room.name}</h3>
                  <div className="room-card-info">
                    <span><Users size={16} style={{ marginRight: '4px' }} /> {room.capacity} хүн</span>
                    <span className="room-card-price">{room.price.toLocaleString()}₮/цаг</span>
                  </div>
                  <Link to={`/rooms/${room.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                    Дэлгэрэнгүй
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link to="/rooms" className="btn btn-outline">
              Бүх өрөөнүүд
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        padding: '80px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Бэлэн үү?</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Одоо захиалга өгч, найз нөхөдтэйгээ караокед дуулах боломжоо бүү алдаарай!
            </p>
            <Link to="/rooms" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '16px 32px', fontSize: '1.1rem' }}>
              <Mic2 size={24} />
              Өрөө захиалах
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Хэрэглэгчдийн сэтгэгдэл
          </motion.h2>
          
          <div className="grid grid-3">
            {[
              { name: 'Батбаяр', text: 'Гэр бүлтэйгээ хамт маш зугаатай цаг өнгөрүүлсэн. Өрөөний чанар үнэхээр сайн!' },
              { name: 'Сарантуяа', text: 'Найз нөхөдтэйгээ төрсөн өдрөө тэмдэглэсэн. Дахин ирнэ!' },
              { name: 'Ганзориг', text: 'Дуу чимээ тусгаарлалт маш сайн. Мэргэжлийн түвшний тоноглолтой.' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="card"
                style={{ padding: '24px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#fbbf24' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#fbbf24" />)}
                </div>
                <p style={{ color: 'var(--text-light)', marginBottom: '16px', fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </p>
                <strong style={{ color: 'var(--primary)' }}>{testimonial.name}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

