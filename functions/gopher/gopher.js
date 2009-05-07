function gopher_parsedir (dirent) {
	var linePattern = /^(.)(.*?)\t(.*?)\t(.*?)\t(.*?)\u000d\u000a/m;
	var line = dirent.match(linePattern);
	if (line === null) {
		return {type:-1, data: dirent};
	}
	return {type:line[1], title:line[2], path:line[3], host:line[4], port:line[5]};
}
