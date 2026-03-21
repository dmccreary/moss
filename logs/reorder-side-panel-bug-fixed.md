# Bug Fix: Dual-Panel and Top-Bottom Label Reorder Not Preserved in JSON Export

**Date:** 2026-03-20
**File Fixed:** `docs/sims/shared-libs/diagram.js`
**Function:** `updateJSONOutput()`

## Problem

When using `dual-panel` or `top-bottom` layouts in edit mode (`?edit=true`), dragging labels to reorder them within a panel visually updated the UI but the exported JSON (via "Copy JSON") reverted to the original array order. This meant the user's reordering work was silently lost on save.

The `side-panel` layout did NOT have this bug — it had a full renumber pass (lines 844-878) that sorted `this.data.callouts` after reorder. The `dual-panel` and `top-bottom` reorder handlers (lines 971-983) moved the DOM elements but skipped the data array re-sort before calling `updateJSONOutput()`.

## Root Cause

`updateJSONOutput()` exported `this.data.callouts.map(c => ({ ...c }))` — always using the original data array order regardless of the current DOM arrangement. For `side-panel`, the reorder handler pre-sorted the data array so this worked. For `dual-panel` and `top-bottom`, it didn't.

## Fix

Updated `updateJSONOutput()` to read the current DOM order from the label panels when the layout is `dual-panel` or `top-bottom`:

- **dual-panel**: Reads `.label-row` elements from `labelPanelLeft` then `labelPanelRight`
- **top-bottom**: Reads `.label-row` elements from `labelPanelTop` then `labelPanelBottom`
- **side-panel**: Unchanged (already worked via data array pre-sort)

The exported JSON now reflects the actual visual order the user arranged via drag-and-drop.

## Discovered While

Building the bryophyte comparison diagram for the Moss intelligent textbook. The three-panel image had leader lines crossing because labels were in ID order rather than spatial order. Reordering labels in the UI fixed the crossings visually but the fix was lost when copying the JSON back to `data.json`.
