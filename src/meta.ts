import packageJson from "../package.json" assert { type: "json" };

const meta = {
  name: packageJson.name,
  version: packageJson.version,
};

export default meta;
