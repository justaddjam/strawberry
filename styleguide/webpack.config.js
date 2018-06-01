var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "./scripts/entrypoint.tsx"),
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { 
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }
            
        ]
    },
    plugins: [ new HtmlWebpackPlugin() ]
};
