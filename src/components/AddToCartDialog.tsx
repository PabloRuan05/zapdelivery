import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { MenuItemType } from "./MenuItem";

export interface ExtraIngredient {
  id: string;
  name: string;
  price: number;
}

interface AddToCartDialogProps {
  item: MenuItemType | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItemType, note?: string, extras?: ExtraIngredient[]) => void;
}

// Sample extra ingredients - in a real app, this would come from the backend
const EXTRA_INGREDIENTS: ExtraIngredient[] = [
  { id: "extra-cheese", name: "Queijo Extra", price: 3.50 },
  { id: "extra-bacon", name: "Bacon", price: 5.00 },
  { id: "extra-mushrooms", name: "Cogumelos", price: 4.00 },
  { id: "extra-pepperoni", name: "Pepperoni", price: 6.00 },
  { id: "extra-olives", name: "Azeitonas", price: 2.50 },
  { id: "extra-tomatoes", name: "Tomates Extra", price: 2.00 },
];

export const AddToCartDialog = ({ item, open, onClose, onAddToCart }: AddToCartDialogProps) => {
  const [note, setNote] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<ExtraIngredient[]>([]);

  if (!item) return null;

  const handleExtraToggle = (extra: ExtraIngredient) => {
    setSelectedExtras(prev => {
      const isSelected = prev.find(e => e.id === extra.id);
      if (isSelected) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const finalPrice = item.price + extrasTotal;

  const handleAddToCart = () => {
    onAddToCart(item, note.trim() || undefined, selectedExtras.length > 0 ? selectedExtras : undefined);
    setNote("");
    setSelectedExtras([]);
    onClose();
  };

  const handleClose = () => {
    setNote("");
    setSelectedExtras([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar ao Carrinho</DialogTitle>
          <DialogDescription>
            Personalize seu pedido com solicitações especiais ou mudanças nos ingredientes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Item Details */}
          <div className="flex gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Preço base: R$ {item.price.toFixed(2)}</p>
                {extrasTotal > 0 && (
                  <p className="text-sm text-muted-foreground">Extras: R$ {extrasTotal.toFixed(2)}</p>
                )}
                <p className="text-lg font-bold text-warm-orange">Total: R$ {finalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Extra Ingredients */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Ingredientes Extras (Opcional)</Label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
              {EXTRA_INGREDIENTS.map((extra) => (
                <div key={extra.id} className="flex items-center justify-between p-2 rounded-md border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={extra.id}
                      checked={selectedExtras.some(e => e.id === extra.id)}
                      onCheckedChange={() => handleExtraToggle(extra)}
                    />
                    <Label 
                      htmlFor={extra.id} 
                      className="text-sm font-normal cursor-pointer"
                    >
                      {extra.name}
                    </Label>
                  </div>
                  <span className="text-sm font-medium text-warm-orange">
                    + R$ {extra.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div className="space-y-2">
            <Label htmlFor="note">Instruções Especiais (Opcional)</Label>
            <Textarea
              id="note"
              placeholder="Adicione solicitações especiais, alergias ou mudanças nos ingredientes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleAddToCart} variant="warm" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};