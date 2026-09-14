# Smallbatch

Static site for a cohort-based program for AI entrepreneurs. Plain HTML and CSS, no build step.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page: thesis, what we don't do, how it runs, ten-week summary, fit, price, FAQ |
| `program.html` | Full week-by-week with dates and deliverables |
| `apply.html` | Application form (Netlify Forms, honeypot spam field, posts to `thanks.html`) |
| `thanks.html` | Form success page |
| `styles.css` | Shared styles, light and dark themes via tokens |

## Deploy

`netlify.toml` at the repo root publishes the `site/` folder. Any static host works; the only Netlify-specific piece is the form. On another host, point the form `action` at your own endpoint and drop the `data-netlify` attributes.

## Things to change before launch

Search the four HTML files for these. They are hard-coded on purpose so the site has no JS dependency.

- **Name**: "Smallbatch" is a working name.
- **Cohort dates**: 5 Oct to 11 Dec 2026, applications close 28 Sep. Week dates are on `program.html`.
- **Seat count**: "7 seats open" appears in the nav pill, hero, ticket (the seat bars), FAQ and CTAs. The ticket's seat bars are 5 `taken` + 7 open.
- **Call times**: Tue + Thu 12:00 to 13:30 Eastern.
- **Price**: $1,800 CAD, two $600 seats per cohort, refund through end of week 1.
- **Chat tool**: Signal.
- **Facilitator**: the apply page says the reply comes from "the Cohort 03 facilitator". Add a name.
- **Attribution**: footer and FAQ say the program is run by NeuroLabs in Charlottetown.
