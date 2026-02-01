import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
      <div className="container relative px-4">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">Лучшие проекты для CRMP/SAMP</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            LORD SHOP
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Профессиональная разработка серверов CRMP и SAMP
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            🎮 Уникальные проекты с кастомизацией под ваши требования
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90" onClick={() => scrollToSection('catalog')}>
              <Icon name="Sparkles" size={20} className="mr-2" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5" onClick={() => scrollToSection('about')}>
              <Icon name="Info" size={20} className="mr-2" />
              О студии
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
