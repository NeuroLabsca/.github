import Script from "next/script";

/**
 * ActiveProspect TrustedForm Certify snippet (free for publishers). It adds a
 * hidden `xxTrustedFormCertUrl` input to every form on the page; the funnel
 * reads it on submit. Disabled by default so local dev does not mint certs.
 */
export function TrustedFormScript() {
  if (process.env.NEXT_PUBLIC_TRUSTEDFORM_ENABLED !== "true") return null;
  return (
    <Script id="trustedform" strategy="afterInteractive">{`
      (function(){var tf=document.createElement('script');tf.type='text/javascript';tf.async=true;
      tf.src=('https:'==document.location.protocol?'https':'http')+'://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l='+new Date().getTime()+Math.random();
      var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(tf,s);})();
    `}</Script>
  );
}
