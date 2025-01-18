import type { DocsThemeConfig } from 'nextra-theme-docs';
import React from 'react';

const config: DocsThemeConfig = {
  logo: <span>Contech Hackathon Documentation</span>,
  project: {
    link: 'https://github.com/with-context-engine/contech-hackathon',
  },
  docsRepositoryBase:
    'https://github.com/with-context-engine/contech-hackathon',
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} - ©{' '}
        <a
          href="https://github.com/with-context-engine/contech-hackathon"
          target="_blank"
          rel="noreferrer"
        >
          with-context-engine/contech-hackathon
        </a>{' '}
        .
      </span>
    ),
  },
};

export default config;
