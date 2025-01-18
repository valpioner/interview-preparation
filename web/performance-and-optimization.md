# Web performance & Optimization tips

- Get different performance info using:
  - Browser Dev Tools (`Lighthouse`, `Performance`, `Network`)
  - Framework-specific browser plugins

- Optimize images:
  - compress image size,
  - convert to modern formats like WebP
  - Resize images to the exact size you need them
  - create responsive images with `srcset` to offer smaller sizes
  - lazy load with `loading="lazy"` or prioritize loading with `fetchpriority="high"`
  - use js framework tools for image optimization
  - use CDN if that makes sense