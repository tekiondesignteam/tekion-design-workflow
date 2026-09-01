# Hi-fi References

The prototype agent (Phase 6) does NOT use bespoke kit files here.

It reads directly from the live ALLOY design system repo (`tekiondesignsystem-alloy-main/`):
- Components from `global-kit/components/` and `product-kits/[kit]/components/`
- Tokens from `tokens/dist/tokens.css`
- Output written to `projects/[slug]/` inside the DS repo

This folder is intentionally empty. The DS repo is the source of truth.
