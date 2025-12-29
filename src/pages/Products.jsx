import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, AlertCircle, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Products = () => {
  const { products, categories, canOrderProducts, getUserActiveBooking, orderProducts, user } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const activeBooking = getUserActiveBooking();
  const canOrder = canOrderProducts();
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === parseInt(selectedCategory));
  
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    ).filter(item => item.quantity > 0));
  };
  
  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };
  
  const handleOrder = () => {
    if (!activeBooking) return;
    
    const items = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));
    
    orderProducts(activeBooking.id, items);
    setCart([]);
    setShowCart(false);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };
  
  const getItemQuantity = (productId) => {
    const item = cart.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };
  
  return (
    <div className="section">
      <div className="container">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Бүтээгдэхүүн
        </motion.h1>
        
        {/* Warning if can't order */}
        {!canOrder && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-3"
            style={{ padding: '20px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <AlertCircle size={24} color="var(--warning)" />
              <div>
                <h4 style={{ color: 'var(--warning)', marginBottom: '4px' }}>Захиалга хийх боломжгүй</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                  {!activeBooking 
                    ? 'Бүтээгдэхүүн захиалахын тулд эхлээд өрөө захиалах шаардлагатай.'
                    : 'Таны өрөөний захиалга баталгаажаагүй байна. Админ баталсны дараа бүтээгдэхүүн захиалах боломжтой.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Success message */}
        <AnimatePresence>
          {orderSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card mb-3"
              style={{ padding: '20px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Check size={24} color="var(--success)" />
                <span style={{ color: 'var(--success)', fontWeight: '500' }}>
                  Захиалга амжилттай илгээгдлээ!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Category tabs */}
        <div className="category-tabs">
          <button 
            className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Бүгд
          </button>
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-tab ${selectedCategory === category.id.toString() ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id.toString())}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-card-image"
                />
                <div className="product-card-content">
                  <div className="product-card-name">{product.name}</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{product.unit}</div>
                  <div className="product-card-price">{product.price.toLocaleString()}₮</div>
                </div>
              </div>
              
              {canOrder && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--secondary-dark)' }}>
                  {getItemQuantity(product.id) === 0 ? (
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '10px' }}
                    >
                      <Plus size={18} />
                      Сагсанд нэмэх
                    </button>
                  ) : (
                    <div className="quantity-control" style={{ justifyContent: 'center' }}>
                      <button className="quantity-btn" onClick={() => removeFromCart(product.id)}>
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">{getItemQuantity(product.id)}</span>
                      <button className="quantity-btn" onClick={() => addToCart(product)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Cart button */}
        {canOrder && cart.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowCart(true)}
            className="btn btn-primary"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              padding: '16px 24px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100
            }}
          >
            <ShoppingCart size={20} />
            Сагс ({getCartCount()}) - {getCartTotal().toLocaleString()}₮
          </motion.button>
        )}
        
        {/* Cart modal */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay"
              onClick={() => setShowCart(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="modal"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="modal-title">
                  <ShoppingCart size={24} style={{ marginRight: '8px' }} />
                  Таны сагс
                </h2>
                
                {cart.map(item => (
                  <div 
                    key={item.id}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--secondary-dark)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div>
                        <div style={{ fontWeight: '500' }}>{item.name}</div>
                        <div style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{item.price.toLocaleString()}₮</div>
                      </div>
                    </div>
                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={() => removeFromCart(item.id)}>
                        <Minus size={14} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => addToCart(item)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div style={{ 
                  marginTop: '20px', 
                  padding: '16px', 
                  background: 'var(--secondary)', 
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: '600' }}>Нийт дүн:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>
                    {getCartTotal().toLocaleString()}₮
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button onClick={() => setShowCart(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                    Хаах
                  </button>
                  <button onClick={handleOrder} className="btn btn-primary" style={{ flex: 2 }}>
                    Захиалах
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;

