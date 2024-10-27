/*\
title: $:/plugins/linonetwo/streams-outliner-lib/delete-hook/hook
type: application/javascript
module-type: startup

\*/

$tw.hooks.addHook("th-deleting-tiddler",function(tiddler) {
	if(tiddler.fields["draft.of"]) {
		return;
	}
	
	$tw.rootWidget.invokeActionsByTag("$:/tags/deleteTiddlerAction",null,{currentTiddler : tiddler.fields.title});
});