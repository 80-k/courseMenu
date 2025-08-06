import { useState, useCallback } from 'react';

export const useToggleState = <T extends string | number>(
  items: T[],
  initialState: Set<T> = new Set()
) => {
  const [expandedItems, setExpandedItems] = useState<Set<T>>(initialState);

  const toggle = useCallback((itemId: T) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (expandedItems.size === items.length) {
      setExpandedItems(new Set());
    } else {
      setExpandedItems(new Set(items));
    }
  }, [expandedItems.size, items]);

  const expandAll = useCallback(() => {
    setExpandedItems(new Set(items));
  }, [items]);

  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  const isExpanded = useCallback((itemId: T) => {
    return expandedItems.has(itemId);
  }, [expandedItems]);

  const allExpanded = expandedItems.size === items.length;
  const allCollapsed = expandedItems.size === 0;

  return {
    expandedItems,
    toggle,
    toggleAll,
    expandAll,
    collapseAll,
    isExpanded,
    allExpanded,
    allCollapsed,
  };
};