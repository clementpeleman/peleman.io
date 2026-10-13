/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pagina's van de vorige site. Tijdelijk (307) waar later een eigen pagina komt, permanent waar die vervangen is.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: false },
      { source: "/case-studies", destination: "/", permanent: false },
      { source: "/contact", destination: "/aanvraag", permanent: false },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/voorwaarden", permanent: true },
      { source: "/acceptable-use", destination: "/voorwaarden", permanent: true },
    ];
  },
};
module.exports = nextConfig;
