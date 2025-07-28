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
import { Coffee, Pizza, Beef, ShoppingCart, Star } from "lucide-react";

// Import images
import pizzaImage from "@/assets/pizza-margherita.jpg";
import burgerImage from "@/assets/burger-classic.jpg";
import drinkImage from "@/assets/drink-cocktail.jpg";

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
        name: "Classic Mojito",
        description: "Fresh mint, lime juice, white rum, and soda water served over ice",
        price: 12.99,
        image: drinkImage,
        category: "drinks",
        isPopular: true
      },
      {
        id: "drink-2",
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice, served chilled",
        price: 6.99,
        image: drinkImage,
        category: "drinks"
      },
      {
        id: "drink-3",
        name: "Craft Beer",
        description: "Local brewery selection, crisp and refreshing",
        price: 8.99,
        image: drinkImage,
        category: "drinks"
      },
      {
        id: "drink-4",
        name: "Iced Coffee",
        description: "Cold brew coffee served with ice and cream",
        price: 5.99,
        image: drinkImage,
        category: "drinks"
      }
    ],
    pizza: [
      {
        id: "pizza-1",
        name: "Margherita Classic",
        description: "Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil",
        price: 18.99,
        image: pizzaImage,
        category: "pizza",
        isPopular: true
      },
      {
        id: "pizza-2",
        name: "Pepperoni Supreme",
        description: "Pepperoni, mozzarella cheese, and our signature tomato sauce",
        price: 21.99,
        image: pizzaImage,
        category: "pizza"
      },
      {
        id: "pizza-3",
        name: "Quattro Formaggi",
        description: "Four cheese blend: mozzarella, gorgonzola, parmesan, and ricotta",
        price: 23.99,
        image: pizzaImage,
        category: "pizza"
      },
      {
        id: "pizza-4",
        name: "Vegetarian Delight",
        description: "Bell peppers, mushrooms, olives, onions, and fresh herbs",
        price: 19.99,
        image: pizzaImage,
        category: "pizza"
      }
    ],
    burgers: [
      {
        id: "burger-1",
        name: "Classic Beef Burger",
        description: "Juicy beef patty, lettuce, tomato, onion, pickles, and our special sauce",
        price: 15.99,
        image: burgerImage,
        category: "burgers",
        isPopular: true
      },
      {
        id: "burger-2",
        name: "BBQ Bacon Burger",
        description: "Beef patty, crispy bacon, BBQ sauce, cheddar cheese, and onion rings",
        price: 18.99,
        image: burgerImage,
        category: "burgers"
      },
      {
        id: "burger-3",
        name: "Chicken Deluxe",
        description: "Grilled chicken breast, avocado, swiss cheese, and herb mayo",
        price: 16.99,
        image: burgerImage,
        category: "burgers"
      },
      {
        id: "burger-4",
        name: "Veggie Burger",
        description: "Plant-based patty, mixed greens, tomato, and tahini sauce",
        price: 14.99,
        image: burgerImage,
        category: "burgers"
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
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
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
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
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
              <div className="w-10 h-10 bg-gradient-to-r from-warm-orange to-warm-red rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Bistro Delight</h1>
                <p className="text-sm text-muted-foreground">Gourmet dining experience</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
              </Badge>
              <Button variant="warm" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
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
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border">
                  <TabsTrigger value="pizza" className="flex items-center gap-2 data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Pizza className="w-4 h-4" />
                    Pizza
                  </TabsTrigger>
                  <TabsTrigger value="burgers" className="flex items-center gap-2 data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Beef className="w-4 h-4" />
                    Burgers
                  </TabsTrigger>
                  <TabsTrigger value="drinks" className="flex items-center gap-2 data-[state=active]:bg-warm-orange data-[state=active]:text-primary-foreground">
                    <Coffee className="w-4 h-4" />
                    Drinks
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pizza">
                <MenuSection
                  title="Wood-Fired Pizzas"
                  items={menuData.pizza}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              
              <TabsContent value="burgers">
                <MenuSection
                  title="Gourmet Burgers"
                  items={menuData.burgers}
                  onAddToCart={handleOpenDialog}
                />
              </TabsContent>
              
              <TabsContent value="drinks">
                <MenuSection
                  title="Refreshing Beverages"
                  items={menuData.drinks}
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
    </div>
  );
};

export default Index;