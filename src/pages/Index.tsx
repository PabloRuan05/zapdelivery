import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuSection } from "@/components/MenuSection";
import { Cart, CartItem } from "@/components/Cart";
import { MenuItemType } from "@/components/MenuItem";
import { AddToCartDialog } from "@/components/AddToCartDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Coffee, Pizza, Beef, ShoppingCart, IceCream, Salad, Soup } from "lucide-react";

// Import images
import pizzaImage from "@/assets/pizza-margherita.jpg";
import burgerImage from "@/assets/burger-classic.jpg";
import drinkImage from "@/assets/drink-cocktail.jpg";
import logoImage from "@/assets/bistro-logo.png";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // Sample menu data
  const menuData: Record<string, MenuItemType[]> = {
    drinks: [
      {
        id: "drink-1",
        name: "Mojito Clássico",
        description: "Hortelã fresca, suco de limão, rum branco e água com gás servido com gelo",
        price: 12.99,
        image: drinkImage,
        category: "drinks",
        isPopular: true
      },
      {
        id: "drink-2",
        name: "Suco de Laranja Natural",
        description: "Suco de laranja espremido na hora, servido gelado",
        price: 6.99,
        image: drinkImage,
        category: "drinks"
      },
      {
        id: "drink-3",
        name: "Cerveja Artesanal",
        description: "Seleção de cervejaria local, crocante e refrescante",
        price: 8.99,
        image: drinkImage,
        category: "drinks"
      },
      {
        id: "drink-4",
        name: "Café Gelado",
        description: "Café cold brew servido com gelo e creme",
        price: 5.99,
        image: drinkImage,
        category: "drinks"
      }
    ],
    pizza: [
      {
        id: "pizza-1",
        name: "Margherita Clássica",
        description: "Mussarela fresca, molho de tomate, manjericão e azeite extravirgem",
        price: 18.99,
        image: pizzaImage,
        category: "pizza",
        isPopular: true
      },
      {
        id: "pizza-2",
        name: "Pepperoni Suprema",
        description: "Pepperoni, queijo mussarela e nosso molho de tomate especial",
        price: 21.99,
        image: pizzaImage,
        category: "pizza"
      },
      {
        id: "pizza-3",
        name: "Quattro Formaggi",
        description: "Mistura de quatro queijos: mussarela, gorgonzola, parmesão e ricota",
        price: 23.99,
        image: pizzaImage,
        category: "pizza"
      },
      {
        id: "pizza-4",
        name: "Delícia Vegetariana",
        description: "Pimentões, cogumelos, azeitonas, cebolas e ervas frescas",
        price: 19.99,
        image: pizzaImage,
        category: "pizza"
      }
    ],
    burgers: [
      {
        id: "burger-1",
        name: "Hambúrguer Bovino Clássico",
        description: "Hambúrguer suculento, alface, tomate, cebola, picles e nosso molho especial",
        price: 15.99,
        image: burgerImage,
        category: "burgers",
        isPopular: true
      },
      {
        id: "burger-2",
        name: "Hambúrguer BBQ com Bacon",
        description: "Hambúrguer bovino, bacon crocante, molho BBQ, queijo cheddar e onion rings",
        price: 18.99,
        image: burgerImage,
        category: "burgers"
      },
      {
        id: "burger-3",
        name: "Frango Deluxe",
        description: "Peito de frango grelhado, abacate, queijo suíço e maionese de ervas",
        price: 16.99,
        image: burgerImage,
        category: "burgers"
      },
      {
        id: "burger-4",
        name: "Hambúrguer Vegano",
        description: "Hambúrguer à base de plantas, folhas verdes, tomate e molho de tahine",
        price: 14.99,
        image: burgerImage,
        category: "burgers"
      }
    ],
    appetizers: [
      {
        id: "appetizer-1",
        name: "Bruschetta Clássica",
        description: "Pão tostado com tomate fresco, manjericão, alho e azeite extravirgem",
        price: 9.99,
        image: pizzaImage,
        category: "appetizers",
        isPopular: true
      },
      {
        id: "appetizer-2",
        name: "Anéis de Cebola",
        description: "Anéis de cebola empanados e fritos, servidos com molho especial",
        price: 7.99,
        image: burgerImage,
        category: "appetizers"
      },
      {
        id: "appetizer-3",
        name: "Chicken Wings",
        description: "Asinhas de frango temperadas com molho barbecue picante",
        price: 12.99,
        image: burgerImage,
        category: "appetizers"
      }
    ],
    salads: [
      {
        id: "salad-1",
        name: "Salada Caesar",
        description: "Alface romana, croutons, parmesão e molho caesar tradicional",
        price: 13.99,
        image: pizzaImage,
        category: "salads",
        isPopular: true
      },
      {
        id: "salad-2",
        name: "Salada Mediterrânea",
        description: "Mix de folhas, azeitonas, tomate cereja, queijo feta e vinagrete",
        price: 15.99,
        image: pizzaImage,
        category: "salads"
      },
      {
        id: "salad-3",
        name: "Salada de Quinoa",
        description: "Quinoa, abacate, nozes, cranberries e molho de limão",
        price: 14.99,
        image: pizzaImage,
        category: "salads"
      }
    ],
    soups: [
      {
        id: "soup-1",
        name: "Sopa de Tomate",
        description: "Sopa cremosa de tomate com manjericão fresco e croutons",
        price: 8.99,
        image: drinkImage,
        category: "soups"
      },
      {
        id: "soup-2",
        name: "Canja de Galinha",
        description: "Canja tradicional com frango desfiado, arroz e legumes",
        price: 10.99,
        image: drinkImage,
        category: "soups",
        isPopular: true
      },
      {
        id: "soup-3",
        name: "Sopa de Abóbora",
        description: "Sopa cremosa de abóbora com gengibre e sementes tostadas",
        price: 9.99,
        image: drinkImage,
        category: "soups"
      }
    ],
    desserts: [
      {
        id: "dessert-1",
        name: "Tiramisù",
        description: "Sobremesa italiana clássica com café, mascarpone e cacau",
        price: 11.99,
        image: drinkImage,
        category: "desserts",
        isPopular: true
      },
      {
        id: "dessert-2",
        name: "Cheesecake de Frutas Vermelhas",
        description: "Cheesecake cremoso com calda de frutas vermelhas frescas",
        price: 13.99,
        image: drinkImage,
        category: "desserts"
      },
      {
        id: "dessert-3",
        name: "Sorvete Artesanal",
        description: "Três bolas de sorvete artesanal: baunilha, chocolate e morango",
        price: 8.99,
        image: drinkImage,
        category: "desserts"
      }
    ]
  };

  const handleOpenDialog = (item: MenuItemType) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleAddToCart = (item: MenuItemType, note?: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id && cartItem.note === note);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.note === note
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1, note }];
      }
    });
    
    toast({
      title: "Adicionado ao carrinho!",
      description: `${item.name} foi adicionado ao seu carrinho.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map((item, index) =>
        `${item.id}-${index}` === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter((item, index) => `${item.id}-${index}` !== id));
    toast({
      title: "Item removido",
      description: "Item foi removido do seu carrinho.",
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do seu carrinho.",
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cream to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Bistro Delight Logo" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Bistro Delight</h1>
                <p className="text-sm text-muted-foreground">Experiência gastronômica gourmet</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho
              </Badge>
              <Button variant="warm" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-warm-red text-primary-foreground text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="pizza" className="w-full">
              <div className="mb-8 overflow-x-auto">
                <TabsList className="inline-flex h-12 items-center justify-center rounded-md bg-card border p-1 text-muted-foreground min-w-max">
                  <TabsTrigger value="pizza" className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Pizza className="w-4 h-4" />
                    Pizzas
                  </TabsTrigger>
                  <TabsTrigger value="burgers" className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Beef className="w-4 h-4" />
                    Hambúrguers
                  </TabsTrigger>
                  <TabsTrigger value="appetizers" className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Salad className="w-4 h-4" />
                    Entradas
                  </TabsTrigger>
                  <TabsTrigger value="salads" className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Salad className="w-4 h-4" />
                    Saladas
                  </TabsTrigger>
                  <TabsTrigger value="soups" className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Soup className="w-4 h-4" />
                    Sopas
                  </TabsTrigger>
                  <TabsTrigger value="drinks" className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Coffee className="w-4 h-4" />
                    Bebidas
                  </TabsTrigger>
                  <TabsTrigger value="desserts" className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <IceCream className="w-4 h-4" />
                    Sobremesas
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pizza">
                <MenuSection
                  title="Pizzas Artesanais"
                  items={menuData.pizza}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              
              <TabsContent value="burgers">
                <MenuSection
                  title="Hambúrguers Gourmet"
                  items={menuData.burgers}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>

              <TabsContent value="appetizers">
                <MenuSection
                  title="Entradas Deliciosas"
                  items={menuData.appetizers}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>

              <TabsContent value="salads">
                <MenuSection
                  title="Saladas Frescas"
                  items={menuData.salads}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>

              <TabsContent value="soups">
                <MenuSection
                  title="Sopas Reconfortantes"
                  items={menuData.soups}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              
              <TabsContent value="drinks">
                <MenuSection
                  title="Bebidas Refrescantes"
                  items={menuData.drinks}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>

              <TabsContent value="desserts">
                <MenuSection
                  title="Sobremesas Irresistíveis"
                  items={menuData.desserts}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Cart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
              />
            </div>
          </div>
        </div>
      </div>

      <AddToCartDialog
        item={selectedItem}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Developed by{" "}
              <a 
                href="#" 
                className="text-warm-orange hover:text-warm-red transition-colors underline underline-offset-4"
              >
                BlooCode
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;