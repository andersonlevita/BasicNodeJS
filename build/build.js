var wrench = require('wrench');
var settings = require('./settings')
var exec = require('child_process').exec;
var fs = require('fs');
var handlebars = require('handlebars');

function each_projects(callback){
	for (var i = settings.Projects.length - 1; i >= 0; i--) {
		callback(settings.Projects[i].name);
	};
}

function create_build_dir(){
	wrench.rmdirSyncRecursive(settings.Build, true);
	wrench.mkdirSyncRecursive(settings.Build, true);	
};

function copy_projects(){

	each_projects(function (project){
		var old_path = settings.Base + project;
		var new_path = settings.Base + settings.Build + '/' + project;

		wrench.mkdirSyncRecursive(new_path, true);
		wrench.copyDirSyncRecursive(old_path, new_path);
	});
	
};

function remove_git_dir(){
	each_projects(function (project){
		var path = settings.Base + settings.Build + '/' + project + '/.git';
		wrench.rmdirSyncRecursive(path, true);
	});
};

function edit_initjs(){
	each_projects(function (project){
		var path = settings.Base + settings.Build + '/' + project + '/js/init.js.exemplo';
		var new_path = settings.Base + settings.Build + '/' + project + '/js/init.js';

 		fs.readFile(path, "utf8", function(err, data) {

 			if(data != null){
	 			var template = handlebars.compile( data );

				fs.writeFile(new_path, template({
 					url : settings.StaticUrl,
 					mode : settings.Mode
 				}), "utf8");
 			}
 		
 		});

	});
}

function compactar_projects(){

	each_projects(function (project){	
		exec('cd .. && cd build && tar -cvvzf ' + project + '.tar.gz ' + project);
	});

}

create_build_dir();
copy_projects();
remove_git_dir();
edit_initjs();
compactar_projects();