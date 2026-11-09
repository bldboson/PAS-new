export type VariantProps<T extends (...args: any) => any> =
  T extends (props?: infer P) => any ? NonNullable<P> : never;

export interface CVAConfig<T extends Record<string, Record<string, string>>> {
  variants?: T;
  defaultVariants?: { [K in keyof T]?: keyof T[K] };
  compoundVariants?: Array<Record<string, any> & { className: string }>;
}

export function cva<T extends Record<string, Record<string, string>>>(
  base?: string,
  config?: CVAConfig<T>
) {
  return (props?: { [K in keyof T]?: keyof T[K] } & { className?: string }) => {
    const classes: string[] = [base || ''];
    const variants = config?.variants;
    const defaultVariants = config?.defaultVariants;

    if (variants) {
      for (const variantName in variants) {
        const val =
          (props && (props as any)[variantName]) !== undefined
            ? (props as any)[variantName]
            : defaultVariants?.[variantName];
        if (val && variants[variantName]?.[val]) {
          classes.push(variants[variantName][val]);
        }
      }
    }

    if (props?.className) {
      classes.push(props.className);
    }

    return classes.filter(Boolean).join(' ');
  };
}

