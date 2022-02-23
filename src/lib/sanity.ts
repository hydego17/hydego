import sanity, { ClientConfig } from '@sanity/client';

const options: ClientConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET_NAME,
  useCdn: process.env.NODE_ENV === 'production',
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // In development we'll set it to false since we need the freshest and latest data (slower)
};

// Sanity default client
const sanityClient = sanity(options);

// Sanity preview client
const previewClient = sanity({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const getClient = (preview: boolean) => (preview ? previewClient : sanityClient);

export { sanityClient, previewClient, getClient };
