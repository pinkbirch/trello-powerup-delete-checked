function deleteStuff(t) {
	t.card("id").then(function(x) {
		t.get('board', 'private', 'deleteToken').then(function(token) {
			Trello.setToken(token);
			Trello.cards.get(x.id, {
				checklists: "all",
			}, function(result) {
				var allProm = [];
				result.checklists.forEach(function(checklist) {
					checklist.checkItems.forEach(function(item) {
						if(item.state == "complete") {
							allProm.push(Trello.delete("checklists/"+checklist.id+"/checkItems/"+item.id));
						}
					})
				})
				// actually a workaround. ui doesn't always get all updates, reload..
				Promise.all(allProm).then(function() {t.showCard(x.id);});
			}, null)
		})
	})
};


TrelloPowerUp.initialize({
	'card-buttons': function(t, options){
		return [{
			icon: './images/icon.svg',
			text: 'Delete checked',
			callback: deleteStuff}];
	},
	'authorization-status' : function(t) {
		return new TrelloPowerUp.Promise( function(resolve) {
			t.get('board', 'private', 'deleteToken', null).then(function(v) {
				resolve({ authorized: v != null });
			})
		})
	},
	'show-authorization' : function (t) {
		 Trello.authorize({
		 	type:"popup",
		 	name:"Delete Checked Items Button",
		 	interactive:true,
		 	expiration: "never",
		 	success:function() {
		 		t.set('board', 'private', 'deleteToken', localStorage["trello_token"]);
		 	},
		 	scope: {read: "allowRead", write: "allowWrite"}
		 });
	}
});