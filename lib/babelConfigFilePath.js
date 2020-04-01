const { resolve } = require('path')
const { findPackageData } = require('@babel/core/lib/config/files/package')
const { findRelativeConfig, findRootConfig } = require('@babel/core/lib/config/files/configuration')
const gensync = require('gensync')

function babelConfigFilePath (contextPath, environmentName)
{
    const packageData = gensync(findPackageData).sync(contextPath)
    // needed because babels `findRelativeConfig` search just in parent directories
    packageData.directories.push(packageData.filepath);

    // From https://github.com/babel/babel/blob/52a569056c6008c453bf26219461655c7d0322c4/packages/babel-core/src/config/files/configuration.js#L26

    // babel.config.js
    const resolvedRootConfig = gensync(findRootConfig).sync(packageData.filepath, environmentName);
    if (resolvedRootConfig && resolvedRootConfig.filepath) {
        return resolvedRootConfig.filepath;
    }

    // .babelrc.js and .babelrc
    const resolvedRelativeConfig = gensync(findRelativeConfig).sync(packageData, environmentName);
    if (resolvedRelativeConfig && resolvedRelativeConfig.config) {
        return resolvedRelativeConfig.config.filepath;
    }

    console.warn('\x1b[33m%s\x1b[0m',
`Couldn't find an appropriate babel configuration file in the current directory.
Please check if the name of the file is correct and if it's in the correct directory.
For further information please check the documentation: https://babeljs.io/docs/en/babelrc.html
`
    );

    return resolve(__dirname, '../config/.babelrc.base.json');
}

exports = module.exports = babelConfigFilePath
