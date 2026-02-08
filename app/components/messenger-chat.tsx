"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

// Rozšíření Window interface pro TypeScript
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: any;
  }
}

export default function MessengerChat() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Pro demonstrační účely použijeme ukázkové ID
  const FB_PAGE_ID = "100054237254373"; // Změňte na skutečné ID vaší FB stránky
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Render nothing on server to avoid hydration mismatch
  if (!isMounted) {
    return null
  }
  
  return (
    <>
      {/* Facebook SDK pro Messenger Chat */}
      <div id="fb-root"></div>
      
      {/* Facebook SDK Script - použití afterInteractive pro bezpečnější načítání */}
      <Script
        id="facebook-init"
        strategy="afterInteractive"
      >
        {`
          window.fbAsyncInit = function() {
            if (typeof FB !== "undefined") {
              FB.init({
                xfbml: true,
                version: 'v19.0'
              });
            }
          };

          (function(d, s, id) {
            try {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/cs_CZ/sdk/xfbml.customerchat.js';
              if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
              }
            } catch (e) {
              console.error("Chyba při inicializaci Facebook chatu:", e);
            }
          })(document, 'script', 'facebook-jssdk');
        `}
      </Script>
      
      {/* Messenger Chat Plugin */}
      <div className="fb-customerchat" 
        data-attribution="biz_inbox"
        data-page_id={FB_PAGE_ID}
        data-theme_color="#a0001c"
        data-logged_in_greeting="Dobrý den! Vítejte na stránkách stavební firmy Strawstav. Potřebujete poradit s rekonstrukcí nebo máte dotaz k našim službám? Napište nám!"
        data-logged_out_greeting="Dobrý den! Vítejte na stránkách stavební firmy Strawstav. Potřebujete poradit? Napište nám!"
        data-greeting_dialog_display="show"
        data-greeting_dialog_delay="5"
      />
    </>
  )
}