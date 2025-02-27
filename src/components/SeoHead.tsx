import { Helmet } from 'react-helmet';

export const SeoHead = () => {
  return (
    <Helmet>
      {/* Explicitly tell search engines and LLMs about our content file */}
      <link rel="alternate" type="text/plain" href="/llms.txt" title="Content for LLMs" />
      <meta name="ai-content" content="/llms.txt" />
      <meta name="llm-content" content="/llms.txt" />
    </Helmet>
  );
};