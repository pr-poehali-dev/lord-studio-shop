import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MainSections from '@/components/MainSections';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    { id: 1, name: 'Копия БР NEW', price: '300 ₽', priceNum: 300, category: 'CRMP', features: ['Полная копия сервера', 'Все системы работают', 'Готов к запуску'], image: '💎' },
    { id: 2, name: 'Копия Бриллиант РП', price: '250 ₽', priceNum: 250, category: 'CRMP', features: ['Полная копия сервера', 'Все системы работают', 'Готов к запуску'], image: '💍' },
    { id: 3, name: 'Копия Суровой России', price: '200 ₽', priceNum: 200, category: 'CRMP', features: ['Полная копия сервера', 'Все системы работают', 'Готов к запуску'], image: '🏔️' },
  ];

  const addToCart = (project: typeof projects[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === project.id);
      if (existingItem) {
        toast.success('Количество увеличено!');
        return prevCart.map(item =>
          item.id === project.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${project.name} добавлен в корзину!`);
      return [...prevCart, { ...project, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.success('Товар удален из корзины');
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const buyNow = (project: typeof projects[0]) => {
    addToCart(project);
    setIsCartOpen(true);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        scrollToSection={scrollToSection}
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        setCart={setCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        cartItemsCount={cartItemsCount}
      />

      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <MainSections
          projects={projects}
          addToCart={addToCart}
          buyNow={buyNow}
          scrollToSection={scrollToSection}
        />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default Index;
