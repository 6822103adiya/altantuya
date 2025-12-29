import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, ArrowLeft, CreditCard, Check, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, timeSlots, bookRoom, products, categories } = useApp();
  
  const room = rooms.find(r => r.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [step, setStep] = useState('detail'); // detail, booking, payment, success
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [preOrderProducts, setPreOrderProducts] = useState([]);
  
  if (!room) {
    return (
      <div className="section">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🚪</div>
            <h3>Өрөө олдсонгүй</h3>
            <button onClick={() => navigate('/rooms')} className="btn btn-primary mt-2">
              Өрөөнүүд руу буцах
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleBook = () => {
    const preOrderedProducts = preOrderProducts
      .filter(p => p.quantity > 0)
      .map(p => ({ productId: p.id, quantity: p.quantity }));
    
    bookRoom(room.id, selectedTimeSlot, selectedDate, preOrderedProducts);
    setStep('success');
  };
  
  const addPreOrderProduct = (product) => {
    const existing = preOrderProducts.find(p => p.id === product.id);
    if (existing) {
      setPreOrderProducts(prev => 
        prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      );
    } else {
      setPreOrderProducts(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };
  
  const removePreOrderProduct = (productId) => {
    setPreOrderProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p)
        .filter(p => p.quantity > 0)
    );
  };
  
  const getPreOrderTotal = () => {
    return preOrderProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  };
  
  const totalPrice = room.price + getPreOrderTotal();
  
  return (
    <div className="section">
      <div className="container">
        <AnimatePresence mode="wait">
          {/* Detail View */}
          {step === 'detail' && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button onClick={() => navigate('/rooms')} className="btn btn-secondary mb-3">
                <ArrowLeft size={20} />
                Буцах
              </button>
              
              <div className="grid grid-2" style={{ gap: '40px' }}>
                {/* Gallery */}
                <div className="gallery">
                  <motion.img 
                    key={selectedImage}
                    src={room.images[selectedImage]} 
                    alt={room.name}
                    className="gallery-main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <div className="gallery-thumbs">
                    {room.images.map((img, index) => (
                      <img 
                        key={index}
                        src={img}
                        alt={`${room.name} ${index + 1}`}
                        className={`gallery-thumb ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                        style={selectedImage === index ? { border: '2px solid var(--primary)' } : {}}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Info */}
                <div>
                  <h1 style={{ color: 'var(--primary)', marginBottom: '16px' }}>{room.name}</h1>
                  
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)' }}>
                      <Users size={20} />
                      <span>{room.capacity} хүн хүртэл</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)' }}>
                      <Clock size={20} />
                      <span>2 цаг</span>
                    </div>
                  </div>
                  
                  <p style={{ color: 'var(--text-light)', marginBottom: '24px', lineHeight: '1.8' }}>
                    {room.description}
                  </p>
                  
                  <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-light)' }}>Цагийн үнэ:</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                        {room.price.toLocaleString()}₮
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => navigate('/rooms')} className="btn btn-secondary" style={{ flex: 1 }}>
                      <ArrowLeft size={20} />
                      Буцах
                    </button>
                    <button onClick={() => setStep('booking')} className="btn btn-primary" style={{ flex: 2 }}>
                      Захиалах
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Booking View */}
          {step === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button onClick={() => setStep('detail')} className="btn btn-secondary mb-3">
                <ArrowLeft size={20} />
                Буцах
              </button>
              
              <div className="grid grid-2" style={{ gap: '40px' }}>
                <div>
                  {/* Room info */}
                  <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <img src={room.thumbnail} alt={room.name} style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                      <div>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>{room.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                          <span><Users size={16} /> {room.capacity} хүн</span>
                          <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{room.price.toLocaleString()}₮/цаг</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Date selection */}
                  <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Огноо сонгох</h3>
                    <input 
                      type="date" 
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  
                  {/* Time slots */}
                  <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Цаг сонгох</h3>
                    <div className="grid grid-2" style={{ gap: '12px' }}>
                      {timeSlots.map(slot => (
                        <div
                          key={slot.id}
                          className={`time-slot ${selectedTimeSlot === slot.id ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                          onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                        >
                          {slot.time}
                          {!slot.available && <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>Захиалагдсан</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  {/* Pre-order products */}
                  <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Урьдчилан захиалах (заавал биш)</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      Та өрөөнд ирэхээс өмнө хоол, ундаа урьдчилан захиалж болно.
                    </p>
                    
                    {categories.map(category => (
                      <div key={category.id} style={{ marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '8px' }}>
                          {category.icon} {category.name}
                        </h4>
                        {products.filter(p => p.categoryId === category.id).slice(0, 3).map(product => {
                          const ordered = preOrderProducts.find(p => p.id === product.id);
                          return (
                            <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--secondary-dark)' }}>
                              <div>
                                <div style={{ fontWeight: '500' }}>{product.name}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{product.price.toLocaleString()}₮</div>
                              </div>
                              <div className="quantity-control">
                                <button className="quantity-btn" onClick={() => removePreOrderProduct(product.id)}>
                                  <Minus size={16} />
                                </button>
                                <span className="quantity-value">{ordered?.quantity || 0}</span>
                                <button className="quantity-btn" onClick={() => addPreOrderProduct(product)}>
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  
                  {/* Summary */}
                  <div className="card" style={{ padding: '24px', background: 'var(--primary)', color: 'white' }}>
                    <h3 style={{ marginBottom: '16px' }}>Нийт дүн</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Өрөө (1 цаг)</span>
                      <span>{room.price.toLocaleString()}₮</span>
                    </div>
                    {preOrderProducts.filter(p => p.quantity > 0).map(p => (
                      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.9 }}>
                        <span>{p.name} x{p.quantity}</span>
                        <span>{(p.price * p.quantity).toLocaleString()}₮</span>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '600' }}>
                      <span>Нийт</span>
                      <span>{totalPrice.toLocaleString()}₮</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setStep('payment')} 
                    className="btn btn-primary mt-3"
                    style={{ width: '100%' }}
                    disabled={!selectedTimeSlot}
                  >
                    Үргэлжлүүлэх
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Payment View */}
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ maxWidth: '500px', margin: '0 auto' }}
            >
              <button onClick={() => setStep('booking')} className="btn btn-secondary mb-3">
                <ArrowLeft size={20} />
                Буцах
              </button>
              
              <div className="card" style={{ padding: '32px' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '24px' }}>
                  <CreditCard size={32} style={{ marginBottom: '8px' }} />
                  <br />
                  Гүйлгээ хийх
                </h2>
                
                <div style={{ background: 'var(--secondary)', padding: '20px', borderRadius: 'var(--radius)', marginBottom: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '4px' }}>Дансны дугаар:</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary)' }}>5000 1234 5678</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Хаан банк - Алтантуяа ХХК</div>
                  </div>
                  
                  <div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '4px' }}>Гүйлгээний утга:</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary)' }}>Таны утасны дугаар</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Жишээ: 99112233</div>
                  </div>
                </div>
                
                <div style={{ background: 'var(--primary)', color: 'white', padding: '16px', borderRadius: 'var(--radius)', textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Төлөх дүн:</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{totalPrice.toLocaleString()}₮</div>
                </div>
                
                <button onClick={handleBook} className="btn btn-success" style={{ width: '100%' }}>
                  <Check size={20} />
                  Гүйлгээ хийсэн
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Success View */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="success-message"
            >
              <div className="success-icon">
                <Check size={40} />
              </div>
              <h2 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Захиалга илгээгдлээ!</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
                Таны захиалгыг админ тун удахгүй баталгаажуулна. Түр хүлээнэ үү.
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '24px' }}>
                Захиалгын төлөвийг Profile хуудаснаас харах боломжтой.
              </p>
              <button onClick={() => navigate('/')} className="btn btn-primary">
                Ойлголоо
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoomDetail;

