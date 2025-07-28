import { MenuItem, MenuItemType } from "./MenuItem";

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
}

export const MenuSection = ({ title, items, onAddToCart }: MenuSectionProps) => {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-warm-orange to-warm-red mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};