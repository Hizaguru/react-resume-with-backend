import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../components/Layout/Page';
import Contact from '../components/Sections/Contact';
import FAQ from '../components/Sections/FAQ';
import Footer from '../components/Sections/Footer';
import Hero from '../components/Sections/Hero';
import Portfolio from '../components/Sections/Portfolio';
import Process from '../components/Sections/Process';
import Resume from '../components/Sections/Resume';
import Services from '../components/Sections/Services';
import Testimonials from '../components/Sections/Testimonials';
import ValueProp from '../components/Sections/ValueProp';
import WhySolo from '../components/Sections/WhySolo';
import {homePageMeta} from '../data/data';

const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const Home: FC = memo(() => {
  const {title, description, author, keywords, ogImageUrl} = homePageMeta;
  return (
    <Page description={description} title={title} author={author} keywords={keywords} ogImageUrl={ogImageUrl}>
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Services />
        <Process />
        <Portfolio />
        <WhySolo />
        <Resume />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </Page>
  );
});

export default Home;
