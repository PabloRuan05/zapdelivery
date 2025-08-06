import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { MenuItemType } from "./MenuItem";
import { ExtraIngredient } from "./AddToCartDialog";

export interface CartItem extends MenuItemType {
  quantity: number;
  note?: string;
  extras?: ExtraIngredient[];
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const Cart = ({ items, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) => {
  const navigate = useNavigate();
  
  const getItemPrice = (item: CartItem) => {
    const extrasPrice = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
    return item.price + extrasPrice;
  };
  
  const total = items.reduce((sum, item) => sum + (getItemPrice(item) * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Seu Carrinho
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">Adicione alguns itens deliciosos para começar!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Seu Carrinho
            <Badge variant="secondary">{totalItems}</Badge>
          </CardTitle>
          <Button 
            onClick={onClearCart}
            variant="ghost" 
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.name}</h4>
              {item.extras && item.extras.length > 0 && (
                <p className="text-xs text-muted-foreground truncate">
                  Extras: {item.extras.map(e => e.name).join(', ')}
                </p>
              )}
              {item.note && (
                <p className="text-xs text-muted-foreground truncate">Obs: {item.note}</p>
              )}
              <p className="text-warm-orange font-semibold">R$ {getItemPrice(item).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => onUpdateQuantity(`${item.id}-${index}`, Math.max(0, item.quantity - 1))}
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button
                onClick={() => onUpdateQuantity(`${item.id}-${index}`, item.quantity + 1)}
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <Button
              onClick={() => onRemoveItem(`${item.id}-${index}`)}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-warm-orange">R$ {total.toFixed(2)}</span>
          </div>
          <Button 
            className="w-full" 
            variant="cart"
            size="lg"
            onClick={() => navigate("/checkout", { state: { cartItems: items } })}
          >
            Finalizar Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};