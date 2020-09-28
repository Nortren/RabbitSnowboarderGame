const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const {ImageminWebpackPlugin} = require("imagemin-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const fs = require('fs');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    const injectStatus = name === 'index';
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: true
    })
});
}

const htmlPlugins = generateHtmlPlugins('./src/templates/');

module.exports = {
    entry: {
        popup: path.join(__dirname, "src/index.ts")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    devServer: {
        host: '127.0.0.1',
        compress: true,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: ["ts-loader"]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },

            {
                test: /\.(png|gif|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ],
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/icon', to: 'src/icon'},

        ]),
        new MiniCssExtractPlugin({
            filename: './src/componentsLibrary.css',
        })
    ].concat(htmlPlugins),
    resolve: {
        extensions: [".ts", ".tsx", ".js", '.css']
    }
};
