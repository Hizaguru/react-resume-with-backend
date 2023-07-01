import classNames from 'classnames';
import Image from 'next/legacy/image';
import { FC, memo, useEffect, useState } from 'react';
import { client, urlFor } from '../../client';

import { aboutData, SectionId } from '../../data/data';
import { SanityImage } from '../../data/dataDef';
import Section from '../Layout/Section';

const About: FC = memo(() => {
  const { description, aboutItems } = aboutData;

  const [profileImg, setProfileImg] = useState<SanityImage[]>([]);
  useEffect(() => {
    const query = '*[_type == "profile"]';
    client.fetch(query).then((data) => {
      setProfileImg(data);
    });
  }, []);

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.About}>
      {profileImg.map((image) => {
        return (
          <div key={image._id} className={classNames('grid grid-cols-1 gap-y-4', { 'md:grid-cols-4': !!image })}>
            <div className="col-span-1 flex justify-center md:justify-start">
              <div className="lg:pr-12 py-2 overflow-hidden">
                <Image className='rounded-full' alt="about-me-image" height={300} width={300} objectFit="cover" src={urlFor(image.imgUrl).url()} />
              </div>
            </div>
            <div className={classNames('col-span-1 flex flex-col gap-y-6', { 'md:col-span-3': !!image })}>
              <div className="flex flex-col gap-y-2 pb-4">
                <h2 className="text-2xl font-bold text-white">About me</h2>
                <p className=" text-gray-300 sm:prose-base" style={{ whiteSpace: 'pre-line' }}>{description}</p>
              </div>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {aboutItems.map(({ label, text, Icon }) => (
                  <li className="col-span-1 flex  items-start gap-x-2" key={label+text}>
                    {Icon && <Icon className="h-5 w-5 text-white" />}
                    <span className="text-sm font-bold text-white" key={label}>{label}:</span>
                    <span className=" text-sm text-gray-300" key={text}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </Section>
  );
});

About.displayName = 'About';
export default About;
