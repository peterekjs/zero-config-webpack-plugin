const { findPackageData } = require('@babel/core/lib/config/files/index-browser')
const gensync = require('gensync')

function babelConfigFilePath (contextPath, environmentName)
{
    const packageData = gensync(findPackageData(contextPath))

    return packageData
}

exports = module.exports = babelConfigFilePath
