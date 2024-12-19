import React from "react";
import { Card } from "@/components/ui/card";

const templates = [
  { id: 1, name: "Revelação Misteriosa", style: "Noir" },
  { id: 2, name: "Produto Dark", style: "Minimalista" },
  { id: 3, name: "Promo Ousada", style: "Cyberpunk" },
];

const TemplateSelector = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Templates</h2>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="p-4 cursor-pointer hover:bg-accent transition-colors"
          >
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.style}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;