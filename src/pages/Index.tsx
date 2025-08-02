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
import {
  Coffee,
  Pizza,
  Beef,
  ShoppingCart,
  Beer,
  Sandwich,
  HandPlatter,
} from "lucide-react";

// Import images
import pizzaImage from "@/assets/pizza-margherita.jpg";
import burgerImage from "@/assets/burger-classic.jpg";
import drinkImage from "@/assets/drink-cocktail.jpg";
import logoImage from "@/assets/logo.jpg";
import churras from "@/assets/churras.jpeg";
import batata from "@/assets/batata.jpg";

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
        name: "Refri 250ml",
        description:
          "Hortelã fresca, suco de limão, rum branco e água com gás servido com gelo",
        price: 12.99,
        image: drinkImage,
        category: "drinks",
        // isPopular: true,
      },
      {
        id: "drink-2",
        name: "Suco de Laranja Natural",
        description: "Suco de laranja espremido na hora, servido gelado",
        price: 6.99,
        image: drinkImage,
        category: "drinks",
      },
      {
        id: "drink-3",
        name: "Cerveja",
        description: "Seleção de cervejaria local, crocante e refrescante",
        price: 8.99,
        image: drinkImage,
        category: "drinks",
      },
      {
        id: "drink-4",
        name: "Coca",
        description: "Café cold brew servido com gelo e creme",
        price: 5.99,
        image: drinkImage,
        category: "drinks",
      },
    ],
    pizza: [
      {
        id: "pizza-1",
        name: "Pizza de Mussarela",
        description:
          "Mussarela fresca, molho de tomate, manjericão e azeite extravirgem",
        price: 18.99,
        image: pizzaImage,
        category: "pizza",
        // isPopular: true,
      },
      {
        id: "pizza-2",
        name: "Pizza de Pepperoni",
        description:
          "Pepperoni, queijo mussarela e nosso molho de tomate especial",
        price: 21.99,
        image: pizzaImage,
        category: "pizza",
      },
      {
        id: "pizza-3",
        name: "Pizza Quatro Queijos",
        description:
          "Mistura de quatro queijos: mussarela, gorgonzola, parmesão e ricota",
        price: 23.99,
        image: pizzaImage,
        category: "pizza",
      },
      {
        id: "pizza-4",
        name: "Delícia Vegetariana",
        description: "Pimentões, cogumelos, azeitonas, cebolas e ervas frescas",
        price: 19.99,
        image: pizzaImage,
        category: "pizza",
      },
    ],
    burgers: [
      {
        id: "burger-1",
        name: "Hambúrguer Clássico",
        description:
          "Hambúrguer suculento, alface, tomate, cebola, picles e nosso molho especial",
        price: 15.99,
        image: burgerImage,
        category: "burgers",
        // isPopular: true,
      },
      {
        id: "burger-2",
        name: "Hambúrguer BBQ com Bacon",
        description:
          "Hambúrguer, bacon crocante, molho BBQ, queijo cheddar e onion rings",
        price: 18.99,
        image: burgerImage,
        category: "burgers",
      },
      {
        id: "burger-3",
        name: "Frango Deluxe",
        description:
          "Peito de frango grelhado, abacate, queijo suíço e maionese de ervas",
        price: 16.99,
        image: burgerImage,
        category: "burgers",
      },
      {
        id: "burger-4",
        name: "Hambúrguer Vegano",
        description:
          "Hambúrguer à base de plantas, folhas verdes, tomate e molho de tahine",
        price: 14.99,
        image: burgerImage,
        category: "burgers",
      },
    ],
    churrasco: [
      {
        id: "churras-1",
        name: "Churrasco Clássico",
        description:
          "Cortes selecionados na brasa, servidos com farofa, vinagrete e pão de alho.",
        price: 20.0,
        image: churras,
        category: "churrasco",
        // isPopular: true,
      },
      {
        id: "churras-2",
        name: "Churrasco Clássico",
        description:
          "Cortes selecionados na brasa, servidos com farofa, vinagrete e pão de alho.",
        price: 15.0,
        image: churras,
        category: "churrasco",
      },
      {
        id: "churras-3",
        name: "Churrasco Clássico",
        description:
          "Cortes selecionados na brasa, servidos com farofa, vinagrete e pão de alho.",
        price: 70.0,
        image: churras,
        category: "churrasco",
      },
      {
        id: "churras-4",
        name: "Churrasco Clássico",
        description:
          "Cortes selecionados na brasa, servidos com farofa, vinagrete e pão de alho.",
        price: 40.0,
        image: churras,
        category: "churrasco",
      },
    ],
    batatafrita: [
      {
        id: "fritas-1",
        name: "Fritas Clássica",
        description:
          "Cortadas na medida certa, douradas e crocantes por fora, macias por dentro. Um clássico irresistível!",
        price: 15.0,
        image: batata,
        category: "batatafrita",
        // isPopular: true,
      },
      {
        id: "fritas-2",
        name: "Fritas com molho BBQ",
        description: "O clássico ainda melhor com um toque de molho barbecue",
        price: 20.0,
        image: batata,
        category: "batatafrita",
      },
    ],
  };

  const handleOpenDialog = (item: MenuItemType) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleAddToCart = (item: MenuItemType, note?: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.id === item.id && cartItem.note === note
      );
      if (existingItem) {
        return prev.map((cartItem) =>
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

    setCartItems((prev) =>
      prev.map((item, index) =>
        `${item.id}-${index}` === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) =>
      prev.filter((item, index) => `${item.id}-${index}` !== id)
    );
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
                <h1 className="text-2xl font-bold text-foreground">
                  Pizza do Pablo
                </h1>
                <p className="text-sm text-muted-foreground">
                  Experiência gastronômica gourmet
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
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
              <div className="mb-8 overflow-x-auto scrollbar-none md:scrollbar-auto">
                <TabsList className="inline-flex h-14 items-center justify-center rounded-md bg-card border p-1 text-muted-foreground min-w-max">
                  <TabsTrigger
                    value="pizza"
                    className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground"
                  >
                    <Pizza className="w-4 h-4" />
                    Pizzas
                  </TabsTrigger>
                  <TabsTrigger
                    value="burgers"
                    className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground"
                  >
                    <Sandwich className="w-4 h-4" />
                    Hambúrguers
                  </TabsTrigger>
                  <TabsTrigger
                    value="churrasco"
                    className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground"
                  >
                    <Beef className="w-4 h-4" />
                    Churrasco
                  </TabsTrigger>
                  <TabsTrigger
                    value="batatafrita"
                    className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground"
                  >
                    <HandPlatter className="w-4 h-4" />
                    Batata-Frita
                  </TabsTrigger>

                  <TabsTrigger
                    value="drinks"
                    className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground"
                  >
                    <Beer className="w-4 h-4" />
                    Bebidas
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="pizza">
                <MenuSection
                  title="🍕 Pizzas Artesanais"
                  items={menuData.pizza}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              <TabsContent value="burgers">
                <MenuSection
                  title="🍔 Hambúrguers Gourmet"
                  items={menuData.burgers}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              <TabsContent value="drinks">
                <MenuSection
                  title="🍹 Bebidas Refrescantes"
                  items={menuData.drinks}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              <TabsContent value="churrasco">
                <MenuSection
                  title="🍖 Churrasco Delicioso"
                  items={menuData.churrasco}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              <TabsContent value="batatafrita">
                <MenuSection
                  title="🍟 Batatas Crocantes !"
                  items={menuData.batatafrita}
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
              Desenvolvido por{" "}
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
