import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = '' }) => {
  const siteName = 'Star Ranch Animal Sanctuary';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Animal Rescue & Care in Arizona`;
  const desc =
    description ||
    'Star Ranch Animal Sanctuary provides shelter, food, medical care, and compassion to animals in need in Concho, Arizona since 2012.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {path && <link rel="canonical" href={path} />}
    </Helmet>
  );
};

export default SEO;
