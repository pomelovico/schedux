const webpack = require('webpack');
const path = require('path');
module.exports = {
    devtool:"source-map",
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['env','react']
                        }
                    }
                ]
            }
        ]
    }
}