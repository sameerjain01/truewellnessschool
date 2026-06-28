# TrueWellness Engineering Standards

## Mission

Every change made to this project must preserve or improve Accessibility, SEO, Performance, and Code Quality. These are core engineering requirements—not optional improvements.

Regardless of redesigns, refactors, or new features, these standards must never regress.

---

# Accessibility (Mandatory)

Target: WCAG 2.2 AA

Every component must:

* Use semantic HTML first.
* Use ARIA only when semantic HTML cannot solve the problem.
* Be fully keyboard accessible.
* Have visible focus states.
* Work with screen readers.
* Maintain logical tab order.
* Respect prefers-reduced-motion.
* Support high contrast.
* Meet WCAG AA color contrast.
* Use proper labels for every form field.
* Associate validation messages with inputs via `aria-describedby`.
* Set `aria-invalid` on inputs with validation errors.
* Include meaningful alt text for informative images.
* Use empty alt attributes for decorative images.
* Maintain a proper heading hierarchy (one H1 per page).
* Never use clickable divs or spans.
* Mark decorative icons and punctuation with `aria-hidden="true"`.

Accessibility must never be removed during redesigns.

---

# SEO (Mandatory)

Every page must include:

* Unique title
* Meta description
* Canonical URL
* Open Graph metadata (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`)
* Twitter Card metadata
* Proper robots directives

`og:type` rules:
* `website` → home page and all section/list pages
* `article` → resource and event single pages

Every page should:

* Have one H1
* Use semantic headings in hierarchy (H1 → H2 → H3)
* Include JSON-LD structured data appropriate to the page type
* Have crawlable navigation
* Use descriptive anchor text (never "click here" or bare "→")
* Avoid duplicate metadata

---

# Structured Data

Implement Schema.org using JSON-LD. Required schemas:

| Page | Schema types |
|------|-------------|
| Home | Organization, WebSite, WebPage |
| All inner pages | WebPage |
| Resource singles | Article |
| Event singles | Event |
| Program singles | (WebPage covers these) |

Use the `{{ block "schema" . }}{{ end }}` block in `layouts/partials/head.html` to inject page-specific schemas from individual layouts.

---

# Performance

Goals: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.

Always:

* Lazy-load non-critical images (`loading="lazy"`)
* Specify `width` and `height` on images to prevent layout shift
* Use responsive images (`srcset`, `sizes`)
* Minimize inline JavaScript
* Remove unused CSS
* Preconnect to font origins

---

# Mobile First

Every page must work on mobile, tablet, and desktop. No horizontal scrolling. Touch targets ≥ 44×44px.

---

# Progressive Enhancement

Critical content must remain accessible if JavaScript fails, images fail, or animations are disabled.

---

# Code Standards

Prefer:

* Semantic HTML (`header`, `main`, `nav`, `section`, `article`, `footer`, `ul`/`ol`/`li`, `dl`/`dt`/`dd`)
* CSS custom properties (never hardcode hex values outside `:root`)
* Reusable partials over copy-pasted markup

Avoid:

* `<div>` where a semantic element exists
* Inline styles unless required to override a single context-specific value
* Duplicated markup across layouts
* `aria-label` on inputs when a visible `<label>` can be used instead

---

# Forms

Every form must:

* Have a `<label>` for every input (visible or `.visually-hidden`)
* Use `autocomplete` attributes on name, email, tel, and address fields
* Link error messages via `aria-describedby`
* Set `aria-invalid="true"` on invalid inputs
* Announce errors via `role="alert"` on the error element
* Have keyboard-navigable submit

---

# Pull Request Checklist

Before considering any task complete, verify:

- [ ] Accessibility maintained or improved (no regressions)
- [ ] SEO maintained or improved (metadata, structured data, headings)
- [ ] Semantic HTML used (no unnecessary divs)
- [ ] Proper heading hierarchy (one H1, logical flow)
- [ ] Metadata complete (title, description, OG, Twitter Card, canonical)
- [ ] Structured data valid (JSON-LD, correct types)
- [ ] Keyboard navigation works end-to-end
- [ ] Images: alt text, width/height, lazy loading
- [ ] Forms: labels, autocomplete, aria-describedby, aria-invalid
- [ ] Internal linking preserved and descriptive
- [ ] Lighthouse Accessibility ≥ 95 (goal 100)
- [ ] Lighthouse SEO ≥ 95 (goal 100)

---

# Deploy Workflow

`git push origin develop` → deploys to staging/develop branch only.

Never push to `master` unless the user explicitly says "deploy to production."
