import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const AdSense = ({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
  className = "",
}: AdSenseProps) => {
  useEffect(() => {
    try {
      // @ts-ignore - AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...(fullWidthResponsive && { width: "100%" }),
        }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
};

