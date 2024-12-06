import { appWithTranslation } from 'next-i18next';  
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/main.scss';
import Layout from '@/layouts/Layout';
import LoadingPage from '@/components/LoadingPage';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    if (router.locale !== preferredLanguage) {
      router.push(router.pathname, router.asPath, { locale: preferredLanguage });
    }
  }, [router]);


  useEffect(() => {
    // Handle initial load
    const handleInitialLoad = () => {
      setLoading(false);
    };

    handleInitialLoad(); // Call immediately after component mounts

    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <Layout>
     <Script 
        strategy="afterInteractive" 
        src="https://www.googletagmanager.com/gtag/js?id=G-02YXZXFNR8" 
        async 
      />
      <Script 
        id="google-analytics-script"  // Add an ID to the inline script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-02YXZXFNR8');
          `,
        }}
      />
      {loading && <LoadingPage />}
      <Component {...pageProps} />
    </Layout>
  )
};

export default appWithTranslation(MyApp);
