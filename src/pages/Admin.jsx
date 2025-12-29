import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  DoorOpen, 
  ShoppingBag, 
  Calendar, 
  Users,
  Package,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Admin = () => {
  const { 
    rooms, 
    products, 
    categories, 
    bookings, 
    timeSlots,
    addRoom,
    updateRoom,
    deleteRoom,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    confirmBooking,
    cancelBooking,
    setTimeSlots
  } = useApp();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editModal, setEditModal] = useState(null);
  const [formData, setFormData] = useState({});
  
  const tabs = [
    { id: 'dashboard', label: 'Хянах самбар', icon: <LayoutDashboard size={20} /> },
    { id: 'rooms', label: 'Өрөө', icon: <DoorOpen size={20} /> },
    { id: 'bookings', label: 'Захиалга', icon: <Calendar size={20} /> },
    { id: 'products', label: 'Бүтээгдэхүүн', icon: <ShoppingBag size={20} /> },
    { id: 'categories', label: 'Ангилал', icon: <Package size={20} /> },
    { id: 'timeslots', label: 'Цагийн хуваарь', icon: <Clock size={20} /> },
  ];
  
  const handleSave = () => {
    if (editModal.type === 'room') {
      if (editModal.mode === 'add') {
        addRoom(formData);
      } else {
        updateRoom(editModal.id, formData);
      }
    } else if (editModal.type === 'product') {
      if (editModal.mode === 'add') {
        addProduct({ ...formData, categoryId: parseInt(formData.categoryId) });
      } else {
        updateProduct(editModal.id, { ...formData, categoryId: parseInt(formData.categoryId) });
      }
    } else if (editModal.type === 'category') {
      if (editModal.mode === 'add') {
        addCategory(formData);
      } else {
        updateCategory(editModal.id, formData);
      }
    }
    setEditModal(null);
    setFormData({});
  };
  
  const openAddModal = (type) => {
    setFormData({});
    setEditModal({ type, mode: 'add' });
  };
  
  const openEditModal = (type, item) => {
    setFormData(item);
    setEditModal({ type, mode: 'edit', id: item.id });
  };
  
  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-pending', text: 'Хүлээгдэж буй' },
      confirmed: { class: 'badge-confirmed', text: 'Баталгаажсан' },
      cancelled: { class: 'badge-cancelled', text: 'Цуцлагдсан' }
    };
    return badges[status] || badges.pending;
  };
  
  const getRoom = (roomId) => rooms.find(r => r.id === roomId);
  const getTimeSlot = (slotId) => timeSlots.find(s => s.id === slotId);
  
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h3 style={{ color: 'var(--primary)', marginBottom: '24px' }}>Админ панел</h3>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-sidebar-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="admin-content">
        <AnimatePresence mode="wait">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Хянах самбар</h2>
              
              <div className="grid grid-4">
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <DoorOpen size={32} color="var(--primary)" />
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', margin: '8px 0' }}>
                    {rooms.length}
                  </div>
                  <div style={{ color: 'var(--text-light)' }}>Нийт өрөө</div>
                </div>
                
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <Calendar size={32} color="var(--warning)" />
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--warning)', margin: '8px 0' }}>
                    {bookings.filter(b => b.status === 'pending').length}
                  </div>
                  <div style={{ color: 'var(--text-light)' }}>Хүлээгдэж буй</div>
                </div>
                
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <Check size={32} color="var(--success)" />
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success)', margin: '8px 0' }}>
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div style={{ color: 'var(--text-light)' }}>Баталгаажсан</div>
                </div>
                
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <ShoppingBag size={32} color="var(--primary)" />
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', margin: '8px 0' }}>
                    {products.length}
                  </div>
                  <div style={{ color: 'var(--text-light)' }}>Бүтээгдэхүүн</div>
                </div>
              </div>
              
              {/* Recent bookings */}
              <h3 style={{ margin: '32px 0 16px', color: 'var(--primary)' }}>Сүүлийн захиалгууд</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Өрөө</th>
                    <th>Хэрэглэгч</th>
                    <th>Огноо</th>
                    <th>Цаг</th>
                    <th>Төлөв</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map(booking => {
                    const room = getRoom(booking.roomId);
                    const timeSlot = getTimeSlot(booking.timeSlotId);
                    const badge = getStatusBadge(booking.status);
                    
                    return (
                      <tr key={booking.id}>
                        <td>{room?.name}</td>
                        <td>{booking.userName} ({booking.userPhone})</td>
                        <td>{booking.date}</td>
                        <td>{timeSlot?.time}</td>
                        <td><span className={`badge ${badge.class}`}>{badge.text}</span></td>
                        <td>
                          {booking.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                onClick={() => confirmBooking(booking.id)}
                                className="btn btn-success"
                                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                              >
                                <Check size={14} />
                                Батлах
                              </button>
                              <button 
                                onClick={() => cancelBooking(booking.id)}
                                className="btn btn-error"
                                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                              >
                                <X size={14} />
                                Цуцлах
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          )}
          
          {/* Rooms */}
          {activeTab === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: 'var(--primary)' }}>Өрөөнүүд</h2>
                <button className="btn btn-primary" onClick={() => openAddModal('room')}>
                  <Plus size={18} />
                  Нэмэх
                </button>
              </div>
              
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Зураг</th>
                    <th>Нэр</th>
                    <th>Үнэ</th>
                    <th>Багтаамж</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.id}>
                      <td>
                        <img src={room.thumbnail} alt={room.name} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      </td>
                      <td>{room.name}</td>
                      <td>{room.price.toLocaleString()}₮</td>
                      <td>{room.capacity} хүн</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => openEditModal('room', room)}>
                            <Edit size={14} />
                          </button>
                          <button className="btn btn-error" style={{ padding: '6px 12px' }} onClick={() => deleteRoom(room.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
          
          {/* Bookings */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Захиалгууд</h2>
              
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Өрөө</th>
                    <th>Хэрэглэгч</th>
                    <th>Утас</th>
                    <th>Огноо</th>
                    <th>Цаг</th>
                    <th>Төлөв</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => {
                    const room = getRoom(booking.roomId);
                    const timeSlot = getTimeSlot(booking.timeSlotId);
                    const badge = getStatusBadge(booking.status);
                    
                    return (
                      <tr key={booking.id}>
                        <td>{room?.name}</td>
                        <td>{booking.userName}</td>
                        <td>{booking.userPhone}</td>
                        <td>{booking.date}</td>
                        <td>{timeSlot?.time}</td>
                        <td><span className={`badge ${badge.class}`}>{badge.text}</span></td>
                        <td>
                          {booking.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                onClick={() => confirmBooking(booking.id)}
                                className="btn btn-success"
                                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                              >
                                <Check size={14} />
                              </button>
                              <button 
                                onClick={() => cancelBooking(booking.id)}
                                className="btn btn-error"
                                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {bookings.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <p>Захиалга байхгүй байна</p>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Products */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: 'var(--primary)' }}>Бүтээгдэхүүн</h2>
                <button className="btn btn-primary" onClick={() => openAddModal('product')}>
                  <Plus size={18} />
                  Нэмэх
                </button>
              </div>
              
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Зураг</th>
                    <th>Нэр</th>
                    <th>Ангилал</th>
                    <th>Үнэ</th>
                    <th>Нэгж</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const category = categories.find(c => c.id === product.categoryId);
                    return (
                      <tr key={product.id}>
                        <td>
                          <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        </td>
                        <td>{product.name}</td>
                        <td>{category?.icon} {category?.name}</td>
                        <td>{product.price.toLocaleString()}₮</td>
                        <td>{product.unit}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => openEditModal('product', product)}>
                              <Edit size={14} />
                            </button>
                            <button className="btn btn-error" style={{ padding: '6px 12px' }} onClick={() => deleteProduct(product.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          )}
          
          {/* Categories */}
          {activeTab === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: 'var(--primary)' }}>Ангилал</h2>
                <button className="btn btn-primary" onClick={() => openAddModal('category')}>
                  <Plus size={18} />
                  Нэмэх
                </button>
              </div>
              
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Нэр</th>
                    <th>Бүтээгдэхүүн тоо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td style={{ fontSize: '1.5rem' }}>{category.icon}</td>
                      <td>{category.name}</td>
                      <td>{products.filter(p => p.categoryId === category.id).length}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => openEditModal('category', category)}>
                            <Edit size={14} />
                          </button>
                          <button className="btn btn-error" style={{ padding: '6px 12px' }} onClick={() => deleteCategory(category.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
          
          {/* Time slots */}
          {activeTab === 'timeslots' && (
            <motion.div
              key="timeslots"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Цагийн хуваарь</h2>
              
              <div className="grid grid-3">
                {timeSlots.map(slot => (
                  <div key={slot.id} className="card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{slot.time}</div>
                        <span className={`badge ${slot.available ? 'badge-confirmed' : 'badge-cancelled'}`}>
                          {slot.available ? 'Боломжтой' : 'Захиалагдсан'}
                        </span>
                      </div>
                      <button
                        className={`btn ${slot.available ? 'btn-error' : 'btn-success'}`}
                        style={{ padding: '8px 12px' }}
                        onClick={() => {
                          setTimeSlots(prev => prev.map(s => 
                            s.id === slot.id ? { ...s, available: !s.available } : s
                          ));
                        }}
                      >
                        {slot.available ? <X size={16} /> : <Check size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Edit Modal */}
      <AnimatePresence>
        {editModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setEditModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="modal-title">
                {editModal.mode === 'add' ? 'Нэмэх' : 'Засах'}
              </h2>
              
              {editModal.type === 'room' && (
                <>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Нэр</label>
                    <input 
                      type="text" 
                      value={formData.name || ''} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Өрөөний нэр"
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Үнэ (₮)</label>
                    <input 
                      type="number" 
                      value={formData.price || ''} 
                      onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      placeholder="50000"
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Багтаамж</label>
                    <input 
                      type="number" 
                      value={formData.capacity || ''} 
                      onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                      placeholder="10"
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Thumbnail URL</label>
                    <input 
                      type="text" 
                      value={formData.thumbnail || ''} 
                      onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Тайлбар</label>
                    <textarea 
                      value={formData.description || ''} 
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Өрөөний тайлбар..."
                      rows={3}
                    />
                  </div>
                </>
              )}
              
              {editModal.type === 'product' && (
                <>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Нэр</label>
                    <input 
                      type="text" 
                      value={formData.name || ''} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Бүтээгдэхүүний нэр"
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Ангилал</label>
                    <select 
                      value={formData.categoryId || ''} 
                      onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                    >
                      <option value="">Сонгох...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Үнэ (₮)</label>
                    <input 
                      type="number" 
                      value={formData.price || ''} 
                      onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      placeholder="5000"
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Нэгж</label>
                    <input 
                      type="text" 
                      value={formData.unit || ''} 
                      onChange={e => setFormData({ ...formData, unit: e.target.value })}
                      placeholder="ширхэг"
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Зураг URL</label>
                    <input 
                      type="text" 
                      value={formData.image || ''} 
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </>
              )}
              
              {editModal.type === 'category' && (
                <>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Icon (emoji)</label>
                    <input 
                      type="text" 
                      value={formData.icon || ''} 
                      onChange={e => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="🍔"
                    />
                  </div>
                  <div className="mb-2">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Нэр</label>
                    <input 
                      type="text" 
                      value={formData.name || ''} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ангилалын нэр"
                    />
                  </div>
                </>
              )}
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => setEditModal(null)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Цуцлах
                </button>
                <button onClick={handleSave} className="btn btn-primary" style={{ flex: 1 }}>
                  Хадгалах
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;

