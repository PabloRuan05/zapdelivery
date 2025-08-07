import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuSection } from "@/components/MenuSection";
import { Cart, CartItem } from "@/components/Cart";
import { MenuItemType, ExtraIngredient } from "@/components/MenuItem";
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

import pcalabresa from "@/assets/pcalabresa.jpg";
import pmarguerita from "@/assets/pmarguerita.jpg";
import pportuguesa from "@/assets/pportuguesa.jpg";
import pfrangocatu from "@/assets/pfrangocatu.jpg";
import pqq from "@/assets/pqq.jpg";
import pnapole from "@/assets/pnapole.jpeg";
import pmussa from "@/assets/pmussa.jpg";

import hcheese from "@/assets/hcheese.jpg";
import hbb from "@/assets/hbb.jpg";
import hxtudo from "@/assets/hxtudo.png";
import hfrango from "@/assets/hfrango.jpg";
import hvegano from "@/assets/hvegano.jpg";
import hdp from "@/assets/hdp.png";
import hsimples from "@/assets/hsimples.jpg";

import cpica from "@/assets/cpica.jpg";
import cfrad from "@/assets/cfrald.jpg";
import costela from "@/assets/ccostela.jpg";
import calcatra from "@/assets/calcatra.jpg";
import cmaminha from "@/assets/cmaminha.jpg";
import clinguica from "@/assets/clinguica.jpeg";

import bt from "@/assets/bt.jpg";
import bqb from "@/assets/bqb.jpg";
import bcb from "@/assets/bcb.jpg";

import bcoca from "@/assets/bcoca.png";
import bcocazero from "@/assets/bcocazero.png";
import bgua from "@/assets/bgua.png";
import bfnt from "@/assets/bfnt.jpg";
import bspri from "@/assets/bspri.png";

import logoImage from "@/assets/logo.png";

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
        name: "Coca-Cola",
        description:
          "Refrigerante clássico e refrescante, com sabor inconfundível e gás na medida certa, perfeito para acompanhar qualquer refeição.",
        price: 12.99,
        image: bcoca,
        category: "drinks",
        // isPopular: true,
      },
      {
        id: "drink-2",
        name: "Coca-Cola Zero",
        description:
          "Toda a refrescância e sabor da Coca-Cola tradicional, sem açúcar e sem calorias, ideal para quem busca sabor e leveza.",
        price: 6.99,
        image: bcocazero,
        category: "drinks",
      },
      {
        id: "drink-3",
        name: "Guaraná Antarctica",
        description:
          "Sabor genuinamente brasileiro, doce e refrescante, feito com extrato de guaraná, perfeito para matar a sede com sabor.",
        price: 8.99,
        image: bgua,
        category: "drinks",
      },
      {
        id: "drink-4",
        name: "Fanta Laranja",
        description:
          "Refrigerante vibrante e frutado, com sabor intenso de laranja e borbulhas refrescantes, uma escolha colorida e divertida.",
        price: 5.99,
        image: bfnt,
        category: "drinks",
      },
      {
        id: "drink-5",
        name: "Sprite",
        description:
          "Refrescância cítrica com toque de limão e gás leve, perfeita para quem gosta de sabor leve e revigorante.",
        price: 5.99,
        image: bspri,
        category: "drinks",
      },
    ],
    pizza: [
      {
        id: "pizza-1",
        name: "Pizza Calabresa",
        description:
          "Fatias generosas de calabresa levemente apimentada, com cebola fresca, molho de tomate especial e queijo mussarela derretido, proporcionando um sabor marcante e irresistível.",
        price: 18.99,
        image: pcalabresa,
        category: "pizza",
        // isPopular: true,
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 3.5 },
          { id: "extra-bacon", name: "Bacon", price: 5.0 },
          { id: "extra-mushrooms", name: "Cogumelos", price: 4.0 },
          { id: "extra-olives", name: "Azeitonas", price: 2.5 },
          { id: "extra-tomatoes", name: "Tomates Extra", price: 2.0 },
        ],
      },
      {
        id: "pizza-2",
        name: "Pizza Marguerita",
        description:
          "Clássica e simples, com molho de tomate fresco, queijo mussarela de alta qualidade e folhas de manjericão, trazendo o verdadeiro sabor da Itália em cada fatia.",
        price: 21.99,
        image: pmarguerita,
        category: "pizza",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 3.5 },
          { id: "extra-pepperoni", name: "Pepperoni Extra", price: 6.0 },
          { id: "extra-mushrooms", name: "Cogumelos", price: 4.0 },
          { id: "extra-olives", name: "Azeitonas", price: 2.5 },
        ],
      },
      {
        id: "pizza-3",
        name: "Pizza Portuguesa",
        description:
          "Combinação deliciosa de presunto, ovos, cebola, azeitonas e ervilhas, sobre uma base cremosa de queijo mussarela e molho especial, uma pizza que agrada a todos.",
        price: 23.99,
        image: pportuguesa,
        category: "pizza",
        extras: [
          { id: "extra-truffle", name: "Azeite Trufado", price: 8.0 },
          { id: "extra-nuts", name: "Nozes", price: 4.5 },
        ],
      },
      {
        id: "pizza-4",
        name: "Pizza Frango com Catupiry",
        description:
          "Frango desfiado temperado, coberto com o irresistível requeijão Catupiry, queijo mussarela e molho de tomate, uma combinação cremosa e saborosa que faz sucesso.",
        price: 19.99,
        image: pfrangocatu,
        category: "pizza",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 3.5 },
          { id: "extra-avocado", name: "Abacate", price: 5.5 },
          { id: "extra-spinach", name: "Espinafre", price: 3.0 },
        ],
      },
      {
        id: "pizza-5",
        name: "Pizza Quatro Queijos",
        description:
          "Mix especial de queijos mussarela, parmesão, gorgonzola e catupiry, sobre massa fina e crocante, para quem ama sabor intenso e textura cremosa.",
        price: 19.99,
        image: pqq,
        category: "pizza",
      },
      {
        id: "pizza-6",
        name: "Pizza Napolitana",
        description:
          "Molho de tomate, fatias de tomate fresco, alho fatiado e queijo mussarela, finalizada com orégano, uma pizza leve e cheia de sabor tradicional.",
        price: 19.99,
        image: pnapole,
        category: "pizza",
      },
      {
        id: "pizza-7",
        name: "Pizza Mussarela",
        description:
          "Simples e irresistível, queijo mussarela de alta qualidade derretido sobre molho de tomate especial, perfeita para qualquer momento.",
        price: 19.99,
        image: pmussa,
        category: "pizza",
      },
    ],
    burgers: [
      {
        id: "burger-1",
        name: "Cheeseburger",
        description:
          "Pão macio, suculento hambúrguer bovino grelhado na medida, queijo cheddar derretido, alface crocante, tomate fresco e molho especial. Um clássico irresistível que agrada a todos.",
        price: 15.99,
        image: hcheese,
        category: "burgers",
        // isPopular: true,
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 2.5 },
          { id: "extra-bacon", name: "Bacon", price: 4.0 },
          { id: "extra-pickles", name: "Picles Extra", price: 1.5 },
          { id: "extra-onion-rings", name: "Onion Rings", price: 3.5 },
        ],
      },
      {
        id: "burger-2",
        name: "Bacon Burger",
        description:
          "Hambúrguer suculento acompanhado de fatias crocantes de bacon, queijo derretido, alface fresca, tomate e molho especial, tudo em um pão artesanal macio.",
        price: 18.99,
        image: hbb,
        category: "burgers",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 2.5 },
          { id: "extra-bacon", name: "Bacon", price: 4.0 },
          { id: "extra-pickles", name: "Picles Extra", price: 1.5 },
          { id: "extra-onion-rings", name: "Onion Rings", price: 3.5 },
        ],
      },
      {
        id: "burger-3",
        name: "X-Tudo",
        description:
          "O famoso “tudo dentro”: hambúrguer bovino, queijo, bacon, ovo, presunto, alface, tomate, cebola, milho e molho especial, garantindo uma explosão de sabores a cada mordida.",
        price: 16.99,
        image: hxtudo,
        category: "burgers",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 2.5 },
          { id: "extra-bacon", name: "Bacon", price: 4.0 },
          { id: "extra-pickles", name: "Picles Extra", price: 1.5 },
          { id: "extra-onion-rings", name: "Onion Rings", price: 3.5 },
        ],
      },
      {
        id: "burger-4",
        name: "Hambúrguer de Frango",
        description:
          "Hambúrguer de peito de frango grelhado, pão macio, queijo, alface, tomate e maionese caseira, uma opção leve e saborosa para variar o cardápio.",
        price: 14.99,
        image: hfrango,
        category: "burgers",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 2.5 },
          { id: "extra-bacon", name: "Bacon", price: 4.0 },
          { id: "extra-pickles", name: "Picles Extra", price: 1.5 },
          { id: "extra-onion-rings", name: "Onion Rings", price: 3.5 },
        ],
      },
      {
        id: "burger-5",
        name: "Hambúrguer Vegano",
        description:
          "Delicioso hambúrguer à base de vegetais e grãos, servido com alface, tomate, cebola roxa e molho especial vegano em pão integral. Sabor e saúde numa só mordida.",
        price: 14.99,
        image: hvegano,
        category: "burgers",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 2.5 },
          { id: "extra-bacon", name: "Bacon", price: 4.0 },
          { id: "extra-pickles", name: "Picles Extra", price: 1.5 },
          { id: "extra-onion-rings", name: "Onion Rings", price: 3.5 },
        ],
      },
      {
        id: "burger-6",
        name: "Duplo Burger",
        description:
          "Duas camadas suculentas de hambúrguer bovino, queijo derretido, alface, tomate, cebola e molho especial, para quem não abre mão de uma refeição reforçada.",
        price: 14.99,
        image: hdp,
        category: "burgers",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 2.5 },
          { id: "extra-bacon", name: "Bacon", price: 4.0 },
          { id: "extra-pickles", name: "Picles Extra", price: 1.5 },
          { id: "extra-onion-rings", name: "Onion Rings", price: 3.5 },
        ],
      },
      {
        id: "burger-7",
        name: "Hambúrguer Simples",
        description:
          "Pão macio, hambúrguer bovino grelhado, alface, tomate e maionese caseira, uma opção básica e saborosa para quem prefere o tradicional.",
        price: 14.99,
        image: hsimples,
        category: "burgers",
        extras: [
          { id: "extra-cheese", name: "Queijo Extra", price: 2.5 },
          { id: "extra-bacon", name: "Bacon", price: 4.0 },
          { id: "extra-pickles", name: "Picles Extra", price: 1.5 },
          { id: "extra-onion-rings", name: "Onion Rings", price: 3.5 },
        ],
      },
    ],
    churrasco: [
      {
        id: "churras-1",
        name: "Picanha",
        description:
          "Corte nobre e macio, com capa generosa de gordura que garante suculência e sabor irresistível. Grelhada na brasa até o ponto perfeito, é a estrela do churrasco brasileiro.",
        price: 20.0,
        image: cpica,
        category: "churrasco",
        // isPopular: true,
      },
      {
        id: "churras-2",
        name: "Fraldinha",
        description:
          "Corte saboroso e macio, com fibras longas que absorvem bem os temperos. Grelhada lentamente, oferece uma experiência de sabor intensa e textura suculenta.",
        price: 15.0,
        image: cfrad,
        category: "churrasco",
      },
      {
        id: "churras-3",
        name: "Costela",
        description:
          "Peça robusta e cheia de sabor, assada lentamente para garantir maciez e desprender aquele aroma defumado típico do churrasco brasileiro.",
        price: 70.0,
        image: costela,
        category: "churrasco",
      },
      {
        id: "churras-4",
        name: "Alcatra",
        description:
          "Corte versátil e saboroso, ideal para churrascos em fatias grossas. Grelhado com tempero simples, destaca-se pela maciez e sabor marcante.",
        price: 40.0,
        image: calcatra,
        category: "churrasco",
      },
      {
        id: "churras-5",
        name: "Maminha",
        description:
          "Corte macio e suculento, com sabor suave e delicado. Grelhada lentamente na brasa, é perfeita para quem gosta de carne tenra e saborosa.",
        price: 40.0,
        image: cmaminha,
        category: "churrasco",
      },
      {
        id: "churras-6",
        name: "Linguiça",
        description:
          "Linguiça artesanal, saborosa e temperada na medida certa, grelhada até ficar dourada por fora e suculenta por dentro, um acompanhamento clássico para o churrasco.",
        price: 40.0,
        image: clinguica,
        category: "churrasco",
      },
    ],
    batatafrita: [
      {
        id: "fritas-1",
        name: "Batata Frita Tradicional",
        description:
          "Batatas cortadas em palitos finos e crocantes, fritas na medida certa e salpicadas com sal especial. O acompanhamento perfeito para qualquer refeição.",
        price: 15.0,
        image: bt,
        category: "batatafrita",
        // isPopular: true,
      },
      {
        id: "fritas-2",
        name: "Batata Frita com Queijo e Bacon",
        description:
          "Crocantes batatas fritas tradicionais cobertas com queijo derretido e pedaços crocantes de bacon, uma combinação irresistível de sabores e texturas.",
        price: 20.0,
        image: bqb,
        category: "batatafrita",
      },
      {
        id: "fritas-3",
        name: "Batata Frita com Cheddar e Bacon",
        description:
          "Batatas crocantes cobertas com molho cheddar cremoso e bacon crocante, uma explosão de sabor para os amantes de um bom petisco.",
        price: 20.0,
        image: bcb,
        category: "batatafrita",
      },
    ],
  };

  const handleOpenDialog = (item: MenuItemType) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleAddToCart = (
    item: MenuItemType,
    note?: string,
    extras?: ExtraIngredient[]
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.note === note &&
          JSON.stringify(cartItem.extras) === JSON.stringify(extras)
      );
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.note === note &&
          JSON.stringify(cartItem.extras) === JSON.stringify(extras)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1, note, extras }];
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

  const scrollToCart = () => {
    const cartElement = document.getElementById("cart-section");
    if (cartElement) {
      cartElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
                  Experiência gastronômica gourmet <br />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
              </Badge>
              <Button
                variant="warm"
                className="relative"
                onClick={scrollToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-warm-red text-primary-foreground text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              {/* <Button variant="warm" className="relative hidden md:block">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-warm-red text-primary-foreground text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button> */}
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
                  title="🍟 Batatas Crocantes"
                  items={menuData.batatafrita}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1" id="cart-section">
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
