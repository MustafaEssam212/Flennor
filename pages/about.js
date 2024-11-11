import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {  
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }

const About = () => {
    return(
        <div className="about-page-container">
                zzzzzzzzzzzzzz
        </div>
    )
}


export default About;