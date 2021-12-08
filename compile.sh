#!/usr/bin/env bash

npx mitosis compile --force -t liquid --out=./src/_generated/_block.liquid -- src/block.mitosis.js
npx mitosis compile --force -t react --out=./src/_generated/block.js -- src/block.mitosis.js

# The compiler is still buggy so we have to help it a little bit
sed -i -e 's/import { useLocalObservable/import { observer, useLocalObservable/g' src/_generated/block.js
sed -i -e 's/?.map((item)/?.map((item, i)/g' src/_generated/block.js
sed -i -e 's/export default //g' src/_generated/block.js
echo "export default observer(TodoList);" >> src/_generated/block.js

# Not sure why this file gets generated, possibly because we use --force to
# overwrite the generated template. Regardless, we can just remove it.
rm src/_generated/block.js-e