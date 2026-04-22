import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NotificationBox {
  title: string;
  subtitle: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  metadata: { icon: React.ReactNode; label: string }[]; 
  notification?: NotificationBox;
}

export function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  metadata,
  notification,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20 py-0 gap-0",
        "group cursor-pointer",
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4 flex flex-col gap-3">
        {/* Title & Description */}
        <div>
          <h2 className="font-semibold text-foreground mb-1">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <Separator />

        {/* Metadata */}
        <div className="flex flex-wrap gap-3">
          {metadata.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Notification Box (optional) */}
        {notification && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="font-semibold text-orange-700 text-sm">
              {notification.title}
            </p>
            <p className="text-xs text-orange-600">{notification.subtitle}</p>
          </div>
        )}

        {/* Link */}
        <a
          href="#"
          className="inline-flex items-center text-sm text-primary font-medium hover:underline mt-auto"
        >
          Clique para Acessar
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </a>
      </CardContent>
    </Card>
  );
}
