require.config({
	urlArgs: "r="+ (new Date()).getTime(),

	paths: {
		jquery: "libs/jquery",
		less: "libs/less"
	}
});

require(["app"], function(app){
	app.initialize();
});