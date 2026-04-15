import type { BrandProduct, BrandIngredient, DrugId } from '../types';
import { drugMap } from '../data/drugs';
import { genericPriceMap } from '../data/brands';

/**
 * Generate a human-readable ingredient summary for a brand product.
 * e.g., "Acetaminophen (325mg), Dextromethorphan (15mg), Doxylamine Succinate (6.25mg)"
 */
export function ingredientSummary(product: BrandProduct): string {
  return product.ingredients.map((i) => `${i.name} ${i.amount}`).join(', ');
}

/**
 * Build the generic recipe text: how many pills of each generic to match one dose.
 */
export function recipeText(product: BrandProduct): string {
  const parts: string[] = [];
  for (const ing of product.ingredients) {
    const id = ing.drugId || ing.substituteId;
    if (!id) continue;
    const kitPill = genericPriceMap.get(id);
    if (!kitPill || kitPill.strengthMg === 0) continue;
    const pills = Math.max(1, Math.round(ing.amountMg / kitPill.strengthMg));
    parts.push(`${pills} ${kitPill.form}${pills > 1 ? 's' : ''} of ${kitPill.label}`);
  }
  return parts.join(', ');
}

/**
 * Estimate generic cost per dose based on bulk prices.
 */
export function genericCostPerDose(product: BrandProduct): { low: number; high: number } {
  let low = 0;
  let high = 0;
  for (const ing of product.ingredients) {
    const id = ing.drugId || ing.substituteId;
    if (!id) continue;
    const kitPill = genericPriceMap.get(id);
    if (!kitPill || kitPill.strengthMg === 0) continue;
    const pills = Math.max(1, Math.round(ing.amountMg / kitPill.strengthMg));
    low += (kitPill.bulkPrice[0] / kitPill.bulkCount) * pills;
    high += (kitPill.bulkPrice[1] / kitPill.bulkCount) * pills;
  }
  return { low, high };
}

/**
 * Get the generic drug info for each ingredient.
 */
export function getGenericAlternatives(ingredients: BrandIngredient[]) {
  return ingredients.map((ing) => {
    const drugId: DrugId | undefined = ing.drugId || ing.substituteId;
    const drug = drugId ? drugMap.get(drugId) : undefined;
    const price = drugId ? genericPriceMap.get(drugId) : undefined;
    return {
      ingredient: ing,
      drug,
      price,
      isSubstitute: !ing.drugId && !!ing.substituteId,
    };
  });
}

/**
 * Generate FAQ items for a brand product.
 */
export function generateFAQItems(product: BrandProduct): { question: string; answer: string }[] {
  const items: { question: string; answer: string }[] = [];
  const ingredients = ingredientSummary(product);
  const recipe = recipeText(product);
  const cost = genericCostPerDose(product);
  const costStr =
    cost.low < 1
      ? `${Math.round(cost.low * 100)}-${Math.round(cost.high * 100)} cents`
      : `$${cost.low.toFixed(2)}-$${cost.high.toFixed(2)}`;

  items.push({
    question: `What are the active ingredients in ${product.name}?`,
    answer: `${product.name} contains ${ingredients}. It is marketed for ${product.purpose.toLowerCase()}.`,
  });

  items.push({
    question: `Is there a generic version of ${product.name}?`,
    answer: `Yes. ${product.name} is a combination of generic drugs that you can buy separately in bulk. The generic recipe is: ${recipe}. These are the same active ingredients at the same doses.`,
  });

  items.push({
    question: `How much does a generic equivalent of ${product.name} cost?`,
    answer: `A single dose of the generic equivalent costs approximately ${costStr} when bought in bulk, compared to $${product.priceRange[0]}-$${product.priceRange[1]} for a box of ${product.name}. That is a savings of over 90% per dose.`,
  });

  items.push({
    question: `How do I take the generic version of ${product.name}?`,
    answer: `Take the generic recipe (${recipe}) ${product.dosing.frequency.toLowerCase()}, up to ${product.dosing.maxDaily.toLowerCase()}. This matches the dosing on the ${product.name} label.`,
  });

  return items;
}

/**
 * Generate SEO-friendly title for a brand page.
 */
export function brandPageTitle(product: BrandProduct): string {
  return `${product.name} Generic Equivalent — What's Inside + DIY Recipe`;
}

/**
 * Generate SEO-friendly description for a brand page.
 */
export function brandPageDescription(product: BrandProduct): string {
  const cost = genericCostPerDose(product);
  const costStr =
    cost.low < 1
      ? `~${Math.round(cost.low * 100)} cents`
      : `~$${cost.low.toFixed(2)}`;
  return `See exactly what active ingredients are in ${product.name}, find the generic equivalent, and learn how to make it yourself from bulk generics for ${costStr}/dose instead of $${product.priceRange[0]}-$${product.priceRange[1]}/box.`;
}

const TYPE_LABELS: Record<string, string> = {
  night: 'Nighttime',
  pm: 'PM / Sleep',
  day: 'Daytime',
  combo: 'Multi-Symptom',
  single: 'Single Drug',
};

export function productTypeLabel(type: string): string {
  return TYPE_LABELS[type] || 'Cold Medicine';
}
