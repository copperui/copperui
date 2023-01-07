# copy of https://github.com/telekom/scale/blob/cb64d01d6da7b16998fdd8df3f36141a00991066/scripts/build.sh

echo "--------"
echo "Bootstrapping..."
yarn bootstrap;
echo "--------"
echo "Building components..."
yarn workspace @copperui/core build;
echo "--------"
echo "Building React package..."
yarn workspace @copperui/react build;
