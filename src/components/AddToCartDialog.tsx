import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { MenuItemType } from "./MenuItem";

interface AddToCartDialogProps {
  item: MenuItemType | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItemType, note?: string) => void;
}

export const AddToCartDialog = ({ item, open, onClose, onAddToCart }: AddToCartDialogProps) => {
  const [note, setNote] = useState("");

  if (!item) return null;

  const handleAddToCart = () => {
    onAddToCart(item, note.trim() || undefined);
    setNote("");
    onClose();
  };

  const handleClose = () => {
    setNote("");
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
              <p className="text-lg font-bold text-warm-orange">R$ {item.price.toFixed(2)}</p>
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