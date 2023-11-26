yarn

rm -rf cjs
rm -rf esm

# CJS
npm run build:cjs
echo '{"type": "commonjs"}' > cjs/package.json

# ESM
npm run build:esm
echo '{"type": "module"}' > esm/package.json
# 1. 不能省略index.js
# 2. 不能省略.js: 查找所有文件夹，补充.js后缀
find ./esm -name "*.js" | xargs -n1 sed -i '' "s/from '\(\.\/.*\)';/from '\\1.js'/g"
# 3. __dirname __filename 不支持