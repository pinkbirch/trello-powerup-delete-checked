function deleteStuff(t) {
	t.card().then(function(x) {
		console.log(x);
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
		 	interactive:false,
		 	expiration: "never",
		 	success:function() {
		 		t.set('board', 'private', 'deleteToken', localStorage["trello_token"]);
		 	},
		 	scope: {read: "allowRead", write: "allowWrite"}
		 });
	}
});