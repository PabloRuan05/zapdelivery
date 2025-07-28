import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
}

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

export const MenuItem = ({ item, onAddToCart }: MenuItemProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-[var(--shadow-card)] transition-all duration-300 border-border/50">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.isPopular && (
          <Badge className="absolute top-3 left-3 bg-warm-orange text-primary-foreground">
            Popular
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
          <span className="text-xl font-bold text-warm-orange">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {item.description}
        </p>
        <Button 
          onClick={() => onAddToCart(item)}
          className="w-full"
          variant="warm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};