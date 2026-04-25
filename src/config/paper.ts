// Single source of truth for the paper's canonical metadata.
// Update here when the SSRN version, DOI, or author affiliations change;
// every surface (footer, JSON-LD, OG metadata) reads from this module.

export const PAPER = {
  title: 'Product-Customer Coupling: Why Product-Market Fit Happens When It Happens',
  shortTitle: 'Product-Customer Coupling',
  acronym: 'PCC',
  doi: '10.2139/ssrn.6618399',
  doiUrl: 'https://doi.org/10.2139/ssrn.6618399',
  ssrnAbstract: '6618399',
  ssrnUrl: 'https://ssrn.com/abstract=6618399',
  datePublished: '2026-04-21',
  license: {
    name: 'CC-BY 4.0',
    url: 'https://creativecommons.org/licenses/by/4.0/',
  },
  author: {
    name: 'Tamas Babel',
    orcid: '0000-0002-1735-5823',
    affiliations: [
      'InnoLab, Budapest University of Technology and Economics (BME)',
      'Wigner Research Centre for Physics',
    ],
  },
  keywords: [
    'product-market fit',
    'cybernetics',
    'requisite variety',
    'Ashby',
    'coupled regulation',
    'switching cost',
    'systems thinking',
    'entrepreneurship theory',
  ],
} as const;
