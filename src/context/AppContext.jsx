import { createContext, useContext, useState, useEffect } from 'react';
import { rooms as initialRooms, products as initialProducts, categories as initialCategories, timeSlots as initialTimeSlots, initialUser } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Data states
  const [rooms, setRooms] = useState(initialRooms);
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
  
  // User state
  const [user, setUser] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [productOrders, setProductOrders] = useState([]);
  
  // Login/Logout
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };
  
  const switchToAdmin = () => {
    setUser({ id: 0, name: "Админ", phone: "99001100", isAdmin: true });
  };
  
  const switchToUser = () => {
    setUser(initialUser);
  };
  
  // Room booking
  const bookRoom = (roomId, timeSlotId, date, preOrderedProducts = []) => {
    const newBooking = {
      id: Date.now(),
      roomId,
      timeSlotId,
      date,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      status: 'pending', // pending, confirmed, cancelled
      preOrderedProducts,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
    
    // Mark time slot as unavailable (temporarily until admin action)
    setTimeSlots(prev => prev.map(slot => 
      slot.id === timeSlotId ? { ...slot, available: false } : slot
    ));
    
    return newBooking;
  };
  
  // Confirm booking (Admin)
  const confirmBooking = (bookingId) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
    ));
  };
  
  // Cancel booking (Admin)
  const cancelBooking = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setTimeSlots(prev => prev.map(slot => 
        slot.id === booking.timeSlotId ? { ...slot, available: true } : slot
      ));
    }
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    ));
  };
  
  // Product orders
  const orderProducts = (bookingId, items) => {
    const newOrder = {
      id: Date.now(),
      bookingId,
      userId: user.id,
      items, // [{productId, quantity}]
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setProductOrders(prev => [...prev, newOrder]);
    return newOrder;
  };
  
  // Admin: Room CRUD
  const addRoom = (room) => {
    setRooms(prev => [...prev, { ...room, id: Date.now() }]);
  };
  
  const updateRoom = (roomId, updates) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, ...updates } : room
    ));
  };
  
  const deleteRoom = (roomId) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
  };
  
  // Admin: Product CRUD
  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };
  
  const updateProduct = (productId, updates) => {
    setProducts(prev => prev.map(product => 
      product.id === productId ? { ...product, ...updates } : product
    ));
  };
  
  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };
  
  // Admin: Category CRUD
  const addCategory = (category) => {
    setCategories(prev => [...prev, { ...category, id: Date.now() }]);
  };
  
  const updateCategory = (categoryId, updates) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId ? { ...category, ...updates } : category
    ));
  };
  
  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(category => category.id !== categoryId));
  };
  
  // Get user's active booking
  const getUserActiveBooking = () => {
    return bookings.find(b => 
      b.userId === user?.id && 
      (b.status === 'pending' || b.status === 'confirmed')
    );
  };
  
  // Check if user can order products
  const canOrderProducts = () => {
    const activeBooking = getUserActiveBooking();
    return activeBooking && activeBooking.status === 'confirmed';
  };
  
  const value = {
    // Data
    rooms,
    products,
    categories,
    timeSlots,
    bookings,
    productOrders,
    
    // User
    user,
    isLoggedIn,
    login,
    logout,
    switchToAdmin,
    switchToUser,
    
    // Booking actions
    bookRoom,
    confirmBooking,
    cancelBooking,
    getUserActiveBooking,
    
    // Product actions
    orderProducts,
    canOrderProducts,
    
    // Admin actions
    addRoom,
    updateRoom,
    deleteRoom,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    setTimeSlots
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

