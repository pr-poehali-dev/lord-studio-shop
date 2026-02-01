import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  features: string[];
  image: string;
}

interface MainSectionsProps {
  projects: Project[];
  addToCart: (project: Project) => void;
  buyNow: (project: Project) => void;
  scrollToSection: (id: string) => void;
}

const MainSections = ({ projects, addToCart, buyNow, scrollToSection }: MainSectionsProps) => {
  const portfolioItems = [
    { name: 'Los Santos RP', players: '500+ онлайн', description: 'Крупнейший РП сервер России', emoji: '🌆' },
    { name: 'Speed Demons', players: '300+ онлайн', description: 'Топовый гоночный проект', emoji: '🔥' },
    { name: 'Mafia Wars', players: '400+ онлайн', description: 'Легендарный мафиозный сервер', emoji: '👑' },
  ];

  const reviews = [
    { author: 'Максим К.', rating: 5, text: 'Отличная работа! Сервер запустили за неделю, все работает стабильно', project: 'РП Сервер' },
    { author: 'Алексей Д.', rating: 5, text: 'Профессионалы своего дела. Помогли с кастомизацией всех систем', project: 'Дрифт Сервер' },
    { author: 'Игорь М.', rating: 5, text: 'Качество кода на высоте, поддержка оперативная. Рекомендую!', project: 'DM Арена' },
  ];

  const blogPosts = [
    { title: 'Как выбрать идеальный мод для вашего SAMP сервера', date: '15 января 2026', category: 'Руководства', emoji: '📚' },
    { title: 'Топ 10 скриптов для CRMP серверов в 2026', date: '10 января 2026', category: 'Обзоры', emoji: '⭐' },
    { title: 'Оптимизация производительности: секреты профи', date: '5 января 2026', category: 'Технологии', emoji: '⚡' },
  ];

  const faqs = [
    { q: 'Как долго занимает разработка проекта?', a: 'В зависимости от сложности, от 3 до 14 дней. Стандартный проект готов за неделю.' },
    { q: 'Предоставляете ли техподдержку после запуска?', a: 'Да! Мы предоставляем 30 дней бесплатной техподдержки и обучение администрированию.' },
    { q: 'Можно ли добавить свои уникальные функции?', a: 'Конечно! Мы специализируемся на кастомизации. Любые ваши идеи реализуем.' },
    { q: 'Какие способы оплаты вы принимаете?', a: 'Банковские карты, электронные кошельки, криптовалюта. Возможна рассрочка.' },
    { q: 'Есть ли гарантия качества?', a: 'Да, даём гарантию 6 месяцев на все разработанные системы и скрипты.' },
  ];

  return (
    <>
      <section id="catalog" className="py-16 md:py-24 bg-card/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">Каталог</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Наши проекты</h2>
            <p className="text-muted-foreground text-lg">Готовые решения и custom разработка</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Все проекты</Button>
            <Button variant="outline" className="hover:bg-primary/10">SAMP</Button>
            <Button variant="outline" className="hover:bg-primary/10">CRMP</Button>
            <Button variant="outline" className="hover:bg-primary/10">РП серверы</Button>
            <Button variant="outline" className="hover:bg-primary/10">Гонки</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in bg-card/80 backdrop-blur">
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{project.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge variant="outline" className="border-secondary text-secondary">{project.category}</Badge>
                  </div>
                  <CardDescription className="text-2xl font-bold text-primary">{project.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => addToCart(project)}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => buyNow(project)}
                  >
                    <Icon name="Zap" size={16} className="mr-2" />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/50">О нас</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">LORD STUDIO</h2>
            <p className="text-muted-foreground text-lg">Профессиональная разработка с 2018 года</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Code', title: 'Чистый код', desc: 'Профессиональная архитектура и оптимизация' },
              { icon: 'Zap', title: 'Быстрая разработка', desc: 'Запуск проекта от 3 дней' },
              { icon: 'Shield', title: 'Гарантия качества', desc: '6 месяцев технической поддержки' },
              { icon: 'Sparkles', title: 'Кастомизация', desc: 'Любые функции под ваши требования' },
            ].map((feature, idx) => (
              <Card key={idx} className="text-center hover:border-accent/50 transition-all hover:scale-105 animate-fade-in bg-card/50">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name={feature.icon as any} size={32} className="text-accent" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Мы создаём не просто серверы — мы создаём успешные проекты. Наша команда состоит из опытных разработчиков, 
              которые знают все тонкости CRMP и SAMP разработки.
            </p>
            <div className="flex gap-8 justify-center text-center flex-wrap">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Завершённых проектов</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">8 лет</div>
                <div className="text-sm text-muted-foreground">На рынке</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24 bg-card/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">Портфолио</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Наши лучшие работы</h2>
            <p className="text-muted-foreground text-lg">Проекты с тысячами активных игроков</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.map((item, idx) => (
              <Card key={idx} className="hover:border-primary/50 transition-all hover:scale-105 animate-fade-in bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{item.emoji}</div>
                  <CardTitle className="text-2xl text-center">{item.name}</CardTitle>
                  <CardDescription className="text-center">
                    <Badge className="bg-primary/20 text-primary">{item.players}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/50">Отзывы</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Что говорят клиенты</h2>
            <p className="text-muted-foreground text-lg">Реальные отзывы от реальных людей</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="animate-fade-in bg-card/80">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline" className="border-primary text-primary">{review.project}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 md:py-24 bg-card/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/50">Блог</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Последние статьи</h2>
            <p className="text-muted-foreground text-lg">Полезные материалы и новости</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="group hover:border-accent/50 transition-all hover:scale-105 animate-fade-in cursor-pointer">
                <CardHeader>
                  <div className="text-5xl mb-4">{post.emoji}</div>
                  <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" className="w-full group-hover:bg-accent/10">
                    Читать далее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">FAQ</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-muted-foreground text-lg">Ответы на популярные вопросы</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded-lg px-6 bg-card/50">
                  <AccordionTrigger className="text-left hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Не нашли ответ на свой вопрос?</p>
            <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Написать нам
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы начать свой проект?</h2>
          <p className="text-lg text-muted-foreground mb-8">Свяжитесь с нами и получите консультацию</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Icon name="Rocket" size={20} className="mr-2" />
            Заказать проект
          </Button>
        </div>
      </section>
    </>
  );
};

export default MainSections;
