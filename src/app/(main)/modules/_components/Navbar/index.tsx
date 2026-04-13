"use client";

import {
  Bell,
  ChevronDown,
  User,
  Shield,
  Link2,
  FileSignature,
  CreditCard,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      {/* Logo */}
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
              <rect x="2" y="8" width="6" height="16" rx="1" fill="#1E40AF" />
              <rect x="10" y="4" width="6" height="24" rx="1" fill="#3B82F6" />
              <rect x="18" y="8" width="6" height="16" rx="1" fill="#1E40AF" />
              <rect x="26" y="12" width="4" height="8" rx="1" fill="#60A5FA" />
            </svg>
            <span className="text-xl font-bold text-primary">HMO</span>
            <span className="text-sm text-muted-foreground">Tecnologia</span>
          </div>
        </div>

        {/* User Area */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">
            Olá, <span className="text-primary font-medium">Amanda!</span>
          </span>

          <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 focus:outline-none">
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                    alt="Amanda"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AM
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer gap-3">
                <User className="w-4 h-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3">
                <Shield className="w-4 h-4" />
                Segurança
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3">
                <Link2 className="w-4 h-4" />
                Integração
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3">
                <FileSignature className="w-4 h-4" />
                Assinatura
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3">
                <CreditCard className="w-4 h-4" />
                Cobrança
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3 text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4" />
                Deslogar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
