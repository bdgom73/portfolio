{ 
    module:{
           rules: [
               { test : /\.scss$/,
                 uese: {
                       loader: 'sass-loader',
                      options: {
                          includePaths: [
                                path.resolve('../node_modules'), // @import('jeet/scss/jeet/index')
                  ...
              ]
            }
}