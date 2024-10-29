/*\
title: $:/plugins/linonetwo/streams-outliner-lib/filters/get-stream-nodes.js
type: application/javascript
module-type: filteroperator

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports["get-stream-nodes"] = function(source,operator,options) {
	var results = [],
        suffixes = (operator.suffixes || []),
		exclusive = (suffixes[0] || []).indexOf("exclusive") !== -1;

	source(function(tiddler,title) {
		
		var processNode = function(node,nodeTitle) {
			if (!(exclusive && nodeTitle === title)) {
				results.push(nodeTitle);
			}
			if(node && node.fields["stream-list"] && node.fields["stream-type"]) {
				var streamList = $tw.utils.parseStringArray(node.fields["stream-list"]);
				$tw.utils.each(streamList,function(streamListNodeTitle) {
					var streamListNode = options.wiki.getTiddler(streamListNodeTitle);
					if(streamListNode) {
						processNode(streamListNode,streamListNodeTitle);
					}
				});
			}
		}
		if(tiddler) {
			processNode(tiddler,title);
		}
	});
	return results;
};

})();
