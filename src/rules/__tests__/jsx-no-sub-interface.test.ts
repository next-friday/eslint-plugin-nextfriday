import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../jsx-no-sub-interface";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("jsx-no-sub-interface", rule, {
  valid: [
    {
      code: `
        interface StoreCardProps { name: string }
        const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      name: "single main interface used by component",
    },
    {
      code: `
        interface StoreCardProps { name: string }
        const StoreCard = (props: StoreCardProps) => <div />;
      `,
      filename: "StoreCard.tsx",
      name: "main interface without Readonly wrapper",
    },
    {
      code: `
        type StoreCardProps = { name: string }
        const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      name: "main type alias used by component",
    },
    {
      code: `
        interface StoreCardProps { name: string }
        export default function StoreCard(props: Readonly<StoreCardProps>) { return <div />; }
      `,
      filename: "StoreCard.tsx",
      name: "default-exported function declaration component",
    },
    {
      code: `
        interface StoreCardProps { name: string }
        export const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      name: "named-exported component",
    },
    {
      code: `
        export interface StoreCardProps { name: string }
        export const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      name: "exported main interface",
    },
    {
      code: `
        interface CardProps { x: number }
        interface HeaderProps { y: string }
        const Card = (props: Readonly<CardProps>) => <div />;
        const Header = (props: Readonly<HeaderProps>) => <div />;
      `,
      filename: "Card.tsx",
      name: "multiple components each with their own main props",
    },
    {
      code: `
        interface StoreCardAddressProps { label: string; mapUrl: string }
      `,
      filename: "store-card-address.types.ts",
      name: "non-jsx file is not checked",
    },
    {
      code: `
        interface Foo { x: number }
        interface Bar { y: string }
        export { Foo, Bar };
      `,
      filename: "types.tsx",
      name: "tsx file with no component is not checked",
    },
  ],
  invalid: [
    {
      code: `
        interface StoreCardProps { address: StoreCardAddressProps }
        interface StoreCardAddressProps { label: string }
        const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      errors: [{ messageId: "noSubInterface", data: { name: "StoreCardAddressProps" } }],
      name: "sub-interface alongside main",
    },
    {
      code: `
        interface StoreCardProps { name: string }
        interface StoreCardAddressProps { label: string }
        interface StoreCardImageProps { src: string }
        const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      errors: [
        { messageId: "noSubInterface", data: { name: "StoreCardAddressProps" } },
        { messageId: "noSubInterface", data: { name: "StoreCardImageProps" } },
      ],
      name: "multiple sub-interfaces",
    },
    {
      code: `
        interface StoreCardProps { name: string }
        type StoreCardKind = "phone" | "whatsapp";
        const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      errors: [{ messageId: "noSubInterface", data: { name: "StoreCardKind" } }],
      name: "helper type alias alongside main interface",
    },
    {
      code: `
        type StoreCardProps = { name: string };
        type StoreCardKind = "a" | "b";
        const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      errors: [{ messageId: "noSubInterface", data: { name: "StoreCardKind" } }],
      name: "helper type alias alongside main type alias",
    },
    {
      code: `
        interface StoreCardProps { name: string }
        interface StoreCardAddressProps { label: string }
        export const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      errors: [{ messageId: "noSubInterface", data: { name: "StoreCardAddressProps" } }],
      name: "sub-interface alongside named-exported component",
    },
    {
      code: `
        interface SpinnerKind { variant: string }
        const Spinner = () => <div />;
      `,
      filename: "Spinner.tsx",
      errors: [{ messageId: "noSubInterface", data: { name: "SpinnerKind" } }],
      name: "component without props still flags any top-level type",
    },
    {
      code: `
        export interface StoreCardProps { name: string }
        export interface StoreCardAddressProps { label: string }
        export const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
      `,
      filename: "StoreCard.tsx",
      errors: [{ messageId: "noSubInterface", data: { name: "StoreCardAddressProps" } }],
      name: "exported sub-interface is still flagged",
    },
  ],
});
