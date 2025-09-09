import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name}.md`,
);

const preferReactImportTypes = createRule({
  name: "prefer-react-import-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce importing React types and utilities from 'react' instead of using React.X",
    },
    fixable: "code",
    schema: [],
    messages: {
      preferDirectImport: "Use direct import '{{importStatement}}' instead of 'React.{{typeName}}'",
    },
  },
  defaultOptions: [],
  create(context) {
    const reactTypes = new Set([
      "ReactNode",
      "ReactElement",
      "ReactChildren",
      "ReactChild",
      "ComponentType",
      "FC",
      "FunctionComponent",
      "Component",
      "PureComponent",
      "ReactEventHandler",
      "MouseEventHandler",
      "ChangeEventHandler",
      "FormEventHandler",
      "KeyboardEventHandler",
      "TouchEventHandler",
      "PointerEventHandler",
      "FocusEventHandler",
      "UIEventHandler",
      "WheelEventHandler",
      "AnimationEventHandler",
      "TransitionEventHandler",
      "RefObject",
      "MutableRefObject",
      "Ref",
      "ForwardedRef",
      "HTMLProps",
      "ComponentProps",
      "JSXElementConstructor",
    ]);

    const reactRuntimeExports = new Set([
      "useState",
      "useEffect",
      "useContext",
      "useReducer",
      "useCallback",
      "useMemo",
      "useRef",
      "useImperativeHandle",
      "useLayoutEffect",
      "useDebugValue",
      "useDeferredValue",
      "useTransition",
      "useId",
      "useSyncExternalStore",
      "useInsertionEffect",
      "createElement",
      "createContext",
      "forwardRef",
      "memo",
      "lazy",
      "Suspense",
      "Fragment",
      "StrictMode",
      "createRef",
      "isValidElement",
      "cloneElement",
      "Children",
    ]);

    const allReactExports = new Set([...reactTypes, ...reactRuntimeExports]);

    function checkMemberExpression(node: TSESTree.MemberExpression) {
      if (
        node.object.type === AST_NODE_TYPES.Identifier &&
        node.object.name === "React" &&
        node.property.type === AST_NODE_TYPES.Identifier &&
        allReactExports.has(node.property.name)
      ) {
        const typeName = node.property.name;
        const isType = reactTypes.has(typeName);
        const importStatement = isType
          ? `import type { ${typeName} } from "react"`
          : `import { ${typeName} } from "react"`;

        context.report({
          node,
          messageId: "preferDirectImport",
          data: { typeName, importStatement },
          fix(fixer) {
            return fixer.replaceText(node, typeName);
          },
        });
      }
    }

    return {
      MemberExpression: checkMemberExpression,
      "TSTypeReference > TSQualifiedName": (node: TSESTree.TSQualifiedName) => {
        if (
          node.left.type === AST_NODE_TYPES.Identifier &&
          node.left.name === "React" &&
          node.right.type === AST_NODE_TYPES.Identifier &&
          allReactExports.has(node.right.name)
        ) {
          const typeName = node.right.name;
          const isType = reactTypes.has(typeName);
          const importStatement = isType
            ? `import type { ${typeName} } from "react"`
            : `import { ${typeName} } from "react"`;

          context.report({
            node,
            messageId: "preferDirectImport",
            data: { typeName, importStatement },
            fix(fixer) {
              return fixer.replaceText(node, typeName);
            },
          });
        }
      },
    };
  },
});

export default preferReactImportTypes;
