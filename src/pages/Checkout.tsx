import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, User, Mail } from "lucide-react";
import { CartItem } from "@/components/Cart";

interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
  neighborhood: string;
  block: string;
  houseNumber: string;
  deliveryNotes: string;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cartItems: CartItem[] = location.state?.cartItems || [];

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: "",
    phone: "",
    address: "",
    neighborhood: "",
    block: "",
    houseNumber: "",
    deliveryNotes: "",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = () => {
    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'address', 'neighborhood', 'block', 'houseNumber'];
    const missingFields = requiredFields.filter(field => !deliveryInfo[field as keyof DeliveryInfo].trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Informações Faltando",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Format order data for WhatsApp
    const orderData = [
      "🍽️ *NOVO PEDIDO*",
      "",
      "📋 *RESUMO DO PEDIDO:*",
      ...cartItems.map(item => {
        const itemLine = `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;
        return item.note ? `${itemLine}\n  📝 Obs: ${item.note}` : itemLine;
      }),
      "",
      `*TOTAL: R$ ${total.toFixed(2)}*`,
      "",
      "🚚 *INFORMAÇÕES DE ENTREGA:*",
      `👤 Nome: ${deliveryInfo.fullName}`,
      `📞 Telefone: ${deliveryInfo.phone}`,
      `📍 Endereço: ${deliveryInfo.address}`,
      `🏘️ Bairro: ${deliveryInfo.neighborhood}`,
      `🏢 Quadra: ${deliveryInfo.block}`,
      `🏠 Casa/Prédio: ${deliveryInfo.houseNumber}`,
      ...(deliveryInfo.deliveryNotes ? [`📝 Observações: ${deliveryInfo.deliveryNotes}`] : []),
      "",
      "💳 *MÉTODO DE PAGAMENTO:*",
      paymentMethod === "card" ? "💳 Cartão de Crédito/Débito" : 
      paymentMethod === "cash" ? "💵 Dinheiro na Entrega" : "🏦 Pix"
    ].join("\n");

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(orderData);
    
    // Redirect to WhatsApp
    window.location.href = `https://api.whatsapp.com/send?phone=5598982074378&text=${encodedMessage}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Nenhum Item no Carrinho</h2>
              <p className="text-muted-foreground mb-6">
                Seu carrinho está vazio. Adicione alguns itens antes de finalizar o pedido.
              </p>
              <Button onClick={() => navigate("/")} variant="warm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Cardápio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cream to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Cardápio
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finalização do Pedido</h1>
              <p className="text-sm text-muted-foreground">Complete seu pedido</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-warm-orange">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-warm-orange">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Informações de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome Completo *
                  </Label>
                  <Input
                    id="fullName"
                    value={deliveryInfo.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Digite seu nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Número de Telefone *
                  </Label>
                  <Input
                    id="phone"
                    value={deliveryInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Digite seu número de telefone"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input
                    id="neighborhood"
                    value={deliveryInfo.neighborhood}
                    onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                    placeholder="Digite seu bairro"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="block">Quadra *</Label>
                  <Input
                    id="block"
                    value={deliveryInfo.block}
                    onChange={(e) => handleInputChange("block", e.target.value)}
                    placeholder="Digite o número/nome da quadra"
                  />
                </div>
                
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Endereço da Rua *
                  </Label>
                  <Input
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Digite o endereço da sua rua"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="houseNumber">Número da Casa/Prédio *</Label>
                  <Input
                    id="houseNumber"
                    value={deliveryInfo.houseNumber}
                    onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                    placeholder="Digite o número da casa ou prédio"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="deliveryNotes">Observações de Entrega (Opcional)</Label>
                  <Textarea
                    id="deliveryNotes"
                    value={deliveryInfo.deliveryNotes}
                    onChange={(e) => handleInputChange("deliveryNotes", e.target.value)}
                    placeholder="Instruções especiais para a entrega..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Método de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Cartão de Crédito/Débito
                      </div>
                      <p className="text-sm text-muted-foreground">Pague com segurança usando seu cartão</p>
                    </Label>
                    <Badge variant="secondary">Recomendado</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-center">💵</span>
                        Dinheiro na Entrega
                      </div>
                      <p className="text-sm text-muted-foreground">Pague com dinheiro quando seu pedido chegar</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-center">🏦</span>
                        Pix
                      </div>
                      <p className="text-sm text-muted-foreground">Pagamento instantâneo via Pix</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              onClick={handleSubmitOrder}
              className="w-full"
              variant="warm"
              size="lg"
            >
              Finalizar Pedido - R$ {total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;