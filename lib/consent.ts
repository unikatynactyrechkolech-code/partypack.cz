export const CONSENT_KEY = "pp_consent";
export const CONSENT_EVENT = "pp-consent-change";

export type ConsentCategory = "functional" | "analytics" | "performance" | "advertisement";

export type ConsentState = {
  v: 1;
  necessary: true;
  updatedAt: string;
} & Record<ConsentCategory, boolean>;

/**
 * Výchozí stav Google Consent Mode v2 – vše kromě nezbytných zamítnuto, dokud návštěvník nerozhodne.
 * Vkládá se do <head> před Google Tag Manager. Pokud už souhlas existuje, hned ho aplikuje.
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', functionality_storage: 'denied', personalization_storage: 'denied',
  security_storage: 'granted', wait_for_update: 500
});
try {
  var c = JSON.parse(localStorage.getItem('${CONSENT_KEY}') || 'null');
  if (c) {
    var v = function (b) { return b ? 'granted' : 'denied'; };
    gtag('consent', 'update', {
      functionality_storage: v(c.functional), personalization_storage: v(c.functional),
      analytics_storage: v(c.analytics),
      ad_storage: v(c.advertisement), ad_user_data: v(c.advertisement), ad_personalization: v(c.advertisement)
    });
  }
} catch (e) {}
`.trim();
