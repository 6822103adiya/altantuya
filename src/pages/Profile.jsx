import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Phone, Calendar, Clock, MapPin, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { user, bookings, rooms, timeSlots, productOrders, products } = useApp();
  
  const userBookings = bookings.filter(b => b.userId === user?.id);
  const userOrders = productOrders.filter(o => o.userId === user?.id);
  
  const getRoom = (roomId) => rooms.find(r => r.id === roomId);
  const getTimeSlot = (slotId) => timeSlots.find(s => s.id === slotId);
  const getProduct = (productId) => products.find(p => p.id === productId);
  
  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-pending', text: 'Хүлээгдэж буй' },
      confirmed: { class: 'badge-confirmed', text: 'Баталгаажсан' },
      cancelled: { class: 'badge-cancelled', text: 'Цуцлагдсан' }
    };
    return badges[status] || badges.pending;
  };
  
  return (
    <div className="section">
      <div className="container">
        {/* Profile header */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-avatar">
            <User size={40} />
          </div>
          <h2 className="profile-name">{user?.name || 'Хэрэглэгч'}</h2>
          <div className="profile-phone" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} />
            {user?.phone || 'Утасны дугаар оруулаагүй'}
          </div>
        </motion.div>
        
        <div className="grid grid-2" style={{ gap: '32px' }}>
          {/* Bookings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 style={{ color: 'var(--primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={24} />
              Миний захиалга
            </h3>
            
            {userBookings.length === 0 ? (
              <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎤</div>
                <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>
                  Та өрөө захиалаагүй байна
                </p>
                <Link to="/rooms" className="btn btn-primary">
                  Өрөө захиалах
                  <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {userBookings.map(booking => {
                  const room = getRoom(booking.roomId);
                  const timeSlot = getTimeSlot(booking.timeSlotId);
                  const badge = getStatusBadge(booking.status);
                  
                  return (
                    <motion.div
                      key={booking.id}
                      className="card"
                      style={{ padding: '20px' }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h4 style={{ color: 'var(--primary)' }}>{room?.name}</h4>
                        <span className={`badge ${badge.class}`}>{badge.text}</span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={16} />
                          {booking.date}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={16} />
                          {timeSlot?.time}
                        </div>
                      </div>
                      
                      {booking.preOrderedProducts?.length > 0 && (
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--secondary-dark)' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px' }}>
                            Урьдчилсан захиалга:
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {booking.preOrderedProducts.map((item, idx) => {
                              const product = getProduct(item.productId);
                              return (
                                <span key={idx} style={{ background: 'var(--secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                  {product?.name} x{item.quantity}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <Link 
                          to="/products" 
                          className="btn btn-outline mt-2"
                          style={{ width: '100%' }}
                        >
                          <ShoppingBag size={18} />
                          Нэмэлт захиалга өгөх
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
          
          {/* Product orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ color: 'var(--primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={24} />
              Бүтээгдэхүүний захиалга
            </h3>
            
            {userOrders.length === 0 ? (
              <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛒</div>
                <p style={{ color: 'var(--text-light)' }}>
                  Бүтээгдэхүүний захиалга байхгүй
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {userOrders.map(order => (
                  <div key={order.id} className="card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        {new Date(order.createdAt).toLocaleDateString('mn-MN')}
                      </span>
                      <span className="badge badge-pending">{order.status === 'pending' ? 'Бэлтгэж байна' : 'Хүргэгдсэн'}</span>
                    </div>
                    
                    {order.items.map((item, idx) => {
                      const product = getProduct(item.productId);
                      return (
                        <div 
                          key={idx}
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            borderBottom: idx < order.items.length - 1 ? '1px solid var(--secondary-dark)' : 'none'
                          }}
                        >
                          <span>{product?.name} x{item.quantity}</span>
                          <span style={{ color: 'var(--primary)', fontWeight: '500' }}>
                            {((product?.price || 0) * item.quantity).toLocaleString()}₮
                          </span>
                        </div>
                      );
                    })}
                    
                    <div style={{ 
                      marginTop: '12px', 
                      paddingTop: '12px', 
                      borderTop: '1px solid var(--secondary-dark)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: '600'
                    }}>
                      <span>Нийт:</span>
                      <span style={{ color: 'var(--primary)' }}>
                        {order.items.reduce((sum, item) => {
                          const product = getProduct(item.productId);
                          return sum + ((product?.price || 0) * item.quantity);
                        }, 0).toLocaleString()}₮
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

