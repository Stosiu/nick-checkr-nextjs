import { describe, expect, it } from 'vitest';

import {
  getAllCategories,
  getAllCategorySlugs,
  getAllServiceSlugs,
  getCategoryBySlug,
  getCategorySlug,
  getServiceBySlug,
  getServiceSlug,
  getServicesInCategory,
} from '../platform-utils';

describe('getServiceSlug', () => {
  it('lowercases and hyphenates spaces', () => {
    expect(getServiceSlug('Product Hunt')).toBe('product-hunt');
  });

  it('treats dots as separators', () => {
    expect(getServiceSlug('Chess.com')).toBe('chess-com');
  });

  it('strips special characters and collapses resulting dashes', () => {
    expect(getServiceSlug('Weights & Biases')).toBe('weights-biases');
  });

  it('trims leading and trailing dashes', () => {
    expect(getServiceSlug('  Spaced  ')).toBe('spaced');
  });

  it('produces url-safe output for every service', () => {
    for (const slug of getAllServiceSlugs()) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });
});

describe('getServiceBySlug', () => {
  it('round-trips every service slug back to a service', () => {
    for (const slug of getAllServiceSlugs()) {
      const service = getServiceBySlug(slug);
      expect(service).toBeDefined();
      expect(getServiceSlug(service!.name)).toBe(slug);
    }
  });

  it('returns undefined for an unknown slug', () => {
    expect(getServiceBySlug('definitely-not-a-real-platform')).toBeUndefined();
  });
});

describe('getCategorySlug', () => {
  it('hyphenates a plain category', () => {
    expect(getCategorySlug('Social Media')).toBe('social-media');
  });

  it('collapses " & " into a single hyphen', () => {
    expect(getCategorySlug('Finance & Crypto')).toBe('finance-crypto');
  });
});

describe('getCategoryBySlug', () => {
  it('round-trips every category', () => {
    for (const category of getAllCategories()) {
      expect(getCategoryBySlug(getCategorySlug(category))).toBe(category);
    }
  });

  it('returns undefined for an unknown slug', () => {
    expect(getCategoryBySlug('no-such-category')).toBeUndefined();
  });
});

describe('category slug list', () => {
  it('has one slug per category with no duplicates', () => {
    const slugs = getAllCategorySlugs();
    expect(slugs.length).toBe(getAllCategories().length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('getServicesInCategory', () => {
  it('returns only services in the requested category', () => {
    for (const category of getAllCategories()) {
      const inCategory = getServicesInCategory(category);
      expect(inCategory.length).toBeGreaterThan(0);
      expect(inCategory.every((s) => s.category === category)).toBe(true);
    }
  });

  it('returns an empty array for an unknown category', () => {
    expect(getServicesInCategory('Nonexistent')).toEqual([]);
  });
});
