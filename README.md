# Escalade Sports Drupal Theme

Custom Bootstrap 5 theme for Escalade Sports Drupal 11 migration.

## Features

- **Bootstrap 5** base theme (extends Radix)
- **5-Region Homepage Layout** (3 top + 2 bottom regions)
- Fully responsive design
- Accessibility compliant (WCAG 2.1 AA)
- Component-based architecture

## Theme Structure

```
escalade_sports/
├── escalade_sports.info.yml          # Theme info
├── escalade_sports.libraries.yml     # Asset libraries
├── escalade_sports.theme             # Theme hooks
├── templates/
│   ├── layout/
│   │   ├── page.html.twig            # Base page template
│   │   └── page--front.html.twig     # Homepage template
│   └── components/
│       ├── header.html.twig          # Header component
│       ├── navigation.html.twig       # Navigation component
│       ├── footer.html.twig          # Footer component
│       └── sidebar.html.twig         # Sidebar component
├── css/
│   ├── style.css                     # Global styles
│   ├── components/                   # Component styles
│   └── layouts/                      # Layout-specific styles
└── js/                               # JavaScript behaviors
```

## Regions

### Standard Regions
- `header` - Site header branding
- `navigation` - Main navigation menu
- `highlighted` - Status messages/alerts
- `help` - Help text region
- `content` - Main content
- `sidebar_first` - Left sidebar
- `sidebar_second` - Right sidebar
- `footer_first` - Footer column 1
- `footer_second` - Footer column 2
- `footer_third` - Footer column 3

### Homepage Regions (5-Region Layout)
- `homepage_top_first` - Top row, left (col-md-4)
- `homepage_top_second` - Top row, center (col-md-4)
- `homepage_top_third` - Top row, right (col-md-4)
- `homepage_bottom_first` - Bottom row, left (col-lg-8)
- `homepage_bottom_second` - Bottom row, right (col-lg-4)

## Installation

1. Place theme in `web/themes/custom/escalade_sports/`
2. Enable via Appearance admin or Drush: `drush theme:enable escalade_sports`
3. Set as default theme: `drush config:set system.theme default escalade_sports`
4. Clear cache: `drush cr`

## Dependencies

- Drupal 10/11
- Radix theme (Bootstrap 5 base)
- Bootstrap 5.3.x CDN

## Maintained By

Wembassy Development Team
