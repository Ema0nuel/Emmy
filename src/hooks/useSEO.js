import { useEffect } from 'react';

/**
 * Custom hook to manage SEO meta tags and structured data
 * @param {Object} config - SEO configuration object
 * @param {string} config.title - Page title
 * @param {string} config.description - Meta description
 * @param {string} config.keywords - Meta keywords (comma-separated)
 * @param {string} config.canonicalUrl - Canonical URL
 * @param {Object} config.openGraph - Open Graph meta object
 * @param {Object} config.twitter - Twitter Card meta object
 * @param {Object} config.structuredData - JSON-LD structured data
 */
export const useSEO = ({
    title = 'Emmanuel Sunday - Frontend & Backend Developer',
    description = '3+ years of web development experience. Specializing in React, TypeScript, Node.js, and full-stack applications.',
    keywords = 'Frontend Developer, Backend Developer, React, TypeScript, Node.js, Web Development',
    canonicalUrl = 'https://codewithnuel.com',
    openGraph = {},
    twitter = {},
    structuredData = null,
} = {}) => {
    useEffect(() => {
        // Update document title
        document.title = title;

        // Update or create meta description
        updateMeta('name', 'description', description);

        // Update or create meta keywords
        updateMeta('name', 'keywords', keywords);

        // Update canonical URL
        updateCanonical(canonicalUrl);

        // Update Open Graph tags
        const defaultOG = {
            title: title,
            description: description,
            url: canonicalUrl,
            type: 'website',
            image: 'https://codewithnuel.com/og-image.jpg',
            image_alt: 'Emmanuel Sunday Portfolio',
            site_name: 'Emmanuel Sunday Portfolio',
        };
        const ogConfig = { ...defaultOG, ...openGraph };
        updateOpenGraphTags(ogConfig);

        // Update Twitter Card tags
        const defaultTwitter = {
            card: 'summary_large_image',
            title: title,
            description: description,
            image: 'https://codewithnuel.com/og-image.jpg',
            creator: '@codewithnuel',
        };
        const twitterConfig = { ...defaultTwitter, ...twitter };
        updateTwitterTags(twitterConfig);

        // Update structured data (JSON-LD)
        if (structuredData) {
            updateStructuredData(structuredData);
        }

        // Cleanup: optional - resetting on unmount
        return () => {
            // Optional: reset to defaults on component unmount
        };
    }, [title, description, keywords, canonicalUrl, openGraph, twitter, structuredData]);
};

/**
 * Helper function to update or create meta tags
 */
const updateMeta = (attribute, attrValue, content) => {
    let meta = document.querySelector(`meta[${attribute}="${attrValue}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, attrValue);
        document.head.appendChild(meta);
    }
    meta.content = content;
};

/**
 * Helper function to update canonical URL
 */
const updateCanonical = (url) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = url;
};

/**
 * Helper function to update Open Graph meta tags
 */
const updateOpenGraphTags = (ogConfig) => {
    const ogMap = {
        title: 'og:title',
        description: 'og:description',
        url: 'og:url',
        type: 'og:type',
        image: 'og:image',
        image_alt: 'og:image:alt',
        site_name: 'og:site_name',
    };

    Object.entries(ogMap).forEach(([key, property]) => {
        if (ogConfig[key]) {
            updateMeta('property', property, ogConfig[key]);
        }
    });
};

/**
 * Helper function to update Twitter Card meta tags
 */
const updateTwitterTags = (twitterConfig) => {
    const twitterMap = {
        card: 'twitter:card',
        title: 'twitter:title',
        description: 'twitter:description',
        image: 'twitter:image',
        creator: 'twitter:creator',
    };

    Object.entries(twitterMap).forEach(([key, metaName]) => {
        if (twitterConfig[key]) {
            updateMeta('name', metaName, twitterConfig[key]);
        }
    });
};

/**
 * Helper function to update JSON-LD structured data
 */
const updateStructuredData = (data) => {
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(data);
};