import Image from 'next/image';
import {FC, memo, useEffect, useState} from 'react';
import {client, urlFor} from '../../client';

import {aboutData, SectionId} from '../../data/data';
import {SanityImage} from '../../data/dataDef';
import Section from '../Layout/Section';

const About: FC = memo(() => {
  const {description, aboutItems} = aboutData;

  const [profileImg, setProfileImg] = useState<SanityImage[]>([]);
  useEffect(() => {
    const query = '*[_type == "profile"]';
    client.fetch(query).then(data => {
      setProfileImg(data);
    });
  }, []);

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.About}>
      {profileImg.map(image => {
        return (
          <div key={image._id} style={{display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start'}}>
            <div style={{flexShrink: 0}}>
              <Image
                style={{borderRadius: '50%', objectFit: 'cover', width: '200px', height: '200px'}}
                alt="about-me-image"
                height={200}
                width={200}
                src={urlFor(image.imgUrl).url()}
              />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <div className="flex flex-col gap-y-2 pb-4">
                <h2 className="text-2xl font-bold text-white">About me</h2>
                <p className=" text-gray-300 sm:prose-base" style={{whiteSpace: 'pre-line'}}>
                  {description}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {aboutItems.map(({label, text, Icon}) => (
                  <li className="col-span-1 flex  items-start gap-x-2" key={label + text}>
                    {Icon && <Icon className="h-5 w-5 text-white" />}
                    <span className="text-sm font-bold text-white" key={label}>
                      {label}:
                    </span>
                    <span className=" text-sm text-gray-300" key={text}>
                      {text}
                    </span>
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
