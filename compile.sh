#!/usr/bin/env bash

npx mitosis compile --force -t liquid --out=./template/_block.liquid -- src/shared-block/index.js
npx mitosis compile --force -t react --out=./src/block.js -- src/shared-block/index.js

# The compiler is still buggy so we have to help it a little bit
sed -i -e 's/import { useLocalObservable/import { observer, useLocalObservable/g' src/block.js
sed -i -e 's/?.map((item)/?.map((item, i)/g' src/block.js
sed -i -e 's/export default //g' src/block.js
echo "export default observer(TodoList);" >> src/block.js