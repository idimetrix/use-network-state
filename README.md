# use-network-state3

Monitor and adapt to network conditions seamlessly with useNetworkState.

## Installation

To install the package, use npm:

```bash
pnpm add use-network-state3

yarn install use-network-state3

npm install use-network-state3
```

## Usage

```tsx
import React from "react";
import { useNetworkState } from "use-network-state3";

const NetworkStatus = () => {
  const networkState = useNetworkState();

  return (
    <div>
      <p>Online: {networkState.online ? "Yes" : "No"}</p>
      {networkState.since && (
        <p>Since: {networkState.since.toLocaleTimeString()}</p>
      )}
      {networkState.downlink && <p>Downlink: {networkState.downlink} Mb/s</p>}
      {networkState.effectiveType && (
        <p>Effective Connection Type: {networkState.effectiveType}</p>
      )}
      {networkState.type && <p>Connection Type: {networkState.type}</p>}
      <p>Data Saver Mode: {networkState.saveData ? "Enabled" : "Disabled"}</p>
    </div>
  );
};

export default NetworkStatus;
```

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/use-network-state3
