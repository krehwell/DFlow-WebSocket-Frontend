import styles from "./flex.module.css";
import React, { ElementType, ForwardedRef, forwardRef, MutableRefObject, ReactElement } from "react";
import clsx from "clsx";

type FlexProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
    as?: T;
    children?: React.ReactNode;
    className?: string;
    ref?: MutableRefObject<HTMLElement> | ForwardedRef<HTMLElement>;
};

type PolymorphicComponent = <T extends ElementType = "div">(props: FlexProps<T>) => ReactElement | null;
type PolymorphicComponentWithDisplayName = PolymorphicComponent & {
    displayName?: string;
};

export const Flex: PolymorphicComponentWithDisplayName = forwardRef(
    <T extends ElementType>(props: FlexProps<T>, ref) => {
        const { as, children, className, ...rest } = props;
        const Element = as || "div";
        return (
            <Element ref={ref} className={clsx(styles.flex, className)} {...rest}>
                {children}
            </Element>
        );
    }
);
Flex.displayName = "Flex";

export const FlexRowAlignCenter: PolymorphicComponentWithDisplayName = forwardRef(
    <T extends ElementType>(props: FlexProps<T>, ref) => {
        const { className, children, ...rest } = props;
        return (
            <Flex ref={ref} className={clsx(styles.flexRow, styles.alignItemsCenter, className)} {...rest}>
                {children}
            </Flex>
        );
    }
);
FlexRowAlignCenter.displayName = "FlexRowAlignCenter";

export const FlexColumn: PolymorphicComponentWithDisplayName = forwardRef(
    <T extends ElementType>(props: FlexProps<T>, ref) => {
        const { className, children, ...rest } = props;
        return (
            <Flex ref={ref} className={clsx(styles.flexColumn, className)} {...rest}>
                {children}
            </Flex>
        );
    }
);
FlexColumn.displayName = "FlexColumn";

export const FlexColumnAlignJustifyCenter: PolymorphicComponentWithDisplayName = forwardRef(
    <T extends ElementType>(props: FlexProps<T>, ref) => {
        const { className, children, ...rest } = props;
        return (
            <Flex
                ref={ref}
                className={clsx(styles.flexColumn, styles.alignItemsCenter, styles.justifyContentCenter, className)}
                {...rest}>
                {children}
            </Flex>
        );
    }
);
FlexColumnAlignJustifyCenter.displayName = "FlexColumnAlignJustifyCenter";
