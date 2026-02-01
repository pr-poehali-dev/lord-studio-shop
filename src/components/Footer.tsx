import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

const Footer = ({ scrollToSection }: FooterProps) => {
  return (
    <footer className="border-t border-border bg-card/30 py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">👑</div>
              <div>
                <h3 className="font-bold text-primary">LORD SHOP</h3>
                <p className="text-xs text-muted-foreground">by LORD STUDIO</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Профессиональная разработка CRMP и SAMP серверов с 2018 года
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollToSection('catalog')} className="hover:text-primary transition-colors">Каталог</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О студии</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">Портфолио</button></li>
              <li><button onClick={() => scrollToSection('blog')} className="hover:text-primary transition-colors">Блог</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-primary transition-colors">FAQ</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Связаться с нами</h4>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-primary/50 hover:bg-primary/10">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Telegram
              </Button>
              <Button variant="outline" className="w-full justify-start border-secondary/50 hover:bg-secondary/10">
                <Icon name="Mail" size={16} className="mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 LORD STUDIO. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
