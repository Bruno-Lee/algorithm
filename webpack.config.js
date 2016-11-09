const path = require('path');
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    loader: "babel",
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                }
            ]
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        enforceExtension: false,
        moduleExtensions: ['-loader']
    }
};
