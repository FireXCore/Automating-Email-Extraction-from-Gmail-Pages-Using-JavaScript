# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-06-21

### Added
- Full senior-level refactoring with proper state management
- Tampermonkey `GM_setValue` / `GM_getValue` support for persistence across page reloads
- Intelligent content waiting mechanism (`waitForContent`)
- Safety limit (`MAX_PAGES`)
- Comprehensive console logging with emojis for better UX
- Sorted output and timestamped filename

### Changed
- Replaced broken `MutationObserver` + `window.location` pattern with reliable navigation
- Upgraded email regex (removed anchors, added word boundaries)
- Improved duplicate handling using `Set`
- Major code restructuring for maintainability and reliability

### Fixed
- Critical issue: script state loss after page navigation
- Weak regex that missed many valid emails
- Poor page load detection

### Removed
- Redundant and ineffective `MutationObserver` logic

---

## [1.0.0] - Initial Release

- Basic email extraction from multiple Gmail pages
- Simple JSON export
- Basic error handling