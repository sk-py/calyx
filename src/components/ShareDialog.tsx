import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Copy, MessageCircle, Send, Twitter } from "lucide-react";
import { useState } from "react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  // Get the current page URL dynamically
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Updated message for perfume website
  const shareText = "Discover this luxurious fragrance!";

  // Customized share links for each platform
  const shareLinks = {
    chat: `sms:?body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-fit">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Share this Fragrance</DialogTitle>
          {/* <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
              <X size={16} />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose> */}
        </DialogHeader>

        <div className="grid grid-cols-5 gap-4 py-4">
          <ShareOption
            icon={<MessageCircle size={20} />}
            label="Chat"
            onClick={() => handleShare("chat")}
          />
          <ShareOption
            icon={<Send size={20} />}
            label="Telegram"
            onClick={() => handleShare("telegram")}
          />
          <ShareOption
            icon={<Twitter size={20} />}
            label="Twitter"
            onClick={() => handleShare("twitter")}
          />
          <ShareOption
            icon={<WhatsAppSVG />}
            label="WhatsApp"
            onClick={() => handleShare("whatsapp")}
          />
          <ShareOption
            icon={<span className="text-xl">@</span>}
            label="E-mail"
            className="bg-red-50 text-red-500"
            onClick={() => handleShare("email")}
          />
        </div>

        <div className="mt-2">
          <p className="text-center text-sm text-gray-500 mb-4">
            Or share with link
          </p>
          <div className="flex items-center">
            <div className="bg-gray-50 rounded-l-md py-2 px-3 flex-1 overflow-hidden">
              <p className="text-sm text-gray-500 truncate">{shareUrl}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-r-md bg-white border border-l-0"
              onClick={handleCopy}
            >
              <Copy size={16} className={copied ? "text-green-500" : ""} />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ShareOptionProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

function ShareOption({ icon, label, className = "", onClick }: ShareOptionProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors ${className}`}
        onClick={onClick}
      >
        {icon}
      </button>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

const WhatsAppSVG = () => {
  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 308 308"
      xmlSpace="preserve"
      className="scale-50"
    >
      <g id="XMLID_468_">
        <path
          id="XMLID_469_"
          d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"
        />
        <path
          id="XMLID_470_"
          d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z  M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"
        />
      </g>
    </svg>
  );
};