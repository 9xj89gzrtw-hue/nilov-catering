"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

/** Яндекс.Метрика + Microsoft Clarity — аналитика (РФ-резидентство соблюдено)
 *  W93-v25: Analytics now gated by cookie consent (152-ФЗ compliance).
 *  Scripts only load after user clicks "Принять" in CookieBanner.
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      setConsented(consent === "accepted");
    };
    checkConsent();
    // Listen for consent changes (when user clicks Принять in CookieBanner)
    window.addEventListener("storage", checkConsent);
    window.addEventListener("cookie-consent-changed", checkConsent);
    return () => {
      window.removeEventListener("storage", checkConsent);
      window.removeEventListener("cookie-consent-changed", checkConsent);
    };
  }, []);

  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!consented) return null;

  return (
    <>
      {/* Яндекс.Метрика (первичная, РФ-резидент) */}
      {ymId && (
        <>
          <Script id="ym-init" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ymId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
          </Script>
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${ymId}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}

      {/* Microsoft Clarity (тепловые карты, сессионные записи — доступно из РФ) */}
      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
