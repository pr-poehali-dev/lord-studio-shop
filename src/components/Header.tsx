import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  quantity: number;
}

interface HeaderProps {
  scrollToSection: (id: string) => void;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  cartItemsCount: number;
}

const Header = ({
  scrollToSection,
  cart,
  isCartOpen,
  setIsCartOpen,
  setCart,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  cartItemsCount,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="text-3xl">👑</div>
          <div>
            <h1 className="text-xl font-bold text-primary">LORD SHOP</h1>
            <p className="text-xs text-muted-foreground">by LORD STUDIO</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
          <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</button>
          <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О студии</button>
          <button onClick={() => scrollToSection('portfolio')} className="text-sm font-medium hover:text-primary transition-colors">Портфолио</button>
          <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-primary transition-colors">Отзывы</button>
          <button onClick={() => scrollToSection('blog')} className="text-sm font-medium hover:text-primary transition-colors">Блог</button>
          <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
        </div>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10 relative">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина
              {cartItemsCount > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">{cartItemsCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Корзина покупок</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto space-y-4">
                    {cart.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{item.image}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.price}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="ml-auto text-destructive"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Итого:</span>
                      <span className="text-primary">{getTotalPrice()} ₽</span>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      size="lg"
                      onClick={async () => {
                        try {
                          const response = await fetch('https://functions.poehali.dev/04b92c47-9d64-4a0d-be22-6302529401f3', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              items: cart,
                              totalPrice: getTotalPrice()
                            })
                          });
                          
                          const data = await response.json();
                          
                          if (response.ok && data.success) {
                            toast.success('Спасибо за заказ! Мы свяжемся с вами в ближайшее время');
                            setCart([]);
                            setIsCartOpen(false);
                          } else {
                            toast.error(data.message || 'Ошибка отправки заказа. Попробуйте позже');
                          }
                        } catch (error) {
                          toast.error('Ошибка соединения. Проверьте интернет');
                        }
                      }}
                    >
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Оформить заказ
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;