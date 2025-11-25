# Follow-Up Issues for CV Header Redesign

## Issue 1: Test DOCX Export with New UnifiedHeader

**Title:** Test DOCX export with new UnifiedHeader data attributes

**Description:**
Verify that DOCX export functionality correctly extracts data from the new UnifiedHeader component.

**Tasks:**
- [ ] Export CV from compact mode (default)
- [ ] Export CV from full portfolio mode (/full)
- [ ] Test each of the 3 layout styles (single-line, two-lines, stacked)
- [ ] Verify all data-* attributes are preserved:
  - `data-name`, `data-title`, `data-summary`
  - `data-section="about"`, `data-highlights`, `data-highlight`
  - `data-industries`, `data-industry`
  - `data-languages`, `data-language`, `data-level`
  - `data-location`, `data-nationality`
- [ ] Compare exported DOCX with previous version for data parity
- [ ] Test all 5 export templates (Executive, Technical, Modern, Academic, Creative)

**Acceptance Criteria:**
- All data-* attributes correctly extracted
- No data loss compared to previous implementation
- All export templates work correctly

**Labels:** testing, docx-export

---

## Issue 2: Cross-Browser and Device Testing

**Title:** Cross-browser and responsive testing for UnifiedHeader

**Description:**
Verify UnifiedHeader component works correctly across all major browsers and devices.

**Tasks:**
- [ ] **Desktop Browsers:**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)
- [ ] **Mobile Browsers:**
  - [ ] Chrome Mobile (Android)
  - [ ] Safari Mobile (iOS)
  - [ ] Firefox Mobile
- [ ] **Responsive Breakpoints:**
  - [ ] Mobile (<768px)
  - [ ] Tablet (768px-1024px)
  - [ ] Desktop (>1024px)
- [ ] **Features to Test:**
  - [ ] Layout switcher cycling (Layers icon)
  - [ ] Mode switcher navigation (Layout/FileText icons)
  - [ ] About section expansion/collapse
  - [ ] localStorage persistence across sessions
  - [ ] Navigation bar mode-aware link
  - [ ] All 3 layout styles render correctly

**Acceptance Criteria:**
- All features work on tested browsers
- No visual regressions
- localStorage works cross-browser
- Responsive layouts look good at all breakpoints

**Labels:** testing, cross-browser, responsive

---

## Issue 3: Accessibility Audit and Testing

**Title:** Accessibility audit for UnifiedHeader component

**Description:**
Ensure UnifiedHeader meets WCAG AA standards and works with assistive technologies.

**Tasks:**
- [ ] **Keyboard Navigation:**
  - [ ] Tab order: Mode switcher → Layout switcher → About trigger
  - [ ] Enter/Space activate all buttons
  - [ ] Escape closes About section when expanded
- [ ] **Screen Reader Testing:**
  - [ ] NVDA (Windows)
  - [ ] JAWS (Windows)
  - [ ] VoiceOver (macOS/iOS)
- [ ] **ARIA Attributes:**
  - [ ] Verify `aria-label` on mode switcher
  - [ ] Verify `aria-label` on layout switcher
  - [ ] Verify `aria-expanded` on About trigger
  - [ ] Check semantic HTML structure
- [ ] **Color Contrast:**
  - [ ] Test with WCAG contrast checker
  - [ ] Verify 4.5:1 ratio for normal text
  - [ ] Verify 3:1 ratio for large text
- [ ] **Motion Preferences:**
  - [ ] Test with `prefers-reduced-motion`
  - [ ] Verify animations can be disabled
  - [ ] Ensure functionality without animations

**Acceptance Criteria:**
- WCAG AA compliance
- Full keyboard navigation support
- Screen reader compatibility
- Passes automated accessibility tools (axe, Lighthouse)

**Labels:** accessibility, a11y, testing

---

## Issue 4: Performance Optimization

**Title:** Optimize UnifiedHeader component performance

**Description:**
Analyze and improve performance of UnifiedHeader component.

**Tasks:**
- [ ] **Bundle Size Analysis:**
  - [ ] Measure bundle impact (~15KB added, ~20KB removed)
  - [ ] Verify net bundle change is -5KB as expected
  - [ ] Check for unused imports
- [ ] **Rendering Performance:**
  - [ ] Add React.memo if parent re-renders frequently
  - [ ] Debounce layout switcher (prevent excessive re-renders)
  - [ ] Lazy load About section content (render only when expanded)
- [ ] **localStorage Performance:**
  - [ ] Debounce localStorage writes (300ms)
  - [ ] Cache in component state to avoid repeated reads
  - [ ] Measure impact on page load time
- [ ] **Lighthouse Audit:**
  - [ ] Run Lighthouse performance audit
  - [ ] Ensure Performance score >90
  - [ ] Check First Contentful Paint (FCP)
  - [ ] Check Largest Contentful Paint (LCP)

**Acceptance Criteria:**
- Bundle size within expected range
- No performance regressions
- Lighthouse Performance score >90
- Smooth animations (60fps)

**Labels:** performance, optimization

---

## Issue 5: Edge Case Testing and Error Handling

**Title:** Test edge cases for UnifiedHeader component

**Description:**
Verify UnifiedHeader handles edge cases gracefully.

**Tasks:**
- [ ] **Layout Edge Cases:**
  - [ ] Very long names (truncate with ellipsis)
  - [ ] Multiple email addresses (show primary only)
  - [ ] Missing avatar (show User icon placeholder)
  - [ ] RTL languages (ensure layout respects text direction)
- [ ] **About Section Edge Cases:**
  - [ ] Empty highlights (show message)
  - [ ] Too many industries (limit to 8 in compact mode)
  - [ ] Rapid expansion/collapse (debounce 200ms)
- [ ] **Mode Switcher Edge Cases:**
  - [ ] Rapid clicking (debounce navigation)
  - [ ] Browser back button (respect history)
  - [ ] Deep links to /full or / (support both)
- [ ] **localStorage Edge Cases:**
  - [ ] Private browsing mode (fallback to sessionStorage)
  - [ ] localStorage disabled (use in-memory state)
  - [ ] Corrupted data (validate and reset to default)
  - [ ] Storage quota exceeded (graceful degradation)

**Acceptance Criteria:**
- All edge cases handled gracefully
- No console errors or warnings
- Fallback mechanisms work correctly
- User experience remains smooth

**Labels:** testing, edge-cases, error-handling

---

## Issue 6: Delete Deprecated Components

**Title:** Remove deprecated Hero, About, and CompactCV components

**Description:**
After verifying new implementation, delete deprecated components that were replaced by UnifiedHeader.

**Tasks:**
- [ ] Verify all features working in production
- [ ] Confirm no rollback needed
- [ ] Delete files:
  - [ ] `src/components/Hero.tsx`
  - [ ] `src/components/About.tsx`
  - [ ] `src/components/CompactCV.tsx`
- [ ] Remove unused imports
- [ ] Update documentation if needed
- [ ] Run build to ensure no errors
- [ ] Commit with message: `chore: remove deprecated header components`

**Acceptance Criteria:**
- Build succeeds after deletion
- No broken imports or references
- Application works correctly

**Labels:** cleanup, chore

---

## Issue 7: Add Unit and Integration Tests

**Title:** Add tests for UnifiedHeader component

**Description:**
Create test suite for UnifiedHeader component and related functionality.

**Tasks:**
- [ ] **Unit Tests:**
  - [ ] Test layout style cycling
  - [ ] Test localStorage persistence
  - [ ] Test About section expansion
  - [ ] Test mode switching
  - [ ] Test data-* attribute rendering
- [ ] **Integration Tests:**
  - [ ] Test routing (/, /full, /cv redirect)
  - [ ] Test Navigation mode-aware behavior
  - [ ] Test with Index and CompactCVPage
- [ ] **Snapshot Tests:**
  - [ ] Snapshot each layout style
  - [ ] Snapshot expanded/collapsed About section
  - [ ] Snapshot mobile/desktop views
- [ ] **Coverage Goals:**
  - [ ] Aim for 80%+ coverage
  - [ ] Cover all critical paths

**Acceptance Criteria:**
- Test suite passes
- Coverage >80%
- Tests run in CI/CD pipeline

**Labels:** testing, unit-tests

---

## Priority

**High Priority:**
1. Issue 1: DOCX Export Testing (critical for CV functionality)
2. Issue 2: Cross-Browser Testing (ensure compatibility)
3. Issue 3: Accessibility Audit (ensure usability)

**Medium Priority:**
4. Issue 5: Edge Case Testing (improve robustness)
5. Issue 4: Performance Optimization (enhance UX)

**Low Priority:**
6. Issue 7: Add Tests (improve maintainability)
7. Issue 6: Delete Deprecated Components (cleanup)

---

**Related Commit:** 11f2138 - feat: redesign CV header with unified minimalistic component
