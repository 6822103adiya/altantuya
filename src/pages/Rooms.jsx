import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Rooms = () => {
  const { rooms } = useApp();
  
  return (
    <div className="section">
      <div className="container">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Өрөөнүүд
        </motion.h1>
        
        <motion.p 
          className="text-center mb-4"
          style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 40px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Танд тохирсон өрөөг сонгоод, найз нөхөд, гэр бүлтэйгээ хамт зугаатай цаг өнгөрүүлээрэй.
        </motion.p>
        
        <div className="grid grid-2">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              className="room-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={room.thumbnail} 
                alt={room.name} 
                className="room-card-image"
                style={{ height: '250px' }}
              />
              <div className="room-card-content">
                <h3 className="room-card-title">{room.name}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '16px', fontSize: '0.95rem' }}>
                  {room.description.substring(0, 100)}...
                </p>
                <div className="room-card-info">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={18} /> 
                    {room.capacity} хүн хүртэл
                  </span>
                  <span className="room-card-price">{room.price.toLocaleString()}₮/цаг</span>
                </div>
                <Link to={`/rooms/${room.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                  Дэлгэрэнгүй
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;

