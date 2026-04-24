import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../components/Layout/Page';
import About from '../components/Sections/About';
import Expertise from '../components/Sections/Expertise';
import Footer from '../components/Sections/Footer';
import Hero from '../components/Sections/Hero';
import Projects from '../components/Sections/Projects';
import Testimonials from '../components/Sections/Testimonials';
import {homePageMeta} from '../data/data';

const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const Home: FC = memo(() => {
  const {title, description, author, keywords, ogImageUrl} = homePageMeta;
  return (
    <Page author={author} description={description} keywords={keywords} ogImageUrl={ogImageUrl} title={title}>
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Testimonials />
      </main>
      <Footer />
    </Page>
  );
});

Home.displayName = 'Home';

export default Home;
