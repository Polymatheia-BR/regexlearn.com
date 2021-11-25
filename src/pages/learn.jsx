import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useIntl } from 'react-intl';

const LearnPage = dynamic(import('../components/LearnPage'), { ssr: false });

export default function Learn() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'page.learn.title' })}</title>
        <link rel="canonical" href="https://regexlearn.com/learn" />
      </Head>
      <LearnPage />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
