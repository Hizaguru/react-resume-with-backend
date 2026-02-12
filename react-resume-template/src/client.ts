import {createClient} from '@sanity/client';
import {createImageUrlBuilder} from '@sanity/image-url';
import {SanityImageSource} from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
const builder = createImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

export const buildModalImage = (source: SanityImageSource) =>
  urlFor(source).width(900).height(600).fit('crop').auto('format').quality(70);

export const buildBlurPlaceholder = (source: SanityImageSource) =>
  urlFor(source).width(24).height(16).fit('crop').quality(20);
