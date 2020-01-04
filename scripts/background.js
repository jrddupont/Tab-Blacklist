chrome.tabs.onCreated.addListener(function(tab){
	chrome.storage.local.get(['vals'], function(results){
		results.vals.forEach(function(black){
			if(black.e){
				if(tab.url == black.u){
					chrome.tabs.remove(tab.id);
					return;
				}
			}else{
				if(tab.url.includes(black.u)){
					chrome.tabs.remove(tab.id);
					return;
				}
			}
		});
	});
});

chrome.storage.sync.get(['number'], function(numResult){
	if(numResult.number == 0){
		return;
	}
	var keys = [];
	for(var i = 0; i <= numResult.number - 1; i++){
		keys.push(""+i);
	}
	chrome.storage.sync.get(keys, function(result){
		var values = [];
		for(var i = 0; i <= numResult.number - 1; i++){
			result[i].forEach(function(e){
				values.push({'e': e.e=="t", 'u': e.u});
			});
		}
		chrome.storage.local.clear();
		chrome.storage.local.set({'vals':values});
	});
});