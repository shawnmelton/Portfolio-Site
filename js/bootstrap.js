require.config({
	urlArgs: "r="+ (new Date()).getTime(),

	paths: {
		jquery: "libs/jquery",
		jqueryui: "libs/jqueryui",
		less: "libs/less"
	},
	shim: {
		"jquery": {
			exports: "jQuery"
		},
		"jqueryui": {
			deps: ["jquery"]
		}
	}
});

require(["app"], function(app){
	app.initialize();
});