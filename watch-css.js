/**
 * 
 */

const fs = require('fs');
const path = require('path');
const src_folder = path.join(__dirname , "src/main/resources/static/css");
const dest_folder = path.join(__dirname , "target/classes/static/css");

console.log("=====================================\n start watch css changes \n=====================================\n");

fs.watch(src_folder, (eventType, filename) => {
	console.log("======= css file changes =======");
	console.log(`event type is: ${eventType}`);
	if (eventType == "change" && filename) {
		console.log(`change to : ${filename}`);
		
		var src_file = path.join(src_folder , filename);
		var dest_file = path.join(dest_folder , filename);
		
		fs.copyFile(src_file, dest_file, (err) => {
			if (err) {
				console.log("Error :", err);
			}
			else {
				console.log(`copy ${filename} to resources/static/css`);
			}
		});
	}
	console.log("==================================");
});