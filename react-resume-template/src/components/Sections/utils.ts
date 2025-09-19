import {SanityImageSource} from '@sanity/image-url/lib/types/types';
import {urlFor} from '../../client';

export const buildModalImage = (source: SanityImageSource) =>
  urlFor(source).width(900).height(600).fit('crop').auto('format').quality(70);
export const buildBlur = (source: SanityImageSource) => urlFor(source).width(24).height(16).fit('crop').quality(20);
