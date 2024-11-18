
import Link from 'next/link'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ErrorImg from '../public/error.gif';
import { useTranslation } from 'next-i18next';


export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ['common'])),
      },
  };
}

const NotFound = () => {

  const { t } = useTranslation('common');
  const { i18n } = useTranslation();

  return (
    <div className="not-found-page">
      
        <div className='inner-not-found-page'>

            <div className='img-container'>
              <Image unoptimized src={ErrorImg} width={150} height={150} alt='Flennor Parts Error Image' title='Flennor Parts Error Image' />
            </div>


            <div className='error-content'>
                <h1>{i18n.language === 'en' ? "Page Not Found" : t('errorsPages.notFound.title')}</h1>
                <Link href={`/`} aria-label='Flennor parts homepage' title='Flennor parts homepage' >{i18n.language === 'en' ? "Back to homepage" : t('errorsPages.notFound.link')}</Link>
            </div>

        </div>

    </div>
  );
}



export default NotFound;
  