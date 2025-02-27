# Estimated Budget Calculation Logic

This document explains the logic used to calculate the estimated project budget in the inquiry form.

## Overview

The budget calculation is implemented in `src/components/sections/ProjectInquiry/useProjectEstimate.ts` and follows a two-step process:

1. Establish a base price according to the selected service type
2. Apply a multiplier based on the project's complexity (feature count)

## Base Price by Service Type

Each service type has a different starting price point:

| Service Type | Base Price (USD) | Notes |
|--------------|------------------|-------|
| Landing Page | $499 | For simple, single-page websites |
| MVP Development | $999 | For functional minimum viable products |
| Workflow Automation | $799 | For streamlining business processes |
| 1:1 Coaching | $40 | Per hour rate |

## Complexity Multipliers

The base price is then multiplied by a factor determined by the selected feature count:

| Feature Count | Multiplier | Example Calculation |
|---------------|------------|---------------------|
| 1-3 features | 1.0x | MVP with 1-3 features: $999 × 1.0 = $999 |
| 4-6 features | 1.5x | MVP with 4-6 features: $999 × 1.5 = $1,498.50 |
| 7-10 features | 2.0x | MVP with 7-10 features: $999 × 2.0 = $1,998 |
| 10+ features | 2.5x | MVP with 10+ features: $999 × 2.5 = $2,497.50 |

## Special Cases

1. **NGO/Social Causes:** No automated budget calculation is performed. Instead, we discuss a custom approach based on the organization's available resources.

2. **No Service Type Selected:** If no service type is selected, the budget will be null.

3. **No Feature Count Selected:** If a service type is selected but no feature count is specified, only the base price is displayed.

## Code Implementation

```typescript
export const useProjectEstimate = (projectDetails: ProjectInquiryDetails) => {
  if (projectDetails.isNGO) return null;
  
  let base = 0;
  
  // Set base price according to service type
  switch (projectDetails.serviceType) {
    case "landing": base = 499; break;
    case "mvp": base = 999; break;
    case "automation": base = 799; break;
    case "coaching": base = 40; break;
    default: return null;
  }

  // Apply multiplier based on feature count
  if (projectDetails.featureCount) {
    switch (projectDetails.featureCount) {
      case "1-3": base *= 1; break;
      case "4-6": base *= 1.5; break;
      case "7-10": base *= 2; break;
      case "10+": base *= 2.5; break;
    }
  }

  return base > 0 ? base : null;
};
```

## UI Adaptation Based on Service Type

The form adapts its language based on the selected service type to make the complexity selection more intuitive:

| Service Type | What We Count | Label |
|--------------|---------------|-------|
| Landing Page | Sections | "How many sections on your landing page?" |
| MVP | Features | "How many features in your MVP?" |
| Automation | Steps | "How complex is the automation needed?" |
| Coaching | Sessions | "How many coaching sessions?" |

This ensures that users are making appropriate selections for their specific service needs.

## Notes on Budget Accuracy

These calculations provide an estimated starting price only. The final project cost may differ based on:

- Detailed requirements and specifications
- Technical complexity of specific features
- Timeline constraints
- Custom design requirements
- Integration needs with existing systems
- Ongoing support arrangements

Each client receives a detailed proposal with a more accurate budget after initial consultation.